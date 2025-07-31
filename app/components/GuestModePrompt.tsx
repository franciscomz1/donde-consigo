"use client"

import { Button } from "@/components/ui/button"
import { User, Star, Gift, Users } from "lucide-react"

interface GuestModePromptProps {
  onRegister: () => void
  onLogin: () => void
}

export default function GuestModePrompt({ onRegister, onLogin }: GuestModePromptProps) {
  return (
    <div className="bg-gradient-to-r from-sky-50 to-purple-50 dark:from-sky-900/20 dark:to-purple-900/20 rounded-2xl p-6 border border-sky-200 dark:border-sky-700 mb-6">
      <div className="text-center mb-4">
        <div className="w-16 h-16 bg-gradient-to-r from-sky-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
          <User className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          ¡Registrate y personalizá tu experiencia!
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm">
          Desbloqueá todas las funciones y empezá a ganar puntos
        </p>
      </div>

      {/* Beneficios */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center">
          <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-2">
            <Star className="w-6 h-6 text-green-600" />
          </div>
          <p className="text-xs font-semibold text-gray-900 dark:text-white">Puntos y niveles</p>
        </div>
        <div className="text-center">
          <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-2">
            <Gift className="w-6 h-6 text-purple-600" />
          </div>
          <p className="text-xs font-semibold text-gray-900 dark:text-white">Premios exclusivos</p>
        </div>
        <div className="text-center">
          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-2">
            <Users className="w-6 h-6 text-blue-600" />
          </div>
          <p className="text-xs font-semibold text-gray-900 dark:text-white">Invitar amigos</p>
        </div>
      </div>

      <div className="space-y-3">
        <Button
          onClick={onRegister}
          className="w-full h-12 bg-gradient-to-r from-sky-500 to-purple-500 hover:from-sky-600 hover:to-purple-600 text-white font-semibold rounded-2xl"
        >
          Crear cuenta gratis
        </Button>
        <Button
          onClick={onLogin}
          variant="outline"
          className="w-full h-12 border-2 border-sky-200 hover:bg-sky-50 dark:border-sky-700 dark:hover:bg-sky-900/20 rounded-2xl bg-transparent"
        >
          Ya tengo cuenta
        </Button>
      </div>

      <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-4">💡 Es gratis y solo toma 30 segundos</p>
    </div>
  )
}
