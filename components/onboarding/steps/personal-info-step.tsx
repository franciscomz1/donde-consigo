"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { User, Star, ChevronRight, Mail, UserCheck, Heart, AlertCircle, Check } from "lucide-react"
import { useSound } from "@/lib/hooks/use-sound"
import { APP_CONFIG } from "@/lib/config/app-config"

interface PersonalInfoStepProps {
  onNext: (data: any, points?: number) => void
  onSkip: () => void
  userData: any
  stepConfig: any
  isCompleted: boolean
}

export function PersonalInfoStep({ onNext, onSkip, userData, stepConfig, isCompleted }: PersonalInfoStepProps) {
  const [formData, setFormData] = useState({
    name: userData.name || "",
    preferredName: userData.preferredName || "",
    email: userData.email || "",
    phone: userData.phone || "",
  })
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { playSound } = useSound()

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validatePhone = (phone: string) => {
    if (!phone) return true // Phone is optional
    const phoneRegex = /^[+]?[0-9\s\-$$$$]{10,}$/
    return phoneRegex.test(phone.replace(/\s/g, ""))
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))

    // Clear error when user starts typing
    if (errors[field as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors = { name: "", email: "", phone: "" }
    let isValid = true

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "El nombre es requerido"
      isValid = false
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "El nombre debe tener al menos 2 caracteres"
      isValid = false
    } else if (formData.name.trim().length > APP_CONFIG.limits.maxNameLength) {
      newErrors.name = `El nombre no puede tener más de ${APP_CONFIG.limits.maxNameLength} caracteres`
      isValid = false
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "El email es requerido"
      isValid = false
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Ingresá un email válido"
      isValid = false
    }

    // Phone validation (optional)
    if (formData.phone && !validatePhone(formData.phone)) {
      newErrors.phone = "Ingresá un teléfono válido"
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleNext = async () => {
    if (!validateForm()) {
      playSound("error")
      return
    }

    setIsSubmitting(true)
    playSound("click")

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const cleanData = {
      name: formData.name.trim(),
      preferredName: formData.preferredName.trim() || formData.name.trim().split(" ")[0],
      email: formData.email.trim().toLowerCase(),
      phone: formData.phone.trim(),
    }

    setIsSubmitting(false)
    onNext(cleanData, stepConfig.points)
  }

  const handleSkip = () => {
    if (stepConfig.required) return
    playSound("click")
    onSkip()
  }

  const isFormValid = formData.name.trim() && formData.email.trim() && validateEmail(formData.email)
  const hasPreferredName = formData.preferredName.trim() && formData.preferredName.trim() !== formData.name.trim()

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      {/* Main Card */}
      <Card className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-2 border-white/20 shadow-2xl">
        <CardContent className="p-6">
          <div className="text-center mb-6">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", damping: 15 }}>
              <User className="w-12 h-12 mx-auto mb-4 text-green-500" />
            </motion.div>

            <h2 className="text-2xl font-bold mb-2">Contanos sobre vos 👤</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Completá tu información para personalizar tu experiencia
            </p>

            <div className="flex items-center justify-center gap-2 text-sm mb-6">
              <Star className="w-4 h-4 text-yellow-500" />
              <span className="font-medium text-yellow-600 dark:text-yellow-400">
                +{stepConfig.points} puntos por completar este paso
              </span>
            </div>
          </div>

          {/* Form */}
          <div className="space-y-4">
            {/* Name Field */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
              <Label htmlFor="name" className="text-base font-medium flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-green-500" />
                ¿Cómo te llamás? *
              </Label>
              <div className="relative mt-2">
                <Input
                  id="name"
                  type="text"
                  placeholder="Tu nombre completo"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className={`py-3 text-lg transition-all ${
                    errors.name
                      ? "border-red-500 focus:border-red-500"
                      : formData.name.trim()
                        ? "border-green-500 focus:border-green-500"
                        : ""
                  }`}
                  maxLength={APP_CONFIG.limits.maxNameLength}
                />
                {formData.name.trim() && !errors.name && (
                  <motion.div
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                  >
                    <Check className="w-5 h-5 text-green-500" />
                  </motion.div>
                )}
              </div>
              {errors.name && (
                <motion.p
                  className="text-red-500 text-sm mt-1 flex items-center gap-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <AlertCircle className="w-3 h-3" />
                  {errors.name}
                </motion.p>
              )}
            </motion.div>

            {/* Preferred Name Field */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
              <Label htmlFor="preferredName" className="text-base font-medium flex items-center gap-2">
                <Heart className="w-4 h-4 text-pink-500" />
                ¿Cómo te gusta que te digan?
                <Badge variant="secondary" className="text-xs">
                  Opcional
                </Badge>
              </Label>
              <div className="relative mt-2">
                <Input
                  id="preferredName"
                  type="text"
                  placeholder="Ej: Fran, Seba, etc."
                  value={formData.preferredName}
                  onChange={(e) => handleInputChange("preferredName", e.target.value)}
                  className="py-3 text-lg"
                  maxLength={20}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">💡 Lo usaremos en mensajes y saludos personalizados</p>
            </motion.div>

            {/* Email Field */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
              <Label htmlFor="email" className="text-base font-medium flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-500" />
                Tu email *
              </Label>
              <div className="relative mt-2">
                <Input
                  id="email"
                  type="email"
                  placeholder="tu@email.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className={`py-3 text-lg transition-all ${
                    errors.email
                      ? "border-red-500 focus:border-red-500"
                      : formData.email.trim() && validateEmail(formData.email)
                        ? "border-green-500 focus:border-green-500"
                        : ""
                  }`}
                />
                {formData.email.trim() && validateEmail(formData.email) && !errors.email && (
                  <motion.div
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                  >
                    <Check className="w-5 h-5 text-green-500" />
                  </motion.div>
                )}
              </div>
              {errors.email && (
                <motion.p
                  className="text-red-500 text-sm mt-1 flex items-center gap-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <AlertCircle className="w-3 h-3" />
                  {errors.email}
                </motion.p>
              )}
            </motion.div>

            {/* Phone Field */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
              <Label htmlFor="phone" className="text-base font-medium flex items-center gap-2">
                📱 Teléfono
                <Badge variant="secondary" className="text-xs">
                  Opcional
                </Badge>
              </Label>
              <div className="relative mt-2">
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+54 9 11 1234-5678"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className={`py-3 text-lg ${errors.phone ? "border-red-500 focus:border-red-500" : ""}`}
                />
              </div>
              {errors.phone && (
                <motion.p
                  className="text-red-500 text-sm mt-1 flex items-center gap-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <AlertCircle className="w-3 h-3" />
                  {errors.phone}
                </motion.p>
              )}
            </motion.div>
          </div>
        </CardContent>
      </Card>

      {/* Preview Card */}
      {(formData.name.trim() || hasPreferredName) && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
          <Card className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 border-purple-200 dark:border-purple-800">
            <CardContent className="p-4">
              <h3 className="font-bold text-purple-700 dark:text-purple-300 mb-2 text-center">
                Vista previa de tu saludo
              </h3>
              <div className="text-center p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                <p className="text-lg">
                  ¡Hola, {formData.preferredName.trim() || formData.name.trim().split(" ")[0]}! 👋
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Así te vamos a saludar en la app</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Action Buttons */}
      <div className="space-y-3">
        <Button
          onClick={handleNext}
          disabled={!isFormValid || isSubmitting}
          className={`w-full font-medium py-3 shadow-xl transition-all ${
            isFormValid
              ? "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
              : "bg-gray-200 dark:bg-gray-700 text-gray-500 cursor-not-allowed"
          }`}
        >
          <motion.div className="flex items-center gap-2" whileHover={isFormValid ? { x: 5 } : {}}>
            {isSubmitting ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                >
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                </motion.div>
                Guardando...
              </>
            ) : (
              <>
                {formData.name && `¡Hola ${formData.preferredName || formData.name.split(" ")[0]}! `}
                Continuar
                <ChevronRight className="w-4 h-4" />
              </>
            )}
          </motion.div>
        </Button>

        {!stepConfig.required && (
          <Button
            variant="ghost"
            onClick={handleSkip}
            disabled={isSubmitting}
            className="w-full text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
          >
            Saltar este paso
          </Button>
        )}
      </div>

      {/* Privacy Note */}
      <Card className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
        <CardContent className="p-3">
          <div className="flex items-center gap-2 text-sm text-blue-700 dark:text-blue-300">
            <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs">🔒</span>
            </div>
            <span>Tu información está segura y no la compartimos con terceros</span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
