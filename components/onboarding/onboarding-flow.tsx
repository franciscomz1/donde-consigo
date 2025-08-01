"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Gift, Star, Trophy, Camera, User, CreditCard } from "lucide-react"
import { WelcomeStep } from "./welcome-step"
import { ProfilePhotoStep } from "./profile-photo-step"
import { PersonalInfoStep } from "./personal-info-step"
import { BanksStep } from "./banks-step"
import { CompletionModal } from "./completion-modal"

interface OnboardingFlowProps {
  onComplete: (userData: any) => void
}

export function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    profilePhoto: null,
    favoriteBanks: [],
    points: 0,
    level: 1,
    badges: [],
  })
  const [showCompletion, setShowCompletion] = useState(false)

  const steps = [
    { id: "welcome", title: "Bienvenida", icon: Gift, points: 0 },
    { id: "photo", title: "Foto de perfil", icon: Camera, points: 20 },
    { id: "info", title: "Datos personales", icon: User, points: 30 },
    { id: "banks", title: "Bancos favoritos", icon: CreditCard, points: 50 },
  ]

  const progress = ((currentStep + 1) / steps.length) * 100

  const handleNext = (stepData?: any) => {
    if (stepData) {
      setUserData((prev) => ({ ...prev, ...stepData }))
    }

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      // Calculate final points and badges
      const finalUserData = {
        ...userData,
        ...stepData,
        points: userData.points + steps.reduce((acc, step) => acc + step.points, 0),
        badges: ["onboarding_complete", "first_steps"],
      }
      setUserData(finalUserData)
      setShowCompletion(true)
    }
  }

  const handleSkip = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      const finalUserData = {
        ...userData,
        points: userData.points + 10, // Reduced points for skipping
        badges: ["onboarding_complete"],
      }
      setUserData(finalUserData)
      setShowCompletion(true)
    }
  }

  const handleComplete = () => {
    onComplete(userData)
  }

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <WelcomeStep onNext={handleNext} />
      case 1:
        return <ProfilePhotoStep onNext={handleNext} onSkip={handleSkip} />
      case 2:
        return <PersonalInfoStep onNext={handleNext} onSkip={handleSkip} />
      case 3:
        return <BanksStep onNext={handleNext} onSkip={handleSkip} />
      default:
        return null
    }
  }

  if (showCompletion) {
    return <CompletionModal userData={userData} onComplete={handleComplete} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950">
      <div className="container mx-auto px-4 py-8">
        {/* Progress Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold">Configuración inicial</h1>
            <Badge variant="secondary" className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
              Paso {currentStep + 1} de {steps.length}
            </Badge>
          </div>

          <Progress value={progress} className="h-2 mb-4" />

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Star className="w-4 h-4 text-yellow-500" />
            <span>Completá todos los pasos y ganá hasta 100 puntos extra</span>
          </div>
        </div>

        {/* Step Content */}
        <div className="max-w-md mx-auto">{renderStep()}</div>

        {/* Steps Overview */}
        <div className="mt-8 max-w-md mx-auto">
          <div className="grid grid-cols-2 gap-2">
            {steps.map((step, index) => {
              const Icon = step.icon
              const isCompleted = index < currentStep
              const isCurrent = index === currentStep

              return (
                <Card
                  key={step.id}
                  className={`p-3 ${isCurrent ? "ring-2 ring-purple-500" : ""} ${isCompleted ? "bg-green-50 dark:bg-green-950" : ""}`}
                >
                  <CardContent className="p-0">
                    <div className="flex items-center gap-2">
                      <Icon
                        className={`w-4 h-4 ${isCompleted ? "text-green-500" : isCurrent ? "text-purple-500" : "text-muted-foreground"}`}
                      />
                      <div className="flex-1">
                        <p className="text-xs font-medium">{step.title}</p>
                        <p className="text-xs text-muted-foreground">+{step.points} pts</p>
                      </div>
                      {isCompleted && <Trophy className="w-3 h-3 text-green-500" />}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
