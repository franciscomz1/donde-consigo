"use client"

import { useState } from "react"
import { MapPin, List, Navigation, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"

const mockLocations = [
  {
    id: "1",
    name: "Farmacity Palermo",
    promo: "15% OFF con BBVA",
    distance: "200m",
    category: "Farmacia",
    validUntil: "20:00",
  },
  {
    id: "2",
    name: "Coto Belgrano",
    promo: "20% OFF con Galicia",
    distance: "500m",
    category: "Supermercado",
    validUntil: "23:59",
  },
  {
    id: "3",
    name: "Zara Palermo",
    promo: "3 cuotas sin interés",
    distance: "800m",
    category: "Indumentaria",
    validUntil: "Todo el día",
  },
]

export default function MapScreen() {
  const [viewMode, setViewMode] = useState<"map" | "list">("map")

  return (
    <div className="h-full">
      {/* Header */}
      <div className="p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dónde Consigo</h1>
            <p className="text-gray-600 dark:text-gray-300">Promociones cerca tuyo</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="ghost" size="sm" className="rounded-full">
              <Filter className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setViewMode(viewMode === "map" ? "list" : "map")}
              className="rounded-full"
            >
              {viewMode === "map" ? <List className="w-5 h-5" /> : <MapPin className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Search bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar comercio o zona..."
            className="w-full h-12 pl-4 pr-12 bg-gray-100 dark:bg-gray-700 border-0 rounded-2xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-sky-500"
          />
          <Button variant="ghost" size="sm" className="absolute right-2 top-2 rounded-xl">
            <Navigation className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {viewMode === "map" ? (
        /* Map View */
        <div className="relative h-full bg-gray-200 dark:bg-gray-700">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-300">Mapa interactivo</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Aquí se mostraría el mapa con los puntos de promociones
              </p>
            </div>
          </div>

          {/* Mock map pins */}
          <div className="absolute top-1/4 left-1/3 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center shadow-lg animate-bounce">
            <span className="text-white text-xs font-bold">1</span>
          </div>
          <div className="absolute top-1/2 right-1/3 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center shadow-lg animate-bounce delay-300">
            <span className="text-white text-xs font-bold">2</span>
          </div>
          <div className="absolute bottom-1/3 left-1/2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg animate-bounce delay-500">
            <span className="text-white text-xs font-bold">3</span>
          </div>
        </div>
      ) : (
        /* List View */
        <div className="p-4 space-y-4">
          {mockLocations.map((location) => (
            <div
              key={location.id}
              className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-200 dark:border-gray-600 shadow-sm"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{location.name}</h3>
                  <p className="text-sky-600 dark:text-sky-400 font-medium mb-1">{location.promo}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-300">
                    <span>📍 {location.distance}</span>
                    <span>🏷️ {location.category}</span>
                    <span>⏰ Hasta {location.validUntil}</span>
                  </div>
                </div>
              </div>

              <Button size="sm" className="w-full bg-sky-500 hover:bg-sky-600 text-white rounded-xl">
                <Navigation className="w-4 h-4 mr-2" />
                Cómo llegar
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
