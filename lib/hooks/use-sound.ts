"use client"

import { useCallback } from "react"

type SoundType = "success" | "achievement" | "level-up" | "click" | "welcome" | "notification"

export function useSound() {
  const playSound = useCallback((type: SoundType) => {
    // En una app real, aquí cargarías y reproducirías sonidos
    // Por ahora, solo simulamos con vibración en móviles
    if (typeof window !== "undefined" && "vibrate" in navigator) {
      switch (type) {
        case "success":
          navigator.vibrate([100, 50, 100])
          break
        case "achievement":
          navigator.vibrate([200, 100, 200, 100, 200])
          break
        case "level-up":
          navigator.vibrate([300, 100, 300, 100, 300])
          break
        case "click":
          navigator.vibrate(50)
          break
        case "welcome":
          navigator.vibrate([100, 50, 100, 50, 200])
          break
        case "notification":
          navigator.vibrate([100, 100, 100])
          break
      }
    }
  }, [])

  return { playSound }
}
