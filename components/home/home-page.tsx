"use client"

import { useState, useEffect } from "react"
import { EnhancedHomeDashboard } from "@/components/home/enhanced-home-dashboard"
import { PromosPage } from "@/components/promos/promos-page"
import { PriceSearchPage } from "@/components/prices/price-search-page"
import { RankingPage } from "@/components/ranking/ranking-page"
import { EnhancedProfilePage } from "@/components/profile/enhanced-profile-page"
import { BottomNavigation } from "@/components/navigation/bottom-navigation"
import { TopHeader } from "@/components/navigation/top-header"
import { NotificationsPage } from "@/components/notifications/notifications-page"
import { TutorialOverlay } from "@/components/tutorial/tutorial-overlay"
import { useSound } from "@/lib/hooks/use-sound"

interface HomePageProps {
  user: any
  setUser: (user: any) => void
}

export function HomePage({ user, setUser }: HomePageProps) {
  const [activeTab, setActiveTab] = useState("home")
  const [showNotifications, setShowNotifications] = useState(false)
  const [showTutorial, setShowTutorial] = useState(false)
  const [notifications] = useState(3) // Simulated notification count
  const { playSound } = useSound()

  useEffect(() => {
    // Check if user should see tutorial
    if (user && !user.viewedTutorial) {
      setShowTutorial(true)
    }
  }, [user])

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
    playSound("click")
  }

  const handleNotificationsToggle = () => {
    setShowNotifications(!showNotifications)
    playSound("click")
  }

  const handleTutorialComplete = () => {
    setShowTutorial(false)
    const updatedUser = { ...user, viewedTutorial: true }
    setUser(updatedUser)
    localStorage.setItem("user_data", JSON.stringify(updatedUser))
    playSound("achievement")
  }

  const renderActiveTab = () => {
    switch (activeTab) {
      case "home":
        return <EnhancedHomeDashboard user={user} setUser={setUser} onNavigate={handleTabChange} />
      case "promos":
        return <PromosPage user={user} setUser={setUser} />
      case "prices":
        return <PriceSearchPage user={user} setUser={setUser} />
      case "ranking":
        return <RankingPage user={user} setUser={setUser} />
      case "profile":
        return <EnhancedProfilePage user={user} setUser={setUser} />
      default:
        return <EnhancedHomeDashboard user={user} setUser={setUser} onNavigate={handleTabChange} />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <TopHeader
        user={user}
        notifications={notifications}
        onNotificationsClick={handleNotificationsToggle}
        onTutorialClick={() => setShowTutorial(true)}
      />

      <main className="pt-16">
        {showNotifications ? (
          <NotificationsPage user={user} onClose={() => setShowNotifications(false)} onNavigate={handleTabChange} />
        ) : (
          renderActiveTab()
        )}
      </main>

      <BottomNavigation activeTab={activeTab} onTabChange={handleTabChange} notifications={notifications} />

      {showTutorial && (
        <TutorialOverlay user={user} onComplete={handleTutorialComplete} onSkip={handleTutorialComplete} />
      )}
    </div>
  )
}
