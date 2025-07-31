"use client"

import { Button } from "@/components/ui/button"
import { Trophy, Star, Crown, Medal, X } from "lucide-react"

interface RankingModalProps {
  isOpen: boolean
  onClose: () => void
  userPoints: number
  userName?: string
}

const mockRanking = [
  { id: "1", name: "María González", points: 2850, level: "Leyenda", position: 1, avatar: "👩" },
  { id: "2", name: "Carlos Rodríguez", points: 2340, level: "Leyenda", position: 2, avatar: "👨" },
  { id: "3", name: "Ana López", points: 1980, level: "Experta", position: 3, avatar: "👩‍🦱" },
  { id: "4", name: "Diego Martín", points: 1750, level: "Experto", position: 4, avatar: "👨‍💼" },
  { id: "5", name: "Laura Fernández", points: 1520, level: "Experta", position: 5, avatar: "👩‍💻" },
  { id: "6", name: "Roberto Silva", points: 1340, level: "Experto", position: 6, avatar: "👨‍🔧" },
  { id: "7", name: "Sofía Morales", points: 1180, level: "Experta", position: 7, avatar: "👩‍🎓" },
  { id: "8", name: "Martín Paz", points: 980, level: "Experto", position: 8, avatar: "👨‍🎨" },
]

export default function RankingModal({ isOpen, onClose, userPoints, userName }: RankingModalProps) {
  if (!isOpen) return null

  // Calcular posición del usuario
  const safeUserPoints = Number(userPoints) || 0
  const userPosition = mockRanking.findIndex((user) => safeUserPoints >= user.points) + 1 || mockRanking.length + 1

  const getRankIcon = (position: number) => {
    switch (position) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-500" />
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />
      case 3:
        return <Medal className="w-6 h-6 text-amber-600" />
      default:
        return <span className="w-6 h-6 flex items-center justify-center text-gray-500 font-bold">{position}</span>
    }
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Leyenda":
        return "bg-purple-100 text-purple-600"
      case "Experto":
        return "bg-blue-100 text-blue-600"
      case "Novato":
        return "bg-green-100 text-green-600"
      default:
        return "bg-gray-100 text-gray-600"
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 max-w-md w-full max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
              <Trophy className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Ranking de Usuarios</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Los que más puntos sumaron</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} className="rounded-full">
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Tu posición */}
        <div className="bg-gradient-to-r from-sky-50 to-purple-50 dark:from-sky-900/20 dark:to-purple-900/20 rounded-2xl p-4 mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-sky-500 to-purple-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">#{userPosition}</span>
            </div>
            <div>
              <p className="font-semibold text-gray-900 dark:text-white">
                {userName ? `¡Hola ${userName}!` : "Tu posición"}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {Number(userPoints) || 0} puntos • Puesto #{userPosition}
              </p>
            </div>
          </div>
          {userPosition > 3 && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">💡 Invitá amigos para subir en el ranking</p>
          )}
        </div>

        {/* Top 3 destacado */}
        <div className="mb-6">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <Star className="w-4 h-4 text-yellow-500 mr-2" />
            Top 3 del mes
          </h4>
          <div className="grid grid-cols-3 gap-2">
            {mockRanking.slice(0, 3).map((user) => (
              <div key={user.id} className="text-center">
                <div className="relative mb-2">
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl mx-auto ${
                      user.position === 1
                        ? "bg-gradient-to-r from-yellow-400 to-yellow-600"
                        : user.position === 2
                          ? "bg-gradient-to-r from-gray-300 to-gray-500"
                          : "bg-gradient-to-r from-amber-500 to-amber-700"
                    }`}
                  >
                    {user.avatar}
                  </div>
                  <div className="absolute -top-2 -right-2">{getRankIcon(user.position)}</div>
                </div>
                <p className="font-semibold text-gray-900 dark:text-white text-sm">{user.name.split(" ")[0]}</p>
                <p className="text-xs text-gray-600 dark:text-gray-300">{user.points} pts</p>
              </div>
            ))}
          </div>
        </div>

        {/* Ranking completo */}
        <div>
          <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Ranking completo</h4>
          <div className="space-y-3">
            {mockRanking.map((user) => (
              <div key={user.id} className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-xl">
                <div className="flex items-center justify-center w-8">{getRankIcon(user.position)}</div>
                <div className="w-10 h-10 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center text-lg">
                  {user.avatar}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900 dark:text-white text-sm">{user.name}</p>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 text-xs rounded-full ${getLevelColor(user.level)}`}>{user.level}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900 dark:text-white">{user.points}</p>
                  <p className="text-xs text-gray-500">puntos</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA motivacional */}
        <div className="mt-6 bg-green-50 dark:bg-green-900/20 rounded-2xl p-4">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-2">¡Sumá puntos y subí en el ranking!</h4>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">Cada acción cuenta para llegar al top</p>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-2 text-center">
              <p className="font-semibold text-green-600">+100</p>
              <p className="text-gray-600 dark:text-gray-300">Invitar amigo</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-2 text-center">
              <p className="font-semibold text-green-600">+25</p>
              <p className="text-gray-600 dark:text-gray-300">Compartir promo</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
