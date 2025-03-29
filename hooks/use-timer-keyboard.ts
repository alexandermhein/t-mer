import { useEffect, useRef, useCallback } from 'react'

// Keyboard configuration
const KEYBOARD_CONFIG = {
  inputTimeout: 500,
  maxInputLength: 2,
  maxDecimalPlaces: 1,
} as const

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

type KeyboardAction = {
  key: string
  code: string
  preventDefault: () => void
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

  // Clear input timeout
  const clearInputTimeout = useCallback(() => {
    if (inputTimeoutRef.current) {
      clearTimeout(inputTimeoutRef.current)
      inputTimeoutRef.current = null
    }
  }, [])

  // Handle numeric input
  const handleNumericInput = useCallback((key: string) => {
    clearInputTimeout()
    setInputSequence((prev: string) => {
      // Don't allow leading zeros
      if (prev.length === 0 && key === '0') {
        return prev
      }

      // Handle decimal input
      if (prev.includes('.')) {
        const [whole, decimal] = prev.split('.')
        if (decimal.length < KEYBOARD_CONFIG.maxDecimalPlaces) {
          return prev + key
        }
      } 
      // Handle whole number input
      else if (prev.length < KEYBOARD_CONFIG.maxInputLength) {
        return prev + key
      }

      return prev
    })
  }, [clearInputTimeout, setInputSequence])

  // Handle decimal point input
  const handleDecimalInput = useCallback(() => {
    clearInputTimeout()
    setInputSequence((prev: string) => {
      if (prev.length === 0) {
        return '0.5'
      }
      if (!prev.includes('.') && prev.length > 0) {
        return prev + '.5'
      }
      return prev
    })
  }, [clearInputTimeout, setInputSequence])

  // Handle timer control
  const handleTimerControl = useCallback((action: KeyboardAction) => {
    action.preventDefault()
    clearInputTimeout()

    switch (action.code) {
      case 'Space':
        if (inputTimeoutRef.current) {
          applyInputSequence()
        }
        if (isRunning) {
          pauseTimer()
        } else {
          startTimer()
        }
        break

      case 'KeyR':
        setInputSequence("")
        setIsAnimating(false)
        resetTimer()
        break
    }
  }, [isRunning, clearInputTimeout, applyInputSequence, startTimer, pauseTimer, resetTimer, setInputSequence, setIsAnimating])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const action: KeyboardAction = {
        key: e.key,
        code: e.code,
        preventDefault: () => e.preventDefault(),
      }

      // Handle timer controls
      if (e.code === 'Space' || e.code === 'KeyR') {
        handleTimerControl(action)
        return
      }

      // Handle numeric input
      if (e.key >= '0' && e.key <= '9') {
        e.preventDefault()
        handleNumericInput(e.key)
        return
      }

      // Handle decimal input
      if (e.key === '.') {
        e.preventDefault()
        handleDecimalInput()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      clearInputTimeout()
    }
  }, [handleTimerControl, handleNumericInput, handleDecimalInput, clearInputTimeout])

  return inputTimeoutRef
} 