"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Check } from "lucide-react"
import type { Bank } from "../types"

interface BankSelectionProps {
  setCurrentScreen: (screen: string) => void
  selectedBanks: Bank[]
  setSelectedBanks: (banks: Bank[]) => void
}

const availableBanks: Bank[] = [
  { id: "galicia", name: "Galicia", color: "bg-orange-500", icon: "🟠" },
  { id: "bbva", name: "BBVA", color: "bg-blue-600", icon: "🔵" },
  { id: "santander", name: "Santander", color: "bg-red-500", icon: "🔴" },
  { id: "mercadopago", name: "Mercado Pago", color: "bg-blue-400", icon: "💙" },
  { id: "brubank", name: "Brubank", color: "bg-purple-500", icon: "🟣" },
  { id: "naranja", name: "Naranja X", color: "bg-orange-600", icon: "🧡" },
  { id: "icbc", name: "ICBC", color: "bg-red-600", icon: "❤️" },
  { id: "uala", name: "Ualá", color: "bg-pink-500", icon: "💗" },
]

export default function BankSelection({ setCurrentScreen, selectedBanks, setSelectedBanks }: BankSelectionProps) {
  const [showMore, setShowMore] = useState(false)

  const toggleBank = (bank: Bank) => {
    const isSelected = selectedBanks.find((b) => b.id === bank.id)
    if (isSelected) {
      setSelectedBanks(selectedBanks.filter((b) => b.id !== bank.id))
    } else {
      setSelectedBanks([...selectedBanks, bank])
    }
  }

  const displayedBanks = showMore ? availableBanks : availableBanks.slice(0, 6)

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col">
      {/* Header */}
      <div className="pt-12 pb-8 px-8">
        <button
          onClick={() => setCurrentScreen("register")}
          className="flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 mb-8"
        >
          <ArrowLeft className="w-6 h-6 mr-2" />
          Volver
        </button>

        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            ¿Usás alguno de estos bancos o billeteras?
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">Esto nos ayuda a personalizar tus promos</p>
        </div>
      </div>

      {/* Bank Selection */}
      <div className="flex-1 px-8">
        <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
          {displayedBanks.map((bank) => {
            const isSelected = selectedBanks.find((b) => b.id === bank.id)
            return (
              <button
                key={bank.id}
                onClick={() => toggleBank(bank)}
                className={`relative p-6 rounded-2xl border-2 transition-all duration-200 ${
                  isSelected
                    ? "border-sky-500 bg-sky-50 dark:bg-sky-900/20"
                    : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-500"
                }`}
              >
                <div
                  className={`w-12 h-12 ${bank.color} rounded-xl flex items-center justify-center text-2xl mb-3 mx-auto`}
                >
                  {bank.icon}
                </div>
                <p className="font-semibold text-gray-900 dark:text-white">{bank.name}</p>
                {isSelected && (
                  <div className="absolute top-2 right-2 w-6 h-6 bg-sky-500 rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                )}
              </button>
            )
          })}
        </div>

        {!showMore && (
          <div className="text-center mt-6">
            <button
              onClick={() => setShowMore(true)}
              className="text-sky-600 dark:text-sky-400 font-semibold hover:text-sky-700 dark:hover:text-sky-300"
            >
              Ver más opciones...
            </button>
          </div>
        )}

        <div className="mt-12 max-w-md mx-auto">
          <Button
            onClick={() => setCurrentScreen("locationPermission")}
            disabled={selectedBanks.length === 0}
            className="w-full h-16 bg-sky-500 hover:bg-sky-600 disabled:bg-gray-300 text-white font-semibold text-lg rounded-2xl shadow-xl"
          >
            Listo, seguir ({selectedBanks.length} seleccionados)
          </Button>
        </div>
      </div>
    </div>
  )
}
