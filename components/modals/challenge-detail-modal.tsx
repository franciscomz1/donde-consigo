"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Target, Clock, Trophy, Star, Flame, CheckCircle, ArrowRight, Gift, Zap, Users, TrendingUp } from "lucide-react"
import { useSound } from "@/lib/hooks/use-sound"
import { useGamification } from "@/lib/hooks/use-gamification"

interface ChallengeDetailModalProps {
  isOpen: boolean
  onClose: () => void
  challenge: any
  user: any
  onNavigate: (tab: string) => void
  onChallengeComplete?: (challengeId: number, points: number) => void
}

export function ChallengeDetailModal({
  isOpen,
  onClose,
  challenge,
  user,
  onNavigate,
  onChallengeComplete,
}: ChallengeDetailModalProps) {
  const [showConfetti, setShowConfetti] = useState(false)
  const [isCompleting, setIsCompleting] = useState(false)
  const { playSound } = useSound()
  const { addPoints } = useGamification(user?.id || user?.email || "default_user")

  // Crear un objeto seguro del desafío con valores por defecto
  const safeChallenge = {
    id: challenge?.id || 0,
    title: challenge?.title || "Desafío",
    description: challenge?.description || "Descripción del desafío",
    progress: Math.max(0, challenge?.progress || 0),
    target: Math.max(1, challenge?.target || 1),
    reward: challenge?.reward || 0,
    timeLeft: challenge?.timeLeft || "Sin tiempo límite",
    emoji: challenge?.emoji || "🎯",
    type: challenge?.type || "daily",
    isExpired: challenge?.isExpired || false,
    difficulty: challenge?.difficulty || "Fácil",
    completedAt: challenge?.completedAt || null,
  }

  const calculateProgress = () => {
    if (safeChallenge.target <= 0) return 0
    const progress = Math.min(100, Math.max(0, (safeChallenge.progress / safeChallenge.target) * 100))
    return isNaN(progress) ? 0 : progress
  }

  const getProgressText = () => {
    const progress = calculateProgress()
    if (isNaN(progress) || progress === 0) return "0% completado"
    return `${Math.round(progress)}% completado`
  }

  const isCompleted = safeChallenge.progress >= safeChallenge.target || safeChallenge.completedAt
  const progressPercentage = calculateProgress()

  useEffect(() => {
    if (isCompleted && !safeChallenge.completedAt && !showConfetti) {
      setShowConfetti(true)
      playSound("achievement")
      setTimeout(() => setShowConfetti(false), 3000)
    }
  }, [isCompleted, safeChallenge.completedAt, showConfetti, playSound])

  const handleStartChallenge = () => {
    playSound("click")
    onClose()

    if (safeChallenge.type === "favorites") {
      onNavigate("promos")
      // Activar filtro de favoritos después de navegar
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent("activateFavoritesFilter"))
      }, 500)
    } else {
      onNavigate("promos")
    }
  }

  const handleClaimReward = async () => {
    if (!isCompleted || isCompleting) return

    setIsCompleting(true)
    playSound("success")

    try {
      // Simular delay de reclamación
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Agregar puntos
      addPoints("challengeComplete", safeChallenge.reward)

      // Notificar completación
      if (onChallengeComplete) {
        onChallengeComplete(safeChallenge.id, safeChallenge.reward)
      }

      // Mostrar confetti
      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 3000)
    } catch (error) {
      console.error("Error claiming reward:", error)
    } finally {
      setIsCompleting(false)
    }
  }

  const getStatusBadge = () => {
    if (safeChallenge.isExpired) {
      return (
        <Badge variant="destructive" className="animate-pulse">
          Expirado
        </Badge>
      )
    }
    if (isCompleted) {
      return <Badge className="bg-green-500 hover:bg-green-600 text-white animate-bounce">¡Completado!</Badge>
    }
    return <Badge className="bg-orange-500 hover:bg-orange-600 text-white animate-pulse">En progreso</Badge>
  }

  const getMotivationalMessage = () => {
    if (safeChallenge.isExpired) {
      return "Este desafío ha expirado, pero hay más esperándote."
    }
    if (isCompleted) {
      return "¡Increíble! Has completado este desafío. ¡Seguí así!"
    }
    if (progressPercentage >= 75) {
      return "¡Ya casi lo lográs! Solo te falta un poquito más."
    }
    if (progressPercentage >= 50) {
      return "¡Vas por buen camino! Ya completaste la mitad."
    }
    if (progressPercentage >= 25) {
      return "¡Buen comienzo! Seguí sumando para completarlo."
    }
    return "¡Sumá tus primeros favoritos y ganá puntos!"
  }

  // Verificar si el modal debe mostrarse
  if (!isOpen || !challenge) {
    return null
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <motion.div
              animate={{
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              <Target className="w-6 h-6 text-green-500" />
            </motion.div>
            Desafío Diario
          </DialogTitle>
        </DialogHeader>

        {/* Confetti Animation */}
        <AnimatePresence>
          {showConfetti && (
            <div className="fixed inset-0 pointer-events-none z-50">
              {Array.from({ length: 80 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 rounded-full"
                  style={{
                    backgroundColor: ["#ff6b6b", "#4ecdc4", "#45b7d1", "#96ceb4", "#feca57", "#ff9ff3"][i % 6],
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  initial={{ scale: 0, y: 0 }}
                  animate={{
                    scale: [0, 1, 0],
                    y: [-100, -200],
                    x: [0, Math.random() * 200 - 100],
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 3,
                    ease: "easeOut",
                    delay: Math.random() * 0.5,
                  }}
                />
              ))}
            </div>
          )}
        </AnimatePresence>

        <div className="space-y-6">
          {/* Challenge Header */}
          <Card
            className={`${
              safeChallenge.isExpired
                ? "bg-gradient-to-r from-gray-50 to-slate-50 dark:from-gray-950 dark:to-slate-950"
                : isCompleted
                  ? "bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950"
                  : "bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950 dark:to-red-950"
            }`}
          >
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <motion.div
                  className="text-4xl"
                  animate={{
                    scale: isCompleted ? [1, 1.2, 1] : [1, 1.1, 1],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                >
                  {safeChallenge.emoji}
                </motion.div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-bold text-lg">{safeChallenge.title}</h3>
                    {getStatusBadge()}
                  </div>
                  <p className="text-muted-foreground mb-3">{safeChallenge.description}</p>

                  {/* Progress Section */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">{getProgressText()}</span>
                      <span className="text-muted-foreground">
                        {safeChallenge.progress}/{safeChallenge.target}
                      </span>
                    </div>
                    <Progress value={progressPercentage} className="h-3" />
                  </div>

                  {/* Motivational Message */}
                  <motion.p
                    className="text-sm text-center mt-3 font-medium text-green-600 dark:text-green-400"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={getMotivationalMessage()}
                  >
                    {getMotivationalMessage()}
                  </motion.p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Challenge Details */}
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-3 text-center">
                <Trophy className="w-6 h-6 mx-auto mb-2 text-yellow-500" />
                <p className="text-sm font-medium">Recompensa</p>
                <p className="text-lg font-bold text-yellow-600 dark:text-yellow-400">+{safeChallenge.reward} pts</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-3 text-center">
                <Clock className="w-6 h-6 mx-auto mb-2 text-blue-500" />
                <p className="text-sm font-medium">Tiempo restante</p>
                <p className="text-lg font-bold text-blue-600 dark:text-blue-400">{safeChallenge.timeLeft}</p>
              </CardContent>
            </Card>
          </div>

          {/* Challenge Stats */}
          <Card className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950">
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <Star className="w-5 h-5 text-purple-500" />
                <h4 className="font-bold">Detalles del desafío</h4>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Dificultad:</span>
                  <Badge variant="outline" className="text-xs">
                    {safeChallenge.difficulty}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span>Tipo:</span>
                  <span className="capitalize">{safeChallenge.type}</span>
                </div>
                <div className="flex justify-between">
                  <span>Progreso actual:</span>
                  <span className="font-medium">
                    {safeChallenge.progress} de {safeChallenge.target}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="space-y-3">
            {!safeChallenge.isExpired && !isCompleted && (
              <Button
                onClick={handleStartChallenge}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
                size="lg"
              >
                <ArrowRight className="w-4 h-4 mr-2" />
                {progressPercentage > 0 ? "Continuar desafío" : "Empezar desafío"}
              </Button>
            )}

            {isCompleted && !safeChallenge.completedAt && (
              <Button
                onClick={handleClaimReward}
                disabled={isCompleting}
                className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white"
                size="lg"
              >
                {isCompleting ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    >
                      <Zap className="w-4 h-4 mr-2" />
                    </motion.div>
                    Reclamando...
                  </>
                ) : (
                  <>
                    <Gift className="w-4 h-4 mr-2" />
                    Reclamar {safeChallenge.reward} puntos
                  </>
                )}
              </Button>
            )}

            {safeChallenge.isExpired && (
              <div className="text-center space-y-3">
                <p className="text-muted-foreground">Este desafío ha expirado</p>
                <Button
                  onClick={() => {
                    playSound("click")
                    onNavigate("promos")
                    onClose()
                  }}
                  variant="outline"
                  className="w-full"
                >
                  Explorar promociones
                </Button>
              </div>
            )}
          </div>

          {/* Next Challenges Preview */}
          {isCompleted && (
            <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="w-5 h-5 text-blue-500" />
                  <h4 className="font-bold text-blue-700 dark:text-blue-300">Próximos desafíos</h4>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-green-500" />
                    <span>Compartir 3 promociones (+150 pts)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Flame className="w-4 h-4 text-orange-500" />
                    <span>Usar el buscador de precios 5 veces (+200 pts)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-purple-500" />
                    <span>Completar perfil al 100% (+300 pts)</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
