"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, Star, Trophy, Gift, Camera, User, CreditCard, Settings, Check, X } from "lucide-react"
import { useSound } from "@/lib/hooks/use-sound"
import { useGamification } from "@/lib/hooks/use-gamification"
import { WelcomeStep } from "./steps/welcome-step"
import { ProfilePhotoStep } from "./steps/profile-photo-step"
import { PersonalInfoStep } from "./steps/personal-info-step"
import { BanksStep } from "./steps/banks-step"
import { PreferencesStep } from "./steps/preferences-step"
import { CompletionModal } from "./completion-modal"
import { AppPreviewModal } from "./app-preview-modal"

interface OnboardingFlowProps {
  onComplete: (userData: any) => void
}

interface StepConfig {
  id: string
  title: string
  subtitle: string
  icon: any
  points: number
  required: boolean
  component: any
}

export function EnhancedOnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const [showPreview, setShowPreview] = useState(true)
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<string[]>([])
  const [skippedSteps, setSkippedSteps] = useState<string[]>([])
  const [userData, setUserData] = useState({
    name: "",
    preferredName: "",
    email: "",
    phone: "",
    profilePhoto: null,
    favoriteBanks: [],
    preferences: {
      notifications: true,
      location: false,
      marketing: false,
    },
    points: 0,
    level: 1,
    badges: [],
    completedAt: null,
  })
  const [showCompletion, setShowCompletion] = useState(false)
  const [earnedPoints, setEarnedPoints] = useState(0)

  const { playSound } = useSound()
  const { addPoints, state } = useGamification("onboarding_user")

  const steps: StepConfig[] = [
    {
      id: "welcome",
      title: "Bienvenida",
      subtitle: "Conocé la app",
      icon: Gift,
      points: 0,
      required: true,
      component: WelcomeStep,
    },
    {
      id: "photo",
      title: "Foto de perfil",
      subtitle: "Personalizá tu cuenta",
      icon: Camera,
      points: 50,
      required: false,
      component: ProfilePhotoStep,
    },
    {
      id: "personal",
      title: "Datos personales",
      subtitle: "Contanos sobre vos",
      icon: User,
      points: 30,
      required: true,
      component: PersonalInfoStep,
    },
    {
      id: "banks",
      title: "Bancos favoritos",
      subtitle: "Promociones personalizadas",
      icon: CreditCard,
      points: 40,
      required: false,
      component: BanksStep,
    },
    {
      id: "preferences",
      title: "Preferencias",
      subtitle: "Configurá notificaciones",
      icon: Settings,
      points: 20,
      required: false,
      component: PreferencesStep,
    },
  ]

  const currentStepConfig = steps[currentStep]
  const progress = ((currentStep + 1) / steps.length) * 100
  const canGoBack = currentStep > 0
  const canGoNext = currentStep < steps.length - 1
  const isStepCompleted = completedSteps.includes(currentStepConfig.id)
  const isStepSkipped = skippedSteps.includes(currentStepConfig.id)

  // Calcular puntos totales posibles
  const totalPossiblePoints = steps.reduce((sum, step) => sum + step.points, 0) + 100 // +100 por completar

  useEffect(() => {
    // Mostrar preview solo la primera vez
    const hasSeenPreview = localStorage.getItem("onboarding_preview_seen")
    if (hasSeenPreview) {
      setShowPreview(false)
    }
  }, [])

  const handleStepComplete = (stepData: any, earnedStepPoints = 0) => {
    playSound("success")

    // Actualizar datos del usuario
    setUserData((prev) => ({ ...prev, ...stepData }))

    // Marcar paso como completado
    setCompletedSteps((prev) => [...prev.filter((id) => id !== currentStepConfig.id), currentStepConfig.id])

    // Remover de skipped si estaba
    setSkippedSteps((prev) => prev.filter((id) => id !== currentStepConfig.id))

    // Sumar puntos
    if (earnedStepPoints > 0) {
      setEarnedPoints((prev) => prev + earnedStepPoints)
      addPoints("onboardingStep", earnedStepPoints)
    }

    // Avanzar al siguiente paso o completar
    if (canGoNext) {
      setTimeout(() => setCurrentStep((prev) => prev + 1), 500)
    } else {
      handleOnboardingComplete()
    }
  }

  const handleStepSkip = () => {
    playSound("click")

    // Solo permitir saltar pasos no requeridos
    if (!currentStepConfig.required) {
      setSkippedSteps((prev) => [...prev.filter((id) => id !== currentStepConfig.id), currentStepConfig.id])
      setCompletedSteps((prev) => prev.filter((id) => id !== currentStepConfig.id))

      if (canGoNext) {
        setCurrentStep((prev) => prev + 1)
      } else {
        handleOnboardingComplete()
      }
    }
  }

  const handleStepNavigation = (stepIndex: number) => {
    playSound("click")
    setCurrentStep(stepIndex)
  }

  const handleGoBack = () => {
    playSound("click")
    if (canGoBack) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  const handleOnboardingComplete = () => {
    const completionBonus = 100
    const finalPoints = earnedPoints + completionBonus

    const finalUserData = {
      ...userData,
      points: finalPoints,
      badges: ["onboarding_complete", ...userData.badges],
      completedAt: new Date().toISOString(),
      onboardingStats: {
        completedSteps: completedSteps.length,
        skippedSteps: skippedSteps.length,
        totalSteps: steps.length,
        pointsEarned: finalPoints,
        completionRate: (completedSteps.length / steps.length) * 100,
      },
    }

    setUserData(finalUserData)
    addPoints("completeOnboarding", completionBonus)
    setShowCompletion(true)
    playSound("achievement")
  }

  const handlePreviewComplete = () => {
    setShowPreview(false)
    localStorage.setItem("onboarding_preview_seen", "true")
  }

  const handleFinalComplete = () => {
    onComplete(userData)
  }

  // Renderizar step actual
  const renderCurrentStep = () => {
    const StepComponent = currentStepConfig.component

    return (
      <StepComponent
        onNext={handleStepComplete}
        onSkip={handleStepSkip}
        userData={userData}
        stepConfig={currentStepConfig}
        isCompleted={isStepCompleted}
        isSkipped={isStepSkipped}
      />
    )
  }

  if (showPreview) {
    return (
      <AppPreviewModal isOpen={showPreview} onClose={handlePreviewComplete} onStartOnboarding={handlePreviewComplete} />
    )
  }

  if (showCompletion) {
    return (
      <CompletionModal
        userData={userData}
        onComplete={handleFinalComplete}
        earnedPoints={earnedPoints + 100}
        completionStats={{
          completedSteps: completedSteps.length,
          totalSteps: steps.length,
          completionRate: (completedSteps.length / steps.length) * 100,
        }}
      />
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-purple-950 dark:via-pink-950 dark:to-blue-950">
      <div className="container mx-auto px-4 py-6 max-w-md">
        {/* Header con progreso */}
        <motion.div className="mb-6" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              {canGoBack && (
                <Button variant="ghost" size="sm" onClick={handleGoBack} className="h-8 w-8 p-0">
                  <ChevronLeft className="w-4 h-4" />
                </Button>
              )}
              <div>
                <h1 className="text-xl font-bold">Configuración inicial</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Paso {currentStep + 1} de {steps.length}
                </p>
              </div>
            </div>

            <div className="text-right">
              <div className="flex items-center gap-1 text-sm">
                <Star className="w-4 h-4 text-yellow-500" />
                <span className="font-medium">{earnedPoints} pts</span>
              </div>
              <p className="text-xs text-gray-500">de {totalPossiblePoints} posibles</p>
            </div>
          </div>

          {/* Barra de progreso */}
          <div className="space-y-2">
            <Progress value={progress} className="h-2" />
            <div className="flex justify-between text-xs text-gray-500">
              <span>{Math.round(progress)}% completado</span>
              <span>{steps.length - currentStep - 1} pasos restantes</span>
            </div>
          </div>
        </motion.div>

        {/* Indicadores de pasos interactivos */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex justify-between gap-2">
            {steps.map((step, index) => {
              const isActive = index === currentStep
              const isCompleted = completedSteps.includes(step.id)
              const isSkipped = skippedSteps.includes(step.id)
              const isPast = index < currentStep
              const canNavigate = isPast || isCompleted || isSkipped

              return (
                <motion.button
                  key={step.id}
                  className={`flex-1 p-3 rounded-lg border-2 transition-all ${
                    isActive
                      ? "border-purple-500 bg-purple-50 dark:bg-purple-950"
                      : isCompleted
                        ? "border-green-500 bg-green-50 dark:bg-green-950"
                        : isSkipped
                          ? "border-gray-400 bg-gray-50 dark:bg-gray-800"
                          : "border-gray-200 bg-white dark:bg-gray-900 dark:border-gray-700"
                  } ${canNavigate ? "cursor-pointer hover:scale-105" : "cursor-default"}`}
                  onClick={() => canNavigate && handleStepNavigation(index)}
                  whileHover={canNavigate ? { scale: 1.02 } : {}}
                  whileTap={canNavigate ? { scale: 0.98 } : {}}
                  disabled={!canNavigate}
                  aria-label={`${step.title} - ${isCompleted ? "Completado" : isSkipped ? "Saltado" : isActive ? "Actual" : "Pendiente"}`}
                >
                  <div className="flex flex-col items-center gap-1">
                    <div className="relative">
                      <step.icon
                        className={`w-5 h-5 ${
                          isActive
                            ? "text-purple-600"
                            : isCompleted
                              ? "text-green-600"
                              : isSkipped
                                ? "text-gray-500"
                                : "text-gray-400"
                        }`}
                      />

                      {isCompleted && (
                        <motion.div
                          className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full flex items-center justify-center"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", damping: 15 }}
                        >
                          <Check className="w-2 h-2 text-white" />
                        </motion.div>
                      )}

                      {isSkipped && (
                        <motion.div
                          className="absolute -top-1 -right-1 w-3 h-3 bg-gray-400 rounded-full flex items-center justify-center"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", damping: 15 }}
                        >
                          <X className="w-2 h-2 text-white" />
                        </motion.div>
                      )}
                    </div>

                    <div className="text-center">
                      <p className="text-xs font-medium leading-tight">{step.title}</p>
                      {step.points > 0 && (
                        <div className="flex items-center justify-center gap-1 mt-1">
                          <Star className="w-2 h-2 text-yellow-500" />
                          <span className="text-xs text-yellow-600">+{step.points}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.button>
              )
            })}
          </div>
        </motion.div>

        {/* Información del paso actual */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-2 border-white/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    currentStepConfig.required
                      ? "bg-gradient-to-r from-purple-500 to-pink-500"
                      : "bg-gradient-to-r from-blue-500 to-cyan-500"
                  }`}
                >
                  <currentStepConfig.icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <h2 className="text-lg font-bold">{currentStepConfig.title}</h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{currentStepConfig.subtitle}</p>
                </div>
                <div className="text-right">
                  {currentStepConfig.required ? (
                    <Badge variant="destructive" className="text-xs">
                      Requerido
                    </Badge>
                  ) : (
                    <Badge variant="secondary" className="text-xs">
                      Opcional
                    </Badge>
                  )}
                  {currentStepConfig.points > 0 && (
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="w-3 h-3 text-yellow-500" />
                      <span className="text-xs font-medium text-yellow-600">+{currentStepConfig.points} pts</span>
                    </div>
                  )}
                </div>
              </div>

              {currentStepConfig.points > 0 && (
                <div className="bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3">
                  <p className="text-sm text-yellow-800 dark:text-yellow-200 flex items-center gap-2">
                    <Trophy className="w-4 h-4" />
                    <span>
                      {isStepCompleted
                        ? `¡Ganaste ${currentStepConfig.points} puntos!`
                        : `Sumá ${currentStepConfig.points} puntos completando este paso`}
                    </span>
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Contenido del paso */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderCurrentStep()}
          </motion.div>
        </AnimatePresence>

        {/* Footer con estadísticas */}
        <motion.div
          className="mt-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div className="text-center">
              <p className="font-bold text-green-600">{completedSteps.length}</p>
              <p className="text-gray-500">Completados</p>
            </div>
            <div className="text-center">
              <p className="font-bold text-yellow-600">{earnedPoints}</p>
              <p className="text-gray-500">Puntos ganados</p>
            </div>
            <div className="text-center">
              <p className="font-bold text-blue-600">{steps.length - currentStep - 1}</p>
              <p className="text-gray-500">Restantes</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
