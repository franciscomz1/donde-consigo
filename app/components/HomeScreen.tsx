"use client"

import { useState, useEffect } from "react"
import { Bell, Gift, Users, MapPin, Star, Flame, Target, Share2, Plus, HelpCircle, Trophy } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { User, Bank, Challenge } from "../types"
import RewardsModal from "./RewardsModal"
import HelpModal from "./HelpModal"
import RankingModal from "./RankingModal"
import TipOfTheDay from "./TipOfTheDay"
import SuccessToast from "./SuccessToast"
import GuestModePrompt from "./GuestModePrompt"
import CompleteProfileModal from "./CompleteProfileModal"
import ProgressBar from "./ProgressBar"

interface HomeScreenProps {
  user: User | null
  selectedBanks: Bank[]
  setCurrentScreen?: (screen: string) => void
  setUser?: (user: User | null) => void
}

const mockChallenges: Challenge[] = [
  {
    id: "1",
    title: "Subí tu primera promo",
    description: "Compartí una promoción con la comunidad",
    icon: "📸",
    progress: 0,
    target: 1,
    reward: 50,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    completed: false,
  },
  {
    id: "2",
    title: "Invitá a un amigo",
    description: "Compartí la app y ganá puntos",
    icon: "👥",
    progress: 0,
    target: 1,
    reward: 100,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    completed: false,
  },
]

const mockCommunityFeed = [
  {
    id: "1",
    userName: "María G.",
    userLevel: "Experta",
    promo: "20% OFF en Farmacity con BBVA",
    location: "Palermo, CABA",
    timeAgo: "hace 2 horas",
    likes: 24,
    verified: true,
  },
  {
    id: "2",
    userName: "Carlos R.",
    userLevel: "Leyenda",
    promo: "25% OFF en Coto con Galicia",
    location: "Villa Crespo, CABA",
    timeAgo: "hace 4 horas",
    likes: 89,
    verified: true,
  },
]

