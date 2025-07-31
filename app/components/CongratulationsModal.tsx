"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Sparkles, Trophy, Gift, Star, Users } from "lucide-react"
import type { User } from "../types"

interface CongratulationsModalProps {
  setCurrentScreen: (screen: string) => void
  user: User
}

export default function CongratulationsModal({ setCurrentScreen, user }: CongratulationsModalProps) {
  const [showConfetti, setShowConfetti] = useState(false)
  const [pointsAnimation, setPointsAnimation] = useState(false)

  useEffect(() => {
    setShowConfetti(true)
    setTimeout(() => setPointsAnimation(true), 500)
    setTimeout(() => setShowConfetti(false), 3000)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 flex flex-col items-center justify-center px-8 relative overflow-hidden">
      {/* Confetti Animation */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 text-3xl animate-bounce">🎉</div>
          <div className="absolute top-32 right-20 text-2xl animate-bounce delay-100">✨</div>
          <div className="absolute bottom-40 left-20 text-xl animate-bounce delay-200">🎊</div>
          <div className="absolute bottom-60 right-10 text-2xl animate-bounce delay-300">⭐</div>
          <div className="absolute top-40 left-1/2 text-lg animate-bounce delay-500">🔥</div>
          <div className="absolute bottom-80 right-1/3 text-xl animate-bounce delay-700">💫</div>
        </div>
      )}

      <div className="text-center max-w-md relative z-10">
        {/* Main celebration icon */}
        <div className="relative mb-8">
          <div className="w-40 h-40 bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto shadow-2xl animate-pulse">
            <Trophy className="w-20 h-20 text-white" />
          </div>

          {/* Floating achievement badges */}
          <div className="absolute -top-4 -right-4 animate-bounce delay-300">
            <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-xl">
              <Gift className="w-8 h-8 text-white" />
            </div>
          </div>
          <div className="absolute -bottom-2 -left-4 animate-bounce delay-700">
            <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-red-500 rounded-full flex items-center justify-center shadow-xl">
              <Star className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 animate-fade-in">
          ¡Felicitaciones, {user.name}! 🎉
        </h1>

        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 animate-slide-up">
          Tu cuenta fue creada exitosamente y ya sos parte de la comunidad
        </p>

        {/* Achievement Card */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-2xl mb-8 animate-scale-in">
          <div className="mb-6">
            <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🏆</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">¡Badge desbloqueado!</h3>
            <div className="inline-flex items-center px-4 py-2 bg-green-100 dark:bg-green-900/30 rounded-full">
              <span className="text-green-600 dark:text-green-400 font-semibold">🎉 Bienvenido a la comunidad</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="text-center p-4 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-2xl">
              <div
                className={`text-4xl font-bold text-green-500 mb-2 transition-all duration-1000 ${pointsAnimation ? "animate-bounce" : ""}`}
              >
                {user.points}
              </div>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">Puntos ganados</p>
              <p className="text-xs text-gray-600 dark:text-gray-300">¡Bonus de bienvenida!</p>
            </div>

            <div className="text-center p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl">
              <div className="text-2xl mb-2">🥇</div>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">Nivel {user.level}</p>
              <p className="text-xs text-gray-600 dark:text-gray-300">¡Primer logro!</p>
            </div>
          </div>
        </div>

        {/* Next steps preview */}
        <div className="bg-gradient-to-r from-sky-50 to-purple-50 dark:from-sky-900/20 dark:to-purple-900/20 rounded-2xl p-6 mb-8">
          <h4 className="font-bold text-gray-900 dark:text-white mb-4">¿Qué sigue?</h4>
          <div className="space-y-3 text-left">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-sky-500 rounded-full flex items-center justify-center">
                <Users className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">Completá tu perfil</p>
                <p className="text-xs text-gray-600 dark:text-gray-300">+50 puntos extra</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                <Gift className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">Elegí tus bancos favoritos</p>
                <p className="text-xs text-gray-600 dark:text-gray-300">Para ofertas personalizadas</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">Explorá promociones</p>
                <p className="text-xs text-gray-600 dark:text-gray-300">Descubrí ofertas cerca tuyo</p>
              </div>
            </div>
          </div>
        </div>

        <Button
          onClick={() => setCurrentScreen("profileOnboarding")}
          className="w-full h-16 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 hover:from-green-600 hover:via-blue-600 hover:to-purple-600 text-white font-semibold text-lg rounded-2xl shadow-xl transform hover:scale-105 transition-all duration-300"
        >
          <span className="mr-3">Empezar a personalizar</span>
          <Sparkles className="w-6 h-6" />
        </Button>

        <Button
          onClick={() => setCurrentScreen("favoritesSelection")}
          variant="ghost"
          className="w-full mt-3 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          Continuar sin personalizar (puedes hacerlo después)
        </Button>
      </div>
    </div>
  )
}
