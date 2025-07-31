"use client"

import { useState, useEffect } from "react"
import { Lightbulb, X } from "lucide-react"
import { Button } from "@/components/ui/button"

const tips = [
  {
    id: "1",
    title: "¿Sabías que invitar amigos te da puntos extra?",
    description: "Por cada amigo que se registre con tu código, ambos ganan 100 puntos",
    icon: "👥",
  },
  {
    id: "2",
    title: "Chequeá promos nuevas cada lunes",
    description: "Los bancos actualizan sus ofertas al inicio de cada semana",
    icon: "📅",
  },
  {
    id: "3",
    title: "Usá la app todos los días para sumar puntos",
    description: "Solo por abrir la app diariamente ganás 5 puntos automáticamente",
    icon: "🔥",
  },
  {
    id: "4",
    title: "Las promos verificadas son más confiables",
    description: "Buscá el ícono ✓ para encontrar ofertas confirmadas oficialmente",
    icon: "✅",
  },
  {
    id: "5",
    title: "Compartí promociones para ayudar a otros",
    description: "Cada promo que subas te da 25 puntos y ayuda a la comunidad",
    icon: "🤝",
  },
]

interface TipOfTheDayProps {
  userName?: string
}

export default function TipOfTheDay({ userName }: TipOfTheDayProps) {
  const [currentTip, setCurrentTip] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    // Cambiar tip cada 24 horas (simulado con el día del año)
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000)
    setCurrentTip(dayOfYear % tips.length)
  }, [])

  if (!isVisible) return null

  const tip = tips[currentTip]

  return (
    <div className="bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 rounded-2xl p-4 border border-amber-200 dark:border-amber-700 mb-6">
      <div className="flex items-start space-x-3">
        <div className="w-10 h-10 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full flex items-center justify-center flex-shrink-0">
          <Lightbulb className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div>
              <p className="font-semibold text-amber-800 dark:text-amber-200 text-sm mb-1">
                💡 Tip del día {userName ? `para ${userName}` : ""}
              </p>
              <h4 className="font-bold text-gray-900 dark:text-white text-sm mb-2">{tip.title}</h4>
              <p className="text-gray-700 dark:text-gray-300 text-sm">{tip.description}</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsVisible(false)}
              className="text-amber-600 hover:bg-amber-100 dark:hover:bg-amber-800 rounded-full p-1 ml-2"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
        <div className="text-2xl">{tip.icon}</div>
      </div>
    </div>
  )
}
