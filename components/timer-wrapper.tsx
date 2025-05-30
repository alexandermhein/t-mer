"use client"

import { useSearchParams } from "next/navigation"
import Timer from "./timer"

export default function TimerWrapper() {
  const searchParams = useSearchParams()

  // Extract duration from search params
  const getDurationFromParams = () => {
    const durationParam = searchParams.get("duration")
    if (durationParam) {
      const match = durationParam.match(/(\d+(?:\.\d+)?)min/)
      if (match && match[1]) {
        const minutes = parseFloat(match[1])
        if (!isNaN(minutes) && minutes > 0) {
          // Limit to 30 minutes
          return Math.min(minutes, 30) * 60
        }
      }
    }
    return 300 // Default 5 minutes
  }

  const initialSeconds = getDurationFromParams()
  const shouldAutoStart = searchParams.has("duration")

  return <Timer initialSeconds={initialSeconds} autoStart={shouldAutoStart} />
}

