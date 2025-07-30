"use client"

import type React from "react"

import { useState } from "react"
import { ChevronRight, Gift, MapPin, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

interface OnboardingCarouselProps {
  onStart: () => void
}

const slides = [
  {
    icon: Gift,
    title: "Promos todos los días",
    subtitle: "Descubrí qué banco te conviene según el día y tu tarjeta",
    gradient: "from-blue-400 to-blue-600",
  },
  {
    icon: MapPin,
    title: "Descuentos cerca tuyo",
    subtitle: "Buscá ofertas en tiempo real por ubicación o categoría",
    gradient: "from-green-400 to-green-600",
  },
  {
    icon: Sparkles,
    title: "Sumá y ganá puntos",
    subtitle: "Compartí promociones, sumá puntos y canjeá beneficios",
    gradient: "from-purple-400 to-purple-600",
  },
]

export default function OnboardingCarousel({ onStart }: OnboardingCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe && currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1)
    }
    if (isRightSwipe && currentSlide > 0) {
      setCurrentSlide(currentSlide - 1)
    }
  }

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1)
    }
  }

  return (
    <div className="h-screen flex flex-col bg-white dark:bg-gray-900">
      <div
        className="flex-1 overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex h-full transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide, index) => {
            const IconComponent = slide.icon
            return (
              <div
                key={index}
                className="w-full h-full flex-shrink-0 flex flex-col items-center justify-center px-8 text-center"
              >
                <div className="mb-16">
                  <div
                    className={`w-40 h-40 bg-gradient-to-br ${slide.gradient} rounded-3xl flex items-center justify-center mb-12 mx-auto shadow-2xl transform hover:scale-105 transition-transform duration-300`}
                  >
                    <IconComponent className="w-20 h-20 text-white" />
                  </div>
                  <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">{slide.title}</h1>
                  <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-sm mx-auto">
                    {slide.subtitle}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Progress indicators */}
      <div className="flex justify-center space-x-3 mb-8">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? "bg-sky-500 w-10" : "bg-gray-300 dark:bg-gray-600 w-3"
            }`}
          />
        ))}
      </div>

      {/* Navigation */}
      <div className="px-8 pb-12">
        {currentSlide < slides.length - 1 ? (
          <Button
            onClick={nextSlide}
            variant="ghost"
            className="w-full h-16 text-sky-600 hover:bg-sky-50 dark:hover:bg-sky-900 font-semibold text-xl"
          >
            Siguiente
            <ChevronRight className="w-6 h-6 ml-2" />
          </Button>
        ) : (
          <Button
            onClick={onStart}
            className="w-full h-16 bg-sky-500 hover:bg-sky-600 text-white font-semibold text-xl rounded-2xl shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            Empezar
          </Button>
        )}
      </div>
    </div>
  )
}
