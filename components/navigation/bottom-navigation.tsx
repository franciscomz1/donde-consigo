"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Gift, Search, Trophy, User } from "lucide-react"
import { useSound } from "@/lib/hooks/use-sound"

interface BottomNavigationProps {
  activeTab: string
  onTabChange: (tab: string) => void
  notifications?: number
}

export function BottomNavigation({ activeTab, onTabChange, notifications = 0 }: BottomNavigationProps) {
  const { playSound } = useSound()

  const tabs = [
    {
      id: "home",
      label: "Inicio",
      icon: Gift,
      color: "text-purple-500",
      activeColor: "text-purple-600",
    },
    {
      id: "promos",
      label: "Promos",
      icon: Gift,
      color: "text-pink-500",
      activeColor: "text-pink-600",
      badge: notifications > 0 ? notifications : undefined,
    },
    {
      id: "prices",
      label: "Precios",
      icon: Search,
      color: "text-blue-500",
      activeColor: "text-blue-600",
    },
    {
      id: "ranking",
      label: "Ranking",
      icon: Trophy,
      color: "text-yellow-500",
      activeColor: "text-yellow-600",
    },
    {
      id: "profile",
      label: "Perfil",
      icon: User,
      color: "text-green-500",
      activeColor: "text-green-600",
    },
  ]

  const handleTabClick = (tabId: string) => {
    playSound("click")
    onTabChange(tabId)
  }

  return (
    <motion.div
      className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 z-50"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", damping: 20 }}
    >
      <div className="flex items-center justify-around px-2 py-2 max-w-md mx-auto">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id
          const IconComponent = tab.icon

          return (
            <motion.div key={tab.id} className="relative">
              <Button
                variant="ghost"
                size="sm"
                className={`flex flex-col items-center gap-1 h-auto py-2 px-3 relative ${
                  isActive
                    ? `${tab.activeColor} bg-gray-100 dark:bg-gray-800`
                    : `${tab.color} hover:bg-gray-50 dark:hover:bg-gray-800`
                }`}
                onClick={() => handleTabClick(tab.id)}
              >
                <motion.div animate={isActive ? { scale: [1, 1.2, 1] } : {}} transition={{ duration: 0.3 }}>
                  <IconComponent className="w-5 h-5" />
                </motion.div>
                <span className="text-xs font-medium">{tab.label}</span>

                {/* Badge for notifications */}
                {tab.badge && (
                  <motion.div
                    className="absolute -top-1 -right-1"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                  >
                    <Badge className="bg-red-500 hover:bg-red-600 text-white text-xs min-w-[18px] h-[18px] flex items-center justify-center p-0 animate-pulse">
                      {tab.badge > 99 ? "99+" : tab.badge}
                    </Badge>
                  </motion.div>
                )}

                {/* Active indicator */}
                {isActive && (
                  <motion.div
                    className="absolute -bottom-1 left-1/2 w-1 h-1 bg-current rounded-full"
                    layoutId="activeIndicator"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    style={{ x: "-50%" }}
                  />
                )}
              </Button>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}
