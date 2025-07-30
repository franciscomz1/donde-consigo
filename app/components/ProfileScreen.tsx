"use client"

import { Button } from "@/components/ui/button"
import { Settings, Calendar, Trophy, Gift, Moon, Sun, LogOut, Edit } from "lucide-react"
import type { User } from "../types"

interface ProfileScreenProps {
  user: User | null
  darkMode: boolean
  setDarkMode: (dark: boolean) => void
}

export default function ProfileScreen({ user, darkMode, setDarkMode }: ProfileScreenProps) {
  if (!user) return null

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Novato":
        return "from-green-400 to-green-600"
      case "Experto":
        return "from-blue-400 to-blue-600"
      case "Leyenda":
        return "from-purple-400 to-purple-600"
      default:
        return "from-gray-400 to-gray-600"
    }
  }

  return (
    <div className="p-4">
      {/* Profile header */}
      <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 mb-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-4 mb-6">
          <div
            className={`w-20 h-20 bg-gradient-to-br ${getLevelColor(user.level)} rounded-2xl flex items-center justify-center shadow-lg`}
          >
            <span className="text-white text-2xl font-bold">{user.name.charAt(0)}</span>
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">{user.name}</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-2">{user.email}</p>
            <div className="flex items-center space-x-2">
              <span
                className={`px-3 py-1 bg-gradient-to-r ${getLevelColor(user.level)} text-white text-sm font-medium rounded-full`}
              >
                {user.level}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">Nivel actual</span>
            </div>
          </div>
          <Button variant="ghost" size="sm" className="rounded-full">
            <Edit className="w-5 h-5" />
          </Button>
        </div>

        {/* Points display */}
        <div className="bg-gradient-to-r from-sky-50 to-purple-50 dark:from-sky-900/20 dark:to-purple-900/20 rounded-2xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{user.points}</p>
              <p className="text-gray-600 dark:text-gray-300">Puntos totales</p>
            </div>
            <div className="text-right">
              <p className="text-lg font-semibold text-sky-600 dark:text-sky-400">+15</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Esta semana</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <Button
          variant="ghost"
          className="h-20 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl flex flex-col items-center justify-center space-y-2"
        >
          <Gift className="w-6 h-6 text-sky-500" />
          <span className="text-sm font-medium text-gray-900 dark:text-white">Canjear puntos</span>
        </Button>
        <Button
          variant="ghost"
          className="h-20 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl flex flex-col items-center justify-center space-y-2"
        >
          <Trophy className="w-6 h-6 text-yellow-500" />
          <span className="text-sm font-medium text-gray-900 dark:text-white">Ranking</span>
        </Button>
      </div>

      {/* Stats */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 mb-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Mis estadísticas</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-600 dark:text-gray-300">Promociones compartidas</span>
            <span className="font-semibold text-gray-900 dark:text-white">12</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600 dark:text-gray-300">Likes recibidos</span>
            <span className="font-semibold text-gray-900 dark:text-white">89</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600 dark:text-gray-300">Puntos canjeados</span>
            <span className="font-semibold text-gray-900 dark:text-white">150</span>
          </div>
        </div>
      </div>

      {/* Settings */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 mb-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Configuración</h3>
        <div className="space-y-2">
          <Button variant="ghost" className="w-full justify-start h-12 text-gray-700 dark:text-gray-200">
            <Settings className="w-5 h-5 mr-3" />
            Editar bancos preferidos
          </Button>
          <Button variant="ghost" className="w-full justify-start h-12 text-gray-700 dark:text-gray-200">
            <Calendar className="w-5 h-5 mr-3" />
            Ver calendario personalizado
          </Button>
          <Button
            variant="ghost"
            onClick={() => setDarkMode(!darkMode)}
            className="w-full justify-between h-12 text-gray-700 dark:text-gray-200"
          >
            <div className="flex items-center">
              {darkMode ? <Sun className="w-5 h-5 mr-3" /> : <Moon className="w-5 h-5 mr-3" />}
              Modo {darkMode ? "claro" : "oscuro"}
            </div>
          </Button>
        </div>
      </div>

      {/* Logout */}
      <Button variant="ghost" className="w-full h-12 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-2xl">
        <LogOut className="w-5 h-5 mr-3" />
        Cerrar sesión
      </Button>
    </div>
  )
}
