"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Camera, Upload, Star, ChevronRight, Sparkles, Check, AlertCircle } from "lucide-react"
import { useSound } from "@/lib/hooks/use-sound"
import { APP_CONFIG } from "@/lib/config/app-config"

interface ProfilePhotoStepProps {
  onNext: (data: any, points?: number) => void
  onSkip: () => void
  userData: any
  stepConfig: any
  isCompleted: boolean
}

export function ProfilePhotoStep({ onNext, onSkip, userData, stepConfig, isCompleted }: ProfilePhotoStepProps) {
  const [profilePhoto, setProfilePhoto] = useState<string | null>(userData.profilePhoto || null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const { playSound } = useSound()

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validaciones
    if (file.size > APP_CONFIG.limits.maxFileSize) {
      setUploadError("La imagen es muy grande. Máximo 5MB.")
      playSound("error")
      return
    }

    if (!file.type.startsWith("image/")) {
      setUploadError("Solo se permiten archivos de imagen.")
      playSound("error")
      return
    }

    setUploadError(null)
    setIsUploading(true)
    playSound("click")

    const reader = new FileReader()
    reader.onload = (e) => {
      setTimeout(() => {
        setProfilePhoto(e.target?.result as string)
        setIsUploading(false)
        playSound("success")
      }, 1500) // Simular upload con delay realista
    }
    reader.onerror = () => {
      setUploadError("Error al cargar la imagen. Intentá nuevamente.")
      setIsUploading(false)
      playSound("error")
    }
    reader.readAsDataURL(file)
  }

  const handleNext = () => {
    if (profilePhoto) {
      // Solo dar puntos si hay foto válida
      onNext({ profilePhoto }, stepConfig.points)
    } else {
      onNext({ profilePhoto: null }, 0)
    }
  }

  const handleSkip = () => {
    playSound("click")
    onSkip()
  }

  const removePhoto = () => {
    setProfilePhoto(null)
    setUploadError(null)
    playSound("click")
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      {/* Main Card */}
      <Card className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-2 border-white/20 shadow-2xl">
        <CardContent className="p-6">
          <div className="text-center">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", damping: 15 }}>
              <Camera className="w-12 h-12 mx-auto mb-4 text-blue-500" />
            </motion.div>

            <h2 className="text-2xl font-bold mb-2">¡Poné tu mejor foto! 📸</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Una foto de perfil te ayuda a personalizar tu experiencia
            </p>

            {/* Points indicator */}
            <div className="flex items-center justify-center gap-2 text-sm mb-6">
              <Star className="w-4 h-4 text-yellow-500" />
              <span className="font-medium text-yellow-600 dark:text-yellow-400">
                {profilePhoto
                  ? `¡Ganaste ${stepConfig.points} puntos!`
                  : `Sumá ${stepConfig.points} puntos subiendo una foto`}
              </span>
              <Sparkles className="w-4 h-4 text-yellow-500" />
            </div>

            {/* Avatar Section */}
            <div className="mb-6">
              <motion.div className="relative inline-block" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Avatar className="w-32 h-32 mx-auto mb-4 border-4 border-white shadow-2xl">
                  <AvatarImage src={profilePhoto || undefined} />
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-cyan-500 text-white text-4xl">
                    {isUploading ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                      >
                        <Camera className="w-12 h-12" />
                      </motion.div>
                    ) : profilePhoto ? (
                      <Check className="w-12 h-12" />
                    ) : (
                      <Camera className="w-12 h-12" />
                    )}
                  </AvatarFallback>
                </Avatar>

                {profilePhoto && !isUploading && (
                  <motion.div
                    className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", damping: 15 }}
                  >
                    <Check className="w-4 h-4 text-white" />
                  </motion.div>
                )}
              </motion.div>

              {/* Upload Button */}
              <div className="space-y-3">
                <label htmlFor="photo-upload" className="cursor-pointer">
                  <motion.div
                    className={`inline-flex items-center gap-3 px-6 py-3 rounded-xl transition-all shadow-lg ${
                      isUploading
                        ? "bg-gray-100 dark:bg-gray-800 text-gray-500 cursor-not-allowed"
                        : "bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900 dark:to-cyan-900 text-blue-700 dark:text-blue-300 hover:from-blue-200 hover:to-cyan-200 dark:hover:from-blue-800 dark:hover:to-cyan-800"
                    }`}
                    whileHover={!isUploading ? { scale: 1.05 } : {}}
                    whileTap={!isUploading ? { scale: 0.95 } : {}}
                  >
                    <Upload className="w-5 h-5" />
                    <span className="font-medium">
                      {isUploading ? "Subiendo..." : profilePhoto ? "Cambiar foto" : "Subir foto"}
                    </span>
                  </motion.div>
                </label>

                <input
                  id="photo-upload"
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                  disabled={isUploading}
                />

                {profilePhoto && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={removePhoto}
                    className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950"
                  >
                    Quitar foto
                  </Button>
                )}
              </div>

              {/* Error Message */}
              {uploadError && (
                <motion.div
                  className="mt-3 p-3 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
                    <AlertCircle className="w-4 h-4" />
                    <span className="text-sm">{uploadError}</span>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Benefits Card */}
      <Card className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 border-purple-200 dark:border-purple-800">
        <CardContent className="p-4">
          <h3 className="font-bold text-purple-700 dark:text-purple-300 mb-3 text-center">¿Por qué subir una foto?</h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span>Personalizá tu experiencia</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span>Aparecé en el ranking con estilo</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span>Ganás {stepConfig.points} puntos extra</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="space-y-3">
        <Button
          onClick={handleNext}
          disabled={isUploading}
          className={`w-full font-medium py-3 shadow-xl transition-all ${
            profilePhoto
              ? "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
              : "bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white"
          }`}
        >
          <motion.div className="flex items-center gap-2" whileHover={{ x: 5 }}>
            {profilePhoto ? (
              <>
                <Check className="w-4 h-4" />
                ¡Perfecto! Continuar
              </>
            ) : (
              <>
                Continuar sin foto
                <ChevronRight className="w-4 h-4" />
              </>
            )}
          </motion.div>
        </Button>

        {!stepConfig.required && (
          <Button
            variant="ghost"
            onClick={handleSkip}
            disabled={isUploading}
            className="w-full text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
          >
            Saltar este paso
          </Button>
        )}

        {!profilePhoto && (
          <div className="text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              💡 Con foto de perfil tenés más chances de ganar badges especiales
            </p>
          </div>
        )}
      </div>

      {/* Privacy Note */}
      <Card className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
        <CardContent className="p-3">
          <div className="flex items-center gap-2 text-sm text-blue-700 dark:text-blue-300">
            <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs">🔒</span>
            </div>
            <span>Tu foto está segura y solo la usamos para personalizar tu perfil</span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
