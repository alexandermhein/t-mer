"use client"

import { useEffect, useState, useRef, useCallback } from "react"
import { Slider } from "@/components/ui/slider"
import { motion, AnimatePresence } from "framer-motion"
import { useNotification } from "@/hooks/use-notification"
import { useAudio } from "@/hooks/use-audio"
import { formatTime } from "@/lib/utils"

interface TimerProps {
  initialSeconds?: number
}

export default function Timer({ initialSeconds = 300 }: TimerProps) {
  const [totalSeconds, setTotalSeconds] = useState(initialSeconds)
  const [remainingSeconds, setRemainingSeconds] = useState(initialSeconds)
  const [isRunning, setIsRunning] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [showControls, setShowControls] = useState(true)
  // Add state for number input sequence
  const [inputSequence, setInputSequence] = useState<string>("")
  const inputTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const { requestPermission, sendNotification } = useNotification()
  const { playNotificationSound } = useAudio()
  const [isAnimating, setIsAnimating] = useState(false)

  // Request notification permission on mount
  useEffect(() => {
    requestPermission()
  }, [requestPermission])

  // Apply the input sequence - made into a useCallback to avoid stale closures
  const applyInputSequence = useCallback(() => {
    if (inputSequence) {
      const minutes = Number.parseInt(inputSequence, 10)
      // Limit to 30 minutes maximum
      const limitedMinutes = Math.min(minutes, 30)
      if (!isNaN(limitedMinutes) && limitedMinutes > 0) {
        const seconds = limitedMinutes * 60
        setTotalSeconds(seconds)
        setRemainingSeconds(seconds)
        setIsRunning(false)
        setIsPaused(false)
        setShowControls(true)
      }
      setInputSequence("")
      setIsAnimating(false)
    }
  }, [inputSequence])

  // Timer logic
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setRemainingSeconds((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current as NodeJS.Timeout)
            setIsRunning(false)
            setShowControls(true)
            sendNotification("Timer Complete", "Your timer has finished!")

            // Play notification sound using Web Audio API
            playNotificationSound()

            return 0
          }
          return prev - 1
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
  }, [isRunning, sendNotification, playNotificationSound])

  // Effect to handle input sequence changes
  useEffect(() => {
    // When input sequence changes, set a timeout to apply it
    if (inputSequence) {
      setIsAnimating(true)

      if (inputTimeoutRef.current) {
        clearTimeout(inputTimeoutRef.current)
      }

      inputTimeoutRef.current = setTimeout(() => {
        applyInputSequence()
      }, 500)

      return () => {
        if (inputTimeoutRef.current) {
          clearTimeout(inputTimeoutRef.current)
        }
      }
    }
  }, [inputSequence, applyInputSequence])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault()
        // Clear any pending input sequence
        if (inputTimeoutRef.current) {
          clearTimeout(inputTimeoutRef.current)
          applyInputSequence()
        }

        if (isRunning) {
          setIsRunning(false)
          setIsPaused(true)
          setShowControls(true)
        } else {
          setIsRunning(true)
          setIsPaused(false)
          setShowControls(false)
        }
      } else if (e.code === "KeyR") {
        e.preventDefault()
        // Clear any pending input sequence
        if (inputTimeoutRef.current) {
          clearTimeout(inputTimeoutRef.current)
          setInputSequence("")
          setIsAnimating(false)
        }

        // Always reset the timer to its current setting when 'R' is pressed
        resetTimer()
      } else if (e.key >= "0" && e.key <= "9") {
        // Handle numeric input
        e.preventDefault()

        // Clear any existing timeout
        if (inputTimeoutRef.current) {
          clearTimeout(inputTimeoutRef.current)
        }

        // Update the input sequence
        setInputSequence((prev) => {
          // Limit to 2 digits (30 minutes max)
          if (prev.length < 2) {
            return prev + e.key
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
  }, [isRunning, isPaused, applyInputSequence])

  const startTimer = () => {
    setIsRunning(true)
    setIsPaused(false)
    setShowControls(false)
  }

  const pauseTimer = () => {
    setIsRunning(false)
    setIsPaused(true)
    setShowControls(true)
  }

  const resetTimer = () => {
    setIsRunning(false)
    setIsPaused(false)
    setRemainingSeconds(totalSeconds)
    setShowControls(true)
  }

  const handleSliderChange = (value: number[]) => {
    const newSeconds = Math.round(value[0] * 60)
    setTotalSeconds(newSeconds)
    setRemainingSeconds(newSeconds)
  }

  // Calculate slider value (0-30 minutes)
  const sliderValue = [totalSeconds / 60]

  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* Background timer display - positioned at bottom when not running with line height equal to font size */}
      <motion.div
        className={`absolute w-full text-center text-[25vw] font-bold text-gray-200 select-none leading-none ${
          !isRunning ? "bottom-0 mb-0" : "flex items-center justify-center"
        }`}
        key={remainingSeconds}
        initial={{ opacity: 0.8, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {formatTime(remainingSeconds)}
      </motion.div>

      {/* Controls overlay */}
      <AnimatePresence>
        {showControls && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute z-10 bg-white rounded-2xl shadow-lg p-8 w-full max-w-md mx-auto"
          >
            <div className="text-center mb-8">
              <div className="relative inline-block overflow-hidden rounded-full">
                <motion.div
                  className="absolute inset-0 bg-timer-purple origin-left"
                  initial={{ scaleX: 0 }}
                  animate={{
                    scaleX: isAnimating ? 1 : 0,
                  }}
                  exit={{ scale: 0 }}
                  transition={{ duration: 0.5, ease: "linear" }}
                />
                <motion.div
                  className="relative inline-block px-4 py-2 text-gray-800 text-sm z-10"
                  animate={{
                    color: isAnimating ? "#ffffff" : "#1f2937",
                    backgroundColor: isAnimating ? "transparent" : "#f3f4f6",
                  }}
                  transition={{ duration: 0.5 }}
                >
                  {inputSequence ? `${inputSequence.padStart(2, "0")}:00` : formatTime(totalSeconds)} min
                </motion.div>
              </div>
            </div>

            <div className="mb-10">
              <style jsx global>{`
                .slider-custom .slider-track {
                  height: 4px;
                  background-color: #e9eaeb;
                }
                .slider-custom .slider-range {
                  background-color: #c732b3;
                }
                .slider-custom .slider-thumb {
                  width: 20px;
                  height: 20px;
                  background-color: white;
                  border: 2px solid #c732b3;
                }
              `}</style>
              <div className="slider-custom">
                <Slider
                  value={sliderValue}
                  min={0}
                  max={30}
                  step={0.5}
                  onValueChange={handleSliderChange}
                  className="w-full"
                />
              </div>
            </div>

            <div className="space-y-6 text-center">
              <h3 className="text-gray-700 font-medium">How it works</h3>

              <div className="text-gray-500 text-sm space-y-4">
                <div>
                  Use <span className="bg-gray-100 px-2 py-1 rounded">1-9</span> keys to set the timer duration.
                </div>
                <div>
                  Press <span className="bg-gray-100 px-2 py-1 rounded">Space</span> to start/stop the timer.
                </div>
                <div>
                  Press <span className="bg-gray-100 px-2 py-1 rounded">R</span> to reset the timer.
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating action buttons (only visible when timer is running) */}
      <AnimatePresence>
        {!showControls && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-10 flex space-x-4"
          >
            <button
              onClick={pauseTimer}
              className="bg-white p-4 rounded-full shadow-lg hover:bg-gray-50 transition-colors"
              aria-label="Pause timer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="6" y="4" width="4" height="16"></rect>
                <rect x="14" y="4" width="4" height="16"></rect>
              </svg>
            </button>
            <button
              onClick={resetTimer}
              className="bg-white p-4 rounded-full shadow-lg hover:bg-gray-50 transition-colors"
              aria-label="Reset timer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 2v6h6"></path>
                <path d="M21 12A9 9 0 0 0 6 5.3L3 8"></path>
                <path d="M21 22v-6h-6"></path>
                <path d="M3 12a9 9 0 0 0 15 6.7l3-2.7"></path>
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

