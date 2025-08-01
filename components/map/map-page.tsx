"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { MapPin, Search, Filter, Navigation, List, MapIcon, Clock, ExternalLink } from "lucide-react"

interface MapPageProps {
  user: any
}

const locations = [
  {
    id: 1,
    name: "Carrefour Palermo",
    address: "Av. Santa Fe 3253",
    distance: "0.5 km",
    category: "Supermercado",
    promos: ["50% OFF Santander", "3x2 Galicia"],
    hours: "8:00 - 22:00",
    lat: -34.5875,
    lng: -58.405,
  },
  {
    id: 2,
    name: "Starbucks Recoleta",
    address: "Av. Callao 1234",
    distance: "0.8 km",
    category: "Cafetería",
    promos: ["3x2 Galicia"],
    hours: "7:00 - 23:00",
    lat: -34.595,
    lng: -58.395,
  },
  {
    id: 3,
    name: "Shell Belgrano",
    address: "Av. Cabildo 2100",
    distance: "1.2 km",
    category: "Combustible",
    promos: ["30% OFF BBVA"],
    hours: "24 hs",
    lat: -34.565,
    lng: -58.455,
  },
]

export function MapPage({ user }: MapPageProps) {
  const [viewMode, setViewMode] = useState<"map" | "list">("map")
  const [searchQuery, setSearchQuery] = useState("")
  const [locationPermission, setLocationPermission] = useState<"granted" | "denied" | "prompt">("prompt")
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)

  useEffect(() => {
    // Check geolocation permission
    if (navigator.geolocation) {
      navigator.permissions?.query({ name: "geolocation" }).then((result) => {
        setLocationPermission(result.state as any)
      })
    }
  }, [])

  const requestLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
          setLocationPermission("granted")
        },
        (error) => {
          setLocationPermission("denied")
        },
      )
    }
  }

  const filteredLocations = locations.filter(
    (location) =>
      location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      location.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-4">Mapa de promociones</h1>

        {/* Location Permission Banner */}
        {locationPermission === "prompt" && (
          <Card className="mb-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Navigation className="w-6 h-6 text-blue-500" />
                <div className="flex-1">
                  <p className="font-medium">Activá tu ubicación</p>
                  <p className="text-sm text-muted-foreground">
                    Recibí alertas de promos cerca tuyo y encontrá locales más fácil
                  </p>
                </div>
                <Button onClick={requestLocation} size="sm">
                  Activar
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Search and Controls */}
        <div className="flex gap-2 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Buscar direcciones o locales..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="w-4 h-4" />
          </Button>
        </div>

        {/* View Toggle */}
        <div className="flex gap-2 mb-4">
          <Button
            variant={viewMode === "map" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("map")}
            className="flex items-center gap-2"
          >
            <MapIcon className="w-4 h-4" />
            Mapa
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("list")}
            className="flex items-center gap-2"
          >
            <List className="w-4 h-4" />
            Lista
          </Button>
        </div>
      </div>

      {viewMode === "map" ? (
        <MapView locations={filteredLocations} userLocation={userLocation} />
      ) : (
        <ListView locations={filteredLocations} />
      )}
    </div>
  )
}

function MapView({ locations, userLocation }: { locations: any[]; userLocation: any }) {
  return (
    <div className="space-y-4">
      {/* Map Placeholder */}
      <Card className="h-64 bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950">
        <CardContent className="p-8 h-full flex items-center justify-center">
          <div className="text-center">
            <MapIcon className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">Mapa interactivo</p>
            <p className="text-sm text-muted-foreground mt-2">{locations.length} locales con promociones cerca tuyo</p>
          </div>
        </CardContent>
      </Card>

      {/* Location Cards */}
      <div className="space-y-3">
        {locations.map((location) => (
          <LocationCard key={location.id} location={location} />
        ))}
      </div>
    </div>
  )
}

function ListView({ locations }: { locations: any[] }) {
  return (
    <div className="space-y-3">
      {locations.map((location) => (
        <LocationCard key={location.id} location={location} />
      ))}
    </div>
  )
}

function LocationCard({ location }: { location: any }) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
            <MapPin className="w-5 h-5 text-white" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="font-medium">{location.name}</h3>
                <p className="text-sm text-muted-foreground">{location.address}</p>
              </div>
              <Badge variant="outline" className="text-xs">
                {location.distance}
              </Badge>
            </div>

            <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
              <span>{location.category}</span>
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>{location.hours}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-1 mb-3">
              {location.promos.map((promo: string, index: number) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {promo}
                </Badge>
              ))}
            </div>

            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                <ExternalLink className="w-3 h-3 mr-1" />
                Ver en Maps
              </Button>
              <Button size="sm" className="flex-1">
                Cómo llegar
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
