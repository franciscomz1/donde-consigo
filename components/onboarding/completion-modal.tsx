"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Trophy, Star, Sparkles, Share2, Crown, Rocket } from "lucide-react"
import { useSound } from "@/lib/hooks/use-sound"
import { APP_CONFIG } from "@/lib/config/app-config"

interface CompletionModalProps {
  userData: any
  gamificationState: any
  onComplete: () => void
  onShare: () => void
}

export function CompletionModal({ userData, gamificationState, onComplete, onShare }: CompletionModalProps) {
  const [showConfetti, setShowConfetti] = useState(false)
  const [currentAnimation, setCurrentAnimation] = useState(0)
  const { playSound } = useSound()

  const animations = ["¡Increíble! 🎉", "¡Sos genial! ⭐", "¡Bienvenido! 🚀"]

  useEffect(() => {
    setShowConfetti(true)
    playSound("achievement")

    // Cycle through animations
    const animationTimer = setInterval(() => {
      setCurrentAnimation((prev) => (prev + 1) % animations.length)
    }, 2000)

    const confettiTimer = setTimeout(() => setShowConfetti(false), 5000)

    return () => {
      clearInterval(animationTimer)
      clearTimeout(confettiTimer)
    }
  }, [playSound])

  const nextLevelProgress = getProgressToNextLevel(gamificationState)
  const completionPercentage = 100 // Usuario completó onboarding

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-purple-950 dark:via-pink-950 dark:to-blue-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Enhanced Confetti Animation */}
      <AnimatePresence>
        {showConfetti && (
          <div className="fixed inset-0 pointer-events-none z-40">
            {[...Array(100)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                initial={{ opacity: 0, scale: 0, rotate: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                  rotate: [0, 360, 720],
                  y: [0, -300, 600],
                  x: [0, Math.random() * 400 - 200],
                }}
                transition={{
                  duration: 4,
                  delay: Math.random() * 3,
                  ease: "easeOut",
                }}
              >
                <div
                  className={`w-4 h-4 ${
                    ["bg-yellow-400", "bg-pink-400", "bg-purple-400", "bg-blue-400", "bg-green-400", "bg-red-400"][
                      Math.floor(Math.random() * 6)
                    ]
                  } rounded-full shadow-lg`}
                />
              </motion.div>
            ))}

            {/* Sparkles */}
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={`sparkle-${i}`}
                className="absolute"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1.5, 0],
                  rotate: [0, 180],
                }}
                transition={{
                  duration: 2,
                  delay: Math.random() * 2,
                  repeat: 2,
                }}
              >
                <Sparkles className="w-6 h-6 text-yellow-400" />
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
        className="w-full max-w-md relative z-10"
      >
        <Card className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-2 border-white/20 shadow-2xl overflow-hidden">
          <CardContent className="p-0">
            {/* Header with animated background */}
            <div className="relative p-8 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 text-white overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-400/20"
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              />

              <div className="relative z-10 text-center">
                <motion.div
                  className="w-20 h-20 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center shadow-2xl"
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    rotate: { duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                    scale: { duration: 2, repeat: Number.POSITIVE_INFINITY },
                  }}
                >
                  <Crown className="w-10 h-10 text-white" />
                </motion.div>

                <motion.h2
                  className="text-3xl font-bold mb-2"
                  key={currentAnimation}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  {animations[currentAnimation]}
                </motion.h2>

                <p className="text-white/90 text-lg">¡Completaste la configuración inicial!</p>
              </div>
            </div>

            {/* Stats Section */}
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <motion.div
                  className="p-4 bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900 dark:to-orange-900 rounded-xl text-center"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <Star className="w-8 h-8 text-yellow-600 dark:text-yellow-400 mx-auto mb-2" />
                  </motion.div>
                  <motion.p
                    className="font-bold text-2xl text-yellow-700 dark:text-yellow-300"
                    initial={{ scale: 1.5 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", damping: 15 }}
                  >
                    {gamificationState.points}
                  </motion.p>
                  <p className="text-sm text-yellow-600 dark:text-yellow-400">Puntos ganados</p>
                </motion.div>

                <motion.div
                  className="p-4 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 rounded-xl text-center"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Trophy className="w-8 h-8 text-purple-600 dark:text-purple-400 mx-auto mb-2" />
                  <p className="font-bold text-2xl text-purple-700 dark:text-purple-300">
                    Nivel {gamificationState.level}
                  </p>
                  <p className="text-sm text-purple-600 dark:text-purple-400">
                    {
                      APP_CONFIG.gamification.levels[
                        gamificationState.level as keyof typeof APP_CONFIG.gamification.levels
                      ]?.name
                    }
                  </p>
                </motion.div>
              </div>

              {/* Achievements */}
              <motion.div
                className="mb-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 rounded-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Trophy className="w-5 h-5 text-green-500" />
                  <span className="font-medium text-green-700 dark:text-green-300">Logros desbloqueados</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {gamificationState.badges?.map((badge: string, index: number) => (
                    <motion.div
                      key={badge}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.9 + index * 0.1, type: "spring", damping: 15 }}
                    >
                      <Badge className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                        🏆 {badge === "onboarding_complete" ? "Configuración completa" : badge}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Next Level Progress */}
              <motion.div
                className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950 rounded-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-blue-700 dark:text-blue-300">Progreso al próximo nivel</span>
                  <span className="text-sm text-muted-foreground">
                    {nextLevelProgress.pointsNeeded} puntos restantes
                  </span>
                </div>
                <Progress value={nextLevelProgress.progress} className="h-3 mb-2" />
                <p className="text-xs text-muted-foreground">Próximo: {nextLevelProgress.nextLevelName}</p>
              </motion.div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }}>
                  <Button
                    onClick={() => {
                      playSound("success")
                      onComplete()
                    }}
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-4 text-lg shadow-xl"
                    size="lg"
                  >
                    <motion.div className="flex items-center gap-2" whileHover={{ x: 5 }}>
                      <Rocket className="w-5 h-5" />
                      ¡Empezar a explorar!
                    </motion.div>
                  </Button>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }}>
                  <Button
                    onClick={() => {
                      playSound("click")
                      onShare()
                    }}
                    variant="outline"
                    className="w-full border-2 border-purple-200 hover:bg-purple-50 dark:border-purple-800 dark:hover:bg-purple-950 bg-transparent font-medium py-3"
                  >
                    <motion.div className="flex items-center gap-2" whileHover={{ scale: 1.05 }}>
                      <Share2 className="w-4 h-4" />
                      Compartir logro (+25 puntos)
                    </motion.div>
                  </Button>
                </motion.div>
              </div>

              {/* Motivational Messages */}
              <motion.div
                className="mt-6 text-center space-y-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4 }}
              >
                <p className="text-sm font-medium text-purple-600 dark:text-purple-400">
                  🎯 ¡Ya podés empezar a ganar puntos con cada acción!
                </p>
                <p className="text-xs text-muted-foreground">
                  💡 Completá tu perfil al 100% para desbloquear funciones exclusivas
                </p>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

// Helper function para calcular progreso al próximo nivel
function getProgressToNextLevel(gamificationState: any) {
  const levels = APP_CONFIG.gamification.levels
  const currentLevel = gamificationState.level
  const nextLevel = currentLevel + 1

  if (!levels[nextLevel as keyof typeof levels]) {
    return { progress: 100, pointsNeeded: 0, nextLevelName: "Máximo nivel" }
  }

  const currentLevelConfig = levels[currentLevel as keyof typeof levels]
  const nextLevelConfig = levels[nextLevel as keyof typeof levels]

  const pointsInCurrentLevel = gamificationState.points - currentLevelConfig.min
  const pointsNeededForNextLevel = nextLevelConfig.min - currentLevelConfig.min
  const progress = (pointsInCurrentLevel / pointsNeededForNextLevel) * 100
  const pointsNeeded = nextLevelConfig.min - gamificationState.points

  return {
    progress: Math.min(progress, 100),
    pointsNeeded: Math.max(pointsNeeded, 0),
    nextLevelName: nextLevelConfig.name,
  }
}
