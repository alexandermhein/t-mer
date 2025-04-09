import { motion } from "framer-motion"
import { formatTime } from "@/lib/utils"

interface TimerDisplayProps {
  remainingSeconds: number
  isRunning: boolean
  totalSeconds: number
  showControls: boolean
  isFinished: boolean
}

export function TimerDisplay({ remainingSeconds, isRunning, totalSeconds, showControls, isFinished }: TimerDisplayProps) {
  return (
    <motion.div
      className="absolute w-full text-center text-[25vw] font-bold text-gray-200 select-none leading-none bottom-0 mb-0 tabular-nums"
      key={totalSeconds}
      initial={{ opacity: 0.5, scale: 0.9 }}
      animate={{ 
        opacity: isRunning ? 1 : 0.5,
        scale: 1 
      }}
      transition={{ duration: 0.3 }}
    >
      {isFinished ? "READYYYYYYY" : formatTime(remainingSeconds)}
    </motion.div>
  )
} 