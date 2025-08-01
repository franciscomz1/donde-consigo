"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  User,
  Star,
  Trophy,
  Edit,
  Bell,
  CreditCard,
  HelpCircle,
  LogOut,
  Trash2,
  Camera,
  ChevronRight,
  Calendar,
  Plus,
  Minus,
} from "lucide-react"

interface ProfilePageProps {
  user: any
}

const pointsHistory = [
  { id: 1, action: "Completar onboarding", points: 100, date: "2024-01-15", type: "earned" },
  { id: 2, action: "Agregar promo a favoritos", points: 10, date: "2024-01-14", type: "earned" },
  { id: 3, action: "Subir foto de perfil", points: 20, date: "2024-01-14", type: "earned" },
  { id: 4, action: "Configurar bancos favoritos", points: 50, date: "2024-01-14", type: "earned" },
  { id: 5, action: "Completar datos personales", points: 30, date: "2024-01-14", type: "earned" },
]

const badges = [
  { id: 1, name: "Configuración completa", description: "Completaste el onboarding", icon: Trophy, earned: true },
  { id: 2, name: "Primeros pasos", description: "Agregaste tu primera promo favorita", icon: Star, earned: true },
  { id: 3, name: "Explorador", description: "Visitaste todas las secciones", icon: User, earned: false },
  { id: 4, name: "Social", description: "Compartiste tu ranking", icon: Trophy, earned: false },
]

export function ProfilePage({ user }: ProfilePageProps) {
  const [activeTab, setActiveTab] = useState("profile")
  const profileCompletion = calculateProfileCompletion(user)

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Profile Header */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="relative">
              <Avatar className="w-20 h-20">
                <AvatarImage src={user?.profilePhoto || "/placeholder.svg"} />
                <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white text-2xl">
                  {user?.name?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
              <Button size="icon" className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full">
                <Camera className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex-1">
              <h1 className="text-2xl font-bold">{user?.name || "Usuario"}</h1>
              <p className="text-muted-foreground">{user?.email}</p>

              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span className="font-medium">{user?.points || 0} puntos</span>
                </div>
                <div className="flex items-center gap-1">
                  <Trophy className="w-4 h-4 text-purple-500" />
                  <span className="font-medium">Nivel {user?.level || 1}</span>
                </div>
              </div>
            </div>

            <Button variant="outline" size="icon">
              <Edit className="w-4 h-4" />
            </Button>
          </div>

          {/* Profile Completion */}
          {profileCompletion < 100 && (
            <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">Perfil {profileCompletion}% completo</span>
                <span className="text-sm text-muted-foreground">
                  Te falta 1 paso para llegar al 100% y ganar 50 puntos
                </span>
              </div>
              <Progress value={profileCompletion} className="h-2 mb-2" />
              <Button size="sm" variant="outline">
                Completar perfil
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile">Perfil</TabsTrigger>
          <TabsTrigger value="points">Puntos</TabsTrigger>
          <TabsTrigger value="badges">Logros</TabsTrigger>
          <TabsTrigger value="settings">Config</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-4">
          <ProfileSettings user={user} />
        </TabsContent>

        <TabsContent value="points" className="space-y-4">
          <PointsHistory history={pointsHistory} />
        </TabsContent>

        <TabsContent value="badges" className="space-y-4">
          <BadgesSection badges={badges} />
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <SettingsSection />
        </TabsContent>
      </Tabs>
    </div>
  )
}

function ProfileSettings({ user }: { user: any }) {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Información personal</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Nombre completo</p>
              <p className="text-sm text-muted-foreground">{user?.name || "No configurado"}</p>
            </div>
            <Button variant="ghost" size="icon">
              <Edit className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Email</p>
              <p className="text-sm text-muted-foreground">{user?.email || "No configurado"}</p>
            </div>
            <Button variant="ghost" size="icon">
              <Edit className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Bancos favoritos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 mb-4">
            {user?.favoriteBanks?.length > 0 ? (
              user.favoriteBanks.map((bank: string) => (
                <Badge key={bank} variant="secondary">
                  {bank}
                </Badge>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">No configurado</p>
            )}
          </div>
          <Button variant="outline" size="sm">
            <CreditCard className="w-4 h-4 mr-2" />
            Editar bancos
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Accesos directos</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button variant="ghost" className="w-full justify-start">
            <Bell className="w-4 h-4 mr-3" />
            Mis alertas
            <ChevronRight className="w-4 h-4 ml-auto" />
          </Button>

          <Button variant="ghost" className="w-full justify-start">
            <HelpCircle className="w-4 h-4 mr-3" />
            Soporte y ayuda
            <ChevronRight className="w-4 h-4 ml-auto" />
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

function PointsHistory({ history }: { history: any[] }) {
  const [filter, setFilter] = useState<"all" | "week" | "month">("all")

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Historial de puntos</CardTitle>
          <div className="flex gap-2">
            <Button variant={filter === "all" ? "default" : "outline"} size="sm" onClick={() => setFilter("all")}>
              Todos
            </Button>
            <Button variant={filter === "week" ? "default" : "outline"} size="sm" onClick={() => setFilter("week")}>
              Semana
            </Button>
            <Button variant={filter === "month" ? "default" : "outline"} size="sm" onClick={() => setFilter("month")}>
              Mes
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {history.map((item) => (
              <div key={item.id} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    item.type === "earned" ? "bg-green-100 dark:bg-green-900" : "bg-red-100 dark:bg-red-900"
                  }`}
                >
                  {item.type === "earned" ? (
                    <Plus className="w-4 h-4 text-green-600 dark:text-green-400" />
                  ) : (
                    <Minus className="w-4 h-4 text-red-600 dark:text-red-400" />
                  )}
                </div>

                <div className="flex-1">
                  <p className="font-medium">{item.action}</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-3 h-3" />
                    <span>{new Date(item.date).toLocaleDateString()}</span>
                  </div>
                </div>

                <div
                  className={`font-bold ${
                    item.type === "earned" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                  }`}
                >
                  {item.type === "earned" ? "+" : "-"}
                  {item.points}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function BadgesSection({ badges }: { badges: any[] }) {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Logros y badges</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            {badges.map((badge) => {
              const Icon = badge.icon
              return (
                <div
                  key={badge.id}
                  className={`p-4 rounded-lg border-2 text-center ${
                    badge.earned
                      ? "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950"
                      : "border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-900"
                  }`}
                >
                  <Icon className={`w-8 h-8 mx-auto mb-2 ${badge.earned ? "text-green-500" : "text-gray-400"}`} />
                  <p
                    className={`font-medium text-sm ${
                      badge.earned ? "text-green-700 dark:text-green-300" : "text-gray-500"
                    }`}
                  >
                    {badge.name}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">{badge.description}</p>
                  {badge.earned && <Badge className="mt-2 bg-green-500 hover:bg-green-600">Desbloqueado</Badge>}
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function SettingsSection() {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Notificaciones</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Promociones nuevas</p>
              <p className="text-sm text-muted-foreground">Recibir alertas de nuevas promos</p>
            </div>
            <Button variant="outline" size="sm">
              Configurar
            </Button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Alertas por ubicación</p>
              <p className="text-sm text-muted-foreground">Promos cerca de tu ubicación</p>
            </div>
            <Button variant="outline" size="sm">
              Configurar
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Cuenta</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button
            variant="ghost"
            className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
          >
            <LogOut className="w-4 h-4 mr-3" />
            Cerrar sesión
          </Button>

          <Button
            variant="ghost"
            className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
          >
            <Trash2 className="w-4 h-4 mr-3" />
            Eliminar cuenta
          </Button>
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
