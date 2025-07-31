"use client"

import { Button } from "@/components/ui/button"
import { Gift, Sparkles, Star, Users, Trophy } from "lucide-react"
import type { User } from "../types"

interface WelcomeRewardProps {
  setCurrentScreen: (screen: string) => void
  setUser: (user: User) => void
  onCompleteOnboarding: () => void
}

export default function WelcomeReward({ setCurrentScreen, setUser, onCompleteOnboarding }: WelcomeRewardProps) {
  const handleGoToHome = () => {
    // Set initial user data with enhanced gamification
    setUser({
      id: "1",
      name: "Usuario",
      email: "usuario@example.com",
      points: 100, // Bonus de bienvenida aumentado
      level: "Novato", // Ensure level is always set
      streak: 1,
      totalSavings: 0,
      promosShared: 0,
      referralCode: `REF${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
      joinDate: new Date(),
      achievements: [
        {
          id: "welcome",
          title: "¡Bienvenido!",
          description: "Te uniste a la comunidad",
          icon: "🎉",
          unlockedAt: new Date(),
          points: 50,
        },
      ],
      favoriteStores: [],
      favoriteBanks: [],
      favoriteCards: [],
    })
    onCompleteOnboarding()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 flex flex-col items-center justify-center px-8 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-4 h-4 bg-yellow-300 rounded-full animate-bounce opacity-60" />
        <div className="absolute top-40 right-20 w-3 h-3 bg-pink-300 rounded-full animate-pulse opacity-50" />
        <div className="absolute bottom-40 left-20 w-2 h-2 bg-blue-300 rounded-full animate-ping opacity-40" />
        <div className="absolute bottom-60 right-10 w-5 h-5 bg-purple-300 rounded-full animate-bounce delay-500 opacity-50" />
      </div>

      <div className="text-center max-w-sm relative z-10">
        {/* Enhanced celebration animation */}
        <div className="relative mb-12">
          <div className="w-40 h-40 bg-gradient-to-br from-yellow-400 via-orange-500 to-pink-500 rounded-full flex items-center justify-center mx-auto shadow-2xl animate-pulse">
            <Gift className="w-20 h-20 text-white" />
          </div>

          {/* Floating celebration icons */}
          <div className="absolute -top-6 -right-6 animate-bounce">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-full flex items-center justify-center shadow-lg">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="absolute -bottom-4 -left-6 animate-bounce delay-300">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-300 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
              <Star className="w-5 h-5 text-white" />
            </div>
          </div>
          <div className="absolute top-2 -left-8 animate-bounce delay-700">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-300 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
              <Trophy className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>

        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 animate-fade-in">
          ¡Listo! Ya sos parte de la comunidad
        </h1>

        <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl mb-8 animate-scale-in">
          <div className="flex items-center justify-center space-x-6 mb-6">
            <div className="text-center">
              <div className="text-5xl font-bold text-green-500 mb-2">100</div>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">Puntos</p>
              <p className="text-xs text-gray-600 dark:text-gray-300">de bienvenida</p>
            </div>
            <div className="w-px h-16 bg-gray-200 dark:bg-gray-600"></div>
            <div className="text-center">
              <div className="text-3xl mb-2">🏆</div>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">Logro</p>
              <p className="text-xs text-gray-600 dark:text-gray-300">desbloqueado</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-2xl p-4">
            <div className="flex items-center space-x-3">
              <Users className="w-6 h-6 text-blue-500" />
              <div>
                <p className="font-semibold text-gray-900 dark:text-white text-sm">¡Bienvenido a la comunidad!</p>
                <p className="text-xs text-gray-600 dark:text-gray-300">
                  Compartí promos, sumá puntos y ganá premios reales
                </p>
              </div>
            </div>
          </div>
        </div>

        <p className="text-lg text-gray-600 dark:text-gray-300 mb-12 leading-relaxed animate-slide-up">
          Empezá a descubrir promociones, conectar con otros usuarios y ganar puntos por cada interacción
        </p>

        <Button
          onClick={handleGoToHome}
          className="w-full h-16 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 hover:from-green-600 hover:via-blue-600 hover:to-purple-600 text-white font-semibold text-lg rounded-2xl shadow-xl transform hover:scale-105 transition-all duration-300 animate-fade-in"
        >
          <span className="mr-3">Explorar la comunidad</span>
          <Sparkles className="w-6 h-6" />
        </Button>
      </div>
    </div>
  )
}
