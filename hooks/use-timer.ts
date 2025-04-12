import { useReducer, useEffect, useRef, useCallback, useMemo } from 'react'
import { useNotification } from '@/hooks/use-notification'
import { useAudio } from '@/hooks/use-audio'
import { TimerState, TimerControls } from '@/types/timer'

type TimerAction =
  | { type: 'START' }
  | { type: 'PAUSE' }
  | { type: 'RESET' }
  | { type: 'SET_DURATION'; payload: number }
  | { type: 'SET_INPUT_SEQUENCE'; payload: string }
  | { type: 'SET_ANIMATING'; payload: boolean }
  | { type: 'TICK' }
  | { type: 'SYNC_TIME'; payload: number }

function timerReducer(state: TimerState, action: TimerAction): TimerState {
  switch (action.type) {
    case 'START':
      return { ...state, isRunning: true, isPaused: false, showControls: false }
    case 'PAUSE':
      return { ...state, isRunning: false, isPaused: true, showControls: true }
    case 'RESET':
      return {
        ...state,
        isRunning: false,
        isPaused: false,
        remainingSeconds: state.totalSeconds,
        showControls: true,
      }
    case 'SET_DURATION':
      return {
        ...state,
        totalSeconds: action.payload,
        remainingSeconds: action.payload,
        isAnimating: false,
      }
    case 'SET_INPUT_SEQUENCE':
      return { ...state, inputSequence: action.payload }
    case 'SET_ANIMATING':
      return { ...state, isAnimating: action.payload }
    case 'TICK':
      return {
        ...state,
        remainingSeconds: Math.max(0, state.remainingSeconds - 1),
      }
    case 'SYNC_TIME':
      return {
        ...state,
        remainingSeconds: Math.max(0, Math.round(action.payload)),
      }
    default:
      return state
  }
}

export function useTimer(initialSeconds: number): [TimerState, TimerControls] {
  const [state, dispatch] = useReducer(timerReducer, {
    totalSeconds: initialSeconds,
    remainingSeconds: initialSeconds,
    isRunning: false,
    isPaused: false,
    showControls: true,
    inputSequence: "",
    isAnimating: false,
  })

  const workerRef = useRef<Worker | null>(null)
  const startTimeRef = useRef<number | null>(null)
  const { sendNotification } = useNotification()
  const { playNotificationSound } = useAudio()

  // Initialize Web Worker
  useEffect(() => {
    if (typeof window !== 'undefined') {
      workerRef.current = new Worker(new URL('../workers/timer.worker.ts', import.meta.url))
      
      workerRef.current.onmessage = (e: MessageEvent) => {
        if (e.data.type === 'TICK') {
          dispatch({ type: 'TICK' })
        }
      }

      return () => {
        workerRef.current?.terminate()
      }
    }
  }, []) // Empty dependency array for worker initialization

  // Handle visibility change
  useEffect(() => {
    if (typeof document === 'undefined') return;

    const syncTimerOnVisibilityChange = () => {
      if (document.visibilityState === 'visible' && state.isRunning && startTimeRef.current) {
        // Calculate what the remaining seconds should be based on elapsed time
        const elapsedMillis = Date.now() - startTimeRef.current;
        const elapsedSeconds = elapsedMillis / 1000; // Use floating point for more precision
        const calculatedRemaining = Math.max(0, state.totalSeconds - elapsedSeconds);
        
        // Always sync the timer when tab becomes visible to ensure accuracy
        dispatch({ type: 'SYNC_TIME', payload: calculatedRemaining });
      }
    };

    document.addEventListener('visibilitychange', syncTimerOnVisibilityChange);
    
    // Also sync periodically even while tab is visible
    const periodicSync = setInterval(() => {
      if (state.isRunning && startTimeRef.current) {
        const elapsedMillis = Date.now() - startTimeRef.current;
        const elapsedSeconds = elapsedMillis / 1000;
        const calculatedRemaining = Math.max(0, state.totalSeconds - elapsedSeconds);
        
        // Only update if there's a significant difference
        if (Math.abs(calculatedRemaining - state.remainingSeconds) > 0.5) {
          dispatch({ type: 'SYNC_TIME', payload: calculatedRemaining });
        }
      }
    }, 10000); // Sync every 10 seconds
    
    return () => {
      document.removeEventListener('visibilitychange', syncTimerOnVisibilityChange);
      clearInterval(periodicSync);
    };
  }, [state.isRunning, state.totalSeconds, state.remainingSeconds]);

  // Handle timer completion
  useEffect(() => {
    if (state.remainingSeconds === 0 && state.isRunning) {
      workerRef.current?.postMessage({ type: 'STOP' })
      sendNotification("Timer Complete", "Your timer has finished!")
      playNotificationSound()
      dispatch({ type: 'PAUSE' })
      startTimeRef.current = null;
    }
  }, [state.remainingSeconds, state.isRunning, sendNotification, playNotificationSound])

  // Handle timer state changes
  useEffect(() => {
    if (workerRef.current) {
      if (state.isRunning) {
        // Store start time when timer starts
        const secondsElapsed = state.totalSeconds - state.remainingSeconds;
        startTimeRef.current = Date.now() - (secondsElapsed * 1000);
        workerRef.current.postMessage({ type: 'START' })
      } else {
        workerRef.current.postMessage({ type: 'STOP' })
        if (!state.isPaused) {
          startTimeRef.current = null;
        }
      }
    }
  }, [state.isRunning, state.totalSeconds, state.remainingSeconds, state.isPaused])

  // Request notification permission on mount
  useEffect(() => {
    const requestPermission = async () => {
      if ('Notification' in window) {
        const permission = await Notification.requestPermission()
        if (permission === 'granted') {
          console.log('Notification permission granted')
        }
      }
    }
    requestPermission()
  }, [])

  // Apply the input sequence
  const applyInputSequence = useCallback(() => {
    if (state.inputSequence) {
      const minutes = parseFloat(state.inputSequence)
      const limitedMinutes = Math.min(minutes, 30)
      if (!isNaN(limitedMinutes) && limitedMinutes > 0) {
        dispatch({ type: 'SET_DURATION', payload: Math.round(limitedMinutes * 60) })
        dispatch({ type: 'SET_INPUT_SEQUENCE', payload: "" })
      }
    }
  }, [state.inputSequence])

  // Effect to handle input sequence changes
  useEffect(() => {
    if (state.inputSequence) {
      dispatch({ type: 'SET_ANIMATING', payload: true })
      const timeout = setTimeout(applyInputSequence, 500)
      return () => clearTimeout(timeout)
    }
  }, [state.inputSequence, applyInputSequence])

  const controls = useMemo<TimerControls>(() => ({
    startTimer: () => dispatch({ type: 'START' }),
    pauseTimer: () => dispatch({ type: 'PAUSE' }),
    resetTimer: () => dispatch({ type: 'RESET' }),
    handleSliderChange: (value: number[]) => {
      dispatch({ type: 'SET_DURATION', payload: Math.round(value[0]) * 60 })
    },
    setInputSequence: (value: string) => {
      dispatch({ type: 'SET_INPUT_SEQUENCE', payload: value })
    },
    setIsAnimating: (value: boolean) => {
      dispatch({ type: 'SET_ANIMATING', payload: value })
    },
  }), [])

  return [state, controls]
} 