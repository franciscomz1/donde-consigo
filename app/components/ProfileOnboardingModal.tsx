"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Camera, Star, Gift, User, X } from "lucide-react"
import type { User as UserType } from "../types"

interface ProfileOnboardingModalProps {
  setCurrentScreen: (screen: string) => void
  user: UserType
  setUser: (user: UserType) => void
}

export default function ProfileOnboardingModal({ setCurrentScreen, user, setUser }: ProfileOnboardingModalProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    name: user.name || "",
    bio: "",
    avatar: user.avatar || "👤",
    location: "",
    favoriteCategory: "",
  })
  const [completionPercentage, setCompletionPercentage] = useState(25) // Base: registro completo

  const avatarOptions = [
    "👤",
    "👨",
    "👩",
    "👨‍💼",
    "👩‍💼",
    "👨‍🎓",
    "👩‍🎓",
    "🧑‍💻",
    "👨‍🔧",
    "👩‍🔬",
    "👨‍🎨",
    "👩‍⚕️",
    "👨‍🚀",
    "👩‍🌾",
  ]

  const categories = [
    { id: "supermercados", name: "Supermercados", icon: "🛒" },
    { id: "farmacia", name: "Farmacia", icon: "💊" },
    { id: "indumentaria", name: "Ropa", icon: "👕" },
    { id: "gastronomia", name: "Gastronomía", icon: "🍕" },
    { id: "tecnologia", name: "Tecnología", icon: "📱" },
    { id: "combustible", name: "Combustible", icon: "⛽" },
  ]

  const updateCompletion = () => {
    let completion = 25 // Base por registro
    if (formData.avatar !== "👤") completion += 25
    if (formData.bio.length > 0) completion += 25
    if (formData.favoriteCategory) completion += 25
    setCompletionPercentage(completion)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setTimeout(updateCompletion, 100)
  }

  const handleComplete = () => {
    const pointsEarned = Math.floor(completionPercentage * 0.5) // Hasta 50 puntos por completar 100%

    const updatedUser = {
      ...user,
      ...formData,
      points: user.points + pointsEarned,
      achievements: [
        ...user.achievements,
        {
          id: "profile-complete",
          title: "Perfil Completo",
          description: `Completaste tu perfil al ${completionPercentage}%`,
          icon: "👤",
          unlockedAt: new Date(),
          points: pointsEarned,
        },
      ],
    }

    setUser(updatedUser)
    setCurrentScreen("favoritesSelection")
  }

  const handleSkip = () => {
    // Mostrar un gentle reminder
    if (completionPercentage < 75) {
      setCurrentStep(99) // Página de "¿Estás seguro?"
    } else {
      setCurrentScreen("favoritesSelection")
    }
  }

  if (currentStep === 99) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col items-center justify-center px-8">
        <div className="text-center max-w-sm">
          <div className="w-24 h-24 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center mx-auto mb-8">
            <span className="text-4xl">😔</span>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">¡Estás perdiendo puntos!</h1>

          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Completar tu perfil te da hasta <strong>50 puntos extra</strong> y mejores recomendaciones
          </p>

          <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-2xl p-4 mb-8">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Lo que te estás perdiendo:</h4>
            <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1 text-left">
              <li>• Ofertas personalizadas según tus gustos</li>
              <li>• Mejor posición en el ranking</li>
              <li>• Badges exclusivos de perfil completo</li>
              <li>• Recomendaciones de amigos similares</li>
            </ul>
          </div>

          <div className="space-y-4">
            <Button
              onClick={() => setCurrentStep(1)}
              className="w-full h-14 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-2xl"
            >
              <Gift className="w-5 h-5 mr-2" />
              Sí, quiero ganar puntos extra
            </Button>

            <Button
              onClick={() => setCurrentScreen("favoritesSelection")}
              variant="ghost"
              className="w-full text-gray-500"
            >
              Continuar sin completar
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col">
      {/* Header with progress */}
      <div className="pt-12 pb-8 px-8">
        <div className="flex items-center justify-between mb-6">
          <Button
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            variant="ghost"
            size="sm"
            className="rounded-full"
          >
            <X className="w-5 h-5" />
          </Button>
          <div className="text-center flex-1">
            <div className="w-48 bg-gray-200 dark:bg-gray-700 rounded-full h-2 mx-auto mb-2">
              <div
                className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">Perfil {completionPercentage}% completo</p>
          </div>
          <div className="w-10" /> {/* Spacer */}
        </div>

        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Personalizá tu perfil</h1>
          <p className="text-gray-600 dark:text-gray-300">Cada paso suma puntos y mejora tu experiencia</p>
        </div>
      </div>

      {/* Steps */}
      <div className="flex-1 px-8">
        {currentStep === 1 && (
          <div className="max-w-sm mx-auto space-y-6">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Camera className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Elegí tu avatar</h2>
              <p className="text-gray-600 dark:text-gray-300">+25 puntos por personalizar tu imagen</p>
            </div>

            <div className="grid grid-cols-5 gap-3">
              {avatarOptions.map((avatar) => (
                <button
                  key={avatar}
                  onClick={() => handleInputChange("avatar", avatar)}
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl transition-all duration-200 ${
                    formData.avatar === avatar
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 scale-110 shadow-lg"
                      : "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                  }`}
                >
                  {avatar}
                </button>
              ))}
            </div>

            <Button
              onClick={() => setCurrentStep(2)}
              disabled={formData.avatar === "👤"}
              className="w-full h-12 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl disabled:opacity-50"
            >
              Continuar (+25 puntos)
            </Button>
          </div>
        )}

        {currentStep === 2 && (
          <div className="max-w-sm mx-auto space-y-6">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Contanos sobre vos</h2>
              <p className="text-gray-600 dark:text-gray-300">+25 puntos por completar tu bio</p>
            </div>

            <div className="space-y-4">
              <div>
                <Label className="text-gray-700 dark:text-gray-200 font-medium mb-2 block">
                  ¿Qué te gusta hacer en tu tiempo libre?
                </Label>
                <Input
                  value={formData.bio}
                  onChange={(e) => handleInputChange("bio", e.target.value)}
                  placeholder="Ej: Me encanta cocinar y viajar"
                  className="h-12 rounded-xl"
                  maxLength={100}
                />
                <p className="text-xs text-gray-500 mt-1">{formData.bio.length}/100</p>
              </div>

              <div>
                <Label className="text-gray-700 dark:text-gray-200 font-medium mb-2 block">
                  ¿En qué zona vivís? (Opcional)
                </Label>
                <Input
                  value={formData.location}
                  onChange={(e) => handleInputChange("location", e.target.value)}
                  placeholder="Ej: Palermo, CABA"
                  className="h-12 rounded-xl"
                />
              </div>
            </div>

            <div className="flex space-x-3">
              <Button onClick={() => setCurrentStep(1)} variant="ghost" className="flex-1 rounded-xl">
                Volver
              </Button>
              <Button
                onClick={() => setCurrentStep(3)}
                disabled={formData.bio.length < 10}
                className="flex-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl disabled:opacity-50"
              >
                Continuar (+25 puntos)
              </Button>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="max-w-sm mx-auto space-y-6">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">¿Qué ofertas te interesan más?</h2>
              <p className="text-gray-600 dark:text-gray-300">+25 puntos por elegir tu categoría favorita</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleInputChange("favoriteCategory", category.id)}
                  className={`p-4 rounded-2xl border-2 transition-all duration-200 ${
                    formData.favoriteCategory === category.id
                      ? "border-green-500 bg-green-50 dark:bg-green-900/20 scale-105"
                      : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                  }`}
                >
                  <div className="text-3xl mb-2">{category.icon}</div>
                  <p className="font-semibold text-gray-900 dark:text-white text-sm">{category.name}</p>
                </button>
              ))}
            </div>

            <div className="flex space-x-3">
              <Button onClick={() => setCurrentStep(2)} variant="ghost" className="flex-1 rounded-xl">
                Volver
              </Button>
              <Button
                onClick={handleComplete}
                disabled={!formData.favoriteCategory}
                className="flex-2 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-xl disabled:opacity-50"
              >
                ¡Completar perfil! (+{Math.floor(completionPercentage * 0.5)} puntos)
              </Button>
            </div>
          </div>
        )}

        {/* Skip option */}
        <div className="text-center mt-8">
          <Button
            onClick={handleSkip}
            variant="ghost"
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            Saltear por ahora
          </Button>
        </div>
      </div>
    </div>
  )
}
