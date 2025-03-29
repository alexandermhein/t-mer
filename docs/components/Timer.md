# Timer Component

## Overview
The Timer component is the core component of the timer application, managing the timer state, animations, and coordinating between the display and control components. It implements the main timer functionality and handles user interactions.

## Technical Details
- **Location**: `components/timer.tsx`
- **Type**: Client Component (uses "use client" directive)
- **Dependencies**:
  - Framer Motion for animations
  - Custom hooks (useTimer, useTimerKeyboard)
  - TimerDisplay component
  - TimerControls component

## Component Structure

### Props
```typescript
interface TimerProps {
  initialSeconds?: number;  // Default: 300 (5 minutes)
  autoStart?: boolean;      // Default: false
}
```

### State Management
- Uses custom `useTimer` hook for timer state
- Manages finished state internally
- Controls animation states
- Handles input sequence state

## Business Logic

### Timer State Management
1. **Initialization**
   ```typescript
   const [state, controls] = useTimer(initialSeconds)
   const [isFinished, setIsFinished] = useState(false)
   ```

2. **Auto-start Logic**
   ```typescript
   useEffect(() => {
     if (autoStart && !state.isRunning && !state.isPaused) {
       controls.startTimer()
     }
   }, [autoStart])
   ```

3. **Finished State Management**
   ```typescript
   useEffect(() => {
     if (state.remainingSeconds === 0 && !state.isRunning) {
       setIsFinished(true)
     }
   }, [state.remainingSeconds, state.isRunning])
   ```

4. **Keyboard Interaction**
   - Implements keyboard shortcuts through useTimerKeyboard hook
   - Handles numeric input for duration setting
   - Manages start/stop and reset functionality

### Animation States
- Controls visibility of TimerControls
- Manages display animations
- Handles transition effects

## Styling

### Layout
```css
.relative w-full h-screen flex items-center justify-center overflow-hidden
```
- Full-screen container
- Centered content
- Hidden overflow
- Relative positioning for absolute children

### Component Structure
```tsx
<div className="relative w-full h-screen flex items-center justify-center overflow-hidden">
  <TimerDisplay
    remainingSeconds={state.remainingSeconds}
    isRunning={state.isRunning}
    totalSeconds={state.totalSeconds}
    showControls={state.showControls}
    isFinished={isFinished}
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
```

## Usage Examples

### Basic Usage
```tsx
// Default 5-minute timer
<Timer />

// Custom duration timer
<Timer initialSeconds={600} />

// Auto-starting timer
<Timer initialSeconds={300} autoStart={true} />
```

## Keyboard Controls
- Space: Start/Stop timer
- R: Reset timer
- 1-9: Set duration (in minutes)
- Enter: Apply duration input

## Integration
- Works with TimerWrapper for URL parameter handling
- Coordinates with TimerDisplay for time visualization
- Manages TimerControls visibility and state
- Integrates with custom hooks for state management

## Performance Considerations
- Uses AnimatePresence for efficient animation handling
- Implements proper cleanup in useEffect hooks
- Manages state updates efficiently
- Optimizes re-renders through proper state management

## Accessibility
- Keyboard navigation support
- Screen reader compatibility through semantic HTML
- Focus management
- ARIA attributes (handled by child components)

## Error Handling
- Graceful handling of invalid inputs
- State recovery on errors
- Proper cleanup of event listeners

## Testing Considerations
1. Timer functionality
   - Start/Stop behavior
   - Reset functionality
   - Duration setting
   - Auto-start feature

2. State management
   - Timer state transitions
   - Finished state handling
   - Input sequence management

3. Keyboard interactions
   - All keyboard shortcuts
   - Input validation
   - State updates

4. Animation states
   - Control visibility
   - Display transitions
   - Performance impact

5. Integration tests
   - Component communication
   - State propagation
   - Event handling 