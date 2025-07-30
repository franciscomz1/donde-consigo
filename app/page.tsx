"use client"

import { useState, useEffect } from "react"
import type { User, Bank } from "./types"
import OnboardingCarousel from "./components/OnboardingCarousel"
import LoginScreen from "./components/LoginScreen"
import RegisterScreen from "./components/RegisterScreen"
import SignInScreen from "./components/SignInScreen"
import BankSelection from "./components/BankSelection"
import PersonalizedSummary from "./components/PersonalizedSummary"
import LocationPermission from "./components/LocationPermission"
import NotificationPermission from "./components/NotificationPermission"
import WelcomeReward from "./components/WelcomeReward"
import MainApp from "./components/MainApp"

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<string>("onboarding")
  const [user, setUser] = useState<User | null>(null)
  const [selectedBanks, setSelectedBanks] = useState<Bank[]>([])
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    // Check if user has completed onboarding before
    const hasCompletedOnboarding = localStorage.getItem("hasCompletedOnboarding")
    if (hasCompletedOnboarding) {
      setCurrentScreen("main")
    }
  }, [])

  const handleCompleteOnboarding = () => {
    localStorage.setItem("hasCompletedOnboarding", "true")
    setCurrentScreen("main")
  }

  const screenProps = {
    user,
    setUser,
    selectedBanks,
    setSelectedBanks,
    darkMode,
    setDarkMode,
    setCurrentScreen,
    onCompleteOnboarding: handleCompleteOnboarding,
  }

  return (
    <div className={`min-h-screen ${darkMode ? "dark" : ""}`}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        {currentScreen === "onboarding" && <OnboardingCarousel onStart={() => setCurrentScreen("login")} />}
        {currentScreen === "login" && <LoginScreen {...screenProps} />}
        {currentScreen === "register" && <RegisterScreen {...screenProps} />}
        {currentScreen === "signin" && <SignInScreen {...screenProps} />}
        {currentScreen === "bankSelection" && <BankSelection {...screenProps} />}
        {currentScreen === "personalizedSummary" && <PersonalizedSummary {...screenProps} />}
        {currentScreen === "locationPermission" && <LocationPermission {...screenProps} />}
        {currentScreen === "notificationPermission" && <NotificationPermission {...screenProps} />}
        {currentScreen === "welcomeReward" && <WelcomeReward {...screenProps} />}
        {currentScreen === "main" && <MainApp {...screenProps} />}
      </div>
    </div>
  )
}
