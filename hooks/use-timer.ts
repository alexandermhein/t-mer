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
  const { sendNotification } = useNotification()
  const { playNotificationSound } = useAudio()

  // Initialize Web Worker
  useEffect(() => {
    if (typeof window !== 'undefined') {
      workerRef.current = new Worker(new URL('../workers/timer.worker.ts', import.meta.url))
      
      workerRef.current.onmessage = (e) => {
        if (e.data.type === 'TICK') {
          dispatch({ type: 'TICK' })
        }
      }

      return () => {
        workerRef.current?.terminate()
      }
    }
  }, []) // Empty dependency array for worker initialization

  // Handle timer completion
  useEffect(() => {
    if (state.remainingSeconds === 0 && state.isRunning) {
      workerRef.current?.postMessage({ type: 'STOP' })
      sendNotification("Timer Complete", "Your timer has finished!")
      playNotificationSound()
      dispatch({ type: 'PAUSE' })
    }
  }, [state.remainingSeconds, state.isRunning, sendNotification, playNotificationSound])

  // Handle timer state changes
  useEffect(() => {
    if (workerRef.current) {
      if (state.isRunning) {
        workerRef.current.postMessage({ type: 'START' })
      } else {
        workerRef.current.postMessage({ type: 'STOP' })
      }
    }
  }, [state.isRunning])

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