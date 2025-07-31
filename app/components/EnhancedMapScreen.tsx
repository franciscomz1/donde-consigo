"use client"

import { useState } from "react"
import { MapPin, List, Navigation, Filter, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const mockLocations = [
  {
    id: "1",
    name: "Farmacity Palermo",
    promo: "15% OFF con BBVA",
    distance: "200m",
    category: "Farmacia",
    bank: "BBVA",
    validUntil: "20:00",
    address: "Av. Santa Fe 3421",
    userReported: false,
    rating: 4.5,
    lat: -34.5875,
    lng: -58.405,
    verified: true,
  },
  {
    id: "2",
    name: "Coto Belgrano",
    promo: "20% OFF con Galicia",
    distance: "500m",
    category: "Supermercado",
    bank: "Galicia",
    validUntil: "23:59",
    address: "Av. Cabildo 2502",
    userReported: false,
    rating: 4.2,
    lat: -34.5825,
    lng: -58.41,
    verified: true,
  },
  {
    id: "3",
    name: "Carnicería Don Juan",
    promo: "25% OFF efectivo",
    distance: "300m",
    category: "Carnicería",
    bank: "Efectivo",
    validUntil: "19:00",
    address: "Juramento 1845",
    userReported: true,
    rating: 4.8,
    lat: -34.59,
    lng: -58.4,
    verified: false,
  },
]

const categories = [
  { id: "all", name: "Todas", icon: "🏷️", color: "bg-gray-500" },
  { id: "supermercado", name: "Super", icon: "🛒", color: "bg-green-500" },
  { id: "farmacia", name: "Farmacia", icon: "💊", color: "bg-blue-500" },
  { id: "carniceria", name: "Carnes", icon: "🥩", color: "bg-red-500" },
  { id: "combustible", name: "YPF", icon: "⛽", color: "bg-yellow-500" },
  { id: "indumentaria", name: "Ropa", icon: "👕", color: "bg-purple-500" },
]

const banks = [
  { id: "all", name: "Todos", color: "bg-gray-500" },
  { id: "galicia", name: "Galicia", color: "bg-orange-500" },
  { id: "bbva", name: "BBVA", color: "bg-blue-600" },
  { id: "santander", name: "Santander", color: "bg-red-500" },
]

export default function EnhancedMapScreen() {
  const [viewMode, setViewMode] = useState<"map" | "list">("map")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedBank, setSelectedBank] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [selectedDistance, setSelectedDistance] = useState("all")

  const filteredLocations = mockLocations.filter((location) => {
    const matchesCategory = selectedCategory === "all" || location.category.toLowerCase().includes(selectedCategory)
    const matchesBank = selectedBank === "all" || location.bank.toLowerCase().includes(selectedBank)
    const matchesSearch =
      searchQuery === "" ||
      location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      location.address.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesCategory && matchesBank && matchesSearch
  })

  return (
    <div className="h-full">
      {/* Enhanced Header */}
      <div className="p-4 bg-white dark:bg-gray-800 border-b border-gray-300 dark:border-gray-600">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Mapa de Promociones</h1>
            <p className="text-gray-600 dark:text-gray-300">{filteredLocations.length} ofertas cerca tuyo</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="ghost" size="sm" onClick={() => setShowFilters(!showFilters)} className="rounded-full">
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

        {/* Enhanced Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Buscar comercio, zona o dirección..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-12 pl-10 pr-12 bg-gray-100 dark:bg-gray-700 border-0 rounded-2xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-sky-500"
          />
          <Button variant="ghost" size="sm" className="absolute right-2 top-2 rounded-xl">
            <Navigation className="w-5 h-5" />
          </Button>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="space-y-4 animate-slide-up">
            {/* Category Filter */}
            <div>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Categorías</p>
              <div className="flex space-x-2 overflow-x-auto pb-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex-shrink-0 px-4 py-2 rounded-2xl text-sm font-medium transition-all duration-200 ${
                      selectedCategory === category.id
                        ? "bg-sky-500 text-white shadow-lg"
                        : "bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600"
                    }`}
                  >
                    <span className="mr-2">{category.icon}</span>
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Bank Filter */}
            <div>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Bancos</p>
              <div className="flex space-x-2 overflow-x-auto pb-2">
                {banks.map((bank) => (
                  <button
                    key={bank.id}
                    onClick={() => setSelectedBank(bank.id)}
                    className={`flex-shrink-0 px-4 py-2 rounded-2xl text-sm font-medium transition-all duration-200 ${
                      selectedBank === bank.id
                        ? "bg-sky-500 text-white shadow-lg"
                        : "bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600"
                    }`}
                  >
                    {bank.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Distance Filter */}
            <div>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Distancia</p>
              <div className="flex space-x-2">
                {["all", "500m", "1km", "2km"].map((distance) => (
                  <button
                    key={distance}
                    onClick={() => setSelectedDistance(distance)}
                    className={`px-4 py-2 rounded-2xl text-sm font-medium transition-all duration-200 ${
                      selectedDistance === distance
                        ? "bg-sky-500 text-white shadow-lg"
                        : "bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600"
                    }`}
                  >
                    {distance === "all" ? "Todas" : distance}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {viewMode === "map" ? (
        /* Enhanced Map View */
        <div className="relative h-full bg-gradient-to-br from-blue-50 to-green-50 dark:bg-gray-700">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-sky-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl">
                <MapPin className="w-10 h-10 text-white" />
              </div>
              <p className="text-gray-700 dark:text-gray-300 font-medium text-lg">Mapa Interactivo</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {filteredLocations.length} promociones encontradas
              </p>
            </div>
          </div>

          {/* Enhanced Map Pins */}
          {filteredLocations.map((location, index) => (
            <div
              key={location.id}
              className={`absolute cursor-pointer transform hover:scale-110 transition-all duration-200 ${
                location.userReported ? "animate-pulse" : ""
              }`}
              style={{
                top: `${25 + index * 15}%`,
                left: `${30 + index * 20}%`,
              }}
              onClick={() => console.log(`Clicked on ${location.name}`)}
            >
              {/* Pin */}
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg ${
                  location.verified ? "bg-green-500" : location.userReported ? "bg-purple-500" : "bg-red-500"
                }`}
              >
                <span className="text-white text-xs font-bold">{location.promo.split(" ")[0]}</span>
              </div>

              {/* Status indicators */}
              {location.verified && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
              )}

              {location.userReported && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full border-2 border-white flex items-center justify-center">
                  <span className="text-white text-xs">👥</span>
                </div>
              )}

              {/* Hover tooltip */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                <div className="bg-black text-white text-xs rounded-lg px-2 py-1 whitespace-nowrap">
                  {location.name}
                </div>
              </div>
            </div>
          ))}

          {/* Map Legend */}
          <div className="absolute bottom-4 left-4 bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg">
            <p className="text-sm font-medium text-gray-900 dark:text-white mb-2">Leyenda</p>
            <div className="space-y-2 text-xs">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-gray-600 dark:text-gray-300">Verificado</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                <span className="text-gray-600 dark:text-gray-300">Reportado por usuarios</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-gray-600 dark:text-gray-300">Sin verificar</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Enhanced List View */
        <div className="p-4 space-y-4 bg-white dark:bg-gray-800">
          {filteredLocations.map((location) => (
            <div
              key={location.id}
              className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all duration-200"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white">{location.name}</h3>
                    {location.verified && (
                      <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300 text-xs rounded-full">
                        ✓ Verificado
                      </span>
                    )}
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
                <Button variant="ghost" size="sm" className="rounded-xl">
                  💬
                </Button>
              </div>
            </div>
          ))}

          {filteredLocations.length === 0 && (
            <div className="text-center py-12">
              <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400">No se encontraron promociones con estos filtros</p>
              <Button
                variant="ghost"
                onClick={() => {
                  setSelectedCategory("all")
                  setSelectedBank("all")
                  setSearchQuery("")
                }}
                className="mt-4"
              >
                Limpiar filtros
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
