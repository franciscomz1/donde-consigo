"use client"

import { useState } from "react"
import OnboardingScreen from "./components/OnboardingScreen"

export default function App() {
  const [currentScreen, setCurrentScreen] = useState(0)

  const screens = [
    {
      icon: "gift",
      title: "Promos todos los días",
      subtitle: "Descubrí qué banco te conviene según el día y tu tarjeta",
      gradient: "from-pink-400 via-purple-400 to-indigo-400",
      buttonText: "Siguiente",
    },
    {
      icon: "location",
      title: "Descuentos cerca tuyo",
      subtitle: "Buscá ofertas en tiempo real por ubicación o categoría",
      gradient: "from-cyan-400 via-blue-400 to-purple-400",
      buttonText: "Siguiente",
    },
    {
      icon: "star",
      title: "Sumá y ganá puntos",
      subtitle: "Compartí promociones, sumá puntos y canjeá beneficios",
      gradient: "from-emerald-400 via-teal-400 to-cyan-400",
      buttonText: "Empezar",
    },
  ]

  const handleNext = () => {
    if (currentScreen < screens.length - 1) {
      setCurrentScreen(currentScreen + 1)
    } else {
      // Handle completion - navigate to main app
      console.log("Onboarding completed!")
    }
  }

  const handleDotClick = (index: number) => {
    setCurrentScreen(index)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <OnboardingScreen
        {...screens[currentScreen]}
        currentStep={currentScreen}
        totalSteps={screens.length}
        onNext={handleNext}
        onDotClick={handleDotClick}
      />
    </div>
  )
}
