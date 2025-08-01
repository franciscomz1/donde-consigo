"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Trophy, Medal, Crown, TrendingUp, TrendingDown, Share2, Star } from "lucide-react"

interface RankingPageProps {
  user: any
}

const rankingData = [
  {
    id: 1,
    name: "María González",
    points: 2450,
    position: 1,
    change: 0,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    name: "Carlos Rodríguez",
    points: 2380,
    position: 2,
    change: 1,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  { id: 3, name: "Ana Martínez", points: 2250, position: 3, change: -1, avatar: "/placeholder.svg?height=40&width=40" },
  {
    id: 4,
    name: "Luis Fernández",
    points: 2100,
    position: 4,
    change: 2,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  { id: 5, name: "Sofia López", points: 1980, position: 5, change: 0, avatar: "/placeholder.svg?height=40&width=40" },
  { id: 6, name: "Diego Pérez", points: 1850, position: 6, change: -2, avatar: "/placeholder.svg?height=40&width=40" },
  {
    id: 7,
    name: "Valentina Silva",
    points: 1720,
    position: 7,
    change: 1,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 8,
    name: "Francisco Torres",
    points: 1650,
    position: 8,
    change: 0,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  { id: 9, name: "Camila Ruiz", points: 1580, position: 9, change: -1, avatar: "/placeholder.svg?height=40&width=40" },
  {
    id: 10,
    name: "Mateo Vargas",
    points: 1520,
    position: 10,
    change: 3,
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export function RankingPage({ user }: RankingPageProps) {
  const [period, setPeriod] = useState<"weekly" | "monthly" | "all">("weekly")

  const userPosition = 8
  const userPoints = user?.points || 1650
  const positionChange = 2

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-4">Ranking</h1>

        {/* Period Filter */}
        <div className="flex gap-2 mb-4">
          <Button variant={period === "weekly" ? "default" : "outline"} size="sm" onClick={() => setPeriod("weekly")}>
            Semanal
          </Button>
          <Button variant={period === "monthly" ? "default" : "outline"} size="sm" onClick={() => setPeriod("monthly")}>
            Mensual
          </Button>
          <Button variant={period === "all" ? "default" : "outline"} size="sm" onClick={() => setPeriod("all")}>
            Histórico
          </Button>
        </div>
      </div>

      {/* User Position Card */}
      <Card className="mb-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 border-purple-200 dark:border-purple-800">
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">#{userPosition}</span>
            </div>
            <div className="flex-1">
              <p className="font-bold text-lg">Estás en el puesto {userPosition} de 1,247</p>
              <div className="flex items-center gap-2 mt-1">
                <Star className="w-4 h-4 text-yellow-500" />
                <span className="font-medium">{userPoints} puntos</span>
                {positionChange > 0 && (
                  <div className="flex items-center gap-1 text-green-600 dark:text-green-400">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-sm">+{positionChange} esta semana</span>
                  </div>
                )}
              </div>
            </div>
            <Button size="sm" variant="outline">
              <Share2 className="w-4 h-4 mr-1" />
              Compartir
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Motivational Message */}
      {positionChange > 0 && (
        <Card className="mb-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950">
          <CardContent className="p-4 text-center">
            <Trophy className="w-8 h-8 mx-auto mb-2 text-green-500" />
            <p className="font-medium text-green-700 dark:text-green-300">
              ¡Felicitaciones! Subiste {positionChange} puestos esta semana 🎉
            </p>
          </CardContent>
        </Card>
      )}

      {/* Top 10 Ranking */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="w-5 h-5" />
            Top 10 - {period === "weekly" ? "Esta semana" : period === "monthly" ? "Este mes" : "Histórico"}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="space-y-1">
            {rankingData.map((player, index) => (
              <RankingItem key={player.id} player={player} isCurrentUser={player.position === userPosition} />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* View My Position Button */}
      {userPosition > 10 && (
        <div className="mt-4 text-center">
          <Button variant="outline">Ver mi posición (#{userPosition})</Button>
        </div>
      )}

      {/* Share Achievement */}
      <Card className="mt-6">
        <CardContent className="p-4 text-center">
          <h3 className="font-medium mb-2">¡Compartí tu logro!</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Compartí tu posición en el ranking y ganá 10 puntos extra
          </p>
          <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
            <Share2 className="w-4 h-4 mr-2" />
            Compartir en redes
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

function RankingItem({ player, isCurrentUser }: { player: any; isCurrentUser: boolean }) {
  const getRankIcon = (position: number) => {
    switch (position) {
      case 1:
        return <Crown className="w-5 h-5 text-yellow-500" />
      case 2:
        return <Medal className="w-5 h-5 text-gray-400" />
      case 3:
        return <Medal className="w-5 h-5 text-amber-600" />
      default:
        return (
          <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center">
            <span className="text-sm font-medium">{position}</span>
          </div>
        )
    }
  }

  const getChangeIcon = (change: number) => {
    if (change > 0) {
      return <TrendingUp className="w-4 h-4 text-green-500" />
    } else if (change < 0) {
      return <TrendingDown className="w-4 h-4 text-red-500" />
    }
    return null
  }

  return (
    <div
      className={`flex items-center gap-3 p-4 hover:bg-muted/50 transition-colors ${
        isCurrentUser ? "bg-purple-50 dark:bg-purple-950 border-l-4 border-purple-500" : ""
      }`}
    >
      <div className="flex items-center gap-3 flex-1">
        {getRankIcon(player.position)}

        <Avatar className="w-10 h-10">
          <AvatarImage src={player.avatar || "/placeholder.svg"} />
          <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white">
            {player.name.charAt(0)}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <p className={`font-medium ${isCurrentUser ? "text-purple-700 dark:text-purple-300" : ""}`}>
            {player.name} {isCurrentUser && "(Tú)"}
          </p>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">{player.points} puntos</span>
            {player.change !== 0 && (
              <div className="flex items-center gap-1">
                {getChangeIcon(player.change)}
                <span className={`text-xs ${player.change > 0 ? "text-green-500" : "text-red-500"}`}>
                  {Math.abs(player.change)}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
