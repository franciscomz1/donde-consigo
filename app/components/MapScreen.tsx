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
    address: "Av. Santa Fe 3421",
    userReported: false,
    rating: 4.5,
  },
  {
    id: "2",
    name: "Coto Belgrano",
    promo: "20% OFF con Galicia",
    distance: "500m",
    category: "Supermercado",
    validUntil: "23:59",
    address: "Av. Cabildo 2502",
    userReported: false,
    rating: 4.2,
  },
  {
    id: "3",
    name: "Carnicería Don Juan",
    promo: "25% OFF efectivo",
    distance: "300m",
    category: "Carnicería",
    validUntil: "19:00",
    address: "Juramento 1845",
    userReported: true,
    rating: 4.8,
  },
  {
    id: "4",
    name: "YPF Núñez",
    promo: "10% OFF con Mercado Pago",
    distance: "800m",
    category: "Combustible",
    validUntil: "Todo el día",
    address: "Av. del Libertador 6789",
    userReported: false,
    rating: 4.0,
  },
]

export default function MapScreen() {
  const [viewMode, setViewMode] = useState<"map" | "list">("map")

  return (
    <div className="h-full">
      {/* Header */}
      <div className="p-4 bg-white dark:bg-gray-800 border-b border-gray-300 dark:border-gray-600">
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
        <div className="relative h-full bg-gradient-to-br from-blue-50 to-green-50 dark:bg-gray-700">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-16 h-16 text-blue-500 mx-auto mb-4" />
              <p className="text-gray-700 dark:text-gray-300 font-medium">Mapa interactivo</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{mockLocations.length} promociones cerca tuyo</p>
            </div>
          </div>

          {/* Pins más realistas en el mapa */}
          {mockLocations.map((location, index) => (
            <div
              key={location.id}
              className={`absolute w-10 h-10 rounded-full flex items-center justify-center shadow-lg cursor-pointer transform hover:scale-110 transition-all duration-200 ${
                location.userReported ? "bg-purple-500 animate-pulse" : "bg-red-500"
              }`}
              style={{
                top: `${25 + index * 15}%`,
                left: `${30 + index * 20}%`,
              }}
              onClick={() => console.log(`Clicked on ${location.name}`)}
            >
              <span className="text-white text-xs font-bold">{location.discount || location.promo.split(" ")[0]}</span>
              {location.userReported && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full border border-white"></div>
              )}
            </div>
          ))}
        </div>
      ) : (
        /* List View */
        <div className="p-4 space-y-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600">
          {mockLocations.map((location) => (
            <div
              key={location.id}
              className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all duration-200"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white">{location.name}</h3>
                    {location.userReported && (
                      <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300 text-xs rounded-full">
                        👥 Reportado
                      </span>
                    )}
                  </div>
                  <p className="text-sky-600 dark:text-sky-400 font-medium mb-1">{location.promo}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-300">
                    <span>📍 {location.distance}</span>
                    <span>🏷️ {location.category}</span>
                    <span>⏰ {location.validUntil}</span>
                    <span>⭐ {location.rating}</span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{location.address}</p>
                </div>
              </div>

              <div className="flex space-x-2">
                <Button size="sm" className="flex-1 bg-sky-500 hover:bg-sky-600 text-white rounded-xl">
                  <Navigation className="w-4 h-4 mr-2" />
                  Cómo llegar
                </Button>
                <Button variant="ghost" size="sm" className="rounded-xl">
                  📞
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
