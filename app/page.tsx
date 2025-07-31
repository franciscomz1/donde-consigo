"use client"

import { useState, useEffect } from "react"
import OnboardingCarousel from "./components/OnboardingCarousel"
import LoginScreen from "./components/LoginScreen"
import RegisterScreen from "./components/RegisterScreen"
import SignInScreen from "./components/SignInScreen"
import FavoritesSelection from "./components/FavoritesSelection"
import PersonalizedRecommendations from "./components/PersonalizedRecommendations"
import LocationPermission from "./components/LocationPermission"
import NotificationPermission from "./components/NotificationPermission"
import WelcomeReward from "./components/WelcomeReward"
import MainApp from "./components/MainApp"
import CongratulationsModal from "./components/CongratulationsModal"
import ProfileOnboardingModal from "./components/ProfileOnboardingModal"
import type { User, Bank } from "./types"

export default function App() {
  const [currentScreen, setCurrentScreen] = useState("onboarding")
  const [darkMode, setDarkMode] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [selectedBanks, setSelectedBanks] = useState<Bank[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [mounted, setMounted] = useState(false)

  // Asegurar que el componente esté montado antes de hacer cualquier operación
  useEffect(() => {
    setMounted(true)
  }, [])

  // Solo renderizar después de que el componente esté montado
  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-sky-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando...</p>
        </div>
      </div>
    )
  }

  const renderScreen = () => {
    switch (currentScreen) {
      case "onboarding":
        return <OnboardingCarousel onStart={() => setCurrentScreen("login")} />

      case "login":
        return <LoginScreen setCurrentScreen={setCurrentScreen} darkMode={darkMode} setDarkMode={setDarkMode} />

      case "register":
        return <RegisterScreen setCurrentScreen={setCurrentScreen} />

      case "signin":
        return <SignInScreen setCurrentScreen={setCurrentScreen} setUser={setUser} />

      case "favoritesSelection":
        return (
          <FavoritesSelection
            setCurrentScreen={setCurrentScreen}
            selectedBanks={selectedBanks}
            setSelectedBanks={setSelectedBanks}
          />
        )

      case "personalizedRecommendations":
        return (
          <PersonalizedRecommendations
            setCurrentScreen={setCurrentScreen}
            selectedBanks={selectedBanks}
            selectedCategories={selectedCategories}
          />
        )

      case "locationPermission":
        return <LocationPermission setCurrentScreen={setCurrentScreen} />

      case "notificationPermission":
        return <NotificationPermission setCurrentScreen={setCurrentScreen} />

      case "welcomeReward":
        return (
          <WelcomeReward
            setCurrentScreen={setCurrentScreen}
            setUser={setUser}
            onCompleteOnboarding={() => setCurrentScreen("main")}
          />
        )

      case "congratulations":
        return <CongratulationsModal setCurrentScreen={setCurrentScreen} user={user as User} />

      case "profileOnboarding":
        return <ProfileOnboardingModal setCurrentScreen={setCurrentScreen} user={user as User} setUser={setUser} />

      case "main":
        return (
          <MainApp
            user={user}
            selectedBanks={selectedBanks}
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            setCurrentScreen={setCurrentScreen}
            setUser={setUser}
          />
        )

      default:
        return <OnboardingCarousel onStart={() => setCurrentScreen("login")} />
    }
  }

  return (
    <div className={`min-h-screen ${darkMode ? "dark" : ""}`}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">{renderScreen()}</div>
    </div>
  )
}
