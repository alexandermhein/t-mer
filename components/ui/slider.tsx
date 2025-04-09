"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"
import { motion, useAnimation } from "framer-motion"
import { cn } from "@/lib/utils"

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, value, onValueChange, ...props }, ref) => {
  // Store previous value for animation
  const prevValueRef = React.useRef(value || [0])
  const thumbControls = useAnimation()
  const rangeControls = useAnimation()

  // Track when value changes to trigger animation
  React.useEffect(() => {
    if (value && value[0] !== prevValueRef.current[0]) {
      // Animate both the thumb and range simultaneously
      const percentage = (value[0] / props.max!) * 100
      thumbControls.start({ left: `${percentage}%` })
      rangeControls.start({ width: `${percentage}%` })
      prevValueRef.current = value
    }
  }, [value, thumbControls, rangeControls, props.max])

  // Calculate initial positions
  const initialPercentage = value ? (value[0] / props.max!) * 100 : 0

  // Shared animation settings for consistent timing
  const animationSettings = {
    type: "spring",
    stiffness: 300,
    damping: 25,
    mass: 0.5,
  }

  return (
    <div className={cn("relative flex w-full touch-none select-none items-center", className)}>
      <SliderPrimitive.Root
        ref={ref}
        value={value}
        onValueChange={onValueChange}
        className="relative flex w-full touch-none select-none items-center"
        {...props}
      >
        <SliderPrimitive.Track className="relative h-1 w-full grow overflow-hidden rounded-full bg-gray-200 slider-track">
          {/* Hidden actual range - keeps functionality but is invisible */}
          <SliderPrimitive.Range className="absolute h-full bg-transparent" />

          {/* Animated visual range */}
          <motion.div
            className="absolute h-full bg-timer-purple slider-range"
            style={{ width: `${initialPercentage}%` }}
            animate={rangeControls}
            transition={animationSettings}
          />
        </SliderPrimitive.Track>

        {/* Hidden actual thumb - keeps functionality but is invisible */}
        <SliderPrimitive.Thumb className="opacity-0 h-5 w-5" />

        {/* Animated visual thumb */}
        <motion.div
          className="absolute block h-5 w-5 rounded-full border-2 border-timer-purple bg-white slider-thumb"
          style={{
            left: `${initialPercentage}%`,
            top: "50%",
            transform: "translateY(-50%)",
            pointerEvents: "none", // Let events pass through to the actual thumb
          }}
          animate={thumbControls}
          transition={animationSettings}
        />
      </SliderPrimitive.Root>
    </div>
  )
})

Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }

