"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent } from "@/components/ui/card"
import {
  Lightbulb,
  ChevronLeft,
  ChevronRight,
  Star,
  Gift,
  CheckCircle,
  TrendingUp,
  Target,
  Users,
  Zap,
  Heart,
  Share2,
  Bell,
} from "lucide-react"
import { useSound } from "@/lib/hooks/use-sound"
import { useGamification } from "@/lib/hooks/use-gamification"

interface TipsModalProps {
  isOpen: boolean
  onClose: () => void
  currentTip: string
}

interface Tip {
  id: number
  title: string
  content: string
  category: string
  icon: any
  color: string
  points: number
  difficulty: "Fácil" | "Medio" | "Avanzado"
  estimatedTime: string
  benefits: string[]
}

export function TipsModal({ isOpen, onClose, currentTip }: TipsModalProps) {
  const [currentTipIndex, setCurrentTipIndex] = useState(0)
  const [viewedTips, setViewedTips] = useState<number[]>([])
  const [showReward, setShowReward] = useState(false)
  const [totalPoints, setTotalPoints] = useState(0)

  const { playSound } = useSound()
  const { addPoints } = useGamification("default_user")

  const tips: Tip[] = [
    {
      id: 1,
      title: "Usá el buscador de precios",
      content:
        "Antes de comprar cualquier producto, pegá el link en nuestro buscador para encontrar el mejor precio en todas las tiendas. Podés ahorrar hasta un 40% comparando precios.",
      category: "Ahorro",
      icon: Target,
      color: "from-blue-500 to-cyan-500",
      points: 10,
      difficulty: "Fácil",
      estimatedTime: "2 min",
      benefits: ["Ahorrás dinero", "Comparás automáticamente", "Encontrás ofertas ocultas"],
    },
    {
      id: 2,
      title: "Configurá alertas de precio",
      content:
        "Creá alertas para productos que querés comprar. Te avisaremos cuando el precio baje al valor que configuraste. Es la mejor forma de comprar en el momento perfecto.",
      category: "Alertas",
      icon: Bell,
      color: "from-yellow-500 to-orange-500",
      points: 15,
      difficulty: "Fácil",
      estimatedTime: "3 min",
      benefits: ["Comprás al mejor precio", "No perdés ofertas", "Ahorrás tiempo"],
    },
    {
      id: 3,
      title: "Completá tu perfil al 100%",
      content:
        "Un perfil completo te permite recibir promociones personalizadas según tus bancos favoritos y preferencias. Además, ganás puntos extra por completarlo.",
      category: "Perfil",
      icon: Users,
      color: "from-purple-500 to-pink-500",
      points: 20,
      difficulty: "Fácil",
      estimatedTime: "5 min",
      benefits: ["Promociones personalizadas", "Más puntos", "Mejor experiencia"],
    },
    {
      id: 4,
      title: "Agregá promociones a favoritos",
      content:
        "Marcá como favoritas las promociones que más te interesan. Así las tenés siempre a mano y podés acceder rápidamente cuando las necesitas.",
      category: "Organización",
      icon: Heart,
      color: "from-red-500 to-pink-500",
      points: 5,
      difficulty: "Fácil",
      estimatedTime: "1 min",
      benefits: ["Acceso rápido", "No perdés promociones", "Mejor organización"],
    },
    {
      id: 5,
      title: "Compartí tu ranking",
      content:
        "Compartir tu posición en el ranking con amigos no solo te da puntos extra, sino que también los motivás a usar la app y descubrir mejores ofertas.",
      category: "Social",
      icon: Share2,
      color: "from-green-500 to-emerald-500",
      points: 25,
      difficulty: "Fácil",
      estimatedTime: "2 min",
      benefits: ["Puntos extra", "Motivás a amigos", "Crecés en el ranking"],
    },
    {
      id: 6,
      title: "Revisá las promociones los martes",
      content:
        "Los martes suelen publicarse las mejores promociones bancarias para la semana. Es el día ideal para planificar tus compras y aprovechar descuentos.",
      category: "Timing",
      icon: TrendingUp,
      color: "from-indigo-500 to-purple-500",
      points: 10,
      difficulty: "Medio",
      estimatedTime: "10 min",
      benefits: ["Mejores ofertas", "Planificás compras", "Ahorrás más"],
    },
    {
      id: 7,
      title: "Activá notificaciones de ubicación",
      content:
        "Permitir notificaciones de ubicación te ayuda a descubrir promociones cerca de donde estás. Perfecto para aprovechar ofertas cuando salís de casa.",
      category: "Ubicación",
      icon: Target,
      color: "from-orange-500 to-red-500",
      points: 15,
      difficulty: "Medio",
      estimatedTime: "3 min",
      benefits: ["Ofertas cercanas", "Aprovechás el momento", "Descubrís nuevos lugares"],
    },
    {
      id: 8,
      title: "Usá múltiples bancos",
      content:
        "Configurá todos tus bancos en el perfil. Diferentes bancos tienen promociones en distintas categorías, así maximizás tus oportunidades de ahorro.",
      category: "Estrategia",
      icon: Star,
      color: "from-yellow-500 to-amber-500",
      points: 20,
      difficulty: "Medio",
      estimatedTime: "5 min",
      benefits: ["Más promociones", "Diversificás opciones", "Mejor cobertura"],
    },
    {
      id: 9,
      title: "Participá en desafíos diarios",
      content:
        "Los desafíos diarios son una forma divertida de ganar puntos extra mientras explorás nuevas funciones de la app. ¡No te los pierdas!",
      category: "Gamificación",
      icon: Zap,
      color: "from-cyan-500 to-blue-500",
      points: 30,
      difficulty: "Fácil",
      estimatedTime: "Variable",
      benefits: ["Puntos extra", "Descubrís funciones", "Diversión garantizada"],
    },
    {
      id: 10,
      title: "Estrategia avanzada de ahorro",
      content:
        "Combiná alertas de precio con promociones bancarias. Esperá a que baje el precio del producto y luego usá la promoción bancaria para maximizar el descuento.",
      category: "Avanzado",
      icon: TrendingUp,
      color: "from-emerald-500 to-teal-500",
      points: 50,
      difficulty: "Avanzado",
      estimatedTime: "15 min",
      benefits: ["Máximo ahorro", "Estrategia profesional", "Descuentos combinados"],
    },
  ]

  const currentTipData = tips[currentTipIndex]
  const isLastTip = currentTipIndex === tips.length - 1
  const isFirstTip = currentTipIndex === 0
  const progress = ((currentTipIndex + 1) / tips.length) * 100

  useEffect(() => {
    if (isOpen && !viewedTips.includes(currentTipData.id)) {
      setViewedTips((prev) => [...prev, currentTipData.id])
      setTotalPoints((prev) => prev + currentTipData.points)
    }
  }, [isOpen, currentTipIndex, currentTipData.id, currentTipData.points, viewedTips])

  const handleNext = () => {
    if (isLastTip) {
      handleComplete()
    } else {
      playSound("click")
      setCurrentTipIndex((prev) => prev + 1)
    }
  }

  const handlePrev = () => {
    if (!isFirstTip) {
      playSound("click")
      setCurrentTipIndex((prev) => prev - 1)
    }
  }

  const handleComplete = () => {
    playSound("achievement")
    setShowReward(true)

    // Agregar puntos por completar todos los tips
    addPoints("completeTips", totalPoints)

    setTimeout(() => {
      setShowReward(false)
      onClose()
    }, 3000)
  }

  const handleTipJump = (index: number) => {
    playSound("click")
    setCurrentTipIndex(index)
  }

  if (!isOpen) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-yellow-500" />
              <span>Tips y Consejos</span>
            </div>
            <Badge variant="outline">
              {currentTipIndex + 1} de {tips.length}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <AnimatePresence mode="wait">
          {showReward ? (
            <motion.div
              key="reward"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center py-8 space-y-4"
            >
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 360],
                }}
                transition={{ duration: 1 }}
              >
                <Gift className="w-16 h-16 mx-auto text-yellow-500" />
              </motion.div>

              <div className="space-y-2">
                <h3 className="text-xl font-bold text-yellow-600 dark:text-yellow-400">¡Felicitaciones!</h3>
                <p className="text-muted-foreground">Completaste todos los tips y ganaste</p>
                <motion.div
                  className="text-3xl font-bold text-yellow-600 dark:text-yellow-400"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 0.5, repeat: 3 }}
                >
                  +{totalPoints} puntos
                </motion.div>
              </div>

              <div className="grid grid-cols-3 gap-2 text-sm">
                <div className="p-2 bg-blue-50 dark:bg-blue-950 rounded-lg">
                  <p className="font-bold text-blue-600 dark:text-blue-400">{tips.length}</p>
                  <p className="text-muted-foreground">Tips leídos</p>
                </div>
                <div className="p-2 bg-green-50 dark:bg-green-950 rounded-lg">
                  <p className="font-bold text-green-600 dark:text-green-400">{totalPoints}</p>
                  <p className="text-muted-foreground">Puntos ganados</p>
                </div>
                <div className="p-2 bg-purple-50 dark:bg-purple-950 rounded-lg">
                  <p className="font-bold text-purple-600 dark:text-purple-400">100%</p>
                  <p className="text-muted-foreground">Completado</p>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key={currentTipIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Progress */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Progreso</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>

              {/* Tip Header */}
              <Card className={`bg-gradient-to-r ${currentTipData.color} text-white`}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <motion.div
                      animate={{
                        rotate: [0, 10, -10, 0],
                        scale: [1, 1.1, 1],
                      }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    >
                      <currentTipData.icon className="w-8 h-8" />
                    </motion.div>
                    <div className="flex-1">
                      <h2 className="text-lg font-bold">{currentTipData.title}</h2>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge className="bg-white/20 text-white hover:bg-white/30">{currentTipData.category}</Badge>
                        <Badge className="bg-white/20 text-white hover:bg-white/30">+{currentTipData.points} pts</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Tip Content */}
              <Card>
                <CardContent className="p-4 space-y-4">
                  <p className="text-muted-foreground leading-relaxed">{currentTipData.content}</p>

                  {/* Tip Details */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span>Dificultad: {currentTipData.difficulty}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Target className="w-4 h-4 text-blue-500" />
                      <span>Tiempo: {currentTipData.estimatedTime}</span>
                    </div>
                  </div>

                  {/* Benefits */}
                  <div className="space-y-2">
                    <p className="font-medium text-sm">Beneficios:</p>
                    <div className="space-y-1">
                      {currentTipData.benefits.map((benefit, index) => (
                        <motion.div
                          key={index}
                          className="flex items-center gap-2 text-sm"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <CheckCircle className="w-3 h-3 text-green-500" />
                          <span>{benefit}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Navigation */}
              <div className="flex items-center justify-between">
                <Button
                  variant="outline"
                  onClick={handlePrev}
                  disabled={isFirstTip}
                  className="flex items-center gap-1 bg-transparent"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Anterior
                </Button>

                <div className="flex gap-1">
                  {tips.map((_, index) => (
                    <motion.button
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentTipIndex
                          ? "bg-blue-500 w-6"
                          : viewedTips.includes(tips[index].id)
                            ? "bg-green-500"
                            : "bg-gray-300 dark:bg-gray-700"
                      }`}
                      onClick={() => handleTipJump(index)}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                    />
                  ))}
                </div>

                <Button
                  onClick={handleNext}
                  className={`flex items-center gap-1 bg-gradient-to-r ${currentTipData.color} hover:opacity-90`}
                >
                  {isLastTip ? (
                    <>
                      <Gift className="w-4 h-4" />
                      Reclamar recompensa
                    </>
                  ) : (
                    <>
                      Siguiente
                      <ChevronRight className="w-4 h-4" />
                    </>
                  )}
                </Button>
              </div>

              {/* Stats */}
              <Card className="bg-gradient-to-r from-gray-50 to-slate-50 dark:from-gray-950 dark:to-slate-950">
                <CardContent className="p-3">
                  <div className="grid grid-cols-3 gap-4 text-center text-sm">
                    <div>
                      <p className="font-bold text-blue-600 dark:text-blue-400">{viewedTips.length}</p>
                      <p className="text-muted-foreground">Leídos</p>
                    </div>
                    <div>
                      <p className="font-bold text-green-600 dark:text-green-400">{totalPoints}</p>
                      <p className="text-muted-foreground">Puntos</p>
                    </div>
                    <div>
                      <p className="font-bold text-purple-600 dark:text-purple-400">
                        {tips.length - viewedTips.length}
                      </p>
                      <p className="text-muted-foreground">Restantes</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  )
}
