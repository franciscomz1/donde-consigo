"use client"

import { useState } from "react"
import { CreditCard, MapPin, Users, UserIcon } from "lucide-react"
import PromosScreen from "./PromosScreen"
import MapScreen from "./MapScreen"
import CommunityScreen from "./CommunityScreen"
import ProfileScreen from "./ProfileScreen"
import type { User, Bank } from "../types"

interface MainAppProps {
  user: User | null
  selectedBanks: Bank[]
  darkMode: boolean
  setDarkMode: (dark: boolean) => void
}

const tabs = [
  { id: "promos", name: "Promos", icon: CreditCard },
  { id: "map", name: "Dónde Consigo", icon: MapPin },
  { id: "community", name: "Comunidad", icon: Users },
  { id: "profile", name: "Perfil", icon: UserIcon },
]

export default function MainApp({ user, selectedBanks, darkMode, setDarkMode }: MainAppProps) {
  const [activeTab, setActiveTab] = useState("promos")

  const renderScreen = () => {
    switch (activeTab) {
      case "promos":
        return <PromosScreen selectedBanks={selectedBanks} />
      case "map":
        return <MapScreen />
      case "community":
        return <CommunityScreen user={user} />
      case "profile":
        return <ProfileScreen user={user} darkMode={darkMode} setDarkMode={setDarkMode} />
      default:
        return <PromosScreen selectedBanks={selectedBanks} />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      {/* Top banner */}
      <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-4 py-2 text-center text-sm font-medium">
        💸 Dólar blue hoy: $1.365 | Aprovechá promos sin interés
      </div>

      {/* Main content */}
      <div className="flex-1 pb-20">{renderScreen()}</div>

      {/* Bottom navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-4 py-2">
        <div className="flex justify-around">
          {tabs.map((tab) => {
            const IconComponent = tab.icon
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center py-2 px-3 rounded-xl transition-all duration-200 ${
                  isActive
                    ? "bg-sky-50 dark:bg-sky-900 text-sky-600 dark:text-sky-400"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                }`}
              >
                <IconComponent className="w-6 h-6 mb-1" />
                {isActive && <span className="text-xs font-medium">{tab.name}</span>}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
