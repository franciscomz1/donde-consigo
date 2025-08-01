"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Trophy, Star, Award, Sparkles } from "lucide-react"

interface Achievement {
  id: string
  type: "points" | "level" | "badge"
  value: number | string
  message: string
  animation?: "confetti" | "pulse" | "bounce"
}

interface AchievementToastProps {
  achievement: Achievement | null
  show: boolean
  onClose: () => void
}

export function AchievementToast({ achievement, show, onClose }: AchievementToastProps) {
  const [confetti, setConfetti] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([])

  useEffect(() => {
    if (show && achievement?.animation === "confetti") {
      const particles = Array.from({ length: 30 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 1000,
      }))
      setConfetti(particles)

      const timer = setTimeout(() => {
        setConfetti([])
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [show, achievement])

  const getIcon = () => {
    switch (achievement?.type) {
      case "points":
        return <Star className="w-6 h-6 text-yellow-500" />
      case "level":
        return <Trophy className="w-6 h-6 text-purple-500" />
      case "badge":
        return <Award className="w-6 h-6 text-green-500" />
      default:
        return <Star className="w-6 h-6 text-yellow-500" />
    }
  }

  const getBackgroundColor = () => {
    switch (achievement?.type) {
      case "points":
        return "from-yellow-500/20 to-orange-500/20"
      case "level":
        return "from-purple-500/20 to-pink-500/20"
      case "badge":
        return "from-green-500/20 to-emerald-500/20"
      default:
        return "from-blue-500/20 to-cyan-500/20"
    }
  }

  return (
    <>
      {/* Confetti */}
      <AnimatePresence>
        {confetti.map((particle) => (
          <motion.div
            key={particle.id}
            className="fixed pointer-events-none z-[100]"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
            initial={{ opacity: 0, scale: 0, rotate: 0 }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              rotate: [0, 360],
              y: [0, -100, 100],
            }}
            transition={{
              duration: 3,
              delay: particle.delay / 1000,
              ease: "easeOut",
            }}
          >
            <Sparkles className="w-4 h-4 text-yellow-400" />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Achievement Toast */}
      <AnimatePresence>
        {show && achievement && (
          <motion.div
            className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-sm px-4"
            initial={{ opacity: 0, y: -100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -100, scale: 0.8 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
          >
            <Card
              className={`bg-gradient-to-r ${getBackgroundColor()} border-2 border-white/20 shadow-2xl backdrop-blur-sm`}
            >
              <CardContent className="p-4">
                <motion.div
                  className="flex items-center gap-3"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", damping: 15 }}
                >
                  <motion.div
                    animate={achievement.animation === "pulse" ? { scale: [1, 1.2, 1] } : {}}
                    transition={{ duration: 0.6, repeat: 2 }}
                  >
                    {getIcon()}
                  </motion.div>

                  <div className="flex-1">
                    <motion.p
                      className="font-bold text-foreground"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      {achievement.message}
                    </motion.p>

                    {achievement.type === "level" && (
                      <motion.p
                        className="text-sm text-muted-foreground"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                      >
                        ¡Seguí así, vas genial!
                      </motion.p>
                    )}
                  </div>

                  <motion.div
                    className="text-2xl"
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  >
                    🎉
                  </motion.div>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
