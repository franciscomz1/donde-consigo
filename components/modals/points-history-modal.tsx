"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { X, Calendar, TrendingUp, TrendingDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface PointsHistoryModalProps {
  user: any
  onClose: () => void
}

export function PointsHistoryModal({ user, onClose }: PointsHistoryModalProps) {
  const [filter, setFilter] = useState("all")
  const [period, setPeriod] = useState("all")

  const fullHistory = [
    { id: 1, action: "Registro completado", points: 100, date: "2024-01-15", type: "earned", category: "onboarding" },
    {
      id: 2,
      action: "Desafío diario: Explorar promociones",
      points: 50,
      date: "2024-01-14",
      type: "earned",
      category: "challenge",
    },
    {
      id: 3,
      action: "Promoción canjeada - Starbucks",
      points: -25,
      date: "2024-01-13",
      type: "spent",
      category: "redemption",
    },
    { id: 4, action: "Perfil completado al 100%", points: 75, date: "2024-01-12", type: "earned", category: "profile" },
    {
      id: 5,
      action: "Amigo referido: María González",
      points: 200,
      date: "2024-01-11",
      type: "earned",
      category: "referral",
    },
    {
      id: 6,
      action: "Primera promoción guardada",
      points: 25,
      date: "2024-01-10",
      type: "earned",
      category: "engagement",
    },
    {
      id: 7,
      action: "Compartir en redes sociales",
      points: 10,
      date: "2024-01-09",
      type: "earned",
      category: "social",
    },
    {
      id: 8,
      action: "Promoción canjeada - McDonald's",
      points: -30,
      date: "2024-01-08",
      type: "spent",
      category: "redemption",
    },
    { id: 9, action: "Reseña de local", points: 25, date: "2024-01-07", type: "earned", category: "review" },
    {
      id: 10,
      action: "Logro desbloqueado: Explorador",
      points: 150,
      date: "2024-01-06",
      type: "earned",
      category: "achievement",
    },
  ]

  const filteredHistory = fullHistory.filter((item) => {
    if (filter === "earned" && item.type !== "earned") return false
    if (filter === "spent" && item.type !== "spent") return false
    return true
  })

  const totalEarned = fullHistory.filter((item) => item.type === "earned").reduce((sum, item) => sum + item.points, 0)
  const totalSpent = Math.abs(
    fullHistory.filter((item) => item.type === "spent").reduce((sum, item) => sum + item.points, 0),
  )

  const getCategoryIcon = (category: string) => {
    const icons: { [key: string]: string } = {
      onboarding: "🎯",
      challenge: "🏆",
      redemption: "🎁",
      profile: "👤",
      referral: "👥",
      engagement: "❤️",
      social: "📱",
      review: "⭐",
      achievement: "🏅",
    }
    return icons[category] || "📊"
  }

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      onboarding: "bg-blue-50 text-blue-700",
      challenge: "bg-purple-50 text-purple-700",
      redemption: "bg-red-50 text-red-700",
      profile: "bg-green-50 text-green-700",
      referral: "bg-yellow-50 text-yellow-700",
      engagement: "bg-pink-50 text-pink-700",
      social: "bg-indigo-50 text-indigo-700",
      review: "bg-orange-50 text-orange-700",
      achievement: "bg-emerald-50 text-emerald-700",
    }
    return colors[category] || "bg-gray-50 text-gray-700"
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <Card className="border-0 shadow-none h-full">
          <CardHeader className="bg-gradient-to-r from-green-600 to-blue-600 text-white">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Historial de puntos
              </CardTitle>
              <Button variant="ghost" size="sm" onClick={onClose} className="text-white hover:bg-white/20">
                <X className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="p-4 h-full overflow-y-auto">
            {/* Summary Stats */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <Card className="bg-green-50">
                <CardContent className="p-4 text-center">
                  <TrendingUp className="w-6 h-6 text-green-600 mx-auto mb-2" />
                  <p className="text-xl font-bold text-green-700">{totalEarned}</p>
                  <p className="text-sm text-green-600">Puntos ganados</p>
                </CardContent>
              </Card>

              <Card className="bg-red-50">
                <CardContent className="p-4 text-center">
                  <TrendingDown className="w-6 h-6 text-red-600 mx-auto mb-2" />
                  <p className="text-xl font-bold text-red-700">{totalSpent}</p>
                  <p className="text-sm text-red-600">Puntos gastados</p>
                </CardContent>
              </Card>
            </div>

            {/* Filters */}
            <div className="flex gap-2 mb-4">
              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Filtrar por tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="earned">Ganados</SelectItem>
                  <SelectItem value="spent">Gastados</SelectItem>
                </SelectContent>
              </Select>

              <Select value={period} onValueChange={setPeriod}>
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Período" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todo el tiempo</SelectItem>
                  <SelectItem value="week">Esta semana</SelectItem>
                  <SelectItem value="month">Este mes</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* History List */}
            <div className="space-y-3">
              {filteredHistory.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${getCategoryColor(item.category)}`}
                  >
                    {getCategoryIcon(item.category)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{item.action}</p>
                    <p className="text-xs text-gray-500">{item.date}</p>
                  </div>

                  <div className="text-right">
                    <Badge
                      variant={item.type === "earned" ? "default" : "destructive"}
                      className={`${
                        item.type === "earned"
                          ? "bg-green-100 text-green-800 hover:bg-green-200"
                          : "bg-red-100 text-red-800 hover:bg-red-200"
                      }`}
                    >
                      {item.type === "earned" ? "+" : ""}
                      {item.points}
                    </Badge>
                  </div>
                </motion.div>
              ))}
            </div>

            {filteredHistory.length === 0 && (
              <div className="text-center py-8">
                <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No hay movimientos para mostrar</p>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
