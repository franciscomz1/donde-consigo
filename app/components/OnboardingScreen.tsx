"use client"

import { Gift, MapPin, Star, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface OnboardingScreenProps {
  icon: "gift" | "location" | "star"
  title: string
  subtitle: string
  gradient: string
  buttonText: string
  currentStep: number
  totalSteps: number
  onNext: () => void
  onDotClick: (index: number) => void
}

const IconComponent = ({ icon, gradient }: { icon: string; gradient: string }) => {
  const iconMap = {
    gift: Gift,
    location: MapPin,
    star: Star,
  }

  const Icon = iconMap[icon as keyof typeof iconMap]

  return (
    <div className="relative group">
      <div
        className={`w-32 h-32 bg-gradient-to-br ${gradient} rounded-3xl flex items-center justify-center shadow-2xl transform transition-all duration-500 group-hover:scale-105`}
        style={{
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.2) inset",
        }}
      >
        <Icon className="w-16 h-16 text-white drop-shadow-lg" strokeWidth={1.5} />
      </div>

      {/* Subtle glow effect */}
      <div
        className={`absolute inset-0 w-32 h-32 bg-gradient-to-br ${gradient} rounded-3xl opacity-20 blur-xl -z-10 transition-all duration-500 group-hover:opacity-30`}
      />
    </div>
  )
}

const ProgressIndicator = ({
  currentStep,
  totalSteps,
  onDotClick,
}: {
  currentStep: number
  totalSteps: number
  onDotClick: (index: number) => void
}) => {
  return (
    <div className="flex items-center justify-center space-x-3">
      {Array.from({ length: totalSteps }, (_, index) => (
        <button
          key={index}
          onClick={() => onDotClick(index)}
          className={`transition-all duration-300 rounded-full ${
            index === currentStep
              ? "w-8 h-3 bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg"
              : "w-3 h-3 bg-slate-300 hover:bg-slate-400"
          }`}
          aria-label={`Go to step ${index + 1}`}
        />
      ))}
    </div>
  )
}

export default function OnboardingScreen({
  icon,
  title,
  subtitle,
  gradient,
  buttonText,
  currentStep,
  totalSteps,
  onNext,
  onDotClick,
}: OnboardingScreenProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-8 py-12">
      <div className="flex flex-col items-center text-center max-w-sm mx-auto space-y-8">
        {/* Icon */}
        <div className="mb-4">
          <IconComponent icon={icon} gradient={gradient} />
        </div>

        {/* Content */}
        <div className="space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 leading-tight tracking-tight">{title}</h1>

          <p className="text-lg text-slate-600 leading-relaxed font-medium">{subtitle}</p>
        </div>

        {/* Progress Indicator */}
        <div className="py-4">
          <ProgressIndicator currentStep={currentStep} totalSteps={totalSteps} onDotClick={onDotClick} />
        </div>

        {/* Action Button */}
        <div className="w-full pt-4">
          <Button
            onClick={onNext}
            className="w-full h-14 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold text-lg rounded-2xl shadow-xl transform transition-all duration-200 hover:scale-105 active:scale-95"
          >
            <span className="mr-2">{buttonText}</span>
            {buttonText !== "Empezar" && <ChevronRight className="w-5 h-5" />}
          </Button>
        </div>
      </div>
    </div>
  )
}
