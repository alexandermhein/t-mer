import { motion } from "framer-motion"
import { formatTime } from "@/lib/utils"

interface TimerDisplayProps {
  remainingSeconds: number
  isRunning: boolean
  totalSeconds: number
}

export function TimerDisplay({ remainingSeconds, isRunning, totalSeconds }: TimerDisplayProps) {
  return (
    <motion.div
      className="absolute w-full text-center text-[25vw] font-bold text-gray-200 select-none leading-none bottom-0 mb-0"
      key={totalSeconds}
      initial={{ opacity: 0.8, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {formatTime(remainingSeconds)}
    </motion.div>
  )
} 