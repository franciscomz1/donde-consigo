"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Gift, ChevronRight, Star, Trophy, Sparkles, Heart } from "lucide-react"
import { APP_CONFIG } from "@/lib/config/app-config"

interface WelcomeStepProps {
  onNext: () => void
  userData: any
  stepConfig: any
}

export function WelcomeStep({ onNext, userData, stepConfig }: WelcomeStepProps) {
  const features = [
    {
      emoji: "🔍",
      title: "Encontrá el mejor precio",
      description: "Compará automáticamente en todas las tiendas",
      color: "from-blue-100 to-cyan-100 dark:from-blue-900 dark:to-cyan-900",
    },
    {
      emoji: "🎁",
      title: "Promociones personalizadas",
      description: "Ofertas de tus bancos favoritos",
      color: "from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900",
    },
    {
      emoji: "🏆",
      title: "Ganá puntos y badges",
      description: "Cada acción suma para tu nivel",
      color: "from-yellow-100 to-orange-100 dark:from-yellow-900 dark:to-orange-900",
    },
    {
      emoji: "🔔",
      title: "Alertas inteligentes",
      description: "Te avisamos cuando baja el precio",
      color: "from-green-100 to-emerald-100 dark:from-green-900 dark:to-emerald-900",
    },
  ]

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      {/* Hero Card */}
      <Card className="bg-gradient-to-br from-purple-500 to-pink-500 text-white border-0 overflow-hidden relative">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-400/20"
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />

        <CardContent className="p-6 relative z-10">
          <div className="text-center">
            <motion.div
              className="w-20 h-20 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center"
              animate={{
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              <Gift className="w-10 h-10 text-white" />
            </motion.div>

            <motion.h1
              className="text-2xl font-bold mb-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              ¡Bienvenido a {APP_CONFIG.app.name}! 🎉
            </motion.h1>

            <motion.p
              className="text-white/90 text-lg mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {APP_CONFIG.app.tagline}
            </motion.p>

            <motion.div
              className="flex items-center justify-center gap-2 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Sparkles className="w-4 h-4" />
              <span>Configurá tu cuenta en 2 minutos</span>
              <Sparkles className="w-4 h-4" />
            </motion.div>
          </div>
        </CardContent>
      </Card>

      {/* Features Grid */}
      <div className="grid grid-cols-1 gap-3">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + index * 0.1 }}
            whileHover={{ scale: 1.02, x: 5 }}
          >
            <Card className={`bg-gradient-to-r ${feature.color} border-0 hover:shadow-md transition-all`}>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <motion.div
                    className="text-3xl"
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: index * 0.2 }}
                  >
                    {feature.emoji}
                  </motion.div>
                  <div className="flex-1">
                    <h3 className="font-bold text-sm">{feature.title}</h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{feature.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Benefits */}
      <Card className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 border-green-200 dark:border-green-800">
        <CardContent className="p-4">
          <div className="text-center space-y-3">
            <div className="flex items-center justify-center gap-2">
              <Heart className="w-5 h-5 text-green-600" />
              <h3 className="font-bold text-green-800 dark:text-green-200">¿Por qué vas a amar esta app?</h3>
            </div>

            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="text-center">
                <div className="text-2xl mb-1">💰</div>
                <p className="font-medium text-green-700 dark:text-green-300">Ahorrás dinero</p>
                <p className="text-xs text-green-600 dark:text-green-400">Hasta 40% menos</p>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-1">⚡</div>
                <p className="font-medium text-green-700 dark:text-green-300">Súper rápido</p>
                <p className="text-xs text-green-600 dark:text-green-400">En segundos</p>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-1">🎯</div>
                <p className="font-medium text-green-700 dark:text-green-300">Personalizado</p>
                <p className="text-xs text-green-600 dark:text-green-400">Solo para vos</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* CTA */}
      <motion.div
        className="space-y-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <Button
          onClick={onNext}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-4 text-lg shadow-xl border-0"
          size="lg"
        >
          <motion.div className="flex items-center gap-2" whileHover={{ x: 5 }}>
            ¡Empezar configuración!
            <ChevronRight className="w-5 h-5" />
          </motion.div>
        </Button>

        <div className="flex items-center justify-center gap-4 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-500" />
            <span>Hasta 150 puntos</span>
          </div>
          <div className="flex items-center gap-1">
            <Trophy className="w-4 h-4 text-purple-500" />
            <span>Badges exclusivos</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
