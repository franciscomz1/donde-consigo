"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent } from "@/components/ui/card"
import { Bell, Mail, MessageCircle, Smartphone, Target, TrendingDown, CheckCircle, AlertCircle } from "lucide-react"
import { useSound } from "@/lib/hooks/use-sound"

interface PriceAlertModalProps {
  isOpen: boolean
  onClose: () => void
  result: any
  productName: string
  onAlertCreated: (alert: any) => void
}

export function PriceAlertModal({ isOpen, onClose, result, productName, onAlertCreated }: PriceAlertModalProps) {
  const [targetPrice, setTargetPrice] = useState(result?.price ? Math.round(result.price * 0.9) : 0)
  const [selectedChannels, setSelectedChannels] = useState<string[]>(["in-app"])
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [isCreating, setIsCreating] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const { playSound } = useSound()

  if (!isOpen || !result) return null

  const maxPrice = result.price
  const minPrice = Math.round(result.price * 0.5)
  const savingsAmount = result.price - targetPrice
  const savingsPercentage = Math.round(((result.price - targetPrice) / result.price) * 100)

  const channels = [
    {
      id: "in-app",
      name: "Notificación en la app",
      icon: Bell,
      description: "Te avisamos dentro de la aplicación",
      required: false,
    },
    {
      id: "email",
      name: "Email",
      icon: Mail,
      description: "Enviamos un correo a tu email",
      required: true,
      field: "email",
    },
    {
      id: "whatsapp",
      name: "WhatsApp",
      icon: MessageCircle,
      description: "Mensaje por WhatsApp (próximamente)",
      disabled: true,
    },
    {
      id: "sms",
      name: "SMS",
      icon: Smartphone,
      description: "Mensaje de texto (próximamente)",
      disabled: true,
    },
  ]

  const handleChannelToggle = (channelId: string) => {
    if (channels.find((c) => c.id === channelId)?.disabled) return

    setSelectedChannels((prev) =>
      prev.includes(channelId) ? prev.filter((id) => id !== channelId) : [...prev, channelId],
    )
    playSound("click")
  }

  const handleCreateAlert = async () => {
    if (selectedChannels.length === 0) {
      playSound("error")
      return
    }

    if (selectedChannels.includes("email") && !email.trim()) {
      playSound("error")
      return
    }

    setIsCreating(true)
    playSound("click")

    try {
      // Simular creación de alerta
      await new Promise((resolve) => setTimeout(resolve, 1500))

      const alert = {
        id: Date.now(),
        productName,
        store: result.store,
        currentPrice: result.price,
        targetPrice,
        channels: selectedChannels,
        email: selectedChannels.includes("email") ? email : null,
        phone: selectedChannels.includes("sms") ? phone : null,
        createdAt: new Date().toISOString(),
        isActive: true,
      }

      onAlertCreated(alert)
      setShowSuccess(true)
      playSound("success")

      setTimeout(() => {
        setShowSuccess(false)
        onClose()
      }, 2000)
    } catch (error) {
      console.error("Error creating alert:", error)
      playSound("error")
    } finally {
      setIsCreating(false)
    }
  }

  const resetForm = () => {
    setTargetPrice(result?.price ? Math.round(result.price * 0.9) : 0)
    setSelectedChannels(["in-app"])
    setEmail("")
    setPhone("")
    setIsCreating(false)
    setShowSuccess(false)
  }

  const handleClose = () => {
    resetForm()
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md mx-auto max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-blue-500" />
            Crear Alerta de Precio
          </DialogTitle>
        </DialogHeader>

        {showSuccess ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-8"
          >
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0],
              }}
              transition={{ duration: 0.6 }}
            >
              <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-500" />
            </motion.div>
            <h3 className="text-lg font-bold mb-2 text-green-600 dark:text-green-400">¡Alerta creada exitosamente!</h3>
            <p className="text-muted-foreground">
              Te avisaremos cuando el precio baje a ${targetPrice.toLocaleString()} o menos
            </p>
          </motion.div>
        ) : (
          <div className="space-y-6">
            {/* Product Info */}
            <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <img
                    src={result.storeLogo || "/placeholder.svg"}
                    alt={result.store}
                    className="w-12 h-12 rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-bold">{productName}</h3>
                    <p className="text-sm text-muted-foreground">{result.store}</p>
                    <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
                      Precio actual: ${result.price.toLocaleString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Price Target */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-green-500" />
                <Label className="text-base font-medium">Precio objetivo</Label>
              </div>

              <div className="space-y-3">
                <div className="px-3">
                  <Slider
                    value={[targetPrice]}
                    onValueChange={(value) => setTargetPrice(value[0])}
                    max={maxPrice}
                    min={minPrice}
                    step={1000}
                    className="w-full"
                  />
                </div>

                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>${minPrice.toLocaleString()}</span>
                  <span>${maxPrice.toLocaleString()}</span>
                </div>

                <div className="text-center">
                  <Input
                    type="number"
                    value={targetPrice}
                    onChange={(e) => setTargetPrice(Number(e.target.value))}
                    className="text-center text-xl font-bold w-40 mx-auto"
                    min={minPrice}
                    max={maxPrice}
                  />
                </div>

                {savingsAmount > 0 && (
                  <motion.div
                    className="text-center p-3 bg-green-50 dark:bg-green-950 rounded-lg"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <TrendingDown className="w-4 h-4 text-green-500" />
                      <span className="font-bold text-green-600 dark:text-green-400">Ahorro potencial</span>
                    </div>
                    <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                      ${savingsAmount.toLocaleString()}
                    </p>
                    <p className="text-sm text-green-600 dark:text-green-400">({savingsPercentage}% menos)</p>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Notification Channels */}
            <div className="space-y-4">
              <Label className="text-base font-medium">¿Cómo querés que te avisemos?</Label>

              <div className="space-y-2">
                {channels.map((channel) => {
                  const IconComponent = channel.icon
                  const isSelected = selectedChannels.includes(channel.id)
                  const isDisabled = channel.disabled

                  return (
                    <motion.div
                      key={channel.id}
                      whileHover={!isDisabled ? { scale: 1.02 } : {}}
                      whileTap={!isDisabled ? { scale: 0.98 } : {}}
                    >
                      <Card
                        className={`cursor-pointer transition-all ${
                          isDisabled
                            ? "opacity-50 cursor-not-allowed"
                            : isSelected
                              ? "border-blue-500 bg-blue-50 dark:bg-blue-950"
                              : "hover:border-gray-300"
                        }`}
                        onClick={() => handleChannelToggle(channel.id)}
                      >
                        <CardContent className="p-3">
                          <div className="flex items-center gap-3">
                            <div
                              className={`p-2 rounded-lg ${
                                isSelected ? "bg-blue-500 text-white" : "bg-gray-100 dark:bg-gray-800"
                              }`}
                            >
                              <IconComponent className="w-4 h-4" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <p className="font-medium">{channel.name}</p>
                                {isDisabled && (
                                  <Badge variant="secondary" className="text-xs">
                                    Próximamente
                                  </Badge>
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground">{channel.description}</p>
                            </div>
                            {isSelected && !isDisabled && <CheckCircle className="w-5 h-5 text-blue-500" />}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )
                })}
              </div>
            </div>

            {/* Email Input */}
            {selectedChannels.includes("email") && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-2"
              >
                <Label htmlFor="email">Email para notificaciones</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="tu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full"
                />
                {selectedChannels.includes("email") && !email.trim() && (
                  <div className="flex items-center gap-1 text-red-500 text-sm">
                    <AlertCircle className="w-3 h-3" />
                    <span>Email requerido para notificaciones</span>
                  </div>
                )}
              </motion.div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button variant="outline" onClick={handleClose} className="flex-1 bg-transparent" disabled={isCreating}>
                Cancelar
              </Button>
              <Button
                onClick={handleCreateAlert}
                disabled={
                  selectedChannels.length === 0 || isCreating || (selectedChannels.includes("email") && !email.trim())
                }
                className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
              >
                {isCreating ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    >
                      <Bell className="w-4 h-4 mr-2" />
                    </motion.div>
                    Creando...
                  </>
                ) : (
                  <>
                    <Bell className="w-4 h-4 mr-2" />
                    Crear Alerta
                  </>
                )}
              </Button>
            </div>

            {/* Benefits */}
            <Card className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950">
              <CardContent className="p-3">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="font-medium text-green-700 dark:text-green-300">Beneficios de las alertas</span>
                </div>
                <ul className="text-sm text-green-600 dark:text-green-400 space-y-1">
                  <li>• Te avisamos apenas baja el precio</li>
                  <li>• No te perdés ninguna oferta</li>
                  <li>• Ahorrás tiempo y dinero</li>
                  <li>• Podés configurar múltiples alertas</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
