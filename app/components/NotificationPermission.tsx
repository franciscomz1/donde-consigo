"use client"

import { Button } from "@/components/ui/button"
import { Bell, Smartphone } from "lucide-react"

interface NotificationPermissionProps {
  setCurrentScreen: (screen: string) => void
}

export default function NotificationPermission({ setCurrentScreen }: NotificationPermissionProps) {
  const handleActivateNotifications = () => {
    // Request notification permission
    if ("Notification" in window) {
      Notification.requestPermission().then((permission) => {
        console.log("Notification permission:", permission)
        setCurrentScreen("welcomeReward")
      })
    } else {
      setCurrentScreen("welcomeReward")
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col items-center justify-center px-8">
      <div className="text-center max-w-sm">
        <div className="w-32 h-32 bg-gradient-to-br from-purple-400 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-12 shadow-2xl">
          <Bell className="w-16 h-16 text-white" />
        </div>

        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          ¿Querés que te avisemos cuando haya promos?
        </h1>

        <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 leading-relaxed">
          Te notificaremos sobre ofertas de tus bancos favoritos y promociones cerca tuyo
        </p>

        <div className="space-y-4">
          <Button
            onClick={handleActivateNotifications}
            className="w-full h-16 bg-sky-500 hover:bg-sky-600 text-white font-semibold text-lg rounded-2xl shadow-xl"
          >
            <Smartphone className="w-6 h-6 mr-3" />
            Activar notificaciones
          </Button>

          <Button
            onClick={() => setCurrentScreen("welcomeReward")}
            variant="ghost"
            className="w-full h-16 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 font-semibold text-lg"
          >
            Ahora no
          </Button>
        </div>
      </div>
    </div>
  )
}
