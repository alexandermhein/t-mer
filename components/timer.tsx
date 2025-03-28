"use client"

import { AnimatePresence } from "framer-motion"
import { TimerDisplay } from "./timer-display"
import { TimerControls } from "./timer-controls"
import { useTimer } from "@/hooks/use-timer"
import { useTimerKeyboard } from "@/hooks/use-timer-keyboard"
import { TimerProps } from "@/types/timer"

export default function Timer({ initialSeconds = 300 }: TimerProps) {
  const [state, controls] = useTimer(initialSeconds)

  useTimerKeyboard({
    isRunning: state.isRunning,
    isPaused: state.isPaused,
    inputSequence: state.inputSequence,
    applyInputSequence: () => {
      if (state.inputSequence) {
        const minutes = Number.parseInt(state.inputSequence, 10)
        const limitedMinutes = Math.min(minutes, 30)
        if (!isNaN(limitedMinutes) && limitedMinutes > 0) {
          const seconds = limitedMinutes * 60
          controls.handleSliderChange([limitedMinutes])
        }
      }
    },
    startTimer: controls.startTimer,
    pauseTimer: controls.pauseTimer,
    resetTimer: controls.resetTimer,
    setInputSequence: (value) => {
      if (typeof value === 'function') {
        const newValue = value(state.inputSequence)
        controls.setInputSequence(newValue)
      } else {
        controls.setInputSequence(value)
      }
    },
    setIsAnimating: (value) => {
      controls.setIsAnimating(value)
    },
  })

  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      <TimerDisplay
        remainingSeconds={state.remainingSeconds}
        isRunning={state.isRunning}
        totalSeconds={state.totalSeconds}
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

