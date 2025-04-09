# TimerDisplay Component

## Overview
The TimerDisplay component is responsible for visualizing the timer state, showing either the remaining time or the "FINISHED" message. It implements smooth animations and transitions for state changes.

## Technical Details
- **Location**: `components/timer-display.tsx`
- **Type**: Client Component
- **Dependencies**:
  - Framer Motion for animations
  - Utility functions for time formatting

## Component Structure

### Props
```typescript
interface TimerDisplayProps {
  remainingSeconds: number;  // Current time remaining
  isRunning: boolean;        // Timer running state
  totalSeconds: number;      // Total timer duration
  showControls: boolean;     // Controls visibility state
  isFinished: boolean;       // Timer completion state
}
```

### State Management
- No internal state
- Relies on props for all state management

## Business Logic

### Time Display
1. **Time Formatting**
   - Uses utility function for consistent time display
   - Supports minutes and seconds format
   - Handles zero-padding for consistent display

2. **State-based Display**
   ```typescript
   {isFinished ? "FINISHED" : formatTime(remainingSeconds)}
   ```

### Animation Logic
1. **Initial Animation**
   ```typescript
   initial={{ opacity: 0.5, scale: 0.9 }}
   ```

2. **Running State Animation**
   ```typescript
   animate={{ 
     opacity: isRunning ? 1 : 0.5,
     scale: 1 
   }}
   ```

3. **Transition Configuration**
   ```typescript
   transition={{ duration: 0.3 }}
   ```

## Styling

### Base Styles
```css
.absolute w-full text-center text-[25vw] font-bold text-gray-200 select-none leading-none bottom-0 mb-0 tabular-nums
```
- Absolute positioning
- Full width
- Centered text
- Responsive font size (25vw)
- Bold font weight
- Light gray text color
- Non-selectable text
- Monospace numbers
- Bottom alignment
- No bottom margin

### Animation Styles
- Smooth opacity transitions
- Scale animations
- State-based styling changes

## Usage Examples

### Basic Usage
```tsx
<TimerDisplay
  remainingSeconds={300}
  isRunning={true}
  totalSeconds={300}
  showControls={true}
  isFinished={false}
/>
```

### Finished State
```tsx
<TimerDisplay
  remainingSeconds={0}
  isRunning={false}
  totalSeconds={300}
  showControls={true}
  isFinished={true}
/>
```

## Animation States

### Running State
- Full opacity (1)
- Full scale (1)
- Smooth transition

### Paused State
- Reduced opacity (0.5)
- Full scale (1)
- Smooth transition

### Finished State
- "FINISHED" text display
- Maintains animation properties
- Clear visual indication

## Integration
- Receives state from parent Timer component
- Works with Framer Motion for animations
- Integrates with time formatting utilities
- Responds to parent state changes

## Performance Considerations
- Uses CSS transforms for animations
- Implements willChange property
- Optimizes re-renders
- Efficient animation handling

## Accessibility
- High contrast text
- Clear visual hierarchy
- Readable font size
- Non-interactive element

## Testing Considerations
1. Display States
   - Running state
   - Paused state
   - Finished state
   - Zero time state

2. Animation States
   - Transition timing
   - Scale changes
   - Opacity changes
   - State transitions

3. Time Formatting
   - Various time values
   - Edge cases
   - Zero padding
   - Format consistency

4. Responsive Behavior
   - Different screen sizes
   - Font scaling
   - Layout adaptation

5. Visual Testing
   - Color contrast
   - Text readability
   - Animation smoothness
   - State clarity 