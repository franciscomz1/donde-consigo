"use client"

import type { Achievement } from "../types"

interface BadgeCollectionProps {
  achievements: Achievement[]
  showAll?: boolean
}

const badgeStyles = {
  welcome: "from-blue-400 to-blue-600",
  firstReferral: "from-green-400 to-green-600",
  profileComplete: "from-purple-400 to-purple-600",
  streak7: "from-orange-400 to-red-500",
  firstPromo: "from-pink-400 to-pink-600",
  explorer: "from-teal-400 to-cyan-500",
}

export default function BadgeCollection({ achievements, showAll = false }: BadgeCollectionProps) {
  const displayedAchievements = showAll ? achievements : achievements.slice(0, 3)

  if (achievements.length === 0) {
    return (
      <div className="text-center py-6">
        <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-3">
          <span className="text-2xl">🏆</span>
        </div>
        <p className="text-gray-500 dark:text-gray-400 text-sm">¡Empezá a ganar badges!</p>
        <p className="text-gray-400 dark:text-gray-500 text-xs mt-1">Completá desafíos para desbloquear logros</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-3">
        {displayedAchievements.map((achievement) => {
          const badgeColor = badgeStyles[achievement.id as keyof typeof badgeStyles] || "from-gray-400 to-gray-600"

          return (
            <div key={achievement.id} className="text-center">
              <div
                className={`w-16 h-16 bg-gradient-to-br ${badgeColor} rounded-full flex items-center justify-center mx-auto mb-2 shadow-lg animate-scale-in`}
              >
                <span className="text-2xl">{achievement.icon}</span>
              </div>
              <p className="text-xs font-semibold text-gray-900 dark:text-white">{achievement.title}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">+{achievement.points} pts</p>
            </div>
          )
        })}
      </div>

      {!showAll && achievements.length > 3 && (
        <div className="text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">+{achievements.length - 3} badges más</p>
        </div>
      )}
    </div>
  )
}
