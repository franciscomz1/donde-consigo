"use client"

import { Button } from "@/components/ui/button"
import { Calendar, CreditCard } from "lucide-react"
import type { Bank } from "../types"

interface PersonalizedSummaryProps {
  setCurrentScreen: (screen: string) => void
  selectedBanks: Bank[]
}

const weekDays = [
  { day: "Lun", date: "15", promos: ["Galicia", "BBVA"] },
  { day: "Mar", date: "16", promos: ["Santander"] },
  { day: "Mié", date: "17", promos: ["Mercado Pago", "Ualá"] },
  { day: "Jue", date: "18", promos: ["BBVA", "Brubank"] },
  { day: "Vie", date: "19", promos: ["Galicia", "Naranja X"] },
  { day: "Sáb", date: "20", promos: ["Santander", "ICBC"] },
  { day: "Dom", date: "21", promos: ["Mercado Pago"] },
]

export default function PersonalizedSummary({ setCurrentScreen, selectedBanks }: PersonalizedSummaryProps) {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col">
      {/* Header */}
      <div className="pt-12 pb-8 px-8">
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Calendar className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            ¡Listo! Estos son tus mejores días para comprar
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">Según tus bancos seleccionados</p>
        </div>
      </div>

      {/* Calendar View */}
      <div className="flex-1 px-8">
        <div className="max-w-md mx-auto">
          <div className="grid grid-cols-7 gap-2 mb-8">
            {weekDays.map((day, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl p-3 border border-gray-200 dark:border-gray-600 text-center"
              >
                <p className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-1">{day.day}</p>
                <p className="text-lg font-bold text-gray-900 dark:text-white mb-2">{day.date}</p>
                <div className="space-y-1">
                  {day.promos.slice(0, 2).map((promo, i) => {
                    const bank = selectedBanks.find((b) => b.name === promo)
                    if (!bank) return null
                    return (
                      <div
                        key={i}
                        className={`w-6 h-6 ${bank.color} rounded-full flex items-center justify-center mx-auto`}
                      >
                        <CreditCard className="w-3 h-3 text-white" />
                      </div>
                    )
                  })}
                  {day.promos.length > 2 && (
                    <p className="text-xs text-gray-500 dark:text-gray-400">+{day.promos.length - 2}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Featured Promos */}
          <div className="space-y-4 mb-8">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Destacadas para hoy</h3>
            {selectedBanks.slice(0, 3).map((bank, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-200 dark:border-gray-600 shadow-sm"
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 ${bank.color} rounded-xl flex items-center justify-center`}>
                    <span className="text-white text-lg">{bank.icon}</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 dark:text-white">{bank.name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">20% off en supermercados</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-green-600">20%</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">OFF</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Button
            onClick={() => setCurrentScreen("locationPermission")}
            className="w-full h-16 bg-sky-500 hover:bg-sky-600 text-white font-semibold text-lg rounded-2xl shadow-xl"
          >
            Seguir
          </Button>
        </div>
      </div>
    </div>
  )
}
