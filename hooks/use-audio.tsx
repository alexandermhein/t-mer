"use client"

import { useRef, useCallback, useEffect } from "react"

// Constants for sound configuration
const SOUND_CONFIG = {
  frequencies: [880, 1108.73, 1318.51, 1760], // A5, C#6, E6, A6
  volume: 0.4,
  attackTime: 0.05,
  releaseTime: 0.5,
  noteDelay: 0.1,
} as const

export function useAudio() {
  const audioContextRef = useRef<AudioContext | null>(null)
  const activeNodesRef = useRef<Set<AudioNode>>(new Set())

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

  // Cleanup function to stop and disconnect all active nodes
  const cleanup = useCallback(() => {
    activeNodesRef.current.forEach(node => {
      if (node instanceof OscillatorNode) {
        node.stop()
      }
      node.disconnect()
    })
    activeNodesRef.current.clear()
  }, [])

  // Cleanup on unmount
  useEffect(() => {
    return cleanup
  }, [cleanup])

  // Play a notification sound using Web Audio API
  const playNotificationSound = useCallback(() => {
    const audioContext = getAudioContext()
    if (!audioContext) return

    try {
      // Create a gain node for volume control
      const gainNode = audioContext.createGain()
      gainNode.gain.value = SOUND_CONFIG.volume
      gainNode.connect(audioContext.destination)
      activeNodesRef.current.add(gainNode)

      const now = audioContext.currentTime

      SOUND_CONFIG.frequencies.forEach((freq, index) => {
        const oscillator = audioContext.createOscillator()
        const noteGain = audioContext.createGain()
        
        oscillator.type = "sine"
        oscillator.frequency.value = freq
        
        // Create a gentle attack and release
        const noteStart = now + index * SOUND_CONFIG.noteDelay
        noteGain.gain.setValueAtTime(0, noteStart)
        noteGain.gain.linearRampToValueAtTime(0.6, noteStart + SOUND_CONFIG.attackTime)
        noteGain.gain.exponentialRampToValueAtTime(0.01, noteStart + SOUND_CONFIG.releaseTime)
        
        oscillator.connect(noteGain)
        noteGain.connect(gainNode)
        
        // Add nodes to active set for cleanup
        activeNodesRef.current.add(oscillator)
        activeNodesRef.current.add(noteGain)
        
        // Start and stop the oscillator
        oscillator.start(noteStart)
        oscillator.stop(noteStart + SOUND_CONFIG.releaseTime)

        // Cleanup individual note nodes after they finish
        setTimeout(() => {
          oscillator.disconnect()
          noteGain.disconnect()
          activeNodesRef.current.delete(oscillator)
          activeNodesRef.current.delete(noteGain)
        }, (noteStart + SOUND_CONFIG.releaseTime) * 1000)
      })
    } catch (error) {
      console.error("Error playing notification sound:", error)
      cleanup()
    }
  }, [getAudioContext, cleanup])

  return { playNotificationSound }
}

