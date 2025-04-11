"use client"

import { AnimatePresence } from "framer-motion"
import { TimerDisplay } from "./timer-display"
import { TimerControls } from "./timer-controls"
import { useTimer } from "@/hooks/use-timer"
import { useTimerKeyboard } from "@/hooks/use-timer-keyboard"
import { TimerProps } from "@/types/timer"
import { useEffect, useState, useCallback } from "react"

export default function Timer({ initialSeconds = 300, autoStart = false }: TimerProps) {
  const [state, controls] = useTimer(initialSeconds)
  const [isFinished, setIsFinished] = useState(false)

  // Handle timer input sequence application
  const handleApplyInputSequence = useCallback(() => {
    if (!state.inputSequence) return
    
    const minutes = Number.parseInt(state.inputSequence, 10)
    const limitedMinutes = Math.min(minutes, 30)
    
    if (!isNaN(limitedMinutes) && limitedMinutes > 0) {
      controls.handleSliderChange([limitedMinutes])
    }
  }, [state.inputSequence, controls])

  // Handle input sequence changes with support for function updates
  const handleSetInputSequence = useCallback((value: string | ((prev: string) => string)) => {
    if (typeof value === 'function') {
      const newValue = value(state.inputSequence)
      controls.setInputSequence(newValue)
    } else {
      controls.setInputSequence(value)
    }
  }, [state.inputSequence, controls])

  // Auto-start timer if autoStart prop is true
  useEffect(() => {
    if (autoStart && !state.isRunning && !state.isPaused) {
      controls.startTimer()
    }
  }, [autoStart, state.isRunning, state.isPaused, controls])

  // Reset finished state when any key is pressed
  useEffect(() => {
    const handleKeyPress = () => {
      if (isFinished) {
        setIsFinished(false)
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [isFinished])

  // Set finished state when timer reaches zero
  useEffect(() => {
    if (state.remainingSeconds === 0 && !state.isRunning) {
      setIsFinished(true)
    }
  }, [state.remainingSeconds, state.isRunning])

  // Setup keyboard controls
  useTimerKeyboard({
    isRunning: state.isRunning,
    isPaused: state.isPaused,
    inputSequence: state.inputSequence,
    applyInputSequence: handleApplyInputSequence,
    startTimer: controls.startTimer,
    pauseTimer: controls.pauseTimer,
    resetTimer: controls.resetTimer,
    setInputSequence: handleSetInputSequence,
    setIsAnimating: controls.setIsAnimating,
  })

  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      <TimerDisplay
        remainingSeconds={state.remainingSeconds}
        isRunning={state.isRunning}
        totalSeconds={state.totalSeconds}
        showControls={state.showControls}
        isFinished={isFinished}
      />

      <AnimatePresence>
        {state.showControls && (
          <TimerControls
            showControls={state.showControls}
            totalSeconds={state.totalSeconds}
            inputSequence={state.inputSequence}
            isAnimating={state.isAnimating}
            onSliderChange={controls.handleSliderChange}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

