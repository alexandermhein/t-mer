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
      gainNode.gain.value = 0.4 // Increased from 0.2 to 0.4 (40% volume)
      gainNode.connect(audioContext.destination)

      // Create a more pleasant chime-like sound
      const frequencies = [880, 1108.73, 1318.51, 1760] // A5, C#6, E6, A6
      const now = audioContext.currentTime

      frequencies.forEach((freq, index) => {
        const oscillator = audioContext.createOscillator()
        const noteGain = audioContext.createGain()
        
        oscillator.type = "sine"
        oscillator.frequency.value = freq
        
        // Create a gentle attack and release
        noteGain.gain.setValueAtTime(0, now + index * 0.1)
        noteGain.gain.linearRampToValueAtTime(0.6, now + index * 0.1 + 0.05) // Increased from 0.3 to 0.6
        noteGain.gain.exponentialRampToValueAtTime(0.01, now + index * 0.1 + 0.5)
        
        oscillator.connect(noteGain)
        noteGain.connect(gainNode)
        
        oscillator.start(now + index * 0.1)
        oscillator.stop(now + index * 0.1 + 0.5)
      })
    } catch (error) {
      console.error("Error playing notification sound:", error)
    }
  }, [getAudioContext])

  return { playNotificationSound }
}

