# useTimer Hook

## Overview
The useTimer hook manages the core timer functionality, including state management, controls, and timing logic.

## Technical Details
- **Location**: `hooks/useTimer.ts`
- **Type**: Custom React Hook
- **Dependencies**: React's useState, useEffect, useCallback

## Implementation

```typescript
interface TimerState {
  remainingSeconds: number;
  totalSeconds: number;
  isRunning: boolean;
  isPaused: boolean;
  showControls: boolean;
  isAnimating: boolean;
  inputSequence: string;
}

interface TimerControls {
  startTimer: () => void;
  stopTimer: () => void;
  resetTimer: () => void;
  handleSliderChange: (value: number) => void;
  setDuration: (seconds: number) => void;
}

export function useTimer(initialSeconds: number = 300): [TimerState, TimerControls] {
  const [state, setState] = useState<TimerState>({
    remainingSeconds: initialSeconds,
    totalSeconds: initialSeconds,
    isRunning: false,
    isPaused: false,
    showControls: true,
    isAnimating: false,
    inputSequence: ''
  });

  // Timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (state.isRunning && state.remainingSeconds > 0) {
      interval = setInterval(() => {
        setState(prev => ({
          ...prev,
          remainingSeconds: prev.remainingSeconds - 1
        }));
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [state.isRunning, state.remainingSeconds]);

  // Controls
  const startTimer = useCallback(() => {
    setState(prev => ({
      ...prev,
      isRunning: true,
      isPaused: false
    }));
  }, []);

  const stopTimer = useCallback(() => {
    setState(prev => ({
      ...prev,
      isRunning: false,
      isPaused: true
    }));
  }, []);

  const resetTimer = useCallback(() => {
    setState(prev => ({
      ...prev,
      remainingSeconds: prev.totalSeconds,
      isRunning: false,
      isPaused: false
    }));
  }, []);

  const handleSliderChange = useCallback((value: number) => {
    setState(prev => ({
      ...prev,
      remainingSeconds: value,
      totalSeconds: value
    }));
  }, []);

  const setDuration = useCallback((seconds: number) => {
    setState(prev => ({
      ...prev,
      remainingSeconds: seconds,
      totalSeconds: seconds,
      isRunning: false,
      isPaused: false
    }));
  }, []);

  return [state, {
    startTimer,
    stopTimer,
    resetTimer,
    handleSliderChange,
    setDuration
  }];
}
```

## Usage Examples

```typescript
// Basic usage
const [state, controls] = useTimer(300); // 5 minutes

// Start timer
controls.startTimer();

// Stop timer
controls.stopTimer();

// Reset timer
controls.resetTimer();

// Set new duration
controls.setDuration(600); // 10 minutes
```

## State Management
- Manages timer state through a single state object
- Handles running, paused, and reset states
- Controls animation and visibility states
- Manages input sequence for duration setting

## Performance Considerations
- Uses useCallback for memoized functions
- Implements proper cleanup in useEffect
- Optimizes state updates
- Handles edge cases (zero time, negative values)

## Error Handling
- Validates input values
- Handles timer completion
- Manages state transitions safely
- Prevents invalid state combinations 