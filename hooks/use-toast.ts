"use client"

// Inspired by react-hot-toast library
import * as React from "react"

import type {
  ToastActionElement,
  ToastProps,
} from "@/components/ui/toast"

// Configuration
const TOAST_CONFIG = {
  limit: 1,
  removeDelay: 5000, // 5 seconds
  maxToasts: 5,
} as const

type ToasterToast = ToastProps & {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: ToastActionElement
  createdAt: number
}

const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
} as const

// Generate unique ID using timestamp and counter
function genId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

type ActionType = typeof actionTypes

type Action =
  | {
      type: ActionType["ADD_TOAST"]
      toast: ToasterToast
    }
  | {
      type: ActionType["UPDATE_TOAST"]
      toast: Partial<ToasterToast>
    }
  | {
      type: ActionType["DISMISS_TOAST"]
      toastId?: ToasterToast["id"]
    }
  | {
      type: ActionType["REMOVE_TOAST"]
      toastId?: ToasterToast["id"]
    }

interface State {
  toasts: ToasterToast[]
}

// Use WeakMap for better garbage collection
const toastTimeouts = new WeakMap<ToasterToast, ReturnType<typeof setTimeout>>()

const addToRemoveQueue = (toast: ToasterToast) => {
  if (toastTimeouts.has(toast)) {
    return
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toast)
    dispatch({
      type: "REMOVE_TOAST",
      toastId: toast.id,
    })
  }, TOAST_CONFIG.removeDelay)

  toastTimeouts.set(toast, timeout)
}

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_TOAST": {
      const newToasts = [action.toast, ...state.toasts]
      // Remove oldest toast if exceeding limit
      if (newToasts.length > TOAST_CONFIG.maxToasts) {
        newToasts.pop()
      }
      return {
        ...state,
        toasts: newToasts,
      }
    }

    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      }

    case "DISMISS_TOAST": {
      const { toastId } = action

      if (toastId) {
        const toast = state.toasts.find((t) => t.id === toastId)
        if (toast) {
          addToRemoveQueue(toast)
        }
      } else {
        state.toasts.forEach(addToRemoveQueue)
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                open: false,
              }
            : t
        ),
      }
    }

    case "REMOVE_TOAST":
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [],
        }
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      }
  }
}

// Use Set for better performance with listeners
const listeners = new Set<(state: State) => void>()

let memoryState: State = { toasts: [] }

function dispatch(action: Action) {
  memoryState = reducer(memoryState, action)
  listeners.forEach((listener) => listener(memoryState))
}

type Toast = Omit<ToasterToast, "id" | "createdAt">

function toast({ ...props }: Toast) {
  const id = genId()
  const createdAt = Date.now()

  const update = (props: ToasterToast) =>
    dispatch({
      type: "UPDATE_TOAST",
      toast: { ...props, id },
    })

  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id })

  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      createdAt,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss()
      },
    },
  })

  return {
    id,
    dismiss,
    update,
  }
}

function useToast() {
  const [state, setState] = React.useState<State>(memoryState)

  React.useEffect(() => {
    listeners.add(setState)
    return () => {
      listeners.delete(setState)
    }
  }, [])

  // Cleanup timeouts on unmount
  React.useEffect(() => {
    return () => {
      state.toasts.forEach((toast) => {
        const timeout = toastTimeouts.get(toast)
        if (timeout) {
          clearTimeout(timeout)
        }
      })
    }
  }, [state.toasts])

  return {
    ...state,
    toast,
    dismiss: (toastId?: string) => dispatch({ type: "DISMISS_TOAST", toastId }),
  }
}

export { useToast, toast }
