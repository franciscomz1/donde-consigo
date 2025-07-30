"use client"

import { Button } from "@/components/ui/button"
import { CheckCircle, Sparkles } from "lucide-react"
import type { Bank } from "../types"

interface PersonalizedSummaryProps {
  setCurrentScreen: (screen: string) => void
  selectedBanks: Bank[]
}

export default function PersonalizedSummary({ setCurrentScreen, selectedBanks }: PersonalizedSummaryProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 flex flex-col items-center justify-center px-8">
      <div className="text-center max-w-sm">
        {/* Success animation */}
        <div className="relative mb-12">
          <div className="w-32 h-32 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto shadow-2xl animate-pulse">
            <CheckCircle className="w-16 h-16 text-white" />
          </div>
          <div className="absolute -top-4 -right-4 animate-bounce">
            <Sparkles className="w-8 h-8 text-green-500" />
          </div>
          <div className="absolute -bottom-4 -left-4 animate-bounce delay-300">
            <Sparkles className="w-6 h-6 text-blue-500" />
          </div>
        </div>

        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">¡Todo listo!</h1>

        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
          Tu app está configurada con {selectedBanks.length} bancos y ubicación activada
        </p>

        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg mb-8">
          <div className="flex items-center justify-center space-x-4 mb-4">
            {selectedBanks.slice(0, 3).map((bank, index) => (
              <div key={index} className={`w-12 h-12 ${bank.color} rounded-xl flex items-center justify-center`}>
                <span className="text-white text-lg">{bank.icon}</span>
              </div>
            ))}
            {selectedBanks.length > 3 && (
              <div className="w-12 h-12 bg-gray-300 dark:bg-gray-600 rounded-xl flex items-center justify-center">
                <span className="text-gray-600 dark:text-gray-300 text-sm">+{selectedBanks.length - 3}</span>
              </div>
            )}
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-sm">Empezá a descubrir promociones personalizadas</p>
        </div>

        <Button
          onClick={() => setCurrentScreen("notificationPermission")}
          className="w-full h-16 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-semibold text-lg rounded-2xl shadow-xl transform hover:scale-105 transition-all duration-200"
        >
          Continuar
        </Button>
      </div>
    </div>
  )
}
