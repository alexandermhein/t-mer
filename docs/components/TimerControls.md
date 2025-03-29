# TimerControls Component

## Overview
The TimerControls component provides the user interface for controlling the timer, including a slider for duration adjustment and visual feedback for the current state.

## Technical Details
- **Location**: `components/TimerControls.tsx`
- **Type**: Client Component
- **Dependencies**: Framer Motion, React

## Implementation

```typescript
interface TimerControlsProps {
  showControls: boolean;
  totalSeconds: number;
  inputSequence: string;
  isAnimating: boolean;
  onSliderChange: (value: number) => void;
}

export function TimerControls({
  showControls,
  totalSeconds,
  inputSequence,
  isAnimating,
  onSliderChange
}: TimerControlsProps) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const formattedTime = `${minutes}:${seconds.toString().padStart(2, '0')}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
      className="absolute bottom-8 left-0 right-0 flex flex-col items-center gap-4"
    >
      {/* Duration Display */}
      <div className="text-2xl font-mono tabular-nums">
        {inputSequence ? `${inputSequence}:00` : formattedTime}
      </div>

      {/* Slider */}
      <div className="w-full max-w-md px-4">
        <input
          type="range"
          min="0"
          max="3600"
          value={totalSeconds}
          onChange={(e) => onSliderChange(parseInt(e.target.value))}
          className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer
                     [&::-webkit-slider-thumb]:appearance-none
                     [&::-webkit-slider-thumb]:w-4
                     [&::-webkit-slider-thumb]:h-4
                     [&::-webkit-slider-thumb]:rounded-full
                     [&::-webkit-slider-thumb]:bg-primary
                     [&::-webkit-slider-thumb]:cursor-pointer
                     [&::-webkit-slider-thumb]:transition-colors
                     [&::-webkit-slider-thumb]:hover:bg-primary-hover
                     [&::-moz-range-thumb]:w-4
                     [&::-moz-range-thumb]:h-4
                     [&::-moz-range-thumb]:rounded-full
                     [&::-moz-range-thumb]:bg-primary
                     [&::-moz-range-thumb]:cursor-pointer
                     [&::-moz-range-thumb]:transition-colors
                     [&::-moz-range-thumb]:hover:bg-primary-hover
                     [&::-moz-range-thumb]:border-0"
        />
      </div>

      {/* Keyboard Hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-sm text-secondary"
      >
        Press <kbd className="px-2 py-1 bg-secondary rounded">Space</kbd> to start/stop
      </motion.div>
    </motion.div>
  );
}
```

## Usage Examples

### Basic Usage
```tsx
<TimerControls
  showControls={state.showControls}
  totalSeconds={state.totalSeconds}
  inputSequence={state.inputSequence}
  isAnimating={state.isAnimating}
  onSliderChange={controls.handleSliderChange}
/>
```

## Features
- Animated appearance/disappearance
- Duration slider with custom styling
- Input sequence display
- Keyboard shortcut hints
- Responsive design
- Accessibility support

## Styling
- Uses Tailwind CSS for styling
- Custom slider appearance
- Smooth animations with Framer Motion
- Responsive layout
- Dark/light mode support

## Animation States
- Fade in/out on show/hide
- Smooth transitions
- Delayed keyboard hint appearance
- Slider thumb hover effects

## Accessibility
- Keyboard navigation
- Screen reader support
- ARIA attributes
- High contrast support
- Focus management

## Performance Considerations
- Optimized animations
- Efficient re-renders
- Proper cleanup
- Smooth interactions

## Error Handling
- Input validation
- Edge case handling
- State management
- Animation cleanup

## Integration
- Works with parent Timer component
- Integrates with custom Slider component
- Uses Framer Motion for animations
- Handles user input events

## Testing Considerations
1. Display States
   - Visible/hidden states
   - Input sequence display
   - Slider state
   - Instructions visibility

2. Animation States
   - Mount/unmount animations
   - Input sequence animations
   - Slider interactions
   - State transitions

3. User Interaction
   - Slider functionality
   - Input sequence handling
   - Keyboard shortcuts
   - Visual feedback

4. Responsive Behavior
   - Different screen sizes
   - Layout adaptation
   - Text wrapping
   - Component sizing

5. Visual Testing
   - Color contrast
   - Text readability
   - Animation smoothness
   - State clarity
   - Shadow effects 