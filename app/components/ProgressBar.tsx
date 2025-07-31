"use client"

import { useEffect, useState } from "react"

interface ProgressBarProps {
  currentPoints: number
  currentLevel: "Novato" | "Experto" | "Leyenda"
  animated?: boolean
}

const levelThresholds = {
  Novato: { min: 0, max: 500 },
  Experto: { min: 500, max: 2000 },
  Leyenda: { min: 2000, max: 5000 },
}

const levelColors = {
  Novato: "from-green-400 to-green-600",
  Experto: "from-blue-400 to-blue-600",
  Leyenda: "from-purple-400 to-purple-600",
}

export default function ProgressBar({ currentPoints, currentLevel, animated = true }: ProgressBarProps) {
  const [animatedPoints, setAnimatedPoints] = useState(0)

  useEffect(() => {
    if (animated) {
      const timer = setTimeout(() => {
        setAnimatedPoints(currentPoints || 0)
      }, 300)
      return () => clearTimeout(timer)
    } else {
      setAnimatedPoints(currentPoints || 0)
    }
  }, [currentPoints, animated])

  // Ensure we have valid numeric values
  const safePoints = Number(currentPoints) || 0
  const safeAnimatedPoints = Number(animatedPoints) || 0
  const safeLevel = currentLevel || "Novato"
  const currentThreshold = levelThresholds[safeLevel]

  // Safety check for threshold
  if (!currentThreshold) {
    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="px-3 py-1 bg-gradient-to-r from-green-400 to-green-600 text-white text-sm font-bold rounded-full">
            Novato
          </span>
          <span className="text-gray-600 dark:text-gray-300 text-sm">{safeAnimatedPoints} puntos</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
          <div className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full w-0"></div>
        </div>
      </div>
    )
  }

  const pointsInLevel = Math.max(0, safeAnimatedPoints - currentThreshold.min)
  const totalPointsInLevel = Math.max(1, currentThreshold.max - currentThreshold.min) // Prevent division by zero
  const progressPercentage = Math.min(Math.max(0, (pointsInLevel / totalPointsInLevel) * 100), 100)

  const getNextLevel = () => {
    switch (safeLevel) {
      case "Novato":
        return "Experto"
      case "Experto":
        return "Leyenda"
      case "Leyenda":
        return "Máximo nivel"
      default:
        return "Experto"
    }
  }

  const pointsToNext = safeLevel === "Leyenda" ? 0 : Math.max(0, currentThreshold.max - safeAnimatedPoints)

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span
            className={`px-3 py-1 bg-gradient-to-r ${levelColors[safeLevel]} text-white text-sm font-bold rounded-full`}
          >
            {safeLevel}
          </span>
          <span className="text-gray-600 dark:text-gray-300 text-sm">{safeAnimatedPoints} puntos</span>
        </div>
        {safeLevel !== "Leyenda" && (
          <span className="text-gray-500 dark:text-gray-400 text-sm">
            {pointsToNext} para {getNextLevel()}
          </span>
        )}
      </div>

      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
        <div
          className={`h-full bg-gradient-to-r ${levelColors[safeLevel]} transition-all duration-1000 ease-out rounded-full relative`}
          style={{ width: `${Math.round(progressPercentage)}%` }}
        >
          {animated && <div className="absolute inset-0 bg-white/20 animate-pulse rounded-full"></div>}
        </div>
      </div>

      {safeLevel !== "Leyenda" && (
        <div className="text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Progreso al siguiente nivel: {Math.round(progressPercentage)}%
          </p>
        </div>
      )}
    </div>
  )
}
