import { useState, useEffect, useRef, useCallback } from 'react'
import { useNotification } from '@/hooks/use-notification'
import { useAudio } from '@/hooks/use-audio'
import { TimerState, TimerControls } from '@/types/timer'

export function useTimer(initialSeconds: number): [TimerState, TimerControls] {
  const [state, setState] = useState<TimerState>({
    totalSeconds: initialSeconds,
    remainingSeconds: initialSeconds,
    isRunning: false,
    isPaused: false,
    showControls: true,
    inputSequence: "",
    isAnimating: false,
  })

  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const { sendNotification } = useNotification()
  const { playNotificationSound } = useAudio()

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
      const minutes = Number.parseInt(state.inputSequence, 10)
      const limitedMinutes = Math.min(minutes, 30)
      if (!isNaN(limitedMinutes) && limitedMinutes > 0) {
        const seconds = limitedMinutes * 60
        setState(prev => ({
          ...prev,
          totalSeconds: seconds,
          remainingSeconds: seconds,
          isRunning: false,
          isPaused: false,
          showControls: true,
          inputSequence: "",
          isAnimating: false,
        }))
      }
    }
  }, [state.inputSequence])

  // Timer logic
  useEffect(() => {
    if (state.isRunning) {
      intervalRef.current = setInterval(() => {
        setState(prev => {
          if (prev.remainingSeconds <= 1) {
            clearInterval(intervalRef.current as NodeJS.Timeout)
            sendNotification("Timer Complete", "Your timer has finished!")
            playNotificationSound()
            return {
              ...prev,
              remainingSeconds: 0,
              isRunning: false,
              showControls: true,
            }
          }
          return {
            ...prev,
            remainingSeconds: prev.remainingSeconds - 1,
          }
        })
      }, 1000)
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [state.isRunning, sendNotification, playNotificationSound])

  // Effect to handle input sequence changes
  useEffect(() => {
    if (state.inputSequence) {
      setState(prev => ({ ...prev, isAnimating: true }))
      const timeout = setTimeout(applyInputSequence, 500)
      return () => clearTimeout(timeout)
    }
  }, [state.inputSequence, applyInputSequence])

  const controls: TimerControls = {
    startTimer: () => setState(prev => ({ ...prev, isRunning: true, isPaused: false, showControls: false })),
    pauseTimer: () => setState(prev => ({ ...prev, isRunning: false, isPaused: true, showControls: true })),
    resetTimer: () => setState(prev => ({
      ...prev,
      isRunning: false,
      isPaused: false,
      remainingSeconds: prev.totalSeconds,
      showControls: true,
    })),
    handleSliderChange: (value: number[]) => {
      const newSeconds = Math.round(value[0] * 60)
      setState(prev => ({
        ...prev,
        totalSeconds: newSeconds,
        remainingSeconds: newSeconds,
      }))
    },
    setInputSequence: (value: string) => {
      setState(prev => ({ ...prev, inputSequence: value }))
    },
    setIsAnimating: (value: boolean) => {
      setState(prev => ({ ...prev, isAnimating: value }))
    },
  }

  return [state, controls]
} 