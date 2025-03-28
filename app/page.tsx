import { Suspense } from "react"
import TimerWrapper from "@/components/timer-wrapper"
import MouseTrail from "@/components/mouse-trail"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-timer-background relative">
      <MouseTrail />
      <div className="absolute top-4 text-gray-300 text-sm">T:mer – Built in Hong Kong</div>
      <Suspense fallback={<TimerFallback />}>
        <TimerWrapper />
      </Suspense>
    </main>
  )
}

function TimerFallback() {
  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute w-full text-center text-[25vw] font-bold text-gray-200 select-none">00:00</div>
      <div className="absolute z-10 bg-white rounded-lg shadow-lg p-10 w-full max-w-md mx-auto">
        <div className="text-center mb-10">
          <div className="inline-block bg-gray-100 rounded-full px-6 py-3 text-gray-800 font-medium">Loading...</div>
        </div>
      </div>
    </div>
  )
}

