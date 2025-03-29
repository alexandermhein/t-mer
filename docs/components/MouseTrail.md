# MouseTrail Component

## Overview
The MouseTrail component creates an interactive particle trail effect that follows the mouse cursor, providing a visually engaging experience. It implements custom cursor styling and particle physics for smooth animations.

## Technical Details
- **Location**: `components/mouse-trail.tsx`
- **Type**: Client Component (uses "use client" directive)
- **Dependencies**:
  - React hooks (useState, useEffect, useCallback)
  - Custom particle physics

## Component Structure

### Props
None - This is a self-contained component that manages its own state and effects.

### State Management
```typescript
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

const [particles, setParticles] = useState<Particle[]>([])
const [particleId, setParticleId] = useState(0)
```

## Business Logic

### Custom Cursor Implementation
1. **Cursor Style Injection**
   ```typescript
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
   ```

### Particle Creation
1. **Particle Generation**
   ```typescript
   const createParticle = useCallback((x: number, y: number) => {
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
   ```

### Mouse Movement Handling
1. **Event Listener Setup**
   ```typescript
   useEffect(() => {
     let lastTime = 0
     const minTimeBetweenParticles = 8

     const handleMouseMove = (e: MouseEvent) => {
       const currentTime = performance.now()
       
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
   ```

### Particle Animation
1. **Update Loop**
   ```typescript
   useEffect(() => {
     const interval = setInterval(() => {
       setParticles(prev => {
         const updatedParticles = prev.map(particle => {
           const newLife = particle.life - 0.011
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
               x: particle.velocity.x * 0.98,
               y: particle.velocity.y * 0.98
             }
           }
         })
         return updatedParticles.filter(particle => particle.life > 0)
       })
     }, 16)

     return () => clearInterval(interval)
   }, [])
   ```

## Styling

### Container Styles
```css
.fixed inset-0 pointer-events-none z-50
```
- Fixed positioning
- Full viewport coverage
- No pointer events
- High z-index

### Particle Styles
```css
.absolute rounded-full
```
- Absolute positioning
- Circular shape
- Dynamic positioning and sizing
- Box shadow for glow effect

### Color Scheme
```typescript
const COLORS = [
  "rgba(199, 50, 179, 1)",    // #C732B3 at full opacity
  "rgba(199, 50, 179, 0.8)",  // #C732B3 at 80% opacity
  "rgba(199, 50, 179, 0.6)",  // #C732B3 at 60% opacity
]
```

## Usage Examples

### Basic Usage
```tsx
<MouseTrail />
```

## Animation States

### Particle Lifecycle
1. **Creation**
   - Random position
   - Full opacity
   - Initial velocity
   - Random rotation

2. **Movement**
   - Velocity-based movement
   - Gradual slowdown
   - Rotation animation
   - Scale reduction

3. **Fade Out**
   - Decreasing opacity
   - Decreasing scale
   - Life reduction
   - Removal when life reaches 0

## Performance Considerations
1. **Optimization Techniques**
   - RequestAnimationFrame timing
   - Particle limit management
   - Efficient state updates
   - CSS transform usage

2. **Resource Management**
   - Proper cleanup of event listeners
   - Interval clearing
   - Memory management
   - DOM manipulation optimization

## Accessibility
- Non-interfering with user interaction
- Visual enhancement only
- No impact on screen readers
- Maintains cursor functionality

## Testing Considerations
1. **Performance Testing**
   - Frame rate monitoring
   - Memory usage
   - CPU utilization
   - Animation smoothness

2. **Visual Testing**
   - Particle appearance
   - Trail smoothness
   - Color consistency
   - Animation timing

3. **Browser Compatibility**
   - Custom cursor support
   - CSS transform support
   - Animation performance
   - Event handling

4. **Edge Cases**
   - Rapid mouse movement
   - Multiple displays
   - High DPI screens
   - Touch devices

5. **Resource Cleanup**
   - Event listener removal
   - Interval clearing
   - Style cleanup
   - Memory leak prevention 