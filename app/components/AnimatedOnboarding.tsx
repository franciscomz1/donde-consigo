"use client"

import { useState } from "react"
import { Gift, MapPin, Star, ChevronRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Screen {
  icon: "gift" | "location" | "star"
  title: string
  subtitle: string
  gradient: string
  buttonText: string
  accentColor: string
}

const screens: Screen[] = [
  {
    icon: "gift",
    title: "Promos todos los días",
    subtitle: "Descubrí qué banco te conviene según el día y tu tarjeta",
    gradient: "from-pink-400 via-purple-400 to-indigo-400",
    buttonText: "Siguiente",
    accentColor: "from-pink-500 to-purple-500",
  },
  {
    icon: "location",
    title: "Descuentos cerca tuyo",
    subtitle: "Buscá ofertas en tiempo real por ubicación o categoría",
    gradient: "from-cyan-400 via-blue-400 to-purple-400",
    buttonText: "Siguiente",
    accentColor: "from-cyan-500 to-blue-500",
  },
  {
    icon: "star",
    title: "Sumá y ganá puntos",
    subtitle: "Compartí promociones, sumá puntos y canjeá beneficios",
    gradient: "from-emerald-400 via-teal-400 to-cyan-400",
    buttonText: "Empezar",
    accentColor: "from-emerald-500 to-teal-500",
  },
]

const IconComponent = ({
  icon,
  gradient,
  isActive,
}: {
  icon: string
  gradient: string
  isActive: boolean
}) => {
  const iconMap = {
    gift: Gift,
    location: MapPin,
    star: Star,
  }

  const Icon = iconMap[icon as keyof typeof iconMap]

  return (
    <div className="relative">
      <div
        className={`w-36 h-36 bg-gradient-to-br ${gradient} rounded-[2rem] flex items-center justify-center shadow-2xl transform transition-all duration-700 ${
          isActive ? "scale-100 rotate-0" : "scale-95 rotate-3"
        }`}
        style={{
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.2) inset",
        }}
      >
        <Icon className="w-18 h-18 text-white drop-shadow-lg" strokeWidth={1.5} />

        {/* Floating sparkles for star icon */}
        {icon === "star" && (
          <>
            <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-yellow-300 animate-pulse" />
            <Sparkles className="absolute -bottom-1 -left-2 w-4 h-4 text-yellow-200 animate-pulse delay-300" />
          </>
        )}
      </div>

      {/* Animated glow */}
      <div
        className={`absolute inset-0 w-36 h-36 bg-gradient-to-br ${gradient} rounded-[2rem] opacity-20 blur-2xl -z-10 transition-all duration-700 ${
          isActive ? "scale-110 opacity-30" : "scale-100 opacity-20"
        }`}
      />
    </div>
  )
}

export default function AnimatedOnboarding() {
  const [currentScreen, setCurrentScreen] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const handleNext = () => {
    if (isAnimating) return

    setIsAnimating(true)

    setTimeout(() => {
      if (currentScreen < screens.length - 1) {
        setCurrentScreen(currentScreen + 1)
      } else {
        console.log("Onboarding completed!")
      }
      setIsAnimating(false)
    }, 300)
  }

  const handleDotClick = (index: number) => {
    if (isAnimating || index === currentScreen) return

    setIsAnimating(true)
    setTimeout(() => {
      setCurrentScreen(index)
      setIsAnimating(false)
    }, 300)
  }

  const currentScreenData = screens[currentScreen]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex flex-col items-center justify-center px-6 py-12">
      {/* Main Content Container */}
      <div
        className={`flex flex-col items-center text-center max-w-md mx-auto space-y-10 transition-all duration-500 ${
          isAnimating ? "opacity-0 transform translate-y-4" : "opacity-100 transform translate-y-0"
        }`}
      >
        {/* Icon Section */}
        <div className="relative">
          <IconComponent icon={currentScreenData.icon} gradient={currentScreenData.gradient} isActive={!isAnimating} />
        </div>

        {/* Text Content */}
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 leading-tight tracking-tight">
            {currentScreenData.title}
          </h1>

          <p className="text-xl text-slate-600 leading-relaxed font-medium max-w-sm">{currentScreenData.subtitle}</p>
        </div>

        {/* Progress Indicator */}
        <div className="flex items-center justify-center space-x-4 py-2">
          {screens.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`transition-all duration-400 rounded-full ${
                index === currentScreen
                  ? `w-10 h-4 bg-gradient-to-r ${currentScreenData.accentColor} shadow-lg`
                  : "w-4 h-4 bg-slate-300 hover:bg-slate-400 hover:scale-110"
              }`}
              aria-label={`Go to step ${index + 1}`}
            />
          ))}
        </div>

        {/* Action Button */}
        <div className="w-full pt-6">
          <Button
            onClick={handleNext}
            disabled={isAnimating}
            className={`w-full h-16 bg-gradient-to-r ${currentScreenData.accentColor} hover:shadow-2xl text-white font-semibold text-xl rounded-2xl shadow-xl transform transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            <span className="mr-3">{currentScreenData.buttonText}</span>
            {currentScreenData.buttonText !== "Empezar" ? (
              <ChevronRight className="w-6 h-6" />
            ) : (
              <Sparkles className="w-6 h-6" />
            )}
          </Button>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-2 h-2 bg-blue-300 rounded-full animate-pulse opacity-60" />
      <div className="absolute top-32 right-16 w-1 h-1 bg-purple-300 rounded-full animate-pulse delay-700 opacity-40" />
      <div className="absolute bottom-40 left-20 w-1.5 h-1.5 bg-teal-300 rounded-full animate-pulse delay-1000 opacity-50" />
    </div>
  )
}
