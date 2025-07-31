"use client"

import { Button } from "@/components/ui/button"
import { CheckCircle, Gift } from "lucide-react"

interface Mission {
  id: string
  title: string
  description: string
  icon: string
  points: number
  completed: boolean
  progress?: number
  total?: number
  action?: () => void
  actionText?: string
}

interface MissionCardProps {
  mission: Mission
}

export default function MissionCard({ mission }: MissionCardProps) {
  const progressPercentage = mission.progress && mission.total ? (mission.progress / mission.total) * 100 : 0

  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-2xl p-4 border-2 transition-all duration-200 ${
        mission.completed
          ? "border-green-200 bg-green-50 dark:bg-green-900/20"
          : "border-gray-200 dark:border-gray-700 hover:border-sky-200 dark:hover:border-sky-700"
      }`}
    >
      <div className="flex items-start space-x-3">
        <div
          className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${
            mission.completed ? "bg-green-500" : "bg-gradient-to-r from-sky-400 to-purple-500"
          }`}
        >
          {mission.completed ? <CheckCircle className="w-6 h-6 text-white" /> : <span>{mission.icon}</span>}
        </div>

        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h4
                className={`font-semibold ${
                  mission.completed ? "text-green-700 dark:text-green-300" : "text-gray-900 dark:text-white"
                }`}
              >
                {mission.title}
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">{mission.description}</p>
            </div>
            <div className="text-right">
              <div className={`text-lg font-bold ${mission.completed ? "text-green-600" : "text-sky-600"}`}>
                +{mission.points}
              </div>
              <div className="text-xs text-gray-500">puntos</div>
            </div>
          </div>

          {/* Progress bar si aplica */}
          {mission.progress !== undefined && mission.total !== undefined && !mission.completed && (
            <div className="mb-3">
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-sky-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {mission.progress}/{mission.total}
              </p>
            </div>
          )}

          {/* Action button */}
          {!mission.completed && mission.action && mission.actionText && (
            <Button
              onClick={mission.action}
              size="sm"
              className="w-full bg-sky-500 hover:bg-sky-600 text-white rounded-xl"
            >
              <Gift className="w-4 h-4 mr-2" />
              {mission.actionText}
            </Button>
          )}

          {mission.completed && (
            <div className="flex items-center space-x-2 text-green-600 dark:text-green-400">
              <CheckCircle className="w-4 h-4" />
              <span className="text-sm font-medium">¡Completado!</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
