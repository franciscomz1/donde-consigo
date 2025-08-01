"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Search,
  LinkIcon,
  TrendingUp,
  Star,
  Truck,
  Clock,
  Heart,
  Share2,
  Bell,
  ExternalLink,
  AlertCircle,
  Loader2,
  Zap,
  RefreshCw,
  X,
  Flame,
} from "lucide-react"
import { useSound } from "@/lib/hooks/use-sound"
import { useGamification } from "@/lib/hooks/use-gamification"
import { PriceAlertModal } from "@/components/modals/price-alert-modal"
import { SearchTutorialModal } from "@/components/modals/search-tutorial-modal"

interface PriceSearchPageProps {
  user: any
  setUser: (user: any) => void
}

interface SearchResult {
  id: number
  store: string
  storeLogo: string
  price: number
  originalPrice?: number
  shipping: string
  delivery: string
  rating: number
  reviews: number
  inStock: boolean
  url: string
  badges: string[]
  lastUpdated: string
}

interface SearchState {
  isSearching: boolean
  searchProgress: number
  currentStore: string
  results: SearchResult[]
  searchUrl: string
  productName: string
  error: string | null
  hasSearched: boolean
}

export function PriceSearchPage({ user, setUser }: PriceSearchPageProps) {
  const [searchState, setSearchState] = useState<SearchState>({
    isSearching: false,
    searchProgress: 0,
    currentStore: "",
    results: [],
    searchUrl: "",
    productName: "",
    error: null,
    hasSearched: false,
  })

  const [showAlertModal, setShowAlertModal] = useState(false)
  const [selectedResult, setSelectedResult] = useState<SearchResult | null>(null)
  const [showTutorial, setShowTutorial] = useState(false)
  const [searchHistory, setSearchHistory] = useState<string[]>([])
  const [trendingProducts, setTrendingProducts] = useState<string[]>([])
  const [activeAlerts, setActiveAlerts] = useState<any[]>([])

  const { playSound } = useSound()
  const { addPoints } = useGamification(user?.id || user?.email || "default_user")

  // Cargar datos iniciales
  useEffect(() => {
    // Cargar historial de búsquedas
    const savedHistory = localStorage.getItem("price_search_history")
    if (savedHistory) {
      setSearchHistory(JSON.parse(savedHistory))
    }

    // Cargar alertas activas
    const savedAlerts = localStorage.getItem("price_alerts")
    if (savedAlerts) {
      setActiveAlerts(JSON.parse(savedAlerts))
    }

    // Productos trending simulados
    setTrendingProducts([
      "iPhone 15 Pro",
      "Samsung Galaxy S24",
      "MacBook Air M3",
      "PlayStation 5",
      "Nintendo Switch OLED",
      "AirPods Pro 2",
    ])

    // Mostrar tutorial si es primera vez
    const hasSeenTutorial = localStorage.getItem("price_search_tutorial")
    if (!hasSeenTutorial) {
      setShowTutorial(true)
    }

    // Escuchar evento de URL desde el Home
    const handlePriceSearchUrl = (event: any) => {
      if (event.detail) {
        setSearchState((prev) => ({ ...prev, searchUrl: event.detail }))
        handleSearch(event.detail)
      }
    }

    window.addEventListener("priceSearchUrl", handlePriceSearchUrl)
    return () => window.removeEventListener("priceSearchUrl", handlePriceSearchUrl)
  }, [])

  const extractProductName = (url: string): string => {
    try {
      // Simular extracción de nombre del producto desde URL
      const urlObj = new URL(url)
      const pathname = urlObj.pathname

      // Patrones comunes para extraer nombres de productos
      const patterns = [/\/([^/]+)\/p$/, /\/producto\/([^/]+)/, /\/([^/]+)$/, /\/dp\/([A-Z0-9]+)/]

      for (const pattern of patterns) {
        const match = pathname.match(pattern)
        if (match) {
          return decodeURIComponent(match[1])
            .replace(/-/g, " ")
            .replace(/_/g, " ")
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")
        }
      }

      // Fallback: usar el hostname
      return `Producto de ${urlObj.hostname.replace("www.", "")}`
    } catch {
      return "Producto"
    }
  }

  const simulateSearch = async (url: string) => {
    const stores = [
      { name: "MercadoLibre", delay: 1000 },
      { name: "Amazon", delay: 1500 },
      { name: "Garbarino", delay: 2000 },
      { name: "Frávega", delay: 2500 },
      { name: "Musimundo", delay: 3000 },
    ]

    const productName = extractProductName(url)

    setSearchState((prev) => ({
      ...prev,
      isSearching: true,
      searchProgress: 0,
      currentStore: "",
      results: [],
      productName,
      error: null,
      hasSearched: true,
    }))

    const results: SearchResult[] = []

    for (let i = 0; i < stores.length; i++) {
      const store = stores[i]

      setSearchState((prev) => ({
        ...prev,
        currentStore: store.name,
        searchProgress: ((i + 1) / stores.length) * 100,
      }))

      await new Promise((resolve) => setTimeout(resolve, store.delay))

      // Simular que algunas tiendas no responden
      if (Math.random() > 0.8) {
        continue
      }

      // Generar resultado simulado
      const basePrice = 50000 + Math.random() * 100000
      const discount = Math.random() > 0.5 ? Math.random() * 0.3 : 0
      const finalPrice = basePrice * (1 - discount)

      const result: SearchResult = {
        id: i + 1,
        store: store.name,
        storeLogo: `/placeholder.svg?height=40&width=40&text=${store.name.charAt(0)}`,
        price: Math.round(finalPrice),
        originalPrice: discount > 0 ? Math.round(basePrice) : undefined,
        shipping: Math.random() > 0.5 ? "Gratis" : `$${Math.round(Math.random() * 2000)}`,
        delivery: `${Math.round(Math.random() * 5) + 1}-${Math.round(Math.random() * 3) + 3} días`,
        rating: Math.round((Math.random() * 2 + 3) * 10) / 10,
        reviews: Math.round(Math.random() * 1000) + 50,
        inStock: Math.random() > 0.1,
        url: `https://${store.name.toLowerCase().replace(" ", "")}.com/producto`,
        badges: [],
        lastUpdated: "Hace 5 min",
      }

      // Agregar badges
      if (discount > 0.2) result.badges.push("Oferta")
      if (result.shipping === "Gratis") result.badges.push("Envío gratis")
      if (result.delivery.includes("1-")) result.badges.push("Entrega rápida")
      if (!result.inStock) result.badges.push("Sin stock")

      results.push(result)

      setSearchState((prev) => ({
        ...prev,
        results: [...prev.results, result],
      }))
    }

    // Ordenar por precio y agregar badge de mejor precio
    results.sort((a, b) => a.price - b.price)
    if (results.length > 0 && results[0].inStock) {
      results[0].badges.unshift("Mejor precio")
    }

    setSearchState((prev) => ({
      ...prev,
      isSearching: false,
      currentStore: "",
      results: results,
    }))

    // Agregar puntos por búsqueda
    addPoints("priceSearch", 15)
    playSound("success")

    // Guardar en historial
    const newHistory = [url, ...searchHistory.filter((h) => h !== url)].slice(0, 10)
    setSearchHistory(newHistory)
    localStorage.setItem("price_search_history", JSON.stringify(newHistory))
  }

  const handleSearch = async (urlToSearch?: string) => {
    const url = urlToSearch || searchState.searchUrl

    if (!url.trim()) {
      playSound("error")
      setSearchState((prev) => ({ ...prev, error: "Por favor ingresá una URL válida" }))
      return
    }

    try {
      new URL(url) // Validar URL
      await simulateSearch(url)
    } catch {
      playSound("error")
      setSearchState((prev) => ({ ...prev, error: "URL no válida. Asegurate de incluir http:// o https://" }))
    }
  }

  const handleCreateAlert = (result: SearchResult) => {
    setSelectedResult(result)
    setShowAlertModal(true)
    playSound("click")
  }

  const handleFavorite = (result: SearchResult) => {
    playSound("success")
    addPoints("favoritePrice", 10)

    const updatedUser = {
      ...user,
      favoritePrices: [...(user.favoritePrices || []), result.id],
    }
    setUser(updatedUser)
    localStorage.setItem("user_data", JSON.stringify(updatedUser))
  }

  const handleShare = (result: SearchResult) => {
    playSound("click")
    const shareText = `¡Encontré ${searchState.productName} a $${result.price.toLocaleString()} en ${result.store}! 💰`

    if (navigator.share) {
      navigator.share({
        title: "Mejor precio encontrado",
        text: shareText,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(`${shareText} ${window.location.href}`)
      // Mostrar toast de copiado
    }

    addPoints("sharePrice", 20)
  }

  const handleRepeatSearch = (url: string) => {
    setSearchState((prev) => ({ ...prev, searchUrl: url }))
    handleSearch(url)
  }

  const handleTutorialComplete = () => {
    setShowTutorial(false)
    localStorage.setItem("price_search_tutorial", "completed")
  }

  return (
    <div className="container mx-auto px-4 py-6 space-y-6 max-w-md pb-20">
      {/* Header */}
      <motion.div className="text-center" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Buscador de Precios
        </h1>
        <p className="text-muted-foreground">Encontrá el mejor precio en segundos</p>
      </motion.div>

      {/* Search Input */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950">
        <CardContent className="p-4">
          <div className="space-y-3">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <LinkIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Pegá el link del producto..."
                  value={searchState.searchUrl}
                  onChange={(e) => setSearchState((prev) => ({ ...prev, searchUrl: e.target.value, error: null }))}
                  className="pl-10"
                  onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                  disabled={searchState.isSearching}
                />
              </div>
              <Button
                onClick={() => handleSearch()}
                disabled={!searchState.searchUrl.trim() || searchState.isSearching}
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
              >
                {searchState.isSearching ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Search className="w-4 h-4" />
                )}
              </Button>
            </div>

            {searchState.error && (
              <motion.div
                className="flex items-center gap-2 text-red-600 dark:text-red-400 text-sm"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <AlertCircle className="w-4 h-4" />
                {searchState.error}
              </motion.div>
            )}

            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <Zap className="w-3 h-3 text-yellow-500" />
              <span>+15 puntos por búsqueda • Comparamos en +5 tiendas</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Search Progress */}
      <AnimatePresence>
        {searchState.isSearching && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <Card>
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    >
                      <Search className="w-5 h-5 text-blue-500" />
                    </motion.div>
                    <div className="flex-1">
                      <p className="font-medium">Buscando precios...</p>
                      <p className="text-sm text-muted-foreground">
                        {searchState.currentStore ? `Consultando ${searchState.currentStore}` : "Iniciando búsqueda"}
                      </p>
                    </div>
                  </div>
                  <Progress value={searchState.searchProgress} className="h-2" />
                  <p className="text-xs text-center text-muted-foreground">
                    {Math.round(searchState.searchProgress)}% completado
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Results */}
      <AnimatePresence>
        {searchState.results.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold">Resultados para "{searchState.productName}"</h2>
              <Button variant="outline" size="sm" onClick={() => handleSearch()} className="gap-1">
                <RefreshCw className="w-3 h-3" />
                Actualizar
              </Button>
            </div>

            {searchState.results.map((result, index) => (
              <motion.div
                key={result.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className={`hover:shadow-lg transition-all ${!result.inStock ? "opacity-60" : ""}`}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <img
                        src={result.storeLogo || "/placeholder.svg"}
                        alt={result.store}
                        className="w-12 h-12 rounded-lg object-cover"
                      />

                      <div className="flex-1 space-y-2">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-bold text-lg">{result.store}</h3>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                              <span>{result.rating}</span>
                              <span>({result.reviews})</span>
                            </div>
                          </div>

                          <div className="text-right">
                            <div className="flex items-center gap-2">
                              {result.originalPrice && (
                                <span className="text-sm text-muted-foreground line-through">
                                  ${result.originalPrice.toLocaleString()}
                                </span>
                              )}
                              <span className="text-xl font-bold text-green-600 dark:text-green-400">
                                ${result.price.toLocaleString()}
                              </span>
                            </div>
                            <p className="text-xs text-muted-foreground">Actualizado {result.lastUpdated}</p>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-1">
                          {result.badges.map((badge, i) => (
                            <Badge
                              key={i}
                              className={`text-xs ${
                                badge === "Mejor precio"
                                  ? "bg-green-500 hover:bg-green-600"
                                  : badge === "Sin stock"
                                    ? "bg-red-500 hover:bg-red-600"
                                    : badge === "Envío gratis"
                                      ? "bg-blue-500 hover:bg-blue-600"
                                      : "bg-purple-500 hover:bg-purple-600"
                              } text-white`}
                            >
                              {badge}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                              <Truck className="w-4 h-4 text-muted-foreground" />
                              <span>{result.shipping}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4 text-muted-foreground" />
                              <span>{result.delivery}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                            onClick={() => window.open(result.url, "_blank")}
                            disabled={!result.inStock}
                          >
                            <ExternalLink className="w-3 h-3 mr-1" />
                            {result.inStock ? "Comprar" : "Sin stock"}
                          </Button>

                          <Button size="sm" variant="outline" onClick={() => handleCreateAlert(result)}>
                            <Bell className="w-3 h-3" />
                          </Button>

                          <Button size="sm" variant="outline" onClick={() => handleFavorite(result)}>
                            <Heart className="w-3 h-3" />
                          </Button>

                          <Button size="sm" variant="outline" onClick={() => handleShare(result)}>
                            <Share2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Empty State */}
      {!searchState.isSearching && searchState.results.length === 0 && searchState.hasSearched && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-8">
          <AlertCircle className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-bold mb-2">No encontramos resultados</h3>
          <p className="text-muted-foreground mb-4">Intentá con otro link o verificá que la URL sea correcta</p>
          <Button onClick={() => setShowTutorial(true)} variant="outline">
            Ver tutorial
          </Button>
        </motion.div>
      )}

      {/* Search History */}
      {searchHistory.length > 0 && !searchState.isSearching && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Clock className="w-5 h-5" />
              Búsquedas recientes
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="space-y-2">
              {searchHistory.slice(0, 3).map((url, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 p-2 rounded-lg bg-gray-50 dark:bg-gray-800 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => handleRepeatSearch(url)}
                >
                  <LinkIcon className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm flex-1 truncate">{extractProductName(url)}</span>
                  <RefreshCw className="w-3 h-3 text-muted-foreground" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Trending Products */}
      {!searchState.hasSearched && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <TrendingUp className="w-5 h-5" />
              Productos más buscados
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="grid grid-cols-2 gap-2">
              {trendingProducts.map((product, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="justify-start text-left h-auto py-2 bg-transparent"
                  onClick={() => {
                    setSearchState((prev) => ({
                      ...prev,
                      searchUrl: `https://example.com/${product.toLowerCase().replace(/\s+/g, "-")}`,
                    }))
                  }}
                >
                  <div className="flex items-center gap-2">
                    <Flame className="w-3 h-3 text-orange-500" />
                    <span className="text-xs">{product}</span>
                  </div>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Active Alerts */}
      {activeAlerts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Bell className="w-5 h-5" />
              Alertas activas ({activeAlerts.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="space-y-2">
              {activeAlerts.slice(0, 3).map((alert, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 rounded-lg bg-blue-50 dark:bg-blue-950"
                >
                  <div className="flex-1">
                    <p className="text-sm font-medium">{alert.productName}</p>
                    <p className="text-xs text-muted-foreground">
                      Te avisamos cuando baje de ${alert.targetPrice?.toLocaleString()}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      const newAlerts = activeAlerts.filter((_, i) => i !== index)
                      setActiveAlerts(newAlerts)
                      localStorage.setItem("price_alerts", JSON.stringify(newAlerts))
                    }}
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Modals */}
      <PriceAlertModal
        isOpen={showAlertModal}
        onClose={() => setShowAlertModal(false)}
        result={selectedResult}
        productName={searchState.productName}
        onAlertCreated={(alert) => {
          const newAlerts = [...activeAlerts, alert]
          setActiveAlerts(newAlerts)
          localStorage.setItem("price_alerts", JSON.stringify(newAlerts))
          addPoints("createAlert", 25)
        }}
      />

      <SearchTutorialModal
        isOpen={showTutorial}
        onClose={() => setShowTutorial(false)}
        onComplete={handleTutorialComplete}
      />
    </div>
  )
}
