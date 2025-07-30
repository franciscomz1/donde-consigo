"use client"

import { Trophy, Star, Zap } from "lucide-react"

interface GamificationBadgeProps {
  type: "streak" | "explorer" | "saver"
  count: number
  title: string
}

export default function GamificationBadge({ type, count, title }: GamificationBadgeProps) {
  const getIcon = () => {
    switch (type) {
      case "streak":
        return <Zap className="w-5 h-5 text-yellow-500" />
      case "explorer":
        return <Star className="w-5 h-5 text-blue-500" />
      case "saver":
        return <Trophy className="w-5 h-5 text-green-500" />
    }
  }

  const getColor = () => {
    switch (type) {
      case "streak":
        return "from-yellow-400 to-orange-500"
      case "explorer":
        return "from-blue-400 to-purple-500"
      case "saver":
        return "from-green-400 to-teal-500"
    }
  }

  return (
    <div className={`bg-gradient-to-r ${getColor()} rounded-2xl p-3 text-white shadow-lg`}>
      <div className="flex items-center space-x-2">
        {getIcon()}
        <div>
          <p className="font-bold text-lg">{count}</p>
          <p className="text-xs opacity-90">{title}</p>
        </div>
      </div>
    </div>
  )
}
