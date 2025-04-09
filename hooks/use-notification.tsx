"use client"

import { useCallback, useRef } from "react"

// Notification configuration
const NOTIFICATION_CONFIG = {
  icon: "/favicon.ico",
  defaultTitle: "Timer Notification",
  defaultBody: "Your timer has finished!",
} as const

export function useNotification() {
  const isSupported = typeof window !== "undefined" && "Notification" in window
  const permissionRef = useRef<NotificationPermission | null>(null)
  const activeNotificationsRef = useRef<Set<Notification>>(new Set())

  // Update permission reference when it changes
  if (isSupported && permissionRef.current !== Notification.permission) {
    permissionRef.current = Notification.permission
  }

  const requestPermission = useCallback(async () => {
    if (!isSupported) return false

    try {
      if (permissionRef.current !== "granted" && permissionRef.current !== "denied") {
        const permission = await Notification.requestPermission()
        permissionRef.current = permission
        return permission === "granted"
      }

      return permissionRef.current === "granted"
    } catch (error) {
      console.error("Error requesting notification permission:", error)
      return false
    }
  }, [isSupported])

  const cleanupNotification = useCallback((notification: Notification) => {
    notification.close()
    activeNotificationsRef.current.delete(notification)
  }, [])

  const sendNotification = useCallback(
    (title: string = NOTIFICATION_CONFIG.defaultTitle, body: string = NOTIFICATION_CONFIG.defaultBody) => {
      if (!isSupported || permissionRef.current !== "granted") return

      try {
        const notification = new Notification(title, {
          body,
          icon: NOTIFICATION_CONFIG.icon,
          requireInteraction: true,
          silent: false,
        })

        // Add to active notifications set
        activeNotificationsRef.current.add(notification)

        // Handle notification click
        notification.onclick = () => {
          window.focus()
          cleanupNotification(notification)
        }

        // Handle notification close
        notification.onclose = () => {
          cleanupNotification(notification)
        }

        // Auto-close after 10 seconds
        setTimeout(() => {
          if (activeNotificationsRef.current.has(notification)) {
            cleanupNotification(notification)
          }
        }, 10000)

      } catch (error) {
        console.error("Error creating notification:", error)
      }
    },
    [isSupported, cleanupNotification],
  )

  // Cleanup all notifications on unmount
  const cleanup = useCallback(() => {
    activeNotificationsRef.current.forEach(cleanupNotification)
  }, [cleanupNotification])

  // Add cleanup effect
  if (typeof window !== "undefined") {
    window.addEventListener("beforeunload", cleanup)
  }

  return { requestPermission, sendNotification }
}

