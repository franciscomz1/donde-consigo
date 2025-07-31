"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { User, Gift, Sparkles } from "lucide-react"
import type { User as UserType } from "../types"

interface CompleteProfileModalProps {
  isOpen: boolean
  onClose: () => void
  onComplete: (profileData: { name: string; avatar?: string }) => void
  user: UserType | null
}

export default function CompleteProfileModal({ isOpen, onClose, onComplete, user }: CompleteProfileModalProps) {
  const [name, setName] = useState("")
  const [selectedAvatar, setSelectedAvatar] = useState("👤")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)

  const avatarOptions = ["👤", "👨", "👩", "👨‍💼", "👩‍💼", "👨‍🎓", "👩‍🎓", "🧑‍💻", "👨‍🔧", "👩‍🔬"]

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return

    setIsSubmitting(true)
    setShowConfetti(true)

    // Simular delay de guardado
    setTimeout(() => {
      onComplete({
        name: name.trim(),
        avatar: selectedAvatar,
      })
      setIsSubmitting(false)
      setShowConfetti(false)
      onClose()
    }, 1500)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 max-w-md w-full relative">
        {/* Confetti effect */}
        {showConfetti && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-4 left-4 text-2xl animate-bounce">🎉</div>
            <div className="absolute top-6 right-6 text-xl animate-bounce delay-100">✨</div>
            <div className="absolute bottom-8 left-8 text-lg animate-bounce delay-200">🎊</div>
            <div className="absolute bottom-6 right-4 text-xl animate-bounce delay-300">⭐</div>
          </div>
        )}

        <div className="text-center mb-6">
          <div className="w-20 h-20 bg-gradient-to-r from-sky-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-10 h-10 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">¡Completá tu perfil!</h3>
          <p className="text-gray-600 dark:text-gray-300">Personalizá tu experiencia y ganá 50 puntos</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Nombre */}
          <div>
            <Label htmlFor="name" className="text-gray-700 dark:text-gray-200 font-medium mb-2 block">
              ¿Cómo te llamás?
            </Label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Tu nombre"
              className="h-12 rounded-2xl border-gray-200 dark:border-gray-600 focus:border-sky-500 focus:ring-sky-500 text-lg"
              required
              disabled={isSubmitting}
            />
          </div>

          {/* Avatar selector */}
          <div>
            <Label className="text-gray-700 dark:text-gray-200 font-medium mb-3 block">Elegí tu avatar</Label>
            <div className="grid grid-cols-5 gap-3">
              {avatarOptions.map((avatar) => (
                <button
                  key={avatar}
                  type="button"
                  onClick={() => setSelectedAvatar(avatar)}
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl transition-all duration-200 ${
                    selectedAvatar === avatar
                      ? "bg-sky-500 scale-110 shadow-lg"
                      : "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                  }`}
                  disabled={isSubmitting}
                >
                  {avatar}
                </button>
              ))}
            </div>
          </div>

          {/* Beneficios */}
          <div className="bg-green-50 dark:bg-green-900/20 rounded-2xl p-4">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
              <Gift className="w-4 h-4 text-green-500 mr-2" />
              ¡Ganás por completar tu perfil!
            </h4>
            <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
              <li>• 50 puntos de bienvenida</li>
              <li>• Badge "Perfil completo"</li>
              <li>• Recomendaciones personalizadas</li>
              <li>• Acceso a funciones exclusivas</li>
            </ul>
          </div>

          <Button
            type="submit"
            disabled={!name.trim() || isSubmitting}
            className="w-full h-12 bg-gradient-to-r from-sky-500 to-purple-500 hover:from-sky-600 hover:to-purple-600 text-white font-semibold rounded-2xl disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Guardando...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 mr-2" />
                Completar perfil (+50 puntos)
              </>
            )}
          </Button>
        </form>

        <Button
          variant="ghost"
          onClick={onClose}
          className="w-full mt-3 text-gray-500 hover:text-gray-700"
          disabled={isSubmitting}
        >
          Ahora no
        </Button>
      </div>
    </div>
  )
}
