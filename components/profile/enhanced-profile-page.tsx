"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Edit3,
  Camera,
  Bell,
  CreditCard,
  History,
  LogOut,
  HelpCircle,
  Star,
  Trophy,
  Gift,
  ChevronRight,
  Shield,
  Share2,
  Download,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { useSound } from "@/lib/hooks/use-sound"
import { EditProfileModal } from "@/components/modals/edit-profile-modal"
import { PointsHistoryModal } from "@/components/modals/points-history-modal"
import { AchievementsModal } from "@/components/modals/achievements-modal"
import { ShareModal } from "@/components/modals/share-modal"

interface EnhancedProfilePageProps {
  user: any
  setUser: (user: any) => void
}

export function EnhancedProfilePage({ user, setUser }: EnhancedProfilePageProps) {
  const { playSound } = useSound()
  const [showEditModal, setShowEditModal] = useState(false)
  const [showPointsHistory, setShowPointsHistory] = useState(false)
  const [showAchievements, setShowAchievements] = useState(false)
  const [showShareModal, setShowShareModal] = useState(false)

  const handleEditProfile = () => {
    playSound("click")
    setShowEditModal(true)
  }

  const handleViewHistory = () => {
    playSound("click")
    setShowPointsHistory(true)
  }

  const handleViewAchievements = () => {
    playSound("click")
    setShowAchievements(true)
  }

  const handleShare = () => {
    playSound("click")
    setShowShareModal(true)
  }

  const handleLogout = () => {
    playSound("click")
    if (confirm("¿Estás seguro que quieres cerrar sesión?")) {
      localStorage.removeItem("user_data")
      window.location.reload()
    }
  }

  const nextLevelPoints = Math.ceil(user.level * 100 * 1.5)
  const progressToNextLevel = ((user.points % nextLevelPoints) / nextLevelPoints) * 100

  const menuItems = [
    {
      icon: Edit3,
      title: "Editar perfil",
      description: "Cambiar foto, nombre y datos personales",
      action: handleEditProfile,
      color: "text-blue-600",
    },
    {
      icon: CreditCard,
      title: "Mis bancos y billeteras",
      description: `${user.preferredBanks?.length || 0} configurados`,
      action: handleEditProfile,
      color: "text-green-600",
    },
    {
      icon: Bell,
      title: "Notificaciones y alertas",
      description: "Configurar qué quieres recibir",
      action: () => {},
      color: "text-purple-600",
    },
    {
      icon: History,
      title: "Historial de puntos",
      description: "Ver todos tus movimientos",
      action: handleViewHistory,
      color: "text-orange-600",
    },
    {
      icon: Trophy,
      title: "Mis logros",
      description: `${user.achievements?.length || 0} desbloqueados`,
      action: handleViewAchievements,
      color: "text-yellow-600",
    },
    {
      icon: Share2,
      title: "Compartir perfil",
      description: "Invita amigos y gana puntos",
      action: handleShare,
      color: "text-pink-600",
    },
  ]

  const supportItems = [
    {
      icon: HelpCircle,
      title: "Centro de ayuda",
      description: "FAQs y soporte",
      action: () => {},
    },
    {
      icon: Shield,
      title: "Privacidad y seguridad",
      description: "Configurar tu privacidad",
      action: () => {},
    },
    {
      icon: Download,
      title: "Descargar mis datos",
      description: "Exportar información personal",
      action: () => {},
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-md mx-auto">
        {/* Profile Header */}
        <Card className="mb-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="relative">
                <Avatar className="w-20 h-20 border-4 border-white/20">
                  <AvatarImage src={user.profilePhoto || "/placeholder.svg"} />
                  <AvatarFallback className="bg-white/20 text-white text-xl">
                    {user.name?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
                <Button
                  size="sm"
                  className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-white text-purple-600 hover:bg-gray-100"
                  onClick={handleEditProfile}
                >
                  <Camera className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex-1">
                <h1 className="text-xl font-bold">{user.name || "Usuario"}</h1>
                <p className="text-white/80 text-sm">Miembro desde {new Date().toLocaleDateString()}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="secondary" className="bg-white/20 text-white">
                    Nivel {user.level}
                  </Badge>
                  <Badge variant="secondary" className="bg-white/20 text-white">
                    {user.points} puntos
                  </Badge>
                </div>
              </div>
            </div>

            {/* Progress to Next Level */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progreso al nivel {user.level + 1}</span>
                <span>{Math.round(progressToNextLevel)}%</span>
              </div>
              <Progress value={progressToNextLevel} className="bg-white/20" />
              <p className="text-xs text-white/80">
                Te faltan {nextLevelPoints - (user.points % nextLevelPoints)} puntos
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Card className="text-center cursor-pointer" onClick={handleViewAchievements}>
              <CardContent className="p-4">
                <Trophy className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
                <p className="text-2xl font-bold">{user.achievements?.length || 0}</p>
                <p className="text-xs text-gray-600">Logros</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Card className="text-center cursor-pointer" onClick={handleViewHistory}>
              <CardContent className="p-4">
                <Gift className="w-6 h-6 text-green-500 mx-auto mb-2" />
                <p className="text-2xl font-bold">{user.totalRedeemed || 0}</p>
                <p className="text-xs text-gray-600">Canjeados</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Card className="text-center cursor-pointer">
              <CardContent className="p-4">
                <Star className="w-6 h-6 text-purple-500 mx-auto mb-2" />
                <p className="text-2xl font-bold">#{user.ranking || "N/A"}</p>
                <p className="text-xs text-gray-600">Ranking</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Menu Items */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Mi cuenta</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {menuItems.map((item, index) => (
              <motion.div key={index} whileHover={{ backgroundColor: "#f8fafc" }} whileTap={{ scale: 0.98 }}>
                <Button variant="ghost" className="w-full justify-start p-4 h-auto" onClick={item.action}>
                  <item.icon className={`w-5 h-5 mr-3 ${item.color}`} />
                  <div className="flex-1 text-left">
                    <p className="font-medium">{item.title}</p>
                    <p className="text-sm text-gray-500">{item.description}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </Button>
              </motion.div>
            ))}
          </CardContent>
        </Card>

        {/* Support Section */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Soporte y configuración</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {supportItems.map((item, index) => (
              <motion.div key={index} whileHover={{ backgroundColor: "#f8fafc" }} whileTap={{ scale: 0.98 }}>
                <Button variant="ghost" className="w-full justify-start p-4 h-auto" onClick={item.action}>
                  <item.icon className="w-5 h-5 mr-3 text-gray-600" />
                  <div className="flex-1 text-left">
                    <p className="font-medium">{item.title}</p>
                    <p className="text-sm text-gray-500">{item.description}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </Button>
              </motion.div>
            ))}
          </CardContent>
        </Card>

        {/* Logout Button */}
        <Button
          variant="outline"
          className="w-full gap-2 text-red-600 border-red-200 hover:bg-red-50 bg-transparent"
          onClick={handleLogout}
        >
          <LogOut className="w-4 h-4" />
          Cerrar sesión
        </Button>
      </motion.div>

      {/* Modals */}
      <AnimatePresence>
        {showEditModal && <EditProfileModal user={user} setUser={setUser} onClose={() => setShowEditModal(false)} />}
        {showPointsHistory && <PointsHistoryModal user={user} onClose={() => setShowPointsHistory(false)} />}
        {showAchievements && <AchievementsModal user={user} onClose={() => setShowAchievements(false)} />}
        {showShareModal && (
          <ShareModal
            title="¡Mira mi perfil en DondeConsigo!"
            text={`Estoy en el nivel ${user.level} con ${user.points} puntos. ¡Únete y ahorra conmigo!`}
            url="https://dondeconsigo.app/profile"
            onClose={() => setShowShareModal(false)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