export default function HomeScreen({ user, selectedBanks, setCurrentScreen, setUser }: HomeScreenProps) {
  const [showInviteModal, setShowInviteModal] = useState(false)
  const [copyFeedback, setCopyFeedback] = useState("")
  const [showConfetti, setShowConfetti] = useState(false)
  const [showRewardsModal, setShowRewardsModal] = useState(false)
  const [showHelpModal, setShowHelpModal] = useState(false)
  const [showRankingModal, setShowRankingModal] = useState(false)
  const [showCompleteProfile, setShowCompleteProfile] = useState(false)
  const [toastMessage, setToastMessage] = useState("")
  const [pointsAnimation, setPointsAnimation] = useState(false)

  // Check if user needs to complete profile on first login
  useEffect(() => {
    if (user && (user.name === "Usuario" || !user.name)) {
      const hasShownProfileModal = localStorage.getItem("hasShownProfileModal")
      if (!hasShownProfileModal) {
        setTimeout(() => {
          setShowCompleteProfile(true)
          localStorage.setItem("hasShownProfileModal", "true")
        }, 1000)
      }
    }
  }, [user])

  const getStreakMessage = (streak: number) => {
    if (streak >= 7) return "¡Increíble racha! 🔥"
    if (streak >= 3) return "¡Vas muy bien! 💪"
    return "¡Seguí así! ⭐"
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Novato":
        return "text-green-600 bg-green-100"
      case "Experto":
        return "text-blue-600 bg-blue-100"
      case "Leyenda":
        return "text-purple-600 bg-purple-100"
      default:
        return "text-gray-600 bg-gray-100"
    }
  }

  const showToast = (message: string) => {
    setToastMessage(message)
    setTimeout(() => setToastMessage(""), 3000)
  }

  const animatePoints = () => {
    setPointsAnimation(true)
    setTimeout(() => setPointsAnimation(false), 1000)
  }

  const handleCompleteProfile = (profileData: { name: string; avatar?: string }) => {
    if (setUser && user) {
      const updatedUser = {
        ...user,
        name: profileData.name,
        avatar: profileData.avatar,
        points: user.points + 50,
        achievements: [
          ...(user.achievements || []),
          {
            id: "profileComplete",
            title: "Perfil completo",
            description: "Completaste tu información personal",
            icon: "👤",
            unlockedAt: new Date(),
            points: 50,
          },
        ],
      }
      setUser(updatedUser)
      animatePoints()
      showToast("¡Perfil completado! +50 puntos ganados")
    }
  }

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(user?.referralCode || "REF123")
      setCopyFeedback("¡Código copiado!")
      showToast("¡Código copiado al portapapeles!")
      setTimeout(() => setCopyFeedback(""), 2000)
    } catch (err) {
      setCopyFeedback("Error al copiar")
      setTimeout(() => setCopyFeedback(""), 2000)
    }
  }

  const handleWhatsAppShare = () => {
    const message = `¡Hola! Te invito a usar "Dónde Consigo", la app que te ayuda a encontrar las mejores promociones bancarias cerca tuyo. 

Usá mi código de invitación: ${user?.referralCode || "REF123"} y ambos ganamos 100 puntos 🎉

Descargala acá: [link de la app]`

    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")

    setShowConfetti(true)
    showToast("¡Invitación enviada por WhatsApp!")
    setTimeout(() => setShowConfetti(false), 3000)
  }

  const handleQuickShare = () => {
    const message = `¡Descubrí "Dónde Consigo"! 🎯 La app que te ayuda a encontrar las mejores promociones bancarias cerca tuyo. ¡Descargala gratis!`

    if (navigator.share) {
      navigator.share({
        title: "Dónde Consigo",
        text: message,
        url: window.location.origin,
      })
    } else {
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`
      window.open(whatsappUrl, "_blank")
    }

    showToast("¡Gracias por compartir la app!")
  }

  // Determinar si es usuario invitado
  const isGuest = !user
  const isIncompleteProfile = user && (user.name === "Usuario" || !user.name)
  const displayName = user?.name && user.name !== "Usuario" ? user.name : "usuario invitado"

  // Si es usuario invitado, mostrar prompt de registro
  if (isGuest) {
    return (
      <div className="p-4 space-y-6">
        <GuestModePrompt
          onRegister={() => setCurrentScreen?.("register")}
          onLogin={() => setCurrentScreen?.("signin")}
        />

        {/* Contenido limitado para invitados */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 border border-gray-200 dark:border-gray-700 opacity-60">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Vista previa de promociones</h2>
          <div className="space-y-3">
            {mockCommunityFeed.slice(0, 2).map((post) => (
              <div key={post.id} className="bg-gray-50 dark:bg-gray-700 rounded-2xl p-4">
                <p className="font-medium text-gray-900 dark:text-white">{post.promo}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">{post.location}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-4">
            <p className="text-gray-500 dark:text-gray-400 text-sm">Registrate para ver todas las promociones</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 space-y-6">
      {/* Enhanced Welcome Header */}
      <div className="bg-gradient-to-r from-sky-500 to-purple-500 rounded-3xl p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold">¡Hola, {isIncompleteProfile ? "usuario invitado" : displayName}!</h1>
            <p className="opacity-90">
              {isIncompleteProfile
                ? "Completá tu perfil para personalizar tu experiencia"
                : "Descubrí las mejores ofertas hoy"}
            </p>

            {/* Social Proof */}
            <div className="flex items-center space-x-4 mt-2 text-sm opacity-80">
              <span>👥 2,847 usuarios activos</span>
              <span>🎁 156 premios canjeados</span>
            </div>

            {isIncompleteProfile && (
              <Button
                onClick={() => setShowCompleteProfile(true)}
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20 rounded-xl mt-2 border border-white/30"
              >
                Completá tu perfil y ganá puntos
              </Button>
            )}
          </div>
          <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 rounded-full">
            <Bell className="w-5 h-5" />
          </Button>
        </div>

        {/* Enhanced User Stats with animations */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div
              className={`text-2xl font-bold transition-all duration-500 ${pointsAnimation ? "animate-bounce text-yellow-300" : ""}`}
            >
              {Number(user?.points) || 0}
            </div>
            <div className="text-sm opacity-90">Puntos</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1">
              <Flame className="w-5 h-5 text-orange-300" />
              <span className="text-2xl font-bold">{Number(user?.streak) || 0}</span>
            </div>
            <div className="text-sm opacity-90">Días seguidos</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">${Number(user?.totalSavings) || 0}</div>
            <div className="text-sm opacity-90">Ahorrado</div>
          </div>
        </div>

        {/* Progress bar in header */}
        {user && user.level && (
          <div className="mt-4">
            <ProgressBar currentPoints={Number(user.points) || 0} currentLevel={user.level} animated={false} />
          </div>
        )}
      </div>

      {/* Tip del día */}
      <TipOfTheDay userName={isIncompleteProfile ? undefined : displayName} />

      {/* Banner de próximas mejoras */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-2xl p-4 border border-amber-200 dark:border-amber-700">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center">
            <span className="text-white text-sm">🚀</span>
          </div>
          <div className="flex-1">
            <p className="font-semibold text-amber-800 dark:text-amber-200 text-sm">Próximas mejoras</p>
            <p className="text-amber-700 dark:text-amber-300 text-xs">
              Mapa en tiempo real • Alertas push • Más bancos
            </p>
          </div>
          <Button
            onClick={() => setShowHelpModal(true)}
            variant="ghost"
            size="sm"
            className="text-amber-600 hover:bg-amber-100 dark:hover:bg-amber-800 rounded-xl"
          >
            <HelpCircle className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Streak Celebration */}
      {user && user.streak > 0 && (
        <div className="bg-gradient-to-r from-orange-100 to-red-100 dark:from-orange-900/20 dark:to-red-900/20 rounded-2xl p-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-red-400 rounded-full flex items-center justify-center">
              <Flame className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="font-bold text-gray-900 dark:text-white">{getStreakMessage(user.streak)}</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">Llevás {user.streak} días usando la app</p>
            </div>
          </div>
        </div>
      )}

      {/* Weekly Challenges */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Desafíos semanales</h2>
          <Target className="w-5 h-5 text-sky-500" />
        </div>

        <div className="space-y-3">
          {mockChallenges.map((challenge) => (
            <div
              key={challenge.id}
              className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center space-x-3 mb-3">
                <div className="text-2xl">{challenge.icon}</div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 dark:text-white">{challenge.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{challenge.description}</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-green-600">+{challenge.reward}</div>
                  <div className="text-xs text-gray-500">puntos</div>
                </div>
              </div>

              {/* Progress bar animada */}
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-2">
                <div
                  className="bg-gradient-to-r from-sky-500 to-purple-500 h-2 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${(challenge.progress / challenge.target) * 100}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                <span>
                  {challenge.progress}/{challenge.target}
                </span>
                <span>Expira en 6 días</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Community Feed */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Actividad de la comunidad</h2>
          <Button variant="ghost" size="sm" className="text-sky-600 dark:text-sky-400">
            Ver todo
          </Button>
        </div>

        <div className="space-y-3">
          {mockCommunityFeed.map((post) => (
            <div
              key={post.id}
              className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-sky-400 to-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">{post.userName.charAt(0)}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-semibold text-gray-900 dark:text-white">{post.userName}</span>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getLevelColor(post.userLevel)}`}>
                      {post.userLevel}
                    </span>
                    {post.verified && <span className="text-blue-500">✓</span>}
                  </div>
                  <p className="text-gray-900 dark:text-white font-medium mb-1">{post.promo}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-300">
                    <span className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{post.location}</span>
                    </span>
                    <span>{post.timeAgo}</span>
                    <span className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span>{post.likes}</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Enhanced Quick Actions */}
      <div className="grid grid-cols-4 gap-3">
        <Button
          onClick={() => setShowInviteModal(true)}
          className="h-16 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white rounded-2xl flex flex-col items-center justify-center space-y-1 transform hover:scale-105 transition-all duration-200"
        >
          <Share2 className="w-4 h-4" />
          <span className="text-xs font-medium">Invitar</span>
        </Button>

        <Button
          onClick={() => setShowRewardsModal(true)}
          className="h-16 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-2xl flex flex-col items-center justify-center space-y-1 transform hover:scale-105 transition-all duration-200"
        >
          <Gift className="w-4 h-4" />
          <span className="text-xs font-medium">Premios</span>
        </Button>

        <Button
          onClick={() => setShowRankingModal(true)}
          className="h-16 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white rounded-2xl flex flex-col items-center justify-center space-y-1 transform hover:scale-105 transition-all duration-200"
        >
          <Trophy className="w-4 h-4" />
          <span className="text-xs font-medium">Ranking</span>
        </Button>

        <Button
          onClick={() => setShowHelpModal(true)}
          variant="outline"
          className="h-16 border-2 border-gray-200 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700 rounded-2xl flex flex-col items-center justify-center space-y-1 transform hover:scale-105 transition-all duration-200"
        >
          <HelpCircle className="w-4 h-4 text-gray-600 dark:text-gray-300" />
          <span className="text-xs font-medium text-gray-600 dark:text-gray-300">Ayuda</span>
        </Button>
      </div>

      {/* Enhanced Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 max-w-sm w-full relative">
            {showConfetti && (
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-4 left-4 text-2xl animate-bounce">🎉</div>
                <div className="absolute top-6 right-6 text-xl animate-bounce delay-100">✨</div>
                <div className="absolute bottom-8 left-8 text-lg animate-bounce delay-200">🎊</div>
                <div className="absolute bottom-6 right-4 text-xl animate-bounce delay-300">⭐</div>
              </div>
            )}

            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Invitá a tus amigos</h3>
              <p className="text-gray-600 dark:text-gray-300">Ambos ganan 100 puntos cuando se registre</p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 rounded-2xl p-4 mb-6">
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">Tu código de invitación:</p>
              <div className="flex items-center justify-between bg-white dark:bg-gray-800 rounded-xl p-3">
                <span className="font-mono font-bold text-lg text-gray-900 dark:text-white">
                  {user?.referralCode || "REF123"}
                </span>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleCopyCode}
                  className={`text-sky-600 transition-all duration-200 ${
                    copyFeedback ? "bg-green-100 text-green-600" : ""
                  }`}
                >
                  {copyFeedback || "Copiar"}
                </Button>
              </div>
            </div>

            <div className="space-y-3">
              <Button
                onClick={handleWhatsAppShare}
                className="w-full bg-green-500 hover:bg-green-600 text-white rounded-2xl"
              >
                <Share2 className="w-5 h-5 mr-2" />
                Compartir por WhatsApp
              </Button>

              <Button variant="outline" onClick={() => setShowInviteModal(false)} className="w-full rounded-2xl">
                Cerrar
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Share Button */}
      <Button
        onClick={handleQuickShare}
        className="fixed bottom-32 right-4 w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white shadow-xl transform hover:scale-110 transition-all duration-200"
      >
        <Share2 className="w-5 h-5" />
      </Button>

      {/* Floating Action Button */}
      <Button className="fixed bottom-24 right-4 w-14 h-14 rounded-full bg-gradient-to-r from-sky-500 to-purple-500 hover:from-sky-600 hover:to-purple-600 text-white shadow-xl transform hover:scale-110 transition-all duration-200">
        <Plus className="w-6 h-6" />
      </Button>

      {/* Modales */}
      <RewardsModal
        isOpen={showRewardsModal}
        onClose={() => setShowRewardsModal(false)}
        userPoints={user?.points || 0}
        userName={isIncompleteProfile ? undefined : displayName}
      />

      <RankingModal
        isOpen={showRankingModal}
        onClose={() => setShowRankingModal(false)}
        userPoints={user?.points || 0}
        userName={isIncompleteProfile ? undefined : displayName}
      />

      <HelpModal isOpen={showHelpModal} onClose={() => setShowHelpModal(false)} />

      <CompleteProfileModal
        isOpen={showCompleteProfile}
        onClose={() => setShowCompleteProfile(false)}
        onComplete={handleCompleteProfile}
        user={user}
      />

      {/* Toast de éxito */}
      <SuccessToast message={toastMessage} />
    </div>
  )
}
