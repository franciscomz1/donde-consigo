"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Heart, Star, ChevronRight, ShoppingCart, Coffee, Car, Shirt, Smartphone, Home, Check } from "lucide-react"
import { useSound } from "@/lib/hooks/use-sound"

interface PreferencesStepProps {
  onNext: (data: any) => void
  onSkip: () => void
}

const categories = [
  {
    id: "supermarkets",
    name: "Supermercados",
    icon: ShoppingCart,
    color: "from-green-500 to-emerald-500",
    emoji: "🛒",
  },
  { id: "restaurants", name: "Gastronomía", icon: Coffee, color: "from-orange-500 to-red-500", emoji: "🍕" },
  { id: "fuel", name: "Combustible", icon: Car, color: "from-blue-500 to-cyan-500", emoji: "⛽" },
  { id: "fashion", name: "Ropa y Moda", icon: Shirt, color: "from-pink-500 to-rose-500", emoji: "👕" },
  { id: "tech", name: "Tecnología", icon: Smartphone, color: "from-purple-500 to-indigo-500", emoji: "📱" },
  { id: "home", name: "Hogar", icon: Home, color: "from-yellow-500 to-orange-500", emoji: "🏠" },
]

export function PreferencesStep({ onNext, onSkip }: PreferencesStepProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [notifications, setNotifications] = useState({
    newPromos: true,
    locationAlerts: true,
    achievements: true,
    weeklyDigest: false,
  })
  const { playSound } = useSound()

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories((prev) => {
      const newSelection = prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId]

      playSound("click")
      return newSelection
    })
  }

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications((prev) => ({ ...prev, [key]: value }))
    playSound("click")
  }

  const handleNext = () => {
    playSound("success")
    onNext({
      preferences: {
        categories: selectedCategories,
        notifications,
      },
    })
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
      <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-2 border-white/20 shadow-2xl">
        <CardContent className="p-8">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", damping: 15 }}>
            <Heart className="w-12 h-12 mx-auto mb-4 text-pink-500" />
          </motion.div>

          <h2 className="text-2xl font-bold mb-2">Tus preferencias ❤️</h2>
          <p className="text-muted-foreground mb-4">Configurá tus intereses para recibir las mejores promociones</p>

          <div className="flex items-center justify-center gap-2 text-sm text-yellow-600 dark:text-yellow-400 mb-8">
            <Star className="w-4 h-4" />
            <span className="font-medium">+30 puntos por completar este paso</span>
          </div>

          {/* Categories Section */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4 text-left">¿Qué te interesa más?</h3>
            <div className="grid grid-cols-2 gap-3">
              {categories.map((category, index) => {
                const Icon = category.icon
                const isSelected = selectedCategories.includes(category.id)

                return (
                  <motion.button
                    key={category.id}
                    onClick={() => toggleCategory(category.id)}
                    className={`p-4 rounded-xl border-2 transition-all relative overflow-hidden ${
                      isSelected
                        ? "border-pink-500 bg-pink-50 dark:bg-pink-950 shadow-lg scale-105"
                        : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-md"
                    }`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: isSelected ? 1.05 : 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="text-center">
                      <div className="text-2xl mb-2">{category.emoji}</div>
                      <p className="text-sm font-medium">{category.name}</p>
                    </div>

                    <AnimatePresence>
                      {isSelected && (
                        <motion.div
                          className="absolute top-2 right-2 w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center shadow-lg"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          transition={{ type: "spring", damping: 15 }}
                        >
                          <Check className="w-3 h-3 text-white" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>
                )
              })}
            </div>

            <AnimatePresence>
              {selectedCategories.length > 0 && (
                <motion.div
                  className="mt-4"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <p className="text-sm text-muted-foreground mb-2">
                    {selectedCategories.length} categoría{selectedCategories.length !== 1 ? "s" : ""} seleccionada
                    {selectedCategories.length !== 1 ? "s" : ""}:
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {selectedCategories.map((categoryId) => {
                      const category = categories.find((c) => c.id === categoryId)
                      return (
                        <motion.div key={categoryId} initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                          <Badge
                            variant="secondary"
                            className="bg-gradient-to-r from-pink-100 to-rose-100 dark:from-pink-900 dark:to-rose-900 text-pink-700 dark:text-pink-300"
                          >
                            {category?.emoji} {category?.name}
                          </Badge>
                        </motion.div>
                      )
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Notifications Section */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4 text-left">Notificaciones</h3>
            <div className="space-y-4">
              {[
                { key: "newPromos", label: "Nuevas promociones", description: "Te avisamos cuando hay promos nuevas" },
                { key: "locationAlerts", label: "Alertas por ubicación", description: "Promos cerca de donde estés" },
                { key: "achievements", label: "Logros y puntos", description: "Cuando ganés puntos o badges" },
                { key: "weeklyDigest", label: "Resumen semanal", description: "Un resumen de tu actividad" },
              ].map((item, index) => (
                <motion.div
                  key={item.key}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-lg"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="text-left">
                    <p className="font-medium text-sm">{item.label}</p>
                    <p className="text-xs text-muted-foreground">{item.description}</p>
                  </div>
                  <Switch
                    checked={notifications[item.key as keyof typeof notifications]}
                    onCheckedChange={(checked) => handleNotificationChange(item.key, checked)}
                  />
                </motion.div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <Button
              onClick={handleNext}
              className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-medium py-3 shadow-xl"
            >
              <motion.div className="flex items-center gap-2" whileHover={{ x: 5 }}>
                ¡Listo! Finalizar configuración
                <ChevronRight className="w-4 h-4" />
              </motion.div>
            </Button>

            <Button variant="ghost" onClick={onSkip} className="w-full text-muted-foreground hover:text-foreground">
              Saltar este paso
            </Button>

            <p className="text-xs text-muted-foreground">
              💡 Podés cambiar estas preferencias cuando quieras desde tu perfil
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
