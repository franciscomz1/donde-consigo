"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Filter, Heart, MapPin, Clock, Star, CreditCard, ShoppingCart, Coffee, Utensils } from "lucide-react"

interface PromosPageProps {
  user: any
}

const promos = [
  {
    id: 1,
    title: "50% OFF en supermercados",
    bank: "Santander",
    bankColor: "bg-red-500",
    category: "Supermercados",
    description: "Descuento en compras superiores a $10.000",
    validUntil: "Hasta mañana",
    location: "Disponible en CABA",
    isFavorite: false,
    isNew: true,
  },
  {
    id: 2,
    title: "3x2 en cafeterías",
    bank: "Galicia",
    bankColor: "bg-orange-500",
    category: "Gastronomía",
    description: "Promoción válida de lunes a viernes",
    validUntil: "Todo el mes",
    location: "Starbucks, Havanna",
    isFavorite: true,
    isNew: false,
  },
  {
    id: 3,
    title: "30% OFF en combustible",
    bank: "BBVA",
    bankColor: "bg-blue-500",
    category: "Combustible",
    description: "Máximo $5.000 de descuento",
    validUntil: "Fines de semana",
    location: "Shell, YPF",
    isFavorite: false,
    isNew: true,
  },
]

const categories = [
  { id: "all", label: "Todas", icon: Star },
  { id: "supermarkets", label: "Supermercados", icon: ShoppingCart },
  { id: "restaurants", label: "Gastronomía", icon: Utensils },
  { id: "coffee", label: "Cafeterías", icon: Coffee },
  { id: "fuel", label: "Combustible", icon: CreditCard },
]

export function PromosPage({ user }: PromosPageProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [favorites, setFavorites] = useState<number[]>([2])

  const toggleFavorite = (promoId: number) => {
    setFavorites((prev) => (prev.includes(promoId) ? prev.filter((id) => id !== promoId) : [...prev, promoId]))
  }

  const filteredPromos = promos.filter((promo) => {
    const matchesSearch =
      promo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      promo.bank.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || promo.category.toLowerCase().includes(selectedCategory)
    return matchesSearch && matchesCategory
  })

  const favoritePromos = promos.filter((promo) => favorites.includes(promo.id))

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-4">Promociones</h1>

        {/* Search and Filter */}
        <div className="flex gap-2 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Buscar promociones..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="w-4 h-4" />
          </Button>
        </div>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className="flex items-center gap-2 whitespace-nowrap"
              >
                <Icon className="w-4 h-4" />
                {category.label}
              </Button>
            )
          })}
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">Todas</TabsTrigger>
          <TabsTrigger value="favorites">Favoritas</TabsTrigger>
          <TabsTrigger value="suggested">Sugeridas</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {filteredPromos.map((promo) => (
            <PromoCard
              key={promo.id}
              promo={promo}
              isFavorite={favorites.includes(promo.id)}
              onToggleFavorite={() => toggleFavorite(promo.id)}
            />
          ))}
        </TabsContent>

        <TabsContent value="favorites" className="space-y-4">
          {favoritePromos.length > 0 ? (
            favoritePromos.map((promo) => (
              <PromoCard
                key={promo.id}
                promo={promo}
                isFavorite={true}
                onToggleFavorite={() => toggleFavorite(promo.id)}
              />
            ))
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <Heart className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">No tenés promociones favoritas aún</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Tocá el corazón en cualquier promoción para agregarla a favoritas
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="suggested" className="space-y-4">
          <Card className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950">
            <CardContent className="p-4">
              <h3 className="font-medium mb-2">Sugeridas para vos</h3>
              <p className="text-sm text-muted-foreground">Basado en tus bancos favoritos y ubicación</p>
            </CardContent>
          </Card>

          {filteredPromos.slice(0, 2).map((promo) => (
            <PromoCard
              key={promo.id}
              promo={promo}
              isFavorite={favorites.includes(promo.id)}
              onToggleFavorite={() => toggleFavorite(promo.id)}
            />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}

function PromoCard({
  promo,
  isFavorite,
  onToggleFavorite,
}: {
  promo: any
  isFavorite: boolean
  onToggleFavorite: () => void
}) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className={`w-12 h-12 ${promo.bankColor} rounded-lg flex items-center justify-center flex-shrink-0`}>
            <span className="text-white font-bold text-sm">{promo.bank.substring(0, 4).toUpperCase()}</span>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="font-medium">{promo.title}</h3>
                <p className="text-sm text-muted-foreground">{promo.bank}</p>
              </div>
              <div className="flex items-center gap-2">
                {promo.isNew && (
                  <Badge
                    variant="secondary"
                    className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                  >
                    NUEVO
                  </Badge>
                )}
                <Button variant="ghost" size="icon" onClick={onToggleFavorite} className="h-8 w-8">
                  <Heart className={`w-4 h-4 ${isFavorite ? "fill-red-500 text-red-500" : "text-muted-foreground"}`} />
                </Button>
              </div>
            </div>

            <p className="text-sm mb-3">{promo.description}</p>

            <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>{promo.validUntil}</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                <span>{promo.location}</span>
              </div>
            </div>

            <Button size="sm" className="w-full">
              Ver condiciones
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
