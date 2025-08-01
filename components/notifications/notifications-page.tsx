"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Bell,
  Gift,
  Trophy,
  Star,
  Clock,
  Trash2,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Users,
  Heart,
  Zap,
  Target,
  X,
  Filter,
} from "lucide-react"
import { useSound } from "@/lib/hooks/use-sound"

interface NotificationsPageProps {
  onNavigate: (tab: string) => void
}

export function NotificationsPage({ onNavigate }: NotificationsPageProps) {
  const { playSound } = useSound()
  const [notifications, setNotifications] = useState<any[]>([])
  const [selectedNotifications, setSelectedNotifications] = useState<number[]>([])
  const [filter, setFilter] = useState("all")
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  useEffect(() => {
    loadNotifications()
  }, [])

  const loadNotifications = () => {
    const mockNotifications = [
      {
        id: 1,
        type: "promo",
        title: "¡Nueva promoción cerca tuyo!",
        message: "50% OFF en McDonald's a solo 3 cuadras de tu ubicación",
        time: "Hace 2 min",
        isRead: false,
        icon: Gift,
        color: "text-red-500",
        bgColor: "bg-red-50 dark:bg-red-950",
        borderColor: "border-red-200 dark:border-red-800",
        action: () => onNavigate("map"),
        actionText: "Ver en mapa",
      },
      {
        id: 2,
        type: "achievement",
        title: "¡Nuevo logro desbloqueado!",
        message: "Completaste tu primer desafío diario. +100 puntos ganados",
        time: "Hace 15 min",
        isRead: false,
        icon: Trophy,
        color: "text-yellow-500",
        bgColor: "bg-yellow-50 dark:bg-yellow-950",
        borderColor: "border-yellow-200 dark:border-yellow-800",
        action: () => onNavigate("profile"),
        actionText: "Ver logros",
      },
      {
        id: 3,
        type: "level",
        title: "¡Subiste de nivel!",
        message: "Ahora sos nivel 3 - Explorador. Desbloqueaste nuevas funciones",
        time: "Hace 1 hora",
        isRead: true,
        icon: Star,
        color: "text-purple-500",
        bgColor: "bg-purple-50 dark:bg-purple-950",
        borderColor: "border-purple-200 dark:border-purple-800",
        action: () => onNavigate("profile"),
        actionText: "Ver perfil",
      },
      {
        id: 4,
        type: "social",
        title: "Tu amigo Juan te superó",
        message: "Juan llegó al nivel 4. ¡Completá más desafíos para alcanzarlo!",
        time: "Hace 2 horas",
        isRead: true,
        icon: Users,
        color: "text-blue-500",
        bgColor: "bg-blue-50 dark:bg-blue-950",
        borderColor: "border-blue-200 dark:border-blue-800",
        action: () => onNavigate("ranking"),
        actionText: "Ver ranking",
      },
      {
        id: 5,
        type: "favorite",
        title: "Promo favorita disponible",
        message: "Tu promoción favorita de Starbucks está activa hasta mañana",
        time: "Hace 3 horas",
        isRead: false,
        icon: Heart,
        color: "text-pink-500",
        bgColor: "bg-pink-50 dark:bg-pink-950",
        borderColor: "border-pink-200 dark:border-pink-800",
        action: () => onNavigate("promos"),
        actionText: "Ver promoción",
      },
      {
        id: 6,
        type: "challenge",
        title: "Nuevo desafío disponible",
        message: "Desafío semanal: Visitá 5 locales diferentes. Recompensa: 200 puntos",
        time: "Hace 4 horas",
        isRead: true,
        icon: Target,
        color: "text-green-500",
        bgColor: "bg-green-50 dark:bg-green-950",
        borderColor: "border-green-200 dark:border-green-800",
        action: () => onNavigate("home"),
        actionText: "Ver desafío",
      },
      {
        id: 7,
        type: "trending",
        title: "Promoción trending",
        message: "La promo de Burger King está siendo muy popular. ¡No te la pierdas!",
        time: "Hace 6 horas",
        isRead: true,
        icon: TrendingUp,
        color: "text-orange-500",
        bgColor: "bg-orange-50 dark:bg-orange-950",
        borderColor: "border-orange-200 dark:border-orange-800",
        action: () => onNavigate("promos"),
        actionText: "Ver promoción",
      },
      {
        id: 8,
        type: "reminder",
        title: "Recordatorio de perfil",
        message: "Completá tu perfil para recibir promociones más personalizadas",
        time: "Hace 1 día",
        isRead: false,
        icon: AlertCircle,
        color: "text-amber-500",
        bgColor: "bg-amber-50 dark:bg-amber-950",
        borderColor: "border-amber-200 dark:border-amber-800",
        action: () => onNavigate("profile"),
        actionText: "Completar perfil",
      },
    ]

    setNotifications(mockNotifications)
  }

  const filteredNotifications = notifications.filter((notification) => {
    if (filter === "unread") return !notification.isRead
    if (filter === "read") return notification.isRead
    return true
  })

  const unreadCount = notifications.filter((n) => !n.isRead).length

  const handleNotificationClick = (notification: any) => {
    playSound("click")

    // Marcar como leída
    setNotifications((prev) => prev.map((n) => (n.id === notification.id ? { ...n, isRead: true } : n)))

    // Ejecutar acción
    if (notification.action) {
      notification.action()
    }
  }

  const handleSelectNotification = (notificationId: number) => {
    setSelectedNotifications((prev) =>
      prev.includes(notificationId) ? prev.filter((id) => id !== notificationId) : [...prev, notificationId],
    )
  }

  const handleSelectAll = () => {
    if (selectedNotifications.length === filteredNotifications.length) {
      setSelectedNotifications([])
    } else {
      setSelectedNotifications(filteredNotifications.map((n) => n.id))
    }
  }

  const handleDeleteSelected = () => {
    playSound("click")
    setNotifications((prev) => prev.filter((n) => !selectedNotifications.includes(n.id)))
    setSelectedNotifications([])
    setShowDeleteConfirm(false)
  }

  const handleMarkAllAsRead = () => {
    playSound("success")
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })))
  }

  const handleDeleteNotification = (notificationId: number) => {
    playSound("click")
    setNotifications((prev) => prev.filter((n) => n.id !== notificationId))
  }

  return (
    <div className="container mx-auto px-4 py-6 space-y-6 max-w-md">
      {/* Header */}
      <motion.div
        className="flex items-center justify-between"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Bell className="w-6 h-6 text-blue-500" />
            Notificaciones
          </h1>
          <p className="text-muted-foreground">
            {unreadCount > 0 ? `${unreadCount} sin leer` : "Todas las notificaciones leídas"}
          </p>
        </div>
        {unreadCount > 0 && (
          <Button onClick={handleMarkAllAsRead} variant="outline" size="sm">
            <CheckCircle className="w-4 h-4 mr-2" />
            Marcar todas como leídas
          </Button>
        )}
      </motion.div>

      {/* Action Bar */}
      <motion.div
        className="flex items-center justify-between gap-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex items-center gap-2">
          <Checkbox
            checked={selectedNotifications.length === filteredNotifications.length && filteredNotifications.length > 0}
            onCheckedChange={handleSelectAll}
          />
          <span className="text-sm text-muted-foreground">
            {selectedNotifications.length > 0 ? `${selectedNotifications.length} seleccionadas` : "Seleccionar todas"}
          </span>
        </div>
        {selectedNotifications.length > 0 && (
          <Button onClick={() => setShowDeleteConfirm(true)} variant="destructive" size="sm">
            <Trash2 className="w-4 h-4 mr-2" />
            Eliminar ({selectedNotifications.length})
          </Button>
        )}
      </motion.div>

      {/* Filters */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <Tabs value={filter} onValueChange={setFilter} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all" className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Todas ({notifications.length})
            </TabsTrigger>
            <TabsTrigger value="unread" className="flex items-center gap-2">
              <Bell className="w-4 h-4" />
              Sin leer ({unreadCount})
            </TabsTrigger>
            <TabsTrigger value="read" className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              Leídas ({notifications.length - unreadCount})
            </TabsTrigger>
          </TabsList>

          <TabsContent value={filter} className="mt-4">
            <AnimatePresence>
              {filteredNotifications.length > 0 ? (
                <div className="space-y-3">
                  {filteredNotifications.map((notification, index) => (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ scale: 1.02, x: 5 }}
                    >
                      <Card
                        className={`${notification.bgColor} ${notification.borderColor} border-2 shadow-lg hover:shadow-xl transition-all cursor-pointer relative ${
                          !notification.isRead ? "ring-2 ring-blue-200 dark:ring-blue-800" : ""
                        }`}
                        onClick={() => handleNotificationClick(notification)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            <Checkbox
                              checked={selectedNotifications.includes(notification.id)}
                              onCheckedChange={() => handleSelectNotification(notification.id)}
                              onClick={(e) => e.stopPropagation()}
                            />
                            <motion.div
                              animate={{
                                rotate: [0, 10, -10, 0],
                                scale: [1, 1.1, 1],
                              }}
                              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                            >
                              <notification.icon className={`w-6 h-6 ${notification.color} mt-1`} />
                            </motion.div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <p className="font-bold text-sm">{notification.title}</p>
                                {!notification.isRead && (
                                  <Badge className="bg-blue-500 hover:bg-blue-600 text-white text-xs animate-pulse">
                                    Nuevo
                                  </Badge>
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{notification.message}</p>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                  <Clock className="w-3 h-3" />
                                  <span>{notification.time}</span>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-xs h-6 px-2"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    notification.action()
                                  }}
                                >
                                  {notification.actionText}
                                </Button>
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0 hover:bg-red-100 dark:hover:bg-red-900"
                              onClick={(e) => {
                                e.stopPropagation()
                                handleDeleteNotification(notification.id)
                              }}
                            >
                              <X className="w-4 h-4 text-red-500" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <Card className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
                    <CardContent className="p-8">
                      <Bell className="w-16 h-16 mx-auto mb-4 text-blue-500 opacity-50" />
                      <h3 className="font-bold text-blue-700 dark:text-blue-300 mb-2">
                        {filter === "unread"
                          ? "No tenés notificaciones sin leer"
                          : filter === "read"
                            ? "No tenés notificaciones leídas"
                            : "No tenés notificaciones"}
                      </h3>
                      <p className="text-sm text-blue-600 dark:text-blue-400 mb-4">
                        {filter === "unread"
                          ? "¡Perfecto! Estás al día con todas tus notificaciones"
                          : "Las notificaciones aparecerán aquí cuando tengas actividad"}
                      </p>
                      <Button onClick={() => onNavigate("home")} className="bg-blue-500 hover:bg-blue-600 text-white">
                        <Zap className="w-4 h-4 mr-2" />
                        Explorar la app
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </TabsContent>
        </Tabs>
      </motion.div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowDeleteConfirm(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-900 rounded-xl p-6 max-w-sm w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                <AlertCircle className="w-12 h-12 mx-auto mb-4 text-red-500" />
                <h3 className="font-bold text-lg mb-2">Eliminar notificaciones</h3>
                <p className="text-muted-foreground mb-6">
                  ¿Estás seguro que querés eliminar {selectedNotifications.length} notificaciones? Esta acción no se
                  puede deshacer.
                </p>
                <div className="flex gap-3">
                  <Button onClick={() => setShowDeleteConfirm(false)} variant="outline" className="flex-1">
                    Cancelar
                  </Button>
                  <Button onClick={handleDeleteSelected} variant="destructive" className="flex-1">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Eliminar
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quick Stats */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <Card className="bg-gradient-to-r from-gray-50 to-slate-50 dark:from-gray-950 dark:to-slate-950">
          <CardContent className="p-4">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{notifications.length}</p>
                <p className="text-xs text-muted-foreground">Total</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {notifications.filter((n) => n.isRead).length}
                </p>
                <p className="text-xs text-muted-foreground">Leídas</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">{unreadCount}</p>
                <p className="text-xs text-muted-foreground">Sin leer</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
