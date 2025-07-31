"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Check } from "lucide-react"
import type { Bank } from "../types"

interface FavoritesSelectionProps {
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

const categories = [
  { id: "supermercados", name: "Supermercados", icon: "🛒", color: "bg-green-500" },
  { id: "farmacia", name: "Farmacia", icon: "💊", color: "bg-blue-500" },
  { id: "indumentaria", name: "Ropa", icon: "👕", color: "bg-purple-500" },
  { id: "combustible", name: "Combustible", icon: "⛽", color: "bg-yellow-500" },
  { id: "restaurantes", name: "Restaurantes", icon: "🍕", color: "bg-red-500" },
  { id: "tecnologia", name: "Tecnología", icon: "📱", color: "bg-gray-500" },
  { id: "hogar", name: "Hogar", icon: "🏠", color: "bg-brown-500" },
  { id: "entretenimiento", name: "Entretenimiento", icon: "🎬", color: "bg-pink-500" },
]

export default function FavoritesSelection({
  setCurrentScreen,
  selectedBanks,
  setSelectedBanks,
}: FavoritesSelectionProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [currentStep, setCurrentStep] = useState<"banks" | "categories">("banks")

  const toggleBank = (bank: Bank) => {
    const isSelected = selectedBanks.find((b) => b.id === bank.id)
    if (isSelected) {
      setSelectedBanks(selectedBanks.filter((b) => b.id !== bank.id))
    } else {
      setSelectedBanks([...selectedBanks, bank])
    }
  }

  const toggleCategory = (categoryId: string) => {
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== categoryId))
    } else {
      setSelectedCategories([...selectedCategories, categoryId])
    }
  }

  const handleNext = () => {
    if (currentStep === "banks") {
      setCurrentStep("categories")
    } else {
      setCurrentScreen("locationPermission")
    }
  }

  const handleBack = () => {
    if (currentStep === "categories") {
      setCurrentStep("banks")
    } else {
      setCurrentScreen("register")
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col">
      {/* Header */}
      <div className="pt-12 pb-8 px-8">
        <button
          onClick={handleBack}
          className="flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 mb-8"
        >
          <ArrowLeft className="w-6 h-6 mr-2" />
          Volver
        </button>

        <div className="text-center">
          <div className="flex justify-center space-x-2 mb-6">
            <div className={`w-3 h-3 rounded-full ${currentStep === "banks" ? "bg-sky-500" : "bg-gray-300"}`}></div>
            <div
              className={`w-3 h-3 rounded-full ${currentStep === "categories" ? "bg-sky-500" : "bg-gray-300"}`}
            ></div>
          </div>

          {currentStep === "banks" ? (
            <>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                ¿Cuáles son tus bancos favoritos?
              </h1>
              <p className="text-gray-600 dark:text-gray-300 text-lg">Seleccioná los que más usás</p>
            </>
          ) : (
            <>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                ¿Qué categorías te interesan más?
              </h1>
              <p className="text-gray-600 dark:text-gray-300 text-lg">Te mostraremos ofertas personalizadas</p>
            </>
          )}
        </div>
      </div>

      {/* Selection Grid */}
      <div className="flex-1 px-8">
        {currentStep === "banks" ? (
          <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
            {availableBanks.map((bank) => {
              const isSelected = selectedBanks.find((b) => b.id === bank.id)
              return (
                <button
                  key={bank.id}
                  onClick={() => toggleBank(bank)}
                  className={`relative p-6 rounded-2xl border-2 transition-all duration-200 ${
                    isSelected
                      ? "border-sky-500 bg-sky-50 dark:bg-sky-900/20 scale-105"
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
        ) : (
          <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
            {categories.map((category) => {
              const isSelected = selectedCategories.includes(category.id)
              return (
                <button
                  key={category.id}
                  onClick={() => toggleCategory(category.id)}
                  className={`relative p-6 rounded-2xl border-2 transition-all duration-200 ${
                    isSelected
                      ? "border-sky-500 bg-sky-50 dark:bg-sky-900/20 scale-105"
                      : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-500"
                  }`}
                >
                  <div
                    className={`w-12 h-12 ${category.color} rounded-xl flex items-center justify-center text-2xl mb-3 mx-auto`}
                  >
                    {category.icon}
                  </div>
                  <p className="font-semibold text-gray-900 dark:text-white">{category.name}</p>
                  {isSelected && (
                    <div className="absolute top-2 right-2 w-6 h-6 bg-sky-500 rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  )}
                </button>
              )
            })}
          </div>
        )}

        <div className="mt-12 max-w-md mx-auto">
          <Button
            onClick={handleNext}
            disabled={currentStep === "banks" ? selectedBanks.length === 0 : selectedCategories.length === 0}
            className="w-full h-16 bg-sky-500 hover:bg-sky-600 disabled:bg-gray-300 text-white font-semibold text-lg rounded-2xl shadow-xl"
          >
            {currentStep === "banks"
              ? `Continuar (${selectedBanks.length} seleccionados)`
              : `Listo (${selectedCategories.length} seleccionadas)`}
          </Button>

          {currentStep === "banks" && selectedBanks.length > 0 && (
            <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
              Podés cambiar esto después en tu perfil
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
