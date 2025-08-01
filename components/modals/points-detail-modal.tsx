"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Star,
  Trophy,
  TrendingUp,
  Gift,
  Target,
  Users,
  Calendar,
  Clock,
  Zap,
  Heart,
  Share2,
  MapPin,
  CheckCircle,
  ArrowUp,
  ArrowDown,
  Plus,
  Minus,
  Filter,
  Eye,
} from "lucide-react"
import { useSound } from "@/lib/hooks/use-sound"
import { APP_CONFIG } from "@/lib/config/app-config"
import { User } from "lucide-react" // Import User icon

interface PointsDetailModalProps {
  isOpen: boolean
  onClose: () => void
  user: any
  gamificationState: any
  nextLevelProgress: any
}

export function PointsDetailModal({
  isOpen,
  onClose,
  user,
  gamificationState,
  nextLevelProgress,
}: PointsDetailModalProps) {
  const { playSound } = useSound()
  const [activeTab, setActiveTab] = useState("overview")
  const [historyFilter, setHistoryFilter] = useState("all")

  const pointsHistory = [
    {
      id: 1,
      type: "earned",
      action: "Completar perfil",
      points: 50,
      date: "Hoy, 14:30",
      icon: User,
      color: "text-green-500",
      description: "Agregaste foto de perfil",
    },
    {
      id: 2,
      type: "earned",
      action: "Primer favorito",
      points: 20,
      date: "Hoy, 12:15",
      icon: Heart,
      color: "text-pink-500",
      description: "Agregaste tu primera promo favorita",
    },
    {
      id: 3,
      type: "earned",
      action: "Desafío diario",
      points: 100,
      date: "Ayer, 18:45",
      icon: Target,
      color: "text-orange-500",
      description: "Completaste el desafío de favoritos",
    },
    {
      id: 4,
      type: "spent",
      action: "Canje de recompensa",
      points: -75,
      date: "Ayer, 16:20",
      icon: Gift,
      color: "text-red-500",
      description: "Canjeaste descuento especial",
    },
    {
      id: 5,
      type: "earned",
      action: "Compartir ranking",
      points: 25,
      date: "Hace 2 días, 20:10",
      icon: Share2,
      color: "text-blue-500",
      description: "Compartiste tu posición en redes",
    },
    {
      id: 6,
      type: "earned",
      action: "Explorar mapa",
      points: 15,
      date: "Hace 2 días, 15:30",
      icon: MapPin,
      color: "text-green-500",
      description: "Visitaste 3 locales desde el mapa",
    },
    {
      id: 7,
      type: "earned",
      action: "Subir de nivel",
      points: 200,
      date: "Hace 3 días, 11:00",
      icon: Trophy,
      color: "text-yellow-500",
      description: "Alcanzaste el nivel 2",
    },
    {
      id: 8,
      type: "spent",
      action: "Canje premium",
      points: -150,
      date: "Hace 4 días, 14:45",
      icon: Star,
      color: "text-red-500",
      description: "Canjeaste función premium",
    },
    {
      id: 9,
      type: "earned",
      action: "Registro inicial",
      points: 100,
      date: "Hace 5 días, 09:30",
      icon: Zap,
      color: "text-purple-500",
      description: "Bienvenida a Donde Consigo",
    },
    {
      id: 10,
      type: "earned",
      action: "Invitar amigo",
      points: 50,
      date: "Hace 6 días, 19:15",
      icon: Users,
      color: "text-blue-500",
      description: "Tu amigo Juan se registró",
    },
  ]

  const filteredHistory = pointsHistory.filter((item) => {
    if (historyFilter === "earned") return item.type === "earned"
    if (historyFilter === "spent") return item.type === "spent"
    return true
  })

  const totalEarned = pointsHistory.filter((item) => item.type === "earned").reduce((sum, item) => sum + item.points, 0)
  const totalSpent = Math.abs(
    pointsHistory.filter((item) => item.type === "spent").reduce((sum, item) => sum + item.points, 0),
  )

  const waysToEarn = [
    {
      id: 1,
      title: "Completar desafíos diarios",
      points: "50-200",
      difficulty: "Fácil",
      description: "Nuevos desafíos cada día",
      icon: Target,
      color: "text-orange-500",
      bgColor: "bg-orange-50 dark:bg-orange-950",
      action: "Ver desafíos",
    },
    {
      id: 2,
      title: "Subir de nivel",
      points: "100-500",
      difficulty: "Medio",
      description: "Gana XP completando actividades",
      icon: Trophy,
      color: "text-yellow-500",
      bgColor: "bg-yellow-50 dark:bg-yellow-950",
      action: "Ver progreso",
    },
    {
      id: 3,
      title: "Compartir en redes sociales",
      points: "25-50",
      difficulty: "Fácil",
      description: "Comparte tu progreso o promociones",
      icon: Share2,
      color: "text-blue-500",
      bgColor: "bg-blue-50 dark:bg-blue-950",
      action: "Compartir ahora",
    },
    {
      id: 4,
      title: "Invitar amigos",
      points: "100",
      difficulty: "Medio",
      description: "Por cada amigo que se registre",
      icon: Users,
      color: "text-green-500",
      bgColor: "bg-green-50 dark:bg-green-950",
      action: "Invitar",
    },
    {
      id: 5,
      title: "Completar perfil",
      points: "50-100",
      difficulty: "Fácil",
      description: "Agrega foto, bancos favoritos, etc.",
      icon: CheckCircle,
      color: "text-purple-500",
      bgColor: "bg-purple-50 dark:bg-purple-950",
      action: "Completar",
    },
    {
      id: 6,
      title: "Explorar promociones",
      points: "10-30",
      difficulty: "Muy fácil",
      description: "Agrega favoritos, visita locales",
      icon: Heart,
      color: "text-pink-500",
      bgColor: "bg-pink-50 dark:bg-pink-950",
      action: "Explorar",
    },
  ]

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Muy fácil":
        return "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
      case "Fácil":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
      case "Medio":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300"
      case "Difícil":
        return "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  const handleEarnAction = (action: string) => {
    playSound("click")
    // Aquí se implementarían las acciones específicas
    onClose()
  }

  if (!isOpen) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-500" />
            Sistema de Puntos
          </DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Resumen</TabsTrigger>
            <TabsTrigger value="history">Historial</TabsTrigger>
            <TabsTrigger value="earn">Ganar</TabsTrigger>
          </TabsList>

          <div className="max-h-[60vh] overflow-y-auto">
            <TabsContent value="overview" className="space-y-4 mt-4">
              {/* Current Stats */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-950 dark:to-orange-950 border-yellow-200 dark:border-yellow-800">
                  <CardContent className="p-6 text-center">
                    <motion.div
                      animate={{
                        rotate: [0, 5, -5, 0],
                        scale: [1, 1.05, 1],
                      }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    >
                      <Star className="w-12 h-12 mx-auto mb-3 text-yellow-500" />
                    </motion.div>
                    <p className="text-4xl font-bold text-yellow-700 dark:text-yellow-300 mb-2">
                      {gamificationState.points.toLocaleString()}
                    </p>
                    <p className="text-muted-foreground">Puntos totales</p>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Level Progress */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Trophy className="w-5 h-5 text-purple-500" />
                      Progreso de Nivel
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Nivel {gamificationState.level}</span>
                      <span className="text-sm text-muted-foreground">
                        {nextLevelProgress.pointsNeeded} pts al siguiente
                      </span>
                    </div>
                    <Progress value={nextLevelProgress.progress} className="h-3" />
                    <p className="text-sm text-center text-muted-foreground">
                      {
                        APP_CONFIG.gamification.levels[
                          gamificationState.level as keyof typeof APP_CONFIG.gamification.levels
                        ]?.name
                      }{" "}
                      →{" "}
                      {APP_CONFIG.gamification.levels[
                        (gamificationState.level + 1) as keyof typeof APP_CONFIG.gamification.levels
                      ]?.name || "Nivel Máximo"}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Stats Summary */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <div className="grid grid-cols-2 gap-4">
                  <Card className="bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800">
                    <CardContent className="p-4 text-center">
                      <ArrowUp className="w-6 h-6 mx-auto mb-2 text-green-500" />
                      <p className="text-2xl font-bold text-green-700 dark:text-green-300">{totalEarned}</p>
                      <p className="text-xs text-muted-foreground">Ganados</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800">
                    <CardContent className="p-4 text-center">
                      <ArrowDown className="w-6 h-6 mx-auto mb-2 text-red-500" />
                      <p className="text-2xl font-bold text-red-700 dark:text-red-300">{totalSpent}</p>
                      <p className="text-xs text-muted-foreground">Canjeados</p>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>

              {/* Quick Actions */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Acciones Rápidas</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button
                      onClick={() => setActiveTab("earn")}
                      className="w-full justify-start bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Ver formas de ganar puntos
                    </Button>
                    <Button onClick={() => setActiveTab("history")} variant="outline" className="w-full justify-start">
                      <Eye className="w-4 h-4 mr-2" />
                      Ver historial completo
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            <TabsContent value="history" className="space-y-4 mt-4">
              {/* Filter Tabs */}
              <div className="flex gap-2">
                <Button
                  onClick={() => setHistoryFilter("all")}
                  variant={historyFilter === "all" ? "default" : "outline"}
                  size="sm"
                  className="flex-1"
                >
                  <Filter className="w-4 h-4 mr-1" />
                  Todas ({pointsHistory.length})
                </Button>
                <Button
                  onClick={() => setHistoryFilter("earned")}
                  variant={historyFilter === "earned" ? "default" : "outline"}
                  size="sm"
                  className="flex-1"
                >
                  <ArrowUp className="w-4 h-4 mr-1" />
                  Ganados ({pointsHistory.filter((item) => item.type === "earned").length})
                </Button>
                <Button
                  onClick={() => setHistoryFilter("spent")}
                  variant={historyFilter === "spent" ? "default" : "outline"}
                  size="sm"
                  className="flex-1"
                >
                  <ArrowDown className="w-4 h-4 mr-1" />
                  Canjeados ({pointsHistory.filter((item) => item.type === "spent").length})
                </Button>
              </div>

              {/* History List */}
              <div className="space-y-3">
                <AnimatePresence>
                  {filteredHistory.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Card className="hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <div className="flex items-center gap-3">
                            <motion.div
                              animate={{
                                rotate: [0, 10, -10, 0],
                                scale: [1, 1.1, 1],
                              }}
                              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                            >
                              <item.icon className={`w-5 h-5 ${item.color}`} />
                            </motion.div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <p className="font-medium text-sm">{item.action}</p>
                                <div className="flex items-center gap-1">
                                  {item.type === "earned" ? (
                                    <Plus className="w-3 h-3 text-green-500" />
                                  ) : (
                                    <Minus className="w-3 h-3 text-red-500" />
                                  )}
                                  <span
                                    className={`font-bold text-sm ${
                                      item.type === "earned" ? "text-green-600" : "text-red-600"
                                    }`}
                                  >
                                    {item.points > 0 ? "+" : ""}
                                    {item.points}
                                  </span>
                                </div>
                              </div>
                              <p className="text-xs text-muted-foreground mb-1">{item.description}</p>
                              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <Clock className="w-3 h-3" />
                                <span>{item.date}</span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {filteredHistory.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <Card className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
                    <CardContent className="p-6">
                      <Calendar className="w-12 h-12 mx-auto mb-4 text-blue-500 opacity-50" />
                      <h3 className="font-bold text-blue-700 dark:text-blue-300 mb-2">
                        No hay movimientos en esta categoría
                      </h3>
                      <p className="text-sm text-blue-600 dark:text-blue-400">
                        {historyFilter === "earned"
                          ? "Empezá a ganar puntos completando desafíos"
                          : "Aún no canjeaste ninguna recompensa"}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </TabsContent>

            <TabsContent value="earn" className="space-y-4 mt-4">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <Card className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 border-purple-200 dark:border-purple-800">
                  <CardContent className="p-4 text-center">
                    <Zap className="w-8 h-8 mx-auto mb-2 text-purple-500" />
                    <h3 className="font-bold text-purple-700 dark:text-purple-300 mb-1">
                      ¡Muchas formas de ganar puntos!
                    </h3>
                    <p className="text-sm text-purple-600 dark:text-purple-400">
                      Completá actividades y desbloquea recompensas
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <div className="space-y-3">
                {waysToEarn.map((way, index) => (
                  <motion.div
                    key={way.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className={`${way.bgColor} hover:shadow-md transition-shadow`}>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <motion.div
                            animate={{
                              rotate: [0, 5, -5, 0],
                              scale: [1, 1.05, 1],
                            }}
                            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                          >
                            <way.icon className={`w-6 h-6 ${way.color}`} />
                          </motion.div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <p className="font-medium text-sm">{way.title}</p>
                              <div className="flex items-center gap-1">
                                <Star className="w-3 h-3 text-yellow-500" />
                                <span className="font-bold text-sm text-yellow-600">{way.points}</span>
                              </div>
                            </div>
                            <p className="text-xs text-muted-foreground mb-2">{way.description}</p>
                            <div className="flex items-center justify-between">
                              <Badge className={`text-xs ${getDifficultyColor(way.difficulty)}`}>
                                {way.difficulty}
                              </Badge>
                              <Button
                                onClick={() => handleEarnAction(way.action)}
                                size="sm"
                                variant="outline"
                                className="text-xs h-6"
                              >
                                {way.action}
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Bonus Tip */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
                <Card className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
                  <CardContent className="p-4">
                    <h4 className="font-bold text-blue-700 dark:text-blue-300 mb-2 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" />
                      Consejo Pro
                    </h4>
                    <p className="text-sm text-blue-600 dark:text-blue-400">
                      Completá desafíos diarios para maximizar tus puntos. ¡Los desafíos se renuevan cada 24 horas!
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
          </div>
        </Tabs>

        <div className="flex gap-2 pt-4 border-t">
          <Button onClick={onClose} variant="outline" className="flex-1 bg-transparent">
            Cerrar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
