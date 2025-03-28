"use client"

import { useRef, useCallback } from "react"

export function useAudio() {
  const audioContextRef = useRef<AudioContext | null>(null)

  // Initialize or get AudioContext
  const getAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      try {
        // Use the standard AudioContext or the webkit prefix for Safari
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext
        if (AudioContextClass) {
          audioContextRef.current = new AudioContextClass()
        }
      } catch (error) {
        console.error("Web Audio API is not supported in this browser:", error)
      }
    }
    return audioContextRef.current
  }, [])

  // Play a notification sound using Web Audio API
  const playNotificationSound = useCallback(() => {
    const audioContext = getAudioContext()
    if (!audioContext) return

    try {
      // Create a gain node for volume control
      const gainNode = audioContext.createGain()
      gainNode.gain.value = 0.3 // Set volume to 30%
      gainNode.connect(audioContext.destination)

      // First beep
      const oscillator1 = audioContext.createOscillator()
      oscillator1.type = "sine"
      oscillator1.frequency.value = 830 // Hz
      oscillator1.connect(gainNode)

      // Start and stop the first beep
      const now = audioContext.currentTime
      oscillator1.start(now)
      oscillator1.stop(now + 0.2)

      // Second beep (higher pitch)
      const oscillator2 = audioContext.createOscillator()
      oscillator2.type = "sine"
      oscillator2.frequency.value = 1080 // Hz
      oscillator2.connect(gainNode)

      // Start and stop the second beep after a short delay
      oscillator2.start(now + 0.3)
      oscillator2.stop(now + 0.5)
    } catch (error) {
      console.error("Error playing notification sound:", error)
    }
  }, [getAudioContext])

  return { playNotificationSound }
}

