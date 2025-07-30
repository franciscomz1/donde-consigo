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
    gradient: "from-pink-400 via-purple-400 to-indigo-400",
    accentColor: "from-pink-500 to-purple-500",
  },
  {
    icon: MapPin,
    title: "Descuentos cerca tuyo",
    subtitle: "Buscá ofertas en tiempo real por ubicación o categoría",
    gradient: "from-cyan-400 via-blue-400 to-purple-400",
    accentColor: "from-cyan-500 to-blue-500",
  },
  {
    icon: Sparkles,
    title: "Sumá y ganá puntos",
    subtitle: "Compartí promociones, sumá puntos y canjeá beneficios",
    gradient: "from-emerald-400 via-teal-400 to-cyan-400",
    accentColor: "from-emerald-500 to-teal-500",
  },
]

export default function OnboardingCarousel({ onStart }: OnboardingCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd || isAnimating) return

    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe && currentSlide < slides.length - 1) {
      nextSlide()
    }
    if (isRightSwipe && currentSlide > 0) {
      prevSlide()
    }
  }

  const nextSlide = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setTimeout(() => {
      if (currentSlide < slides.length - 1) {
        setCurrentSlide(currentSlide + 1)
      }
      setIsAnimating(false)
    }, 300)
  }

  const prevSlide = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setTimeout(() => {
      if (currentSlide > 0) {
        setCurrentSlide(currentSlide - 1)
      }
      setIsAnimating(false)
    }, 300)
  }

  const handleDotClick = (index: number) => {
    if (isAnimating || index === currentSlide) return
    setIsAnimating(true)
    setTimeout(() => {
      setCurrentSlide(index)
      setIsAnimating(false)
    }, 300)
  }

  const currentSlideData = slides[currentSlide]

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div
        className="flex-1 overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="h-full flex items-center justify-center px-6">
          <div
            className={`flex flex-col items-center text-center max-w-md mx-auto space-y-10 transition-all duration-500 ${
              isAnimating ? "opacity-0 transform translate-y-4" : "opacity-100 transform translate-y-0"
            }`}
          >
            {/* Icon Section */}
            <div className="relative">
              <div
                className={`w-36 h-36 bg-gradient-to-br ${currentSlideData.gradient} rounded-[2rem] flex items-center justify-center shadow-2xl transform transition-all duration-700`}
                style={{
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.2) inset",
                }}
              >
                <currentSlideData.icon className="w-18 h-18 text-white drop-shadow-lg" strokeWidth={1.5} />

                {/* Special effects for star icon */}
                {currentSlide === 2 && (
                  <>
                    <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-yellow-300 animate-pulse" />
                    <Sparkles className="absolute -bottom-1 -left-2 w-4 h-4 text-yellow-200 animate-pulse delay-300" />
                  </>
                )}
              </div>

              {/* Animated glow */}
              <div
                className={`absolute inset-0 w-36 h-36 bg-gradient-to-br ${currentSlideData.gradient} rounded-[2rem] opacity-20 blur-2xl -z-10 transition-all duration-700 scale-110 opacity-30`}
              />
            </div>

            {/* Text Content */}
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight tracking-tight">
                {currentSlideData.title}
              </h1>

              <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed font-medium max-w-sm">
                {currentSlideData.subtitle}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Progress indicators */}
      <div className="flex justify-center space-x-4 mb-8">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`transition-all duration-400 rounded-full ${
              index === currentSlide
                ? `w-10 h-4 bg-gradient-to-r ${currentSlideData.accentColor} shadow-lg`
                : "w-4 h-4 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500 hover:scale-110"
            }`}
            aria-label={`Go to step ${index + 1}`}
          />
        ))}
      </div>

      {/* Navigation */}
      <div className="px-8 pb-12">
        {currentSlide < slides.length - 1 ? (
          <Button
            onClick={nextSlide}
            disabled={isAnimating}
            className={`w-full h-16 bg-gradient-to-r ${currentSlideData.accentColor} hover:shadow-2xl text-white font-semibold text-xl rounded-2xl shadow-xl transform transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50`}
          >
            <span className="mr-3">Siguiente</span>
            <ChevronRight className="w-6 h-6" />
          </Button>
        ) : (
          <Button
            onClick={onStart}
            disabled={isAnimating}
            className={`w-full h-16 bg-gradient-to-r ${currentSlideData.accentColor} hover:shadow-2xl text-white font-semibold text-xl rounded-2xl shadow-xl transform transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50`}
          >
            <span className="mr-3">Empezar</span>
            <Sparkles className="w-6 h-6" />
          </Button>
        )}
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-2 h-2 bg-blue-300 rounded-full animate-pulse opacity-60" />
      <div className="absolute top-32 right-16 w-1 h-1 bg-purple-300 rounded-full animate-pulse delay-700 opacity-40" />
      <div className="absolute bottom-40 left-20 w-1.5 h-1.5 bg-teal-300 rounded-full animate-pulse delay-1000 opacity-50" />
    </div>
  )
}
