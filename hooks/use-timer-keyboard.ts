import { useEffect, useRef } from 'react'

interface UseTimerKeyboardProps {
  isRunning: boolean
  isPaused: boolean
  inputSequence: string
  applyInputSequence: () => void
  startTimer: () => void
  pauseTimer: () => void
  resetTimer: () => void
  setInputSequence: (value: string | ((prev: string) => string)) => void
  setIsAnimating: (value: boolean) => void
}

export function useTimerKeyboard({
  isRunning,
  isPaused,
  inputSequence,
  applyInputSequence,
  startTimer,
  pauseTimer,
  resetTimer,
  setInputSequence,
  setIsAnimating,
}: UseTimerKeyboardProps) {
  const inputTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault()
        if (inputTimeoutRef.current) {
          clearTimeout(inputTimeoutRef.current)
          applyInputSequence()
        }

        if (isRunning) {
          pauseTimer()
        } else if (isPaused) {
          startTimer()
        } else {
          startTimer()
        }
      } else if (e.code === "KeyR") {
        e.preventDefault()
        if (inputTimeoutRef.current) {
          clearTimeout(inputTimeoutRef.current)
          setInputSequence("")
          setIsAnimating(false)
        }
        resetTimer()
      } else if (e.key >= "0" && e.key <= "9") {
        e.preventDefault()
        if (inputTimeoutRef.current) {
          clearTimeout(inputTimeoutRef.current)
        }
        setInputSequence((prev: string) => {
          if (prev.length === 0 && e.key === '0') {
            return prev
          }
          if (prev.includes('.')) {
            if (prev.split('.')[1]?.length < 1) {
              return prev + e.key
            }
          } else if (prev.length < 2) {
            return prev + e.key
          }
          return prev
        })
      } else if (e.key === '.') {
        e.preventDefault()
        if (inputTimeoutRef.current) {
          clearTimeout(inputTimeoutRef.current)
        }
        setInputSequence((prev: string) => {
          if (prev.length === 0) {
            return '0.5'
          }
          if (!prev.includes('.') && prev.length > 0) {
            return prev + '.5'
          }
          return prev
        })
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      if (inputTimeoutRef.current) {
        clearTimeout(inputTimeoutRef.current)
      }
    }
  }, [isRunning, isPaused, inputSequence, applyInputSequence, startTimer, pauseTimer, resetTimer, setInputSequence, setIsAnimating])

  return inputTimeoutRef
} 