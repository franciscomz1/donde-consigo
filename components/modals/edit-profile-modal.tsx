"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { X, Camera, User, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"
import { useSound } from "@/lib/hooks/use-sound"

interface EditProfileModalProps {
  user: any
  setUser: (user: any) => void
  onClose: () => void
}

export function EditProfileModal({ user, setUser, onClose }: EditProfileModalProps) {
  const { playSound } = useSound()
  const [formData, setFormData] = useState({
    name: user.name || "",
    email: user.email || "",
    phone: user.phone || "",
    city: user.city || "",
    preferredBanks: user.preferredBanks || [],
  })

  const banks = [
    "Banco Nación",
    "Banco Provincia",
    "BBVA",
    "Santander",
    "Galicia",
    "Macro",
    "ICBC",
    "Supervielle",
    "Patagonia",
    "Mercado Pago",
    "Ualá",
    "Brubank",
    "Naranja X",
  ]

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleBankToggle = (bank: string) => {
    playSound("click")
    setFormData((prev) => ({
      ...prev,
      preferredBanks: prev.preferredBanks.includes(bank)
        ? prev.preferredBanks.filter((b: string) => b !== bank)
        : [...prev.preferredBanks, bank],
    }))
  }

  const handleSave = () => {
    playSound("success")
    const updatedUser = { ...user, ...formData }
    setUser(updatedUser)
    localStorage.setItem("user_data", JSON.stringify(updatedUser))
    onClose()
  }

  const handlePhotoUpload = () => {
    playSound("click")
    // Simular carga de foto
    const photos = [
      "/placeholder.svg?height=100&width=100&text=👤",
      "/placeholder.svg?height=100&width=100&text=😊",
      "/placeholder.svg?height=100&width=100&text=🎯",
    ]
    const randomPhoto = photos[Math.floor(Math.random() * photos.length)]
    const updatedUser = { ...user, profilePhoto: randomPhoto }
    setUser(updatedUser)
    localStorage.setItem("user_data", JSON.stringify(updatedUser))
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <Card className="border-0 shadow-none">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Editar perfil</CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Profile Photo */}
            <div className="flex flex-col items-center gap-3">
              <div className="relative">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={user.profilePhoto || "/placeholder.svg"} />
                  <AvatarFallback className="text-2xl">{formData.name?.charAt(0) || "U"}</AvatarFallback>
                </Avatar>
                <Button
                  size="sm"
                  className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full"
                  onClick={handlePhotoUpload}
                >
                  <Camera className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-sm text-gray-600">Toca para cambiar foto</p>
            </div>

            {/* Personal Info */}
            <div className="space-y-4">
              <h3 className="font-semibold flex items-center gap-2">
                <User className="w-4 h-4" />
                Información personal
              </h3>

              <div className="space-y-3">
                <div>
                  <Label htmlFor="name">Nombre completo</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Tu nombre"
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="tu@email.com"
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Teléfono</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="+54 9 11 1234-5678"
                  />
                </div>

                <div>
                  <Label htmlFor="city">Ciudad</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                    placeholder="Buenos Aires"
                  />
                </div>
              </div>
            </div>

            {/* Preferred Banks */}
            <div className="space-y-4">
              <h3 className="font-semibold flex items-center gap-2">
                <CreditCard className="w-4 h-4" />
                Bancos y billeteras preferidos
              </h3>
              <p className="text-sm text-gray-600">Selecciona tus bancos para recibir promociones personalizadas</p>

              <div className="grid grid-cols-2 gap-2">
                {banks.map((bank) => (
                  <div key={bank} className="flex items-center space-x-2">
                    <Checkbox
                      id={bank}
                      checked={formData.preferredBanks.includes(bank)}
                      onCheckedChange={() => handleBankToggle(bank)}
                    />
                    <Label htmlFor={bank} className="text-sm">
                      {bank}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button variant="outline" onClick={onClose} className="flex-1 bg-transparent">
                Cancelar
              </Button>
              <Button onClick={handleSave} className="flex-1">
                Guardar cambios
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
