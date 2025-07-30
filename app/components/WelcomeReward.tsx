"use client"

import { Button } from "@/components/ui/button"
import { Gift, Sparkles, Star } from "lucide-react"
import type { User } from "../types"

interface WelcomeRewardProps {
  setCurrentScreen: (screen: string) => void
  setUser: (user: User) => void
  onCompleteOnboarding: () => void
}

export default function WelcomeReward({ setCurrentScreen, setUser, onCompleteOnboarding }: WelcomeRewardProps) {
  const handleGoToHome = () => {
    // Set initial user data
    setUser({
      id: "1",
      name: "Usuario",
      email: "usuario@example.com",
      points: 50,
      level: "Novato",
    })
    onCompleteOnboarding()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 flex flex-col items-center justify-center px-8">
      <div className="text-center max-w-sm">
        {/* Animated celebration */}
        <div className="relative mb-12">
          <div className="w-40 h-40 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto shadow-2xl animate-pulse">
            <Gift className="w-20 h-20 text-white" />
          </div>
          <div className="absolute -top-4 -right-4 animate-bounce">
            <Sparkles className="w-8 h-8 text-yellow-500" />
          </div>
          <div className="absolute -bottom-4 -left-4 animate-bounce delay-300">
            <Star className="w-6 h-6 text-purple-500" />
          </div>
        </div>

        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">¡Bienvenido!</h1>

        <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl mb-8">
          <div className="text-6xl font-bold text-sky-500 mb-2">50</div>
          <p className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Puntos ganados</p>
          <p className="text-gray-600 dark:text-gray-300">por registrarte</p>
        </div>

        <p className="text-lg text-gray-600 dark:text-gray-300 mb-12 leading-relaxed">
          Sumá más puntos compartiendo promociones reales con la comunidad
        </p>

        <Button
          onClick={handleGoToHome}
          className="w-full h-16 bg-gradient-to-r from-sky-500 to-purple-500 hover:from-sky-600 hover:to-purple-600 text-white font-semibold text-lg rounded-2xl shadow-xl transform hover:scale-105 transition-all duration-200"
        >
          Ir al inicio
        </Button>
      </div>
    </div>
  )
}
