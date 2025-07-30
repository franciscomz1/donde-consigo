"use client"

import { useState } from "react"
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
import type { User, Bank } from "./types"

export default function App() {
  const [currentScreen, setCurrentScreen] = useState("onboarding")
  const [darkMode, setDarkMode] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [selectedBanks, setSelectedBanks] = useState<Bank[]>([])

  const renderScreen = () => {
    switch (currentScreen) {
      case "onboarding":
        return <OnboardingCarousel onStart={() => setCurrentScreen("login")} />

      case "login":
        return <LoginScreen setCurrentScreen={setCurrentScreen} darkMode={darkMode} setDarkMode={setDarkMode} />

      case "register":
        return <RegisterScreen setCurrentScreen={setCurrentScreen} />

      case "signin":
        return <SignInScreen setCurrentScreen={setCurrentScreen} />

      case "bankSelection":
        return (
          <BankSelection
            setCurrentScreen={setCurrentScreen}
            selectedBanks={selectedBanks}
            setSelectedBanks={setSelectedBanks}
          />
        )

      case "personalizedSummary":
        return <PersonalizedSummary setCurrentScreen={setCurrentScreen} selectedBanks={selectedBanks} />

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

      case "main":
        return <MainApp user={user} selectedBanks={selectedBanks} darkMode={darkMode} setDarkMode={setDarkMode} />

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
