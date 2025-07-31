"use client"

import { useState } from "react"
import { CreditCard, MapPin, Users, UserIcon, Home, Bell } from "lucide-react"
import HomeScreen from "./HomeScreen"
import PromosScreen from "./PromosScreen"
import MapScreen from "./MapScreen"
import CommunityScreen from "./CommunityScreen"
import ProfileScreen from "./ProfileScreen"
import Button from "./ui/button" // Assuming Button component is imported from a local file
import type { User, Bank } from "../types"

interface MainAppProps {
  user: User | null
  selectedBanks: Bank[]
  darkMode: boolean
  setDarkMode: (dark: boolean) => void
  setCurrentScreen: (screen: string) => void
  setUser: (user: User | null) => void
}

const tabs = [
  { id: "home", name: "Inicio", icon: Home },
  { id: "promos", name: "Promos", icon: CreditCard },
  { id: "map", name: "Mapa", icon: MapPin },
  { id: "community", name: "Comunidad", icon: Users },
  { id: "profile", name: "Perfil", icon: UserIcon },
]

export default function MainApp({
  user,
  selectedBanks,
  darkMode,
  setDarkMode,
  setCurrentScreen,
  setUser,
}: MainAppProps) {
  const [activeTab, setActiveTab] = useState("home")

  const renderScreen = () => {
    switch (activeTab) {
      case "home":
        return (
          <HomeScreen user={user} selectedBanks={selectedBanks} setCurrentScreen={setCurrentScreen} setUser={setUser} />
        )
      case "promos":
        return <PromosScreen selectedBanks={selectedBanks} />
      case "map":
        return <MapScreen />
      case "community":
        return <CommunityScreen user={user} />
      case "profile":
        return (
          <ProfileScreen
            user={user}
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            setCurrentScreen={setCurrentScreen}
            setUser={setUser}
          />
        )
      default:
        return (
          <HomeScreen user={user} selectedBanks={selectedBanks} setCurrentScreen={setCurrentScreen} setUser={setUser} />
        )
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      {/* Enhanced top banner */}
      <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-4 py-2 text-center text-sm font-medium flex items-center justify-between">
        <span>💸 Dólar blue: $1.365</span>
        <span>🔥 {user?.streak || 0} días seguidos</span>
        <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 rounded-full p-1">
          <Bell className="w-4 h-4" />
        </Button>
      </div>

      {/* Main content */}
      <div className="flex-1 pb-20">{renderScreen()}</div>

      {/* Enhanced bottom navigation with better animations */}
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-2 py-2 backdrop-blur-lg bg-white/95 dark:bg-gray-800/95">
        <div className="flex justify-around">
          {tabs.map((tab) => {
            const IconComponent = tab.icon
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center py-2 px-3 rounded-xl transition-all duration-300 relative transform ${
                  isActive
                    ? "bg-sky-50 dark:bg-sky-900 text-sky-600 dark:text-sky-400 scale-105"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:scale-105"
                }`}
              >
                <IconComponent
                  className={`w-6 h-6 mb-1 transition-all duration-200 ${isActive ? "animate-pulse" : ""}`}
                />
                <span className="text-xs font-medium">{tab.name}</span>
                {isActive && (
                  <div className="absolute -top-1 right-1 w-2 h-2 bg-sky-500 rounded-full animate-pulse"></div>
                )}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
