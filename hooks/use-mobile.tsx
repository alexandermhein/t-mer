import * as React from "react"

// Breakpoint configuration
const BREAKPOINTS = {
  mobile: 768,
  tablet: 1024,
  desktop: 1280,
} as const

// Debounce delay in milliseconds
const DEBOUNCE_DELAY = 100

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)
  const timeoutRef = React.useRef<NodeJS.Timeout>()

  React.useEffect(() => {
    // Handle SSR case
    if (typeof window === "undefined") {
      return
    }

    const checkMobile = () => {
      const width = window.innerWidth
      setIsMobile(width < BREAKPOINTS.mobile)
    }

    // Debounced resize handler
    const handleResize = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      timeoutRef.current = setTimeout(checkMobile, DEBOUNCE_DELAY)
    }

    // Initial check
    checkMobile()

    // Add event listeners
    window.addEventListener("resize", handleResize)
    window.addEventListener("orientationchange", handleResize)

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("orientationchange", handleResize)
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return !!isMobile
}

// Additional breakpoint hooks for flexibility
export function useBreakpoint() {
  const [breakpoint, setBreakpoint] = React.useState<"mobile" | "tablet" | "desktop">("desktop")
  const timeoutRef = React.useRef<NodeJS.Timeout>()

  React.useEffect(() => {
    // Handle SSR case
    if (typeof window === "undefined") {
      return
    }

    const checkBreakpoint = () => {
      const width = window.innerWidth
      if (width < BREAKPOINTS.mobile) {
        setBreakpoint("mobile")
      } else if (width < BREAKPOINTS.tablet) {
        setBreakpoint("tablet")
      } else {
        setBreakpoint("desktop")
      }
    }

    // Debounced resize handler
    const handleResize = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      timeoutRef.current = setTimeout(checkBreakpoint, DEBOUNCE_DELAY)
    }

    // Initial check
    checkBreakpoint()

    // Add event listeners
    window.addEventListener("resize", handleResize)
    window.addEventListener("orientationchange", handleResize)

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("orientationchange", handleResize)
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return breakpoint
}
