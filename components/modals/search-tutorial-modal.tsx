"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import {
  Search,
  LinkIcon,
  Bell,
  Heart,
  Share2,
  ChevronRight,
  ChevronLeft,
  CheckCircle,
  Zap,
  Target,
  TrendingUp,
} from "lucide-react"
import { useSound } from "@/lib/hooks/use-sound"

interface SearchTutorialModalProps {
  isOpen: boolean
  onClose: () => void
  onComplete: () => void
}

export function SearchTutorialModal({ isOpen, onClose, onComplete }: SearchTutorialModalProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const { playSound } = useSound()

  const steps = [
    {
      title: "¡Bienvenido al Buscador de Precios!",
      description: "Encontrá el mejor precio para cualquier producto en segundos",
      icon: Search,
      color: "from-blue-500 to-purple-500",
      content: (
        <div className="text-center space-y-4">
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            <Search className="w-16 h-16 mx-auto text-blue-500" />
          </motion.div>
          <div className="space-y-2">
            <p className="text-lg font-medium">Comparamos precios en más de 10 tiendas online</p>
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Zap className="w-4 h-4 text-yellow-500" />
              <span>Ahorrá tiempo y dinero con cada búsqueda</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Paso 1: Pegá el link del producto",
      description: "Copiá la URL desde cualquier tienda online",
      icon: LinkIcon,
      color: "from-green-500 to-emerald-500",
      content: (
        <div className="space-y-4">
          <Card className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950">
            <CardContent className="p-4">
              <div className="space-y-3">
                <p className="font-medium">Ejemplos de URLs válidas:</p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 p-2 bg-white dark:bg-gray-800 rounded">
                    <LinkIcon className="w-3 h-3 text-muted-foreground" />
                    <span className="text-xs">https://mercadolibre.com.ar/producto...</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-white dark:bg-gray-800 rounded">
                    <LinkIcon className="w-3 h-3 text-muted-foreground" />
                    <span className="text-xs">https://amazon.com/dp/B08N5WRWNW</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-white dark:bg-gray-800 rounded">
                    <LinkIcon className="w-3 h-3 text-muted-foreground" />
                    <span className="text-xs">https://garbarino.com/producto/...</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <div className="text-center">
            <Badge className="bg-green-500 hover:bg-green-600 text-white">+15 puntos por cada búsqueda</Badge>
          </div>
        </div>
      ),
    },
    {
      title: "Paso 2: Esperá los resultados",
      description: "Buscamos en tiempo real en todas las tiendas",
      icon: Target,
      color: "from-orange-500 to-red-500",
      content: (
        <div className="space-y-4">
          <div className="text-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            >
              <Target className="w-12 h-12 mx-auto text-orange-500 mb-3" />
            </motion.div>
            <p className="font-medium mb-2">Proceso de búsqueda:</p>
          </div>

          <div className="space-y-2">
            {[
              "Analizamos el producto",
              "Consultamos MercadoLibre",
              "Buscamos en Amazon",
              "Revisamos Garbarino",
              "Comparamos Frávega",
              "Ordenamos por precio",
            ].map((step, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-2 p-2 rounded-lg bg-orange-50 dark:bg-orange-950"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <CheckCircle className="w-4 h-4 text-orange-500" />
                <span className="text-sm">{step}</span>
              </motion.div>
            ))}
          </div>
        </div>
      ),
    },
    {
      title: "Paso 3: Compará y elegí",
      description: "Resultados ordenados del más barato al más caro",
      icon: TrendingUp,
      color: "from-purple-500 to-pink-500",
      content: (
        <div className="space-y-4">
          <Card className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950">
            <CardContent className="p-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-xs font-bold">ML</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold">$45.999</span>
                    <Badge className="bg-green-500 text-white text-xs">Mejor precio</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">MercadoLibre • Envío gratis</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-4 gap-2">
            <Button size="sm" className="bg-green-500 hover:bg-green-600 text-white">
              Comprar
            </Button>
            <Button size="sm" variant="outline">
              <Bell className="w-3 h-3" />
            </Button>
            <Button size="sm" variant="outline">
              <Heart className="w-3 h-3" />
            </Button>
            <Button size="sm" variant="outline">
              <Share2 className="w-3 h-3" />
            </Button>
          </div>

          <div className="text-center text-sm text-muted-foreground">
            <p>Comprar • Crear alerta • Favorito • Compartir</p>
          </div>
        </div>
      ),
    },
    {
      title: "Paso 4: Configurá alertas",
      description: "Te avisamos cuando baje el precio que querés",
      icon: Bell,
      color: "from-yellow-500 to-orange-500",
      content: (
        <div className="space-y-4">
          <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-950 dark:to-orange-950">
            <CardContent className="p-4">
              <div className="text-center space-y-3">
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                >
                  <Bell className="w-12 h-12 mx-auto text-yellow-500" />
                </motion.div>
                <div>
                  <p className="font-bold text-lg">$35.000</p>
                  <p className="text-sm text-muted-foreground">Precio objetivo</p>
                </div>
                <Badge className="bg-yellow-500 hover:bg-yellow-600 text-white">Te ahorrarías $10.999 (24%)</Badge>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Notificación instantánea</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Email opcional</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>WhatsApp (próximamente)</span>
            </div>
          </div>

          <div className="text-center">
            <Badge className="bg-blue-500 hover:bg-blue-600 text-white">+25 puntos por crear alerta</Badge>
          </div>
        </div>
      ),
    },
    {
      title: "¡Listo para ahorrar!",
      description: "Ya podés empezar a buscar los mejores precios",
      icon: CheckCircle,
      color: "from-green-500 to-emerald-500",
      content: (
        <div className="text-center space-y-4">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 360],
            }}
            transition={{ duration: 1 }}
          >
            <CheckCircle className="w-16 h-16 mx-auto text-green-500" />
          </motion.div>

          <div className="space-y-2">
            <h3 className="text-lg font-bold text-green-600 dark:text-green-400">¡Todo configurado!</h3>
            <p className="text-muted-foreground">
              Ahora podés buscar precios y crear alertas para ahorrar en todas tus compras
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="p-3 bg-green-50 dark:bg-green-950 rounded-lg">
              <p className="font-bold text-green-600 dark:text-green-400">+15 pts</p>
              <p className="text-muted-foreground">Por búsqueda</p>
            </div>
            <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
              <p className="font-bold text-blue-600 dark:text-blue-400">+25 pts</p>
              <p className="text-muted-foreground">Por alerta</p>
            </div>
          </div>
        </div>
      ),
    },
  ]

  const currentStepData = steps[currentStep]
  const isLastStep = currentStep === steps.length - 1
  const isFirstStep = currentStep === 0

  const handleNext = () => {
    if (isLastStep) {
      playSound("achievement")
      onComplete()
      onClose()
    } else {
      playSound("click")
      setCurrentStep((prev) => prev + 1)
    }
  }

  const handlePrev = () => {
    if (!isFirstStep) {
      playSound("click")
      setCurrentStep((prev) => prev - 1)
    }
  }

  const handleSkip = () => {
    playSound("click")
    onComplete()
    onClose()
  }

  if (!isOpen) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <motion.div
                className={`p-2 rounded-lg bg-gradient-to-r ${currentStepData.color} text-white`}
                whileHover={{ scale: 1.05 }}
              >
                <currentStepData.icon className="w-5 h-5" />
              </motion.div>
              <span>Tutorial</span>
            </div>
            <Badge variant="outline">
              {currentStep + 1} de {steps.length}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Progreso</span>
              <span>{Math.round(((currentStep + 1) / steps.length) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2">
              <motion.div
                className={`h-2 rounded-full bg-gradient-to-r ${currentStepData.color}`}
                initial={{ width: 0 }}
                animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          {/* Step Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <div className="text-center">
                <h2 className="text-xl font-bold mb-2">{currentStepData.title}</h2>
                <p className="text-muted-foreground">{currentStepData.description}</p>
              </div>

              <div className="min-h-[200px] flex items-center justify-center">{currentStepData.content}</div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={handlePrev}
              disabled={isFirstStep}
              className="flex items-center gap-1 bg-transparent"
            >
              <ChevronLeft className="w-4 h-4" />
              Anterior
            </Button>

            <Button variant="ghost" onClick={handleSkip} className="text-muted-foreground hover:text-foreground">
              Saltar tutorial
            </Button>

            <Button
              onClick={handleNext}
              className={`flex items-center gap-1 bg-gradient-to-r ${currentStepData.color} hover:opacity-90`}
            >
              {isLastStep ? (
                <>
                  <CheckCircle className="w-4 h-4" />
                  ¡Empezar!
                </>
              ) : (
                <>
                  Siguiente
                  <ChevronRight className="w-4 h-4" />
                </>
              )}
            </Button>
          </div>

          {/* Step Indicators */}
          <div className="flex justify-center gap-2">
            {steps.map((_, index) => (
              <motion.button
                key={index}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentStep
                    ? "bg-blue-500 w-6"
                    : index < currentStep
                      ? "bg-green-500"
                      : "bg-gray-300 dark:bg-gray-700"
                }`}
                onClick={() => {
                  playSound("click")
                  setCurrentStep(index)
                }}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
