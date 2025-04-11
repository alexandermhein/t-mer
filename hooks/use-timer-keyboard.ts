import { useEffect, useRef, useCallback } from 'react'

// Keyboard configuration constants
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
  const isWindowActiveRef = useRef(typeof document !== 'undefined' ? !document.hidden : true)

  // Clear any existing input timeout
  const clearInputTimeout = useCallback(() => {
    if (inputTimeoutRef.current) {
      clearTimeout(inputTimeoutRef.current)
      inputTimeoutRef.current = null
    }
  }, [])

  // Handle numeric input (0-9)
  const handleNumericInput = useCallback((key: string) => {
    clearInputTimeout()
    setInputSequence((prev: string) => {
      // Don't allow leading zeros
      if (prev.length === 0 && key === '0') {
        return prev
      }

      // Handle decimal input
      if (prev.includes('.')) {
        const [, decimal] = prev.split('.')
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

  // Handle timer control (space/r keys)
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
  }, [
    isRunning,
    clearInputTimeout,
    applyInputSequence,
    startTimer,
    pauseTimer,
    resetTimer,
    setInputSequence,
    setIsAnimating
  ])

  // Handle all key events
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    // Skip processing if window is not active
    if (!isWindowActiveRef.current) {
      return
    }

    const action: KeyboardAction = {
      key: e.key,
      code: e.code,
      preventDefault: () => e.preventDefault(),
    }

    // Handle timer controls (space/r)
    if (e.code === 'Space' || e.code === 'KeyR') {
      handleTimerControl(action)
      return
    }

    // Handle numeric input (0-9)
    if (e.key >= '0' && e.key <= '9') {
      e.preventDefault()
      handleNumericInput(e.key)
      return
    }

    // Handle decimal input (.)
    if (e.key === '.') {
      e.preventDefault()
      handleDecimalInput()
    }
  }, [handleTimerControl, handleNumericInput, handleDecimalInput])

  // Track window/document visibility
  useEffect(() => {
    const handleVisibilityChange = () => {
      isWindowActiveRef.current = !document.hidden
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])

  // Set up keyboard event handlers
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown)
    
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      clearInputTimeout()
    }
  }, [handleKeyDown, clearInputTimeout])

  return inputTimeoutRef
} 