"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Gift,
  Search,
  Trophy,
  User,
  Star,
  TrendingUp,
  Lightbulb,
  Target,
  Users,
  Clock,
  Bell,
  Sparkles,
  ArrowUp,
  Flame,
  Zap,
  Heart,
  ChevronRight,
  X,
  Share2,
  Eye,
  LinkIcon,
} from "lucide-react"
import { useGamification } from "@/lib/hooks/use-gamification"
import { useSound } from "@/lib/hooks/use-sound"
import { AchievementToast } from "@/components/ui/achievement-toast"
import { APP_CONFIG } from "@/lib/config/app-config"
import { PointsDetailModal } from "@/components/modals/points-detail-modal"
import { TipsModal } from "@/components/modals/tips-modal"
import { ChallengeDetailModal } from "@/components/modals/challenge-detail-modal"
import { ShareModal } from "@/components/modals/share-modal"

interface EnhancedHomeDashboardProps {
  user: any
  setUser: (user: any) => void
  onNavigate: (tab: string) => void
}

export function EnhancedHomeDashboard({ user, setUser, onNavigate }: EnhancedHomeDashboardProps) {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [dailyTip, setDailyTip] = useState("")
  const [socialProof, setSocialProof] = useState({ activeUsers: 0, promosRedeemed: 0, newPromos: 0, priceSearches: 0 })
  const [notifications, setNotifications] = useState<any[]>([])
  const [showProfileBanner, setShowProfileBanner] = useState(false)
  const [dailyChallenge, setDailyChallenge] = useState<any>(null)
  const [featuredPromo, setFeaturedPromo] = useState<any>(null)
  const [showPointsModal, setShowPointsModal] = useState(false)
  const [showTipsModal, setShowTipsModal] = useState(false)
  const [showChallengeModal, setShowChallengeModal] = useState(false)
  const [showShareModal, setShowShareModal] = useState(false)
  const [shareContent, setShareContent] = useState<any>(null)
  const [searchUrl, setSearchUrl] = useState("")

  const { state, achievements, showAchievement, addPoints, getProgressToNextLevel } = useGamification(
    user?.id || user?.email || "default_user",
  )
  const { playSound } = useSound()

  const profileCompletion = calculateProfileCompletion(user)
  const nextLevelProgress = getProgressToNextLevel()
  const greeting = getPersonalizedGreeting(currentTime, user?.name)

  // Efectos y datos dinámicos
  useEffect(() => {
    // Actualizar hora cada minuto
    const timer = setInterval(() => setCurrentTime(new Date()), 60000)

    // Cargar tip del día
    setDailyTip(getDailyTip())

    // Simular social proof en tiempo real
    const socialTimer = setInterval(() => {
      setSocialProof({
        activeUsers: Math.floor(Math.random() * 100) + 1200,
        promosRedeemed: Math.floor(Math.random() * 20) + 80,
        newPromos: Math.floor(Math.random() * 5) + 12,
        priceSearches: Math.floor(Math.random() * 30) + 150,
      })
    }, 5000)

    // Mostrar banner de perfil incompleto
    if (profileCompletion < 100) {
      setShowProfileBanner(true)
    }

    // Cargar datos dinámicos
    loadDynamicContent()

    // Escuchar evento de filtro de favoritos
    const handleFavoritesFilter = () => {
      // Este evento se dispara desde el ChallengeDetailModal
      setTimeout(() => {
        const favoritesButton = document.querySelector('[data-filter="favorites"]')
        if (favoritesButton) {
          ;(favoritesButton as HTMLElement).click()
        }
      }, 100)
    }

    window.addEventListener("activateFavoritesFilter", handleFavoritesFilter)

    return () => {
      clearInterval(timer)
      clearInterval(socialTimer)
      window.removeEventListener("activateFavoritesFilter", handleFavoritesFilter)
    }
  }, [profileCompletion])

  // Actualizar progreso del desafío cuando cambian los favoritos
  useEffect(() => {
    if (dailyChallenge && user?.favoritePromos) {
      const updatedChallenge = {
        ...dailyChallenge,
        progress: Math.min(user.favoritePromos.length, dailyChallenge.target),
      }
      setDailyChallenge(updatedChallenge)
    }
  }, [user?.favoritePromos])

  const loadDynamicContent = () => {
    // Cargar desafío diario con progreso real
    const currentHour = new Date().getHours()
    const isExpired = currentHour > 23 // Simular expiración

    setDailyChallenge({
      id: 1,
      title: "Agregá 3 promos a favoritos",
      description: "Explorá y guardá las promociones que más te gusten",
      progress: user?.favoritePromos?.length || 0,
      target: 3,
      reward: 100,
      timeLeft: isExpired ? "Expirado" : "18 horas",
      emoji: "🎯",
      type: "daily",
      isExpired: isExpired,
      difficulty: "Fácil",
      completedAt: null,
    })

    // Cargar promo destacada
    setFeaturedPromo({
      id: 1,
      title: "50% OFF en supermercados",
      bank: "Santander",
      bankColor: "from-red-500 to-red-600",
      description: "Descuento en compras superiores a $10.000",
      validUntil: "Hasta mañana",
      timeLeft: "18 horas",
      category: "Supermercados",
      isNew: true,
      isTrending: true,
      conditions: "Válido de lunes a viernes en todos los supermercados adheridos. Máximo 1 uso por cliente.",
      locations: ["Carrefour", "Coto", "Disco", "Jumbo"],
    })

    // Cargar notificaciones
    setNotifications([
      {
        id: 1,
        title: "¡Nueva promo cerca tuyo!",
        message: "30% OFF en Starbucks a 2 cuadras",
        type: "location",
        time: "Hace 5 min",
        action: () => onNavigate("promos"),
      },
      {
        id: 2,
        title: "¡Subiste de nivel!",
        message: "Ahora sos nivel 2 - Cazador",
        type: "achievement",
        time: "Hace 1 hora",
        action: () => setShowPointsModal(true),
      },
    ])
  }

  const handleChallengeComplete = (challengeId: number, points: number) => {
    // Actualizar el desafío como completado
    setDailyChallenge((prev) => ({
      ...prev,
      completedAt: new Date().toISOString(),
      progress: prev.target, // Asegurar que esté completo
    }))

    // Actualizar usuario con puntos
    const updatedUser = {
      ...user,
      points: (user.points || 0) + points,
      completedChallenges: [...(user.completedChallenges || []), challengeId],
    }
    setUser(updatedUser)
    localStorage.setItem("user_data", JSON.stringify(updatedUser))
  }

  const handlePointsClick = () => {
    playSound("click")
    setShowPointsModal(true)
  }

  const handleTipClick = () => {
    playSound("click")
    setShowTipsModal(true)
  }

  const handleChallengeClick = () => {
    playSound("click")
    setShowChallengeModal(true)
  }

  const handleShareAchievement = () => {
    playSound("click")
    setShareContent({
      type: "achievement",
      title: `¡Llegué al nivel ${state.level} en Donde Consigo!`,
      message: `Ya tengo ${state.points} puntos y soy ${APP_CONFIG.gamification.levels[state.level as keyof typeof APP_CONFIG.gamification.levels]?.name}. ¡Descubrí las mejores promociones conmigo!`,
      url: window.location.origin,
    })
    setShowShareModal(true)
  }

  const handlePromoFavorite = () => {
    playSound("success")
    const updatedUser = {
      ...user,
      favoritePromos: [...(user.favoritePromos || []), featuredPromo.id],
    }
    setUser(updatedUser)
    localStorage.setItem("user_data", JSON.stringify(updatedUser))
    addPoints("firstPromoFavorite", 20)
  }

  const handleNotificationDismiss = (notificationId: number) => {
    playSound("click")
    setNotifications((prev) => prev.filter((n) => n.id !== notificationId))
  }

  const handlePriceSearch = () => {
    if (!searchUrl.trim()) {
      playSound("error")
      return
    }

    playSound("click")
    onNavigate("prices")

    // Pasar la URL al componente de búsqueda
    setTimeout(() => {
      const event = new CustomEvent("priceSearchUrl", { detail: searchUrl })
      window.dispatchEvent(event)
    }, 100)
  }

  const quickActions = [
    {
      id: "promos",
      title: "Promociones",
      subtitle: "Ver ofertas",
      icon: Gift,
      color: "from-purple-500 to-pink-500",
      badge: `${socialProof.newPromos} nuevas`,
      badgeColor: "bg-red-500",
      action: () => {
        playSound("click")
        onNavigate("promos")
      },
    },
    {
      id: "prices",
      title: "Precios",
      subtitle: "Comparar",
      icon: Search,
      color: "from-blue-500 to-cyan-500",
      badge: `${socialProof.priceSearches} hoy`,
      badgeColor: "bg-blue-500",
      action: () => {
        playSound("click")
        onNavigate("prices")
      },
    },
    {
      id: "ranking",
      title: "Ranking",
      subtitle: "Tu posición",
      icon: Trophy,
      color: "from-yellow-500 to-orange-500",
      badge: "#8",
      badgeColor: "bg-yellow-500",
      action: () => {
        playSound("click")
        onNavigate("ranking")
      },
    },
    {
      id: "profile",
      title: "Perfil",
      subtitle: "Configurar",
      icon: User,
      color: "from-green-500 to-emerald-500",
      badge: `${profileCompletion}%`,
      badgeColor: profileCompletion === 100 ? "bg-green-500" : "bg-orange-500",
      action: () => {
        playSound("click")
        onNavigate("profile")
      },
    },
  ]

  return (
    <div className="container mx-auto px-4 py-6 space-y-6 max-w-md">
      <AchievementToast achievement={achievements[0]} show={showAchievement} onClose={() => {}} />

      {/* Enhanced Welcome Section */}
      <motion.div
        className="text-center mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h1
          className="text-3xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
          animate={{
            backgroundPosition: ["0%", "100%", "0%"],
            scale: [1, 1.02, 1],
          }}
          transition={{
            backgroundPosition: { duration: 3, repeat: Number.POSITIVE_INFINITY },
            scale: { duration: 2, repeat: Number.POSITIVE_INFINITY },
          }}
        >
          {greeting} 👋
        </motion.h1>
        <p className="text-muted-foreground text-lg">{getTimeBasedMessage(currentTime)}</p>

        {/* Weather-like info */}
        <motion.div
          className="flex items-center justify-center gap-4 mt-3 text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center gap-1">
            <Sparkles className="w-4 h-4 text-yellow-500" />
            <span>{socialProof.newPromos} promos nuevas</span>
          </div>
          <div className="flex items-center gap-1">
            <Search className="w-4 h-4 text-blue-500" />
            <span>{socialProof.priceSearches} búsquedas hoy</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Price Search Input - Destacado */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 border-blue-200 dark:border-blue-800 shadow-lg">
          <CardContent className="p-4">
            <div className="space-y-3">
              <div className="text-center">
                <h3 className="font-bold text-blue-700 dark:text-blue-300 mb-1 flex items-center justify-center gap-2">
                  <Search className="w-5 h-5" />
                  Buscador de Precios
                </h3>
                <p className="text-sm text-blue-600 dark:text-blue-400">
                  ¿Querés ahorrar? Pegá el link y descubrí dónde está más barato
                </p>
              </div>

              <div className="flex gap-2">
                <div className="relative flex-1">
                  <LinkIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Pegá el link del producto..."
                    value={searchUrl}
                    onChange={(e) => setSearchUrl(e.target.value)}
                    className="pl-10 bg-white dark:bg-gray-800"
                    onKeyPress={(e) => e.key === "Enter" && handlePriceSearch()}
                  />
                </div>
                <Button
                  onClick={handlePriceSearch}
                  disabled={!searchUrl.trim()}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
                >
                  <Search className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <Zap className="w-3 h-3 text-yellow-500" />
                <span>Buscamos en +10 tiendas • Ganás +15 puntos por búsqueda</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Profile Completion Banner with Enhanced Animation */}
      <AnimatePresence>
        {showProfileBanner && profileCompletion < 100 && (
          <motion.div
            initial={{ opacity: 0, height: 0, scale: 0.95 }}
            animate={{ opacity: 1, height: "auto", scale: 1 }}
            exit={{ opacity: 0, height: 0, scale: 0.95 }}
            transition={{ duration: 0.5, type: "spring", damping: 20 }}
          >
            <Card className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 border-purple-200 dark:border-purple-800 relative overflow-hidden shadow-lg">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10"
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              />
              <CardContent className="p-4 relative">
                <div className="flex items-center gap-3">
                  <motion.div
                    animate={{
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <User className="w-8 h-8 text-purple-500" />
                  </motion.div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-bold">Perfil {profileCompletion}% completo</p>
                      <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white animate-pulse">
                        +50 pts
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      ¡Te falta poco para desbloquear funciones exclusivas!
                    </p>
                    <Progress value={profileCompletion} className="h-2" />
                  </div>
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg"
                    onClick={() => {
                      playSound("click")
                      onNavigate("profile")
                    }}
                  >
                    <Zap className="w-4 h-4 mr-1" />
                    Completar
                  </Button>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-2 right-2 h-6 w-6 p-0 hover:bg-white/20"
                  onClick={() => setShowProfileBanner(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enhanced Stats Cards */}
      <div className="grid grid-cols-2 gap-4">
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Card
            className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-950 dark:to-orange-950 border-yellow-200 dark:border-yellow-800 shadow-lg hover:shadow-xl transition-all cursor-pointer"
            onClick={handlePointsClick}
          >
            <CardContent className="p-4 text-center">
              <motion.div
                animate={{
                  rotate: [0, 5, -5, 0],
                  scale: [1, 1.05, 1],
                }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              >
                <Star className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
              </motion.div>
              <motion.p
                className="text-3xl font-bold text-yellow-700 dark:text-yellow-300"
                key={state.points}
                initial={{ scale: 1.3, color: "#10b981" }}
                animate={{ scale: 1, color: "#b45309" }}
                transition={{ type: "spring", damping: 15 }}
              >
                {state.points.toLocaleString()}
              </motion.p>
              <p className="text-sm text-muted-foreground font-medium">Puntos</p>
              {state.points > 0 && (
                <motion.div
                  className="flex items-center justify-center gap-1 mt-1"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <ArrowUp className="w-3 h-3 text-green-500" />
                  <span className="text-xs text-green-600 dark:text-green-400 font-medium">Ver historial</span>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Card
            className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 border-purple-200 dark:border-purple-800 shadow-lg hover:shadow-xl transition-all cursor-pointer"
            onClick={handlePointsClick}
          >
            <CardContent className="p-4 text-center">
              <motion.div
                animate={{
                  rotate: [0, -5, 5, 0],
                  y: [0, -2, 0],
                }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              >
                <Trophy className="w-8 h-8 mx-auto mb-2 text-purple-500" />
              </motion.div>
              <p className="text-3xl font-bold text-purple-700 dark:text-purple-300">Nivel {state.level}</p>
              <p className="text-sm text-muted-foreground font-medium">
                {APP_CONFIG.gamification.levels[state.level as keyof typeof APP_CONFIG.gamification.levels]?.name}
              </p>
              <div className="mt-2">
                <Progress value={nextLevelProgress.progress} className="h-1.5" />
                <p className="text-xs text-muted-foreground mt-1">{nextLevelProgress.pointsNeeded} pts al siguiente</p>
              </div>
              <div className="flex items-center justify-center gap-1 mt-1">
                <Eye className="w-3 h-3 text-purple-500" />
                <span className="text-xs text-purple-600 dark:text-purple-400 font-medium">Ver logros</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Daily Challenge with Enhanced Progress Tracking */}
      {dailyChallenge && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card
            className={`${
              dailyChallenge.isExpired
                ? "bg-gradient-to-r from-gray-50 to-slate-50 dark:from-gray-950 dark:to-slate-950 border-gray-200 dark:border-gray-800"
                : dailyChallenge.progress >= dailyChallenge.target || dailyChallenge.completedAt
                  ? "bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 border-green-200 dark:border-green-800"
                  : "bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950 dark:to-red-950 border-orange-200 dark:border-orange-800"
            } shadow-lg hover:shadow-xl transition-all cursor-pointer border-2`}
            onClick={handleChallengeClick}
          >
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{
                    scale:
                      dailyChallenge.progress >= dailyChallenge.target || dailyChallenge.completedAt
                        ? [1, 1.2, 1]
                        : [1, 1.1, 1],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                >
                  <Target className="w-8 h-8 text-green-500" />
                </motion.div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-green-700 dark:text-green-300">
                      {dailyChallenge.emoji} Desafío diario
                    </h3>
                    {dailyChallenge.isExpired ? (
                      <Badge variant="destructive" className="animate-pulse">
                        Expirado
                      </Badge>
                    ) : dailyChallenge.progress >= dailyChallenge.target || dailyChallenge.completedAt ? (
                      <Badge className="bg-green-500 hover:bg-green-600 text-white animate-bounce">¡Completado!</Badge>
                    ) : (
                      <Flame className="w-4 h-4 text-orange-500 animate-pulse" />
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{dailyChallenge.title}</p>
                  <div className="flex items-center gap-2 mb-2">
                    <Progress
                      value={
                        dailyChallenge.target > 0
                          ? Math.min(100, Math.max(0, (dailyChallenge.progress / dailyChallenge.target) * 100))
                          : 0
                      }
                      className="h-2 flex-1"
                    />
                    <span className="text-sm font-bold text-green-600 dark:text-green-400">
                      {dailyChallenge.progress}/{dailyChallenge.target}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-muted-foreground">🏆 +{dailyChallenge.reward} puntos al completar</p>
                    <Badge
                      variant="outline"
                      className={`text-xs ${
                        dailyChallenge.isExpired
                          ? "border-gray-300 text-gray-600 dark:border-gray-700 dark:text-gray-400"
                          : "border-green-300 text-green-600 dark:border-green-700 dark:text-green-400 animate-pulse"
                      }`}
                    >
                      ⏰ {dailyChallenge.timeLeft}
                    </Badge>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-green-500" />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Daily Tip with Enhanced Animation */}
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
        <Card
          className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950 border-blue-200 dark:border-blue-800 shadow-lg hover:shadow-xl transition-all cursor-pointer"
          onClick={handleTipClick}
        >
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <motion.div
                animate={{
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.05, 1],
                }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
              >
                <Lightbulb className="w-6 h-6 text-blue-500 mt-1" />
              </motion.div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-blue-700 dark:text-blue-300">💡 Tip del día</h3>
                  <Badge
                    variant="secondary"
                    className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 text-xs animate-pulse"
                  >
                    Nuevo
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{dailyTip}</p>
                <Button variant="ghost" size="sm" className="text-blue-600 dark:text-blue-400 p-0 h-auto font-medium">
                  Ver más tips <ChevronRight className="w-3 h-3 ml-1" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Enhanced Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        {quickActions.map((action, index) => (
          <motion.div
            key={action.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <Card
              className="cursor-pointer hover:shadow-xl transition-all duration-300 relative overflow-hidden bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 border-2 border-transparent hover:border-purple-200 dark:hover:border-purple-800"
              onClick={action.action}
            >
              <motion.div
                className={`absolute inset-0 bg-gradient-to-r ${action.color} opacity-0 hover:opacity-5 transition-opacity`}
              />
              <CardContent className="p-4 text-center relative">
                <div className="flex items-center justify-between mb-3">
                  <motion.div whileHover={{ rotate: 10, scale: 1.1 }} transition={{ type: "spring", damping: 15 }}>
                    <action.icon className={`w-8 h-8 bg-gradient-to-r ${action.color} bg-clip-text text-transparent`} />
                  </motion.div>
                  {action.badge && (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} whileHover={{ scale: 1.1 }}>
                      <Badge className={`text-xs text-white ${action.badgeColor} shadow-lg animate-pulse`}>
                        {action.badge}
                      </Badge>
                    </motion.div>
                  )}
                </div>
                <p className="font-bold text-lg">{action.title}</p>
                <p className="text-sm text-muted-foreground">{action.subtitle}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Featured Promo with Enhanced Design */}
      {featuredPromo && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <Card className="hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-red-200 dark:hover:border-red-800 overflow-hidden">
            <CardHeader className="pb-3 bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-950 dark:to-pink-950">
              <CardTitle className="flex items-center gap-2 text-lg">
                <TrendingUp className="w-5 h-5 text-green-500" />
                <span className="bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                  Promo destacada para vos
                </span>
                <div className="flex gap-1">
                  {featuredPromo.isNew && (
                    <Badge className="bg-red-500 hover:bg-red-600 text-white animate-pulse text-xs">NUEVO</Badge>
                  )}
                  {featuredPromo.isTrending && (
                    <Badge className="bg-orange-500 hover:bg-orange-600 text-white animate-bounce text-xs">
                      🔥 HOY
                    </Badge>
                  )}
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <motion.div
                  className={`w-16 h-16 bg-gradient-to-br ${featuredPromo.bankColor} rounded-xl flex items-center justify-center shadow-lg`}
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  transition={{ type: "spring", damping: 15 }}
                >
                  <span className="text-white font-bold text-lg">SANT</span>
                </motion.div>
                <div className="flex-1">
                  <p className="font-bold text-xl mb-1">{featuredPromo.title}</p>
                  <p className="text-sm text-muted-foreground mb-2">
                    {featuredPromo.bank} • {featuredPromo.description}
                  </p>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="flex items-center gap-1 text-orange-600 dark:text-orange-400">
                      <Clock className="w-4 h-4" />
                      <span className="font-medium">Quedan {featuredPromo.timeLeft}</span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {featuredPromo.category}
                    </Badge>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white shadow-lg"
                    onClick={() => {
                      playSound("click")
                      onNavigate("promos")
                    }}
                  >
                    Ver más
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-red-300 text-red-600 hover:bg-red-50 dark:border-red-700 dark:text-red-400 dark:hover:bg-red-950 bg-transparent"
                    onClick={handlePromoFavorite}
                  >
                    <Heart className="w-3 h-3 mr-1" />
                    Favorito
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Real-time Social Proof */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
        <Card className="bg-gradient-to-r from-gray-50 to-slate-50 dark:from-gray-950 dark:to-slate-950 shadow-lg">
          <CardContent className="p-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                >
                  <Users className="w-5 h-5 text-blue-500" />
                </motion.div>
                <div>
                  <motion.p
                    className="text-sm font-bold text-blue-600 dark:text-blue-400"
                    key={socialProof.activeUsers}
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                  >
                    {socialProof.activeUsers.toLocaleString()}
                  </motion.p>
                  <p className="text-xs text-muted-foreground">usuarios activos</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <motion.div
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    rotate: { duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                    scale: { duration: 2, repeat: Number.POSITIVE_INFINITY },
                  }}
                >
                  <Search className="w-5 h-5 text-purple-500" />
                </motion.div>
                <div>
                  <motion.p
                    className="text-sm font-bold text-purple-600 dark:text-purple-400"
                    key={socialProof.priceSearches}
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                  >
                    {socialProof.priceSearches}
                  </motion.p>
                  <p className="text-xs text-muted-foreground">búsquedas de precios</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Notifications/Alerts */}
      <AnimatePresence>
        {notifications.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-2"
          >
            {notifications.slice(0, 2).map((notification, index) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, x: 5 }}
              >
                <Card
                  className="bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-950 dark:to-yellow-950 border-amber-200 dark:border-amber-800 shadow-lg cursor-pointer"
                  onClick={notification.action}
                >
                  <CardContent className="p-3">
                    <div className="flex items-center gap-3">
                      <motion.div
                        animate={{
                          rotate: [0, 10, -10, 0],
                          scale: [1, 1.1, 1],
                        }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                      >
                        <Bell className="w-5 h-5 text-amber-500" />
                      </motion.div>
                      <div className="flex-1">
                        <p className="text-sm font-bold">{notification.title}</p>
                        <p className="text-xs text-muted-foreground">{notification.message}</p>
                        <p className="text-xs text-amber-600 dark:text-amber-400 mt-1">{notification.time}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0 hover:bg-amber-200 dark:hover:bg-amber-800"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleNotificationDismiss(notification.id)
                        }}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button for Quick Actions */}
      <motion.div
        className="fixed bottom-20 right-4 z-40"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring", damping: 15 }}
      >
        <motion.button
          className="w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-2xl flex items-center justify-center text-white"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          animate={{
            boxShadow: [
              "0 0 0 0 rgba(168, 85, 247, 0.4)",
              "0 0 0 10px rgba(168, 85, 247, 0)",
              "0 0 0 0 rgba(168, 85, 247, 0)",
            ],
          }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          onClick={handleShareAchievement}
        >
          <Share2 className="w-6 h-6" />
        </motion.button>
      </motion.div>

      {/* Modals */}
      <PointsDetailModal
        isOpen={showPointsModal}
        onClose={() => setShowPointsModal(false)}
        user={user}
        gamificationState={state}
        nextLevelProgress={nextLevelProgress}
      />

      <TipsModal isOpen={showTipsModal} onClose={() => setShowTipsModal(false)} currentTip={dailyTip} />

      <ChallengeDetailModal
        isOpen={showChallengeModal}
        onClose={() => setShowChallengeModal(false)}
        challenge={dailyChallenge}
        user={user}
        onNavigate={onNavigate}
        onChallengeComplete={handleChallengeComplete}
      />

      <ShareModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        content={shareContent}
        onShare={(platform) => {
          playSound("success")
          addPoints("shareRanking", 25)
        }}
      />
    </div>
  )
}

// Helper functions
function calculateProfileCompletion(user: any): number {
  if (!user) return 0
  let completion = 0
  const fields = ["name", "email", "profilePhoto", "favoriteBanks"]

  fields.forEach((field) => {
    if (user[field] && (Array.isArray(user[field]) ? user[field].length > 0 : true)) {
      completion += 25
    }
  })

  return completion
}

function getPersonalizedGreeting(time: Date, name?: string): string {
  const hour = time.getHours()
  const greetings = APP_CONFIG.personalization.greetings

  let timeGreetings: string[]
  if (hour < 12) {
    timeGreetings = greetings.morning
  } else if (hour < 18) {
    timeGreetings = greetings.afternoon
  } else {
    timeGreetings = greetings.evening
  }

  const greeting = timeGreetings[Math.floor(Math.random() * timeGreetings.length)]
  return name ? `${greeting}, ${name.split(" ")[0]}` : greeting
}

function getTimeBasedMessage(time: Date): string {
  const hour = time.getHours()

  if (hour < 12) {
    return "Empezá el día descubriendo las mejores promociones y precios"
  } else if (hour < 18) {
    return "Perfecta hora para encontrar ofertas increíbles y comparar precios"
  } else {
    return "Revisá las promociones de mañana y configurá alertas de precio"
  }
}

function getDailyTip(): string {
  const tips = [
    "💡 Usá el buscador de precios para encontrar el mejor precio antes de comprar",
    "🎯 Configurá alertas de precio para que te avisen cuando baje el producto que querés",
    "⭐ Completá tu perfil al 100% para recibir promociones más personalizadas",
    "🏆 Compartí tu ranking para ganar puntos extra y motivar a tus amigos",
    "📱 Agregá la app a tu pantalla de inicio para acceso más rápido",
    "🔔 Los viernes se publican las mejores promociones para el fin de semana",
    "💳 Configurá tus bancos favoritos para recibir alertas personalizadas",
    "🔍 Pegá links de productos en el buscador para comparar precios automáticamente",
  ]

  const today = new Date().getDay()
  return tips[today] || tips[0]
}
