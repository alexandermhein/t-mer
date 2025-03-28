import { motion } from "framer-motion"
import { Slider } from "@/components/ui/slider"
import { formatTime } from "@/lib/utils"

interface TimerControlsProps {
  showControls: boolean
  totalSeconds: number
  inputSequence: string
  isAnimating: boolean
  onSliderChange: (value: number[]) => void
}

export function TimerControls({
  showControls,
  totalSeconds,
  inputSequence,
  isAnimating,
  onSliderChange,
}: TimerControlsProps) {
  // Calculate slider value (0-30 minutes)
  const sliderValue = [totalSeconds / 60]

  if (!showControls) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="absolute z-10 bg-white rounded-2xl shadow-lg p-8 w-full max-w-md mx-auto"
    >
      <div className="text-center mb-8">
        <div className="relative inline-block overflow-hidden rounded-[8px]">
          <motion.div
            key={inputSequence ? 'animating' : 'not-animating'}
            className="absolute inset-0 bg-timer-purple origin-left"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: inputSequence ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          />
          <motion.div
            className="relative inline-block px-4 py-2 text-gray-800 text-sm z-10"
            animate={{
              color: inputSequence ? "#ffffff" : "#1f2937",
              backgroundColor: inputSequence ? "transparent" : "#f3f4f6",
            }}
            transition={{ duration: 0.5 }}
          >
            {inputSequence ? `${inputSequence.padStart(2, "0")}:00` : formatTime(totalSeconds)} min
          </motion.div>
        </div>
      </div>

      <div className="mb-10">
        <style jsx global>{`
          .slider-custom .slider-track {
            height: 4px;
            background-color: #e9eaeb;
          }
          .slider-custom .slider-range {
            background-color: #c732b3;
          }
          .slider-custom .slider-thumb {
            width: 20px;
            height: 20px;
            background-color: #c732b3;
            border: 2px solid #ffffff;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            cursor: not-allowed;
          }
          .slider-custom[data-disabled] {
            opacity: 0.7;
            cursor: not-allowed;
          }
        `}</style>
        <div className="slider-custom">
          <Slider
            value={sliderValue}
            min={0}
            max={30}
            step={1}
            onValueChange={onSliderChange}
            className="w-full"
            disabled
          />
        </div>
      </div>

      <div className="space-y-6 text-center">
        <h3 className="text-gray-700 font-medium">How it works</h3>

        <div className="text-gray-500 text-sm space-y-4">
          <div>
            Use <span className="bg-gray-100 px-2 py-1 rounded">1-9</span> keys to set the timer duration.
          </div>
          <div>
            Press <span className="bg-gray-100 px-2 py-1 rounded">Space</span> to start/stop the timer.
          </div>
          <div>
            Press <span className="bg-gray-100 px-2 py-1 rounded">R</span> to reset the timer.
          </div>
        </div>
      </div>
    </motion.div>
  )
} 