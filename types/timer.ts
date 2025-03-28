export interface TimerProps {
  initialSeconds?: number
}

export interface TimerState {
  totalSeconds: number
  remainingSeconds: number
  isRunning: boolean
  isPaused: boolean
  showControls: boolean
  inputSequence: string
  isAnimating: boolean
}

export interface TimerControls {
  startTimer: () => void
  pauseTimer: () => void
  resetTimer: () => void
  handleSliderChange: (value: number[]) => void
  setInputSequence: (value: string) => void
  setIsAnimating: (value: boolean) => void
} 