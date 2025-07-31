"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Settings, Calendar, Moon, Sun, LogOut, Edit, Camera, History, Bell, Trophy, Star } from "lucide-react"
import type { UserProfile } from "../types"
import ProgressBar from "./ProgressBar"
import BadgeCollection from "./BadgeCollection"
import MissionCard from "./MissionCard"
import { authService } from "../services/auth"
import SuccessToast from "./SuccessToast"

interface ProfileScreenProps {
  user: UserProfile | null
  darkMode: boolean
  setDarkMode: (dark: boolean) => void
  setCurrentScreen?: (screen: string) => void
  setUser?: (user: UserProfile | null) => void
}

export default function ProfileScreen({ user, darkMode, setDarkMode, setCurrentScreen, setUser }: ProfileScreenProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editForm, setEditForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    avatar: user?.avatar || "👤",
  })
  const [showHistory, setShowHistory] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [toastMessage, setToastMessage] = useState("")

  if (!user) return null

  const showToast = (message: string) => {
    setToastMessage(message)
    setTimeout(() => setToastMessage(""), 3000)
  }

  const handleLogout = () => {
    authService.logout()
    if (setUser) setUser(null)
    if (setCurrentScreen) {
      setCurrentScreen("login")
    } else {
      window.location.reload()
    }
    showToast("Sesión cerrada correctamente")
  }

  const handleSaveProfile = () => {
    if (setUser) {
      setUser({
        ...user,
        name: editForm.name,
        email: editForm.email,
        avatar: editForm.avatar,
      })
    }
    setIsEditing(false)
    showToast("Perfil actualizado correctamente")
  }

  const avatarOptions = ["👤", "👨", "👩", "👨‍💼", "👩‍💼", "👨‍🎓", "👩‍🎓", "🧑‍💻", "👨‍🔧", "👩‍🔬"]

  // Misiones disponibles
  const missions = [
    {
      id: "complete-profile",
      title: "Completá tu perfil",
      description: "Agregá tu foto y información personal",
      icon: "👤",
      points: 50,
      completed: user.name !== "Usuario",
      action: () => setIsEditing(true),
      actionText: "Completar ahora",
    },
    {
      id: "first-referral",
      title: "Invitá a tu primer amigo",
      description: "Compartí tu código de referido",
      icon: "👥",
      points: 100,
      completed: false,
      progress: 0,
      total: 1,
      action: () => {
        // Abrir modal de invitación
        showToast("¡Compartí tu código para ganar puntos!")
      },
      actionText: "Invitar amigo",
    },
    {
      id: "daily-streak",
      title: "Usá la app 7 días seguidos",
      description: "Mantené tu racha diaria activa",
      icon: "🔥",
      points: 75,
      completed: (user.streak || 0) >= 7,
      progress: Math.min(user.streak || 0, 7),
      total: 7,
    },
  ]

  const mockPromoHistory = [
    {
      id: "1",
      title: "20% OFF en Farmacity",
      date: "Hace 2 días",
      likes: 24,
      status: "Activa",
      points: 25,
    },
    {
      id: "2",
      title: "15% OFF en Coto",
      date: "Hace 1 semana",
      likes: 12,
      status: "Expirada",
      points: 25,
    },
  ]

  const mockPointsHistory = [
    { id: "1", action: "Invitación aceptada", points: 100, date: "Hace 1 día", type: "referral" },
    { id: "2", action: "Perfil completado", points: 50, date: "Hace 2 días", type: "profile" },
    { id: "3", action: "Promo compartida", points: 25, date: "Hace 3 días", type: "share" },
    { id: "4", action: "Login diario", points: 5, date: "Hace 4 días", type: "daily" },
  ]

  return (
    <div className="p-4 space-y-6">
      {/* Enhanced Profile Header */}
      <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-4 mb-6">
          <div className="relative">
            <div className="w-24 h-24 bg-gradient-to-br from-sky-400 to-purple-500 rounded-full flex items-center justify-center shadow-lg text-3xl">
              {user.avatar || user.name.charAt(0)}
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-sky-500 hover:bg-sky-600 text-white p-0"
              onClick={() => setIsEditing(true)}
            >
              <Camera className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex-1">
            {isEditing ? (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-sm font-medium text-gray-700 dark:text-gray-200">
                    Nombre
                  </Label>
                  <Input
                    id="name"
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    className="h-10 rounded-xl"
                  />
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-2 block">Avatar</Label>
                  <div className="flex space-x-2 overflow-x-auto pb-2">
                    {avatarOptions.map((avatar) => (
                      <button
                        key={avatar}
                        type="button"
                        onClick={() => setEditForm({ ...editForm, avatar })}
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-lg transition-all duration-200 ${
                          editForm.avatar === avatar
                            ? "bg-sky-500 scale-110 shadow-lg"
                            : "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                        }`}
                      >
                        {avatar}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button onClick={handleSaveProfile} size="sm" className="bg-green-500 hover:bg-green-600 rounded-xl">
                    Guardar
                  </Button>
                  <Button onClick={() => setIsEditing(false)} variant="ghost" size="sm" className="rounded-xl">
                    Cancelar
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{user.name}</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-3">{user.email}</p>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Miembro desde {new Date(user.joinDate).toLocaleDateString()}
                  </span>
                </div>
              </>
            )}
          </div>

          {!isEditing && (
            <Button variant="ghost" size="sm" onClick={() => setIsEditing(true)} className="rounded-full">
              <Edit className="w-5 h-5" />
            </Button>
          )}
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <ProgressBar currentPoints={Number(user.points) || 0} currentLevel={user.level || "Novato"} animated={true} />
        </div>

        {/* Enhanced Stats */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="text-center p-3 bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl">
            <div className="text-2xl font-bold text-green-600">{Number(user.points) || 0}</div>
            <div className="text-xs text-gray-600 dark:text-gray-300">Puntos totales</div>
          </div>
          <div className="text-center p-3 bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-xl">
            <div className="text-2xl font-bold text-orange-500">#{Math.floor(Math.random() * 50) + 1}</div>
            <div className="text-xs text-gray-600 dark:text-gray-300">Ranking</div>
          </div>
          <div className="text-center p-3 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl">
            <div className="text-2xl font-bold text-blue-500">{Number(user.streak) || 0}</div>
            <div className="text-xs text-gray-600 dark:text-gray-300">Días seguidos</div>
          </div>
          <div className="text-center p-3 bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl">
            <div className="text-2xl font-bold text-purple-500">${Number(user.totalSavings) || 0}</div>
            <div className="text-xs text-gray-600 dark:text-gray-300">Ahorrado</div>
          </div>
        </div>
      </div>

      {/* Missions Section */}
      <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">
          <Trophy className="w-5 h-5 text-yellow-500 mr-2" />
          Misiones disponibles
        </h3>
        <div className="space-y-4">
          {missions.map((mission) => (
            <MissionCard key={mission.id} mission={mission} />
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">
          <Star className="w-5 h-5 text-yellow-500 mr-2" />
          Tus logros
        </h3>
        <BadgeCollection achievements={user.achievements || []} />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <Button
          onClick={() => setShowHistory(true)}
          variant="outline"
          className="h-20 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-2xl flex flex-col items-center justify-center space-y-2 hover:border-blue-300 dark:hover:border-blue-600"
        >
          <History className="w-6 h-6 text-blue-500" />
          <span className="text-sm font-medium text-gray-900 dark:text-white">Historial de puntos</span>
        </Button>
        <Button
          onClick={() => setShowNotifications(true)}
          variant="outline"
          className="h-20 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-2xl flex flex-col items-center justify-center space-y-2 hover:border-purple-300 dark:hover:border-purple-600 relative"
        >
          <Bell className="w-6 h-6 text-purple-500" />
          <span className="text-sm font-medium text-gray-900 dark:text-white">Notificaciones</span>
          <div className="absolute top-2 right-2 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
        </Button>
      </div>

      {/* Settings */}
      <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Configuración</h3>
        <div className="space-y-2">
          <Button variant="ghost" className="w-full justify-start h-12 text-gray-700 dark:text-gray-200">
            <Settings className="w-5 h-5 mr-3" />
            Editar bancos preferidos
          </Button>
          <Button variant="ghost" className="w-full justify-start h-12 text-gray-700 dark:text-gray-200">
            <Calendar className="w-5 h-5 mr-3" />
            Mis alertas
          </Button>
          <Button
            variant="ghost"
            onClick={() => setDarkMode(!darkMode)}
            className="w-full justify-between h-12 text-gray-700 dark:text-gray-200"
          >
            <div className="flex items-center">
              {darkMode ? <Sun className="w-5 h-5 mr-3" /> : <Moon className="w-5 h-5 mr-3" />}
              Modo {darkMode ? "claro" : "oscuro"}
            </div>
          </Button>
        </div>
      </div>

      {/* Logout */}
      <Button
        onClick={handleLogout}
        variant="ghost"
        className="w-full h-12 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-2xl"
      >
        <LogOut className="w-5 h-5 mr-3" />
        Cerrar sesión
      </Button>

      {/* Points History Modal */}
      {showHistory && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 max-w-md w-full max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Historial de puntos</h3>
              <Button variant="ghost" size="sm" onClick={() => setShowHistory(false)} className="rounded-full">
                ✕
              </Button>
            </div>

            <div className="space-y-4">
              {mockPointsHistory.map((entry) => (
                <div
                  key={entry.id}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-xl"
                >
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white text-sm">{entry.action}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{entry.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600">+{entry.points}</p>
                    <p className="text-xs text-gray-500">puntos</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <SuccessToast message={toastMessage} />
    </div>
  )
}
