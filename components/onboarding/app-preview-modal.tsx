"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Search, Gift, Trophy, Bell, Star, TrendingUp, Heart, Zap, ChevronRight, X } from "lucide-react"
import { useSound } from "@/lib/hooks/use-sound"
import { APP_CONFIG } from "@/lib/config/app-config"

interface AppPreviewModalProps {
  isOpen: boolean
  onClose: () => void
  onStartOnboarding: () => void
}

export function AppPreviewModal({ isOpen, onClose, onStartOnboarding }: AppPreviewModalProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const { playSound } = useSound()

  const slides = [
    {
      id: "search",
      title: "Encontrá el mejor precio",
      description: "Compará precios en todas las tiendas con solo pegar un link",
      icon: Search,
      color: "from-blue-500 to-cyan-500",
      features: ["Búsqueda automática", "Comparación instantánea", "Alertas de precio"],
      illustration: "🔍💰",
    },
    {
      id: "promos",
      title: "Descubrí promociones",
      description: "Las mejores ofertas de tus bancos favoritos en un solo lugar",
      icon: Gift,
      color: "from-purple-500 to-pink-500",
      features: ["Promociones personalizadas", "Filtros por banco", "Favoritos"],
      illustration: "🎁✨",
    },
    {
      id: "gamification",
      title: "Ganá puntos y badges",
      description: "Cada acción suma puntos. Subí de nivel y desbloqueá recompensas",
      icon: Trophy,
      color: "from-yellow-500 to-orange-500",
      features: ["Sistema de puntos", "Niveles y badges", "Desafíos diarios"],
      illustration: "🏆⭐",
    },
    {
      id: "alerts",
      title: "Nunca pagues de más",
      description: "Te avisamos cuando baja el precio del producto que querés",
      icon: Bell,
      color: "from-green-500 to-emerald-500",
      features: ["Alertas inteligentes", "Notificaciones push", "Seguimiento 24/7"],
      illustration: "🔔💡",
    },
  ]

  const currentSlideData = slides[currentSlide]
  const isLastSlide = currentSlide === slides.length - 1

  const handleNext = () => {
    playSound("click")
    if (isLastSlide) {
      onStartOnboarding()
    } else {
      setCurrentSlide((prev) => prev + 1)
    }
  }

  const handlePrev = () => {
    playSound("click")
    if (currentSlide > 0) {
      setCurrentSlide((prev) => prev - 1)
    }
  }

  const handleSlideJump = (index: number) => {
    playSound("click")
    setCurrentSlide(index)
  }

  const handleSkip = () => {
    playSound("click")
    onStartOnboarding()
  }

  if (!isOpen) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto p-0 overflow-hidden bg-white dark:bg-gray-900">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">DC</span>
            </div>
            <div>
              <h2 className="font-bold text-lg">{APP_CONFIG.app.name}</h2>
              <p className="text-xs text-gray-500">{APP_CONFIG.app.tagline}</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0">
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Slide Content */}
        <div className="relative h-96 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 p-6"
            >
              <Card className={`h-full bg-gradient-to-br ${currentSlideData.color} text-white border-0`}>
                <CardContent className="p-6 h-full flex flex-col justify-center text-center">
                  {/* Illustration */}
                  <motion.div
                    className="text-6xl mb-4"
                    animate={{
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  >
                    {currentSlideData.illustration}
                  </motion.div>

                  {/* Content */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-2xl font-bold mb-2">{currentSlideData.title}</h3>
                      <p className="text-white/90 text-lg leading-relaxed">{currentSlideData.description}</p>
                    </div>

                    {/* Features */}
                    <div className="space-y-2">
                      {currentSlideData.features.map((feature, index) => (
                        <motion.div
                          key={feature}
                          className="flex items-center justify-center gap-2 text-sm"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 + index * 0.1 }}
                        >
                          <Star className="w-4 h-4" />
                          <span>{feature}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="p-4 space-y-4">
          {/* Dots Indicator */}
          <div className="flex justify-center gap-2">
            {slides.map((_, index) => (
              <motion.button
                key={index}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentSlide ? "bg-purple-500 w-6" : "bg-gray-300 dark:bg-gray-600"
                }`}
                onClick={() => handleSlideJump(index)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                aria-label={`Ir a slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button variant="outline" onClick={handleSkip} className="flex-1 bg-transparent">
              Saltar intro
            </Button>

            <Button
              onClick={handleNext}
              className={`flex-1 bg-gradient-to-r ${currentSlideData.color} hover:opacity-90 text-white border-0`}
            >
              <span className="flex items-center gap-2">
                {isLastSlide ? "¡Empezar!" : "Siguiente"}
                <ChevronRight className="w-4 h-4" />
              </span>
            </Button>
          </div>

          {/* Progress */}
          <div className="text-center">
            <p className="text-xs text-gray-500">
              {currentSlide + 1} de {slides.length}
            </p>
          </div>
        </div>

        {/* Benefits Footer */}
        <div className="bg-gray-50 dark:bg-gray-800 p-4 text-center">
          <div className="flex items-center justify-center gap-4 text-xs text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-1">
              <Zap className="w-3 h-3 text-yellow-500" />
              <span>Gratis siempre</span>
            </div>
            <div className="flex items-center gap-1">
              <Heart className="w-3 h-3 text-red-500" />
              <span>Sin publicidad</span>
            </div>
            <div className="flex items-center gap-1">
              <TrendingUp className="w-3 h-3 text-green-500" />
              <span>Ahorrá más</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
