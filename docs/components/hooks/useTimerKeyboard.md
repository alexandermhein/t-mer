# useTimerKeyboard Hook

## Overview
The useTimerKeyboard hook manages keyboard interactions for the timer, including shortcuts and numeric input handling.

## Technical Details
- **Location**: `hooks/useTimerKeyboard.ts`
- **Type**: Custom React Hook
- **Dependencies**: React's useEffect, useCallback

## Implementation

```typescript
interface TimerKeyboardProps {
  onStartStop: () => void;
  onReset: () => void;
  onSetDuration: (seconds: number) => void;
  isRunning: boolean;
  inputSequence: string;
  setInputSequence: (sequence: string) => void;
}

export function useTimerKeyboard({
  onStartStop,
  onReset,
  onSetDuration,
  isRunning,
  inputSequence,
  setInputSequence
}: TimerKeyboardProps) {
  // Handle keyboard events
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // Space: Start/Stop
      if (event.code === 'Space') {
        event.preventDefault();
        onStartStop();
      }

      // R: Reset
      if (event.code === 'KeyR') {
        event.preventDefault();
        onReset();
      }

      // Numbers 1-9: Set duration
      if (/^Digit[1-9]$/.test(event.code)) {
        event.preventDefault();
        const number = parseInt(event.code.replace('Digit', ''));
        const newSequence = inputSequence + number.toString();
        
        if (newSequence.length <= 2) {
          setInputSequence(newSequence);
        }
      }

      // Enter: Apply duration
      if (event.code === 'Enter' && inputSequence) {
        event.preventDefault();
        const minutes = parseInt(inputSequence);
        if (minutes > 0 && minutes <= 99) {
          onSetDuration(minutes * 60);
          setInputSequence('');
        }
      }

      // Period: Add 30 seconds
      if (event.code === 'Period') {
        event.preventDefault();
        const currentMinutes = Math.floor(parseInt(inputSequence || '0') * 60 / 60);
        const newDuration = (currentMinutes * 60) + 30;
        onSetDuration(newDuration);
        setInputSequence('');
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [onStartStop, onReset, onSetDuration, inputSequence, setInputSequence]);

  // Clear input sequence when timer starts
  useEffect(() => {
    if (isRunning) {
      setInputSequence('');
    }
  }, [isRunning, setInputSequence]);
}
```

## Usage Examples

```typescript
// Basic usage
useTimerKeyboard({
  onStartStop: () => controls.startTimer(),
  onReset: () => controls.resetTimer(),
  onSetDuration: (seconds) => controls.setDuration(seconds),
  isRunning: state.isRunning,
  inputSequence: state.inputSequence,
  setInputSequence: (sequence) => setState(prev => ({ ...prev, inputSequence: sequence }))
});
```

## Keyboard Controls
- `Space`: Start/Stop timer
- `R`: Reset timer
- `1-9`: Set duration (in minutes)
- `Enter`: Apply duration input
- `.`: Add 30 seconds to current duration

## State Management
- Manages input sequence for duration setting
- Clears input sequence when timer starts
- Prevents invalid inputs
- Handles edge cases

## Performance Considerations
- Uses event delegation
- Implements proper cleanup
- Optimizes event handling
- Prevents default behavior for shortcuts

## Error Handling
- Validates numeric input
- Handles invalid sequences
- Manages edge cases
- Prevents invalid durations 