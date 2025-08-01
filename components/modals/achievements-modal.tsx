"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { X, Trophy, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface AchievementsModalProps {
  user: any
  onClose: () => void
}

export function AchievementsModal({ user, onClose }: AchievementsModalProps) {
  const [activeTab, setActiveTab] = useState("unlocked")

  const achievements = [
    {
      id: 1,
      name: "Primer paso",
      description: "Completaste tu registro en la app",
      icon: "🎯",
      points: 100,
      unlocked: true,
      unlockedDate: "2024-01-15",
      category: "onboarding",
      rarity: "common",
    },
    {
      id: 2,
      name: "Explorador",
      description: "Visitaste todas las secciones de la app",
      icon: "🗺️",
      points: 150,
      unlocked: true,
      unlockedDate: "2024-01-14",
      category: "exploration",
      rarity: "common",
    },
    {
      id: 3,
      name: "Fotogénico",
      description: "Subiste tu primera foto de perfil",
      icon: "📸",
      points: 50,
      unlocked: true,
      unlockedDate: "2024-01-13",
      category: "profile",
      rarity: "common",
    },
    {
      id: 4,
      name: "Constante",
      description: "7 días consecutivos usando la app",
      icon: "🔥",
      points: 300,
      unlocked: false,
      progress: 3,
      maxProgress: 7,
      category: "engagement",
      rarity: "rare",
    },
    {
      id: 5,
      name: "Influencer",
      description: "Refiere 5 amigos exitosamente",
      icon: "👥",
      points: 500,
      unlocked: false,
      progress: 1,
      maxProgress: 5,
      category: "social",
      rarity: "epic",
    },
    {
      id: 6,
      name: "Cazador de ofertas",
      description: "Canjea 10 promociones diferentes",
      icon: "🎁",
      points: 400,
      unlocked: false,
      progress: 2,
      maxProgress: 10,
      category: "shopping",
      rarity: "rare",
    },
    {
      id: 7,
      name: "Crítico experto",
      description: "Escribe 20 reseñas de locales",
      icon: "⭐",
      points: 350,
      unlocked: false,
      progress: 0,
      maxProgress: 20,
      category: "reviews",
      rarity: "rare",
    },
    {
      id: 8,
      name: "Leyenda",
      description: "Alcanza el nivel 10",
      icon: "👑",
      points: 1000,
      unlocked: false,
      progress: user.level,
      maxProgress: 10,
      category: "progression",
      rarity: "legendary",
    },
  ]

  const unlockedAchievements = achievements.filter((a) => a.unlocked)
  const lockedAchievements = achievements.filter((a) => !a.unlocked)

  const getRarityColor = (rarity: string) => {
    const colors: { [key: string]: string } = {
      common: "bg-gray-100 text-gray-700 border-gray-300",
      rare: "bg-blue-100 text-blue-700 border-blue-300",
      epic: "bg-purple-100 text-purple-700 border-purple-300",
      legendary: "bg-yellow-100 text-yellow-700 border-yellow-300",
    }
    return colors[rarity] || colors.common
  }

  const getCategoryIcon = (category: string) => {
    const icons: { [key: string]: string } = {
      onboarding: "🎯",
      exploration: "🗺️",
      profile: "👤",
      engagement: "🔥",
      social: "👥",
      shopping: "🛒",
      reviews: "⭐",
      progression: "📈",
    }
    return icons[category] || "🏆"
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
          <CardHeader className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Trophy className="w-5 h-5" />
                Mis logros
              </CardTitle>
              <Button variant="ghost" size="sm" onClick={onClose} className="text-white hover:bg-white/20">
                <X className="w-4 h-4" />
              </Button>
            </div>
            <div className="text-sm opacity-90">
              {unlockedAchievements.length} de {achievements.length} desbloqueados
            </div>
          </CardHeader>

          <CardContent className="p-0 h-full overflow-y-auto">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="unlocked">Desbloqueados ({unlockedAchievements.length})</TabsTrigger>
                <TabsTrigger value="locked">Por desbloquear ({lockedAchievements.length})</TabsTrigger>
              </TabsList>

              <TabsContent value="unlocked" className="p-4 space-y-3">
                {unlockedAchievements.map((achievement, index) => (
                  <motion.div
                    key={achievement.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative"
                  >
                    <Card
                      className={`border-2 ${getRarityColor(achievement.rarity)} bg-gradient-to-r from-yellow-50 to-orange-50`}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className="w-12 h-12 bg-yellow-200 rounded-full flex items-center justify-center text-2xl">
                            {achievement.icon}
                          </div>

                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-bold text-yellow-800">{achievement.name}</h3>
                              <Badge variant="secondary" className="bg-yellow-200 text-yellow-800 text-xs">
                                {achievement.rarity}
                              </Badge>
                            </div>
                            <p className="text-sm text-yellow-700 mb-2">{achievement.description}</p>
                            <div className="flex items-center justify-between">
                              <Badge className="bg-yellow-600 text-white">+{achievement.points} puntos</Badge>
                              <p className="text-xs text-yellow-600">Desbloqueado el {achievement.unlockedDate}</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </TabsContent>

              <TabsContent value="locked" className="p-4 space-y-3">
                {lockedAchievements.map((achievement, index) => (
                  <motion.div
                    key={achievement.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative"
                  >
                    <Card className={`border-2 ${getRarityColor(achievement.rarity)} opacity-60`}>
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-2xl relative">
                            {achievement.icon}
                            <Lock className="absolute -bottom-1 -right-1 w-4 h-4 bg-gray-600 text-white rounded-full p-0.5" />
                          </div>

                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-bold text-gray-700">{achievement.name}</h3>
                              <Badge variant="outline" className="text-xs">
                                {achievement.rarity}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">{achievement.description}</p>

                            {achievement.progress !== undefined && (
                              <div className="mb-2">
                                <div className="flex justify-between text-xs text-gray-500 mb-1">
                                  <span>Progreso</span>
                                  <span>
                                    {achievement.progress}/{achievement.maxProgress}
                                  </span>
                                </div>
                                <Progress
                                  value={(achievement.progress / achievement.maxProgress) * 100}
                                  className="h-2"
                                />
                              </div>
                            )}

                            <div className="flex items-center justify-between">
                              <Badge variant="outline" className="text-gray-600">
                                +{achievement.points} puntos
                              </Badge>
                              {achievement.progress !== undefined && (
                                <p className="text-xs text-gray-500">
                                  {achievement.maxProgress - achievement.progress} restantes
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
