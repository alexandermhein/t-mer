"use client"

import { useEffect, useState, useCallback, useMemo } from "react"

interface Particle {
  id: number
  x: number
  y: number
  size: number
  opacity: number
  color: string
  velocity: { x: number; y: number }
  life: number
  rotation: number
  rotationSpeed: number
  scale: number
}

// Pre-define colors for better performance
const COLORS = [
  "rgba(199, 50, 179, 1)",    // #C732B3 at full opacity
  "rgba(199, 50, 179, 0.8)",  // #C732B3 at 80% opacity
  "rgba(199, 50, 179, 0.6)",  // #C732B3 at 60% opacity
]

// Animation constants
const ANIMATION_CONSTANTS = {
  minTimeBetweenParticles: 8,
  lifeFadeRate: 0.011,
  velocityDecay: 0.98,
  frameInterval: 16, // ~60fps
}

export default function MouseTrail() {
  const [particles, setParticles] = useState<Particle[]>([])
  const [particleId, setParticleId] = useState(0)

  // Add custom cursor style only once on mount
  useEffect(() => {
    const style = document.createElement('style')
    style.textContent = `
      * {
        cursor: none !important;
      }
      body {
        cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8' viewBox='0 0 8 8'%3E%3Ccircle cx='4' cy='4' r='4' fill='%23C732B3'/%3E%3C/svg%3E") 4 4, auto !important;
      }
    `
    document.head.appendChild(style)

    return () => {
      document.head.removeChild(style)
    }
  }, [])

  // Create a new particle with random properties
  const createParticle = useCallback((x: number, y: number): Particle => {
    const angle = Math.random() * Math.PI * 2
    const speed = Math.random() * 0.2 + 0.1
    
    return {
      id: particleId,
      x,
      y,
      size: Math.random() * 6 + 4,
      opacity: 1,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      velocity: {
        x: Math.cos(angle) * speed,
        y: Math.sin(angle) * speed
      },
      life: 1,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 10,
      scale: 1
    }
  }, [particleId])

  // Handle mouse movement and particle creation
  useEffect(() => {
    let lastTime = 0
    const { minTimeBetweenParticles } = ANIMATION_CONSTANTS

    const handleMouseMove = (e: MouseEvent) => {
      const currentTime = performance.now()
      
      // Only create particles at specified intervals for performance
      if (currentTime - lastTime >= minTimeBetweenParticles) {
        const newParticle = createParticle(e.clientX, e.clientY)
        
        setParticles(prev => [...prev, newParticle])
        setParticleId(prev => prev + 1)
        lastTime = currentTime
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [createParticle])

  // Update particle positions and properties in animation loop
  useEffect(() => {
    const { lifeFadeRate, velocityDecay, frameInterval } = ANIMATION_CONSTANTS
    
    const interval = setInterval(() => {
      setParticles(prev => {
        // Skip update if no particles exist
        if (prev.length === 0) return prev
        
        return prev
          .map(particle => {
            const newLife = particle.life - lifeFadeRate
            const newScale = 0.5 + newLife * 0.5
            
            return {
              ...particle,
              x: particle.x + particle.velocity.x,
              y: particle.y + particle.velocity.y,
              opacity: newLife,
              life: newLife,
              rotation: particle.rotation + particle.rotationSpeed,
              scale: newScale,
              velocity: {
                x: particle.velocity.x * velocityDecay,
                y: particle.velocity.y * velocityDecay
              }
            }
          })
          .filter(particle => particle.life > 0)
      })
    }, frameInterval)

    return () => clearInterval(interval)
  }, [])

  // Memoize particle rendering to prevent unnecessary re-renders
  const particleElements = useMemo(() => {
    return particles.map(particle => (
      <div
        key={particle.id}
        className="absolute rounded-full"
        style={{
          left: particle.x - particle.size / 2,
          top: particle.y - particle.size / 2,
          width: particle.size,
          height: particle.size,
          opacity: particle.opacity,
          backgroundColor: particle.color,
          boxShadow: `0 0 ${particle.size * 3}px ${particle.color}`,
          transform: `rotate(${particle.rotation}deg) scale(${particle.scale})`,
          willChange: "transform, opacity"
        }}
      />
    ))
  }, [particles])

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {particleElements}
    </div>
  )
} 