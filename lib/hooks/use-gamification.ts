"use client"

import { useState, useEffect, useCallback } from "react"
import { APP_CONFIG } from "@/lib/config/app-config"

interface GamificationState {
  points: number
  level: number
  badges: string[]
  streak: number
  lastLogin: string | null
}

interface Achievement {
  id: string
  type: "points" | "level" | "badge"
  value: number | string
  message: string
  animation?: "confetti" | "pulse" | "bounce"
}

export function useGamification(userId?: string) {
  const [state, setState] = useState<GamificationState>({
    points: 0,
    level: 1,
    badges: [],
    streak: 0,
    lastLogin: null,
  })

  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [showAchievement, setShowAchievement] = useState(false)

  // Cargar estado del usuario
  useEffect(() => {
    if (userId) {
      try {
        const savedState = localStorage.getItem(`gamification_${userId}`)
        if (savedState) {
          const parsedState = JSON.parse(savedState)
          // Ensure the state has the correct structure
          setState({
            points: parsedState.points || 0,
            level: parsedState.level || 1,
            badges: Array.isArray(parsedState.badges) ? parsedState.badges : [],
            streak: parsedState.streak || 0,
            lastLogin: parsedState.lastLogin || null,
          })
        }
      } catch (error) {
        console.error("Error loading gamification state:", error)
        // Reset to default state if there's an error
        setState({
          points: 0,
          level: 1,
          badges: [],
          streak: 0,
          lastLogin: null,
        })
      }
    }
  }, [userId])

  // Guardar estado
  const saveState = useCallback(
    (newState: GamificationState) => {
      if (userId) {
        try {
          // Create a clean copy without any potential circular references
          const cleanState = {
            points: newState.points,
            level: newState.level,
            badges: Array.isArray(newState.badges) ? newState.badges : [],
            streak: newState.streak,
            lastLogin: newState.lastLogin,
          }
          localStorage.setItem(`gamification_${userId}`, JSON.stringify(cleanState))
          setState(cleanState)
        } catch (error) {
          console.error("Error saving gamification state:", error)
          setState(newState)
        }
      } else {
        setState(newState)
      }
    },
    [userId],
  )

  // Calcular nivel basado en puntos
  const calculateLevel = useCallback((points: number) => {
    const levels = APP_CONFIG.gamification.levels
    for (const [level, config] of Object.entries(levels)) {
      if (points >= config.min && points <= config.max) {
        return Number.parseInt(level)
      }
    }
    return Math.max(...Object.keys(levels).map(Number))
  }, [])

  // Agregar puntos
  const addPoints = useCallback(
    (action: keyof typeof APP_CONFIG.gamification.pointsPerAction, customPoints?: number) => {
      const pointsToAdd = customPoints || APP_CONFIG.gamification.pointsPerAction[action]
      const newPoints = state.points + pointsToAdd
      const newLevel = calculateLevel(newPoints)
      const leveledUp = newLevel > state.level

      const newState = {
        ...state,
        points: newPoints,
        level: newLevel,
      }

      // Crear achievement
      const achievement: Achievement = {
        id: `${action}_${Date.now()}`,
        type: "points",
        value: pointsToAdd,
        message: `+${pointsToAdd} puntos`,
        animation: "pulse",
      }

      setAchievements((prev) => [...prev, achievement])

      if (leveledUp) {
        const levelAchievement: Achievement = {
          id: `level_${newLevel}_${Date.now()}`,
          type: "level",
          value: newLevel,
          message: `¡Nivel ${newLevel} desbloqueado!`,
          animation: "confetti",
        }
        setAchievements((prev) => [...prev, levelAchievement])
      }

      setShowAchievement(true)
      saveState(newState)

      // Auto-hide achievement
      setTimeout(() => {
        setShowAchievement(false)
        setTimeout(() => {
          setAchievements((prev) => prev.slice(1))
        }, 300)
      }, 3000)

      return { pointsAdded: pointsToAdd, leveledUp, newLevel }
    },
    [state, calculateLevel, saveState],
  )

  // Desbloquear badge
  const unlockBadge = useCallback(
    (badgeId: string, badgeName: string) => {
      if (!state.badges.includes(badgeId)) {
        const newState = {
          ...state,
          badges: [...state.badges, badgeId],
        }

        const achievement: Achievement = {
          id: `badge_${badgeId}_${Date.now()}`,
          type: "badge",
          value: badgeName,
          message: `¡Badge "${badgeName}" desbloqueado!`,
          animation: "bounce",
        }

        setAchievements((prev) => [...prev, achievement])
        setShowAchievement(true)
        saveState(newState)

        setTimeout(() => {
          setShowAchievement(false)
          setTimeout(() => {
            setAchievements((prev) => prev.slice(1))
          }, 300)
        }, 3000)
      }
    },
    [state, saveState],
  )

  // Obtener progreso al próximo nivel
  const getProgressToNextLevel = useCallback(() => {
    const currentLevel = state.level
    const levels = APP_CONFIG.gamification.levels
    const nextLevel = currentLevel + 1

    if (!levels[nextLevel as keyof typeof levels]) {
      return { progress: 100, pointsNeeded: 0, nextLevelName: "Máximo nivel" }
    }

    const currentLevelConfig = levels[currentLevel as keyof typeof levels]
    const nextLevelConfig = levels[nextLevel as keyof typeof levels]

    const pointsInCurrentLevel = state.points - currentLevelConfig.min
    const pointsNeededForNextLevel = nextLevelConfig.min - currentLevelConfig.min
    const progress = (pointsInCurrentLevel / pointsNeededForNextLevel) * 100
    const pointsNeeded = nextLevelConfig.min - state.points

    return {
      progress: Math.min(progress, 100),
      pointsNeeded: Math.max(pointsNeeded, 0),
      nextLevelName: nextLevelConfig.name,
    }
  }, [state])

  return {
    state,
    achievements: achievements.slice(0, 1), // Solo mostrar el último
    showAchievement,
    addPoints,
    unlockBadge,
    getProgressToNextLevel,
    getLevelName: (level: number) =>
      APP_CONFIG.gamification.levels[level as keyof typeof APP_CONFIG.gamification.levels]?.name || "Desconocido",
  }
}
