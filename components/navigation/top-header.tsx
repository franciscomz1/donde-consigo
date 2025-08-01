"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Bell, Search, Gift } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useSound } from "@/lib/hooks/use-sound"

interface TopHeaderProps {
  user: any
  onNavigate: (tab: string) => void
}

export function TopHeader({ user, onNavigate }: TopHeaderProps) {
  const { playSound } = useSound()
  const [notificationCount] = useState(3)

  const handleNotificationClick = () => {
    playSound("click")
    onNavigate("notifications")
  }

  const handleProfileClick = () => {
    playSound("click")
    onNavigate("profile")
  }

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return "Buenos días"
    if (hour < 18) return "Buenas tardes"
    return "Buenas noches"
  }

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-40"
    >
      <div className="flex items-center justify-between">
        {/* Left: Greeting & User Info */}
        <div className="flex items-center gap-3">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Avatar className="w-10 h-10 cursor-pointer ring-2 ring-blue-100" onClick={handleProfileClick}>
              <AvatarImage src={user.profilePhoto || "/placeholder.svg"} />
              <AvatarFallback className="bg-blue-100 text-blue-700">{user.name?.charAt(0) || "U"}</AvatarFallback>
            </Avatar>
          </motion.div>

          <div>
            <p className="text-sm text-gray-600">
              {getGreeting()}, {user.name?.split(" ")[0] || "Usuario"}
            </p>
            <div className="flex items-center gap-2">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-1 cursor-pointer"
                onClick={() => onNavigate("profile")}
              >
                <span className="text-xs font-medium text-blue-600">Nivel {user.level}</span>
                <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-700">
                  {user.points} pts
                </Badge>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          {/* Search Button */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button variant="ghost" size="sm" className="w-9 h-9 p-0" onClick={() => onNavigate("promos")}>
              <Search className="w-4 h-4" />
            </Button>
          </motion.div>

          {/* Notifications */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="relative">
            <Button variant="ghost" size="sm" className="w-9 h-9 p-0 relative" onClick={handleNotificationClick}>
              <Bell className="w-4 h-4" />
              {notificationCount > 0 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center"
                >
                  {notificationCount}
                </motion.div>
              )}
            </Button>
          </motion.div>

          {/* Quick Promo Access */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button variant="ghost" size="sm" className="w-9 h-9 p-0" onClick={() => onNavigate("promos")}>
              <Gift className="w-4 h-4 text-green-600" />
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Quick Stats Bar */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-3 flex items-center justify-between text-xs"
      >
        <div className="flex items-center gap-4">
          <span className="text-gray-500">🔥 Racha: {user.streak || 1} días</span>
          <span className="text-gray-500">🏆 Ranking: #{user.ranking || "N/A"}</span>
        </div>
        <div className="text-green-600 font-medium">💰 Ahorrado: ${user.totalSaved || 0}</div>
      </motion.div>
    </motion.header>
  )
}
