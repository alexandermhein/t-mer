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
  | { type: 'SYNC_WITH_ELAPSED_TIME'; payload: number }

const initialTimerState = (initialSeconds: number): TimerState => ({
  totalSeconds: initialSeconds,
  remainingSeconds: initialSeconds,
  isRunning: false,
  isPaused: false,
  showControls: true,
  inputSequence: "",
  isAnimating: false,
})

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
    
    case 'SYNC_WITH_ELAPSED_TIME':
      return {
        ...state,
        remainingSeconds: Math.max(0, state.totalSeconds - action.payload),
      }
    
    default:
      return state
  }
}

export function useTimer(initialSeconds: number): [TimerState, TimerControls] {
  const [state, dispatch] = useReducer(timerReducer, initialTimerState(initialSeconds))
  const { sendNotification } = useNotification()
  const { playNotificationSound } = useAudio()
  
  // Refs for tracking timer state between renders
  const workerRef = useRef<Worker | null>(null)
  const startTimeRef = useRef<number | null>(null)
  const elapsedSecondsRef = useRef<number>(0)

  // Initialize Web Worker only once
  useEffect(() => {
    if (typeof window === 'undefined') return
    
    workerRef.current = new Worker(new URL('../workers/timer.worker.ts', import.meta.url))
    
    workerRef.current.onmessage = (e) => {
      if (e.data.type === 'TICK') {
        dispatch({ type: 'TICK' })
      }
    }

    return () => {
      workerRef.current?.terminate()
    }
  }, [])

  // Handle Page Visibility Change to maintain accurate timing
  useEffect(() => {
    if (!state.isRunning) return
    
    const handleVisibilityChange = () => {
      if (document.visibilityState !== 'visible' || !state.isRunning) return
      
      if (startTimeRef.current !== null) {
        const now = Date.now()
        const elapsedTimeMs = now - startTimeRef.current
        const elapsedSeconds = Math.floor(elapsedTimeMs / 1000)
        
        // Only sync if there's a significant difference to avoid unnecessary updates
        if (Math.abs(elapsedSeconds - elapsedSecondsRef.current) > 2) {
          elapsedSecondsRef.current = elapsedSeconds
          dispatch({ 
            type: 'SYNC_WITH_ELAPSED_TIME', 
            payload: elapsedSeconds 
          })
        }
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [state.isRunning])

  // Handle timer completion
  useEffect(() => {
    if (state.remainingSeconds === 0 && state.isRunning) {
      workerRef.current?.postMessage({ type: 'STOP' })
      sendNotification("Timer Complete", "Your timer has finished!")
      playNotificationSound()
      dispatch({ type: 'PAUSE' })
      startTimeRef.current = null
      elapsedSecondsRef.current = 0
    }
  }, [state.remainingSeconds, state.isRunning, sendNotification, playNotificationSound])

  // Handle timer state changes
  useEffect(() => {
    if (!workerRef.current) return
    
    if (state.isRunning) {
      startTimeRef.current = Date.now() - (elapsedSecondsRef.current * 1000)
      workerRef.current.postMessage({ type: 'START' })
    } else {
      workerRef.current.postMessage({ type: 'STOP' })
      if (state.remainingSeconds < state.totalSeconds) {
        elapsedSecondsRef.current = state.totalSeconds - state.remainingSeconds
      }
    }
  }, [state.isRunning, state.remainingSeconds, state.totalSeconds])

  // Request notification permission on mount
  useEffect(() => {
    const requestPermission = async () => {
      if ('Notification' in window) {
        await Notification.requestPermission()
      }
    }
    requestPermission()
  }, [])

  // Apply the input sequence
  const applyInputSequence = useCallback(() => {
    if (!state.inputSequence) return
    
    const minutes = parseFloat(state.inputSequence)
    const limitedMinutes = Math.min(minutes, 30)
    
    if (!isNaN(limitedMinutes) && limitedMinutes > 0) {
      dispatch({ type: 'SET_DURATION', payload: Math.round(limitedMinutes * 60) })
      dispatch({ type: 'SET_INPUT_SEQUENCE', payload: "" })
      startTimeRef.current = null
      elapsedSecondsRef.current = 0
    }
  }, [state.inputSequence])

  // Effect to handle input sequence changes with debounce
  useEffect(() => {
    if (!state.inputSequence) return
    
    dispatch({ type: 'SET_ANIMATING', payload: true })
    const timeout = setTimeout(applyInputSequence, 500)
    
    return () => clearTimeout(timeout)
  }, [state.inputSequence, applyInputSequence])

  // Memoize controls to prevent unnecessary re-renders
  const controls = useMemo<TimerControls>(() => ({
    startTimer: () => {
      startTimeRef.current = Date.now() - (elapsedSecondsRef.current * 1000)
      dispatch({ type: 'START' })
    },
    
    pauseTimer: () => dispatch({ type: 'PAUSE' }),
    
    resetTimer: () => {
      dispatch({ type: 'RESET' })
      startTimeRef.current = null
      elapsedSecondsRef.current = 0
    },
    
    handleSliderChange: (value: number[]) => {
      dispatch({ type: 'SET_DURATION', payload: Math.round(value[0]) * 60 })
      startTimeRef.current = null
      elapsedSecondsRef.current = 0
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