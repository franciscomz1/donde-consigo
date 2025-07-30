"use client"

import { Button } from "@/components/ui/button"
import { MapPin, Navigation } from "lucide-react"

interface LocationPermissionProps {
  setCurrentScreen: (screen: string) => void
}

export default function LocationPermission({ setCurrentScreen }: LocationPermissionProps) {
  const handleActivateLocation = () => {
    // Request geolocation permission
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log("Location granted:", position.coords)
          setCurrentScreen("personalizedSummary")
        },
        (error) => {
          console.log("Location denied:", error)
          setCurrentScreen("personalizedSummary")
        },
      )
    } else {
      setCurrentScreen("personalizedSummary")
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col items-center justify-center px-8">
      <div className="text-center max-w-sm">
        <div className="w-32 h-32 bg-gradient-to-br from-blue-400 to-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-12 shadow-2xl">
          <MapPin className="w-16 h-16 text-white" />
        </div>

        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          ¿Querés encontrar promociones cerca tuyo?
        </h1>

        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
          Te mostraremos ofertas de comercios en tu zona para que no te pierdas ninguna oportunidad de ahorro
        </p>

        <div className="bg-sky-50 dark:bg-sky-900/20 rounded-2xl p-4 mb-8">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-sky-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-white text-sm">💡</span>
            </div>
            <div>
              <p className="text-sky-800 dark:text-sky-200 font-medium mb-1">¿Por qué es útil?</p>
              <p className="text-sky-700 dark:text-sky-300 text-sm">
                • Descuentos exclusivos en comercios cercanos
                <br />• Alertas cuando pasés cerca de una promo
                <br />• Mapas con todas las ofertas de tu zona
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <Button
            onClick={handleActivateLocation}
            className="w-full h-16 bg-sky-500 hover:bg-sky-600 text-white font-semibold text-lg rounded-2xl shadow-xl"
          >
            <Navigation className="w-6 h-6 mr-3" />
            Activar ubicación
          </Button>

          <Button
            onClick={() => setCurrentScreen("personalizedSummary")}
            variant="ghost"
            className="w-full h-16 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 font-semibold text-lg"
          >
            Ahora no
          </Button>
        </div>
      </div>
    </div>
  )
}
