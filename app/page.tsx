"use client"

import { useState, useEffect } from "react"
import { EnhancedOnboardingFlow } from "@/components/onboarding/enhanced-onboarding-flow"
import { HomePage } from "@/components/home/home-page"
import { LoadingScreen } from "@/components/ui/loading-screen"
import { useSound } from "@/lib/hooks/use-sound"

export default function Page() {
  const [showOnboarding, setShowOnboarding] = useState(true)
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const { playSound } = useSound()

  useEffect(() => {
    // Simular carga inicial con datos reales
    const loadApp = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Check if user has completed onboarding
      const hasCompletedOnboarding = localStorage.getItem("onboarding_completed")
      const userData = localStorage.getItem("user_data")

      if (hasCompletedOnboarding && userData) {
        try {
          const parsedUser = JSON.parse(userData)
          setUser(parsedUser)
          setShowOnboarding(false)
          playSound("welcome")
        } catch (error) {
          console.error("Error parsing user data:", error)
          localStorage.removeItem("onboarding_completed")
          localStorage.removeItem("user_data")
        }
      }

      setIsLoading(false)
    }

    loadApp()
  }, [playSound])

  const handleOnboardingComplete = (userData: any) => {
    // Clean the userData to remove any circular references
    const cleanUserData = {
      id: userData.id || `user_${Date.now()}`,
      name: userData.name || "",
      email: userData.email || "",
      profilePhoto: userData.profilePhoto || null,
      favoriteBanks: userData.favoriteBanks || [],
      preferences: userData.preferences || {
        categories: [],
        notifications: {
          newPromos: true,
          locationAlerts: true,
          achievements: true,
          weeklyDigest: false,
        },
      },
      completedAt: userData.completedAt || new Date().toISOString(),
      // Only store essential gamification data
      points: userData.points || 0,
      level: userData.level || 1,
      badges: userData.badges || [],
      streak: userData.streak || 0,
      totalActions: userData.totalActions || 0,
      favoritePromos: [],
      viewedTutorial: false,
    }

    localStorage.setItem("onboarding_completed", "true")
    localStorage.setItem("user_data", JSON.stringify(cleanUserData))
    setUser(cleanUserData)
    setShowOnboarding(false)
    playSound("success")
  }

  if (isLoading) {
    return <LoadingScreen />
  }

  if (showOnboarding) {
    return <EnhancedOnboardingFlow onComplete={handleOnboardingComplete} />
  }

  return <HomePage user={user} setUser={setUser} />
}
