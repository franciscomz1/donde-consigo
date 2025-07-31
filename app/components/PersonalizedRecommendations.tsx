"use client"

import { Button } from "@/components/ui/button"
import { CheckCircle, Sparkles, Star, MapPin } from "lucide-react"
import type { Bank } from "../types"

interface PersonalizedRecommendationsProps {
  setCurrentScreen: (screen: string) => void
  selectedBanks: Bank[]
  selectedCategories?: string[]
}

const mockRecommendations = [
  {
    id: "1",
    title: "20% OFF en Farmacity",
    bank: "BBVA",
    category: "Farmacia",
    discount: "20%",
    validUntil: "Hasta las 20:00",
    location: "A 300m de tu ubicación",
    color: "bg-blue-600",
    reason: "Porque elegiste BBVA y Farmacia",
  },
  {
    id: "2",
    title: "25% OFF en Coto",
    bank: "Galicia",
    category: "Supermercados",
    discount: "25%",
    validUntil: "Martes de descuentos",
    location: "A 500m de tu ubicación",
    color: "bg-orange-500",
    reason: "Porque elegiste Galicia y Supermercados",
  },
  {
    id: "3",
    title: "3 cuotas sin interés",
    bank: "Mercado Pago",
    category: "Indumentaria",
    discount: "3 cuotas",
    validUntil: "En tiendas seleccionadas",
    location: "Shopping Palermo",
    color: "bg-blue-400",
    reason: "Porque elegiste Mercado Pago",
  },
]

export default function PersonalizedRecommendations({
  setCurrentScreen,
  selectedBanks,
}: PersonalizedRecommendationsProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 flex flex-col items-center justify-center px-8 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-4 h-4 bg-yellow-300 rounded-full animate-bounce opacity-60" />
        <div className="absolute top-40 right-20 w-3 h-3 bg-pink-300 rounded-full animate-pulse opacity-50" />
        <div className="absolute bottom-40 left-20 w-2 h-2 bg-blue-300 rounded-full animate-ping opacity-40" />
      </div>

      <div className="text-center max-w-md relative z-10">
        {/* Success animation */}
        <div className="relative mb-8">
          <div className="w-32 h-32 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto shadow-2xl animate-pulse">
            <CheckCircle className="w-16 h-16 text-white" />
          </div>
          <div className="absolute -top-4 -right-4 animate-bounce">
            <Sparkles className="w-8 h-8 text-green-500" />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">¡Perfecto!</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">Encontramos estas promociones ideales para vos</p>

        {/* Personalized Recommendations */}
        <div className="space-y-4 mb-8">
          {mockRecommendations.slice(0, 2).map((promo) => (
            <div key={promo.id} className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg text-left">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 ${promo.color} rounded-xl flex items-center justify-center`}>
                    <span className="text-white font-bold text-sm">{promo.bank.slice(0, 2)}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white text-sm">{promo.bank}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-300">{promo.category}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-green-600">{promo.discount}</p>
                  <p className="text-xs text-gray-500">OFF</p>
                </div>
              </div>

              <h3 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">{promo.title}</h3>

              <div className="flex items-center space-x-4 text-xs text-gray-600 dark:text-gray-300 mb-2">
                <span>⏰ {promo.validUntil}</span>
                <span className="flex items-center">
                  <MapPin className="w-3 h-3 mr-1" />
                  {promo.location}
                </span>
              </div>

              <div className="bg-sky-50 dark:bg-sky-900/20 rounded-xl p-2">
                <p className="text-xs text-sky-700 dark:text-sky-300 flex items-center">
                  <Star className="w-3 h-3 mr-1" />
                  {promo.reason}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg mb-8">
          <div className="flex items-center justify-center space-x-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-sky-500">{selectedBanks.length}</div>
              <p className="text-xs text-gray-600 dark:text-gray-300">Bancos configurados</p>
            </div>
            <div className="w-px h-12 bg-gray-200 dark:bg-gray-600"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-500">∞</div>
              <p className="text-xs text-gray-600 dark:text-gray-300">Ofertas disponibles</p>
            </div>
          </div>
        </div>

        <Button
          onClick={() => setCurrentScreen("notificationPermission")}
          className="w-full h-16 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 hover:from-green-600 hover:via-blue-600 hover:to-purple-600 text-white font-semibold text-lg rounded-2xl shadow-xl transform hover:scale-105 transition-all duration-300"
        >
          <span className="mr-3">Continuar</span>
          <Sparkles className="w-6 h-6" />
        </Button>
      </div>
    </div>
  )
}
