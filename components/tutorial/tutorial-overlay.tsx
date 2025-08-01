"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ChevronLeft, ChevronRight, SkipBackIcon as Skip } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useSound } from "@/lib/hooks/use-sound"

interface TutorialOverlayProps {
  onComplete: () => void
  onSkip: () => void
}

export function TutorialOverlay({ onComplete, onSkip }: TutorialOverlayProps) {
  const { playSound } = useSound()
  const [currentStep, setCurrentStep] = useState(0)

  const tutorialSteps = [
    {
      title: "¡Bienvenido a DondeConsigo! 🎉",
      content:
        "Te vamos a mostrar cómo aprovechar al máximo la app para encontrar las mejores promociones y ahorrar dinero.",
      highlight: "none",
      position: "center",
    },
    {
      title: "Tu dashboard personal 📊",
      content: "Aquí verás tus puntos, nivel actual y desafíos diarios. ¡Cada acción suma puntos para subir de nivel!",
      highlight: "stats",
      position: "top",
    },
    {
      title: "Accesos rápidos ⚡",
      content: "Usa estos botones para navegar rápidamente a promociones, mapa, ranking y tu perfil.",
      highlight: "quick-access",
      position: "center",
    },
    {
      title: "Desafío diario 🎯",
      content: "Completa desafíos simples cada día para ganar puntos extra. ¡Son súper fáciles y divertidos!",
      highlight: "challenge",
      position: "center",
    },
    {
      title: "Navegación inferior 🧭",
      content: "Usa la barra inferior para moverte entre las diferentes secciones de la app.",
      highlight: "bottom-nav",
      position: "bottom",
    },
    {
      title: "¡Listo para empezar! 🚀",
      content: "Ya conoces lo básico. ¡Explora, completa desafíos y empieza a ahorrar con las mejores promociones!",
      highlight: "none",
      position: "center",
    },
  ]

  const currentStepData = tutorialSteps[currentStep]
  const progress = ((currentStep + 1) / tutorialSteps.length) * 100

  const nextStep = () => {
    playSound("click")
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      onComplete()
    }
  }

  const prevStep = () => {
    playSound("click")
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSkip = () => {
    playSound("click")
    onSkip()
  }

  const getHighlightStyle = (highlight: string) => {
    switch (highlight) {
      case "stats":
        return "top-20 left-4 right-4"
      case "quick-access":
        return "top-40 left-4 right-4"
      case "challenge":
        return "top-60 left-4 right-4"
      case "bottom-nav":
        return "bottom-4 left-4 right-4"
      default:
        return "top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center"
    >
      {/* Highlight Area */}
      {currentStepData.highlight !== "none" && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className={`absolute ${getHighlightStyle(currentStepData.highlight)} pointer-events-none`}
        >
          <div className="border-4 border-yellow-400 rounded-lg bg-yellow-400/10 animate-pulse" />
        </motion.div>
      )}

      {/* Tutorial Card */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className={`absolute ${getHighlightStyle("none")} max-w-sm w-full mx-4`}
      >
        <Card className="border-2 border-yellow-400 shadow-2xl">
          <CardContent className="p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-sm font-bold">
                  {currentStep + 1}
                </div>
                <span className="text-sm text-gray-500">de {tutorialSteps.length}</span>
              </div>
              <Button variant="ghost" size="sm" onClick={handleSkip}>
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Progress */}
            <Progress value={progress} className="mb-4 h-2" />

            {/* Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <h2 className="text-xl font-bold text-gray-900">{currentStepData.title}</h2>
                <p className="text-gray-600 leading-relaxed">{currentStepData.content}</p>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex justify-between items-center mt-6">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 0}
                className="gap-2 bg-transparent"
              >
                <ChevronLeft className="w-4 h-4" />
                Anterior
              </Button>

              <Button variant="ghost" onClick={handleSkip} className="gap-2 text-gray-500">
                <Skip className="w-4 h-4" />
                Saltar tutorial
              </Button>

              <Button onClick={nextStep} className="gap-2 bg-yellow-500 hover:bg-yellow-600">
                {currentStep === tutorialSteps.length - 1 ? "¡Empezar!" : "Siguiente"}
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
