"use client"

import { useCallback } from "react"

export function useNotification() {
  const isSupported = typeof window !== "undefined" && "Notification" in window

  const requestPermission = useCallback(async () => {
    if (!isSupported) return false

    if (Notification.permission !== "granted" && Notification.permission !== "denied") {
      const permission = await Notification.requestPermission()
      return permission === "granted"
    }

    return Notification.permission === "granted"
  }, [isSupported])

  const sendNotification = useCallback(
    (title: string, body: string) => {
      if (!isSupported) return

      if (Notification.permission === "granted") {
        try {
          const notification = new Notification(title, {
            body,
            icon: "/favicon.ico",
          })

          notification.onclick = () => {
            window.focus()
            notification.close()
          }
        } catch (error) {
          console.error("Error creating notification:", error)
        }
      }
    },
    [isSupported],
  )

  return { requestPermission, sendNotification }
}

