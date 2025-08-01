"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Gift, MapPin, Trophy, User, Star, TrendingUp, Lightbulb, Target, ChevronRight } from "lucide-react"

interface HomeContentProps {
  user: any
}

export function HomeContent({ user }: HomeContentProps) {
  const profileCompletion = calculateProfileCompletion(user)
  const dailyTip = "💡 Los martes son ideales para promociones en supermercados con tarjetas de crédito"

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      {/* Welcome Section */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold mb-2">¡Hola, {user?.name || "Usuario"}! 👋</h1>
        <p className="text-muted-foreground">Descubrí las mejores promociones para hoy</p>
      </div>

      {/* Profile Completion Banner */}
      {profileCompletion < 100 && (
        <Card className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 border-purple-200 dark:border-purple-800">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <User className="w-8 h-8 text-purple-500" />
              <div className="flex-1">
                <p className="font-medium">Perfil {profileCompletion}% completo</p>
                <p className="text-sm text-muted-foreground">Completá tu perfil y ganá 50 puntos extra</p>
                <Progress value={profileCompletion} className="mt-2 h-2" />
              </div>
              <Button size="sm" variant="outline">
                Completar
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Star className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
            <p className="text-2xl font-bold">{user?.points || 0}</p>
            <p className="text-sm text-muted-foreground">Puntos</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <Trophy className="w-8 h-8 mx-auto mb-2 text-purple-500" />
            <p className="text-2xl font-bold">Nivel {user?.level || 1}</p>
            <p className="text-sm text-muted-foreground">Ranking</p>
          </CardContent>
        </Card>
      </div>

      {/* Daily Tip */}
      <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Lightbulb className="w-6 h-6 text-blue-500 mt-1" />
            <div>
              <h3 className="font-medium mb-1">Tip del día</h3>
              <p className="text-sm text-muted-foreground">{dailyTip}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-4 text-center">
            <Gift className="w-8 h-8 mx-auto mb-2 text-purple-500" />
            <p className="font-medium">Promociones</p>
            <p className="text-sm text-muted-foreground">Ver ofertas</p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-4 text-center">
            <MapPin className="w-8 h-8 mx-auto mb-2 text-green-500" />
            <p className="font-medium">Mapa</p>
            <p className="text-sm text-muted-foreground">Cerca tuyo</p>
          </CardContent>
        </Card>
      </div>

      {/* Featured Promo */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Promo destacada
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">SANT</span>
            </div>
            <div className="flex-1">
              <p className="font-medium">50% OFF en supermercados</p>
              <p className="text-sm text-muted-foreground">Santander • Válido hasta mañana</p>
            </div>
            <Badge variant="secondary">HOY</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Weekly Challenge */}
      <Card className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <Target className="w-8 h-8 text-green-500" />
            <div className="flex-1">
              <h3 className="font-medium">Desafío semanal</h3>
              <p className="text-sm text-muted-foreground mb-2">Agregá 3 promos a favoritos</p>
              <Progress value={33} className="h-2" />
              <p className="text-xs text-muted-foreground mt-1">1 de 3 completado • +100 puntos</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Social Proof */}
      <Card>
        <CardContent className="p-4 text-center">
          <p className="text-sm text-muted-foreground mb-2">
            <span className="font-bold text-purple-500">1,247</span> usuarios activos esta semana
          </p>
          <p className="text-sm text-muted-foreground">
            <span className="font-bold text-green-500">89</span> promociones canjeadas hoy
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

function calculateProfileCompletion(user: any): number {
  if (!user) return 0

  let completion = 0
  const fields = ["name", "email", "profilePhoto", "favoriteBanks"]

  fields.forEach((field) => {
    if (user[field] && (Array.isArray(user[field]) ? user[field].length > 0 : true)) {
      completion += 25
    }
  })

  return completion
}
