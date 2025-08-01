"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Share2, Copy, Check, ExternalLink, Users, TrendingUp, Star, Gift, Sparkles } from "lucide-react"
import { useSound } from "@/lib/hooks/use-sound"

interface ShareModalProps {
  isOpen: boolean
  onClose: () => void
  content: any
  onShare: (platform: string) => void
}

export function ShareModal({ isOpen, onClose, content, onShare }: ShareModalProps) {
  const { playSound } = useSound()
  const [copied, setCopied] = useState(false)
  const [sharedPlatforms, setSharedPlatforms] = useState<string[]>([])

  const shareOptions = [
    {
      id: "whatsapp",
      name: "WhatsApp",
      icon: "💬",
      color: "bg-green-500 hover:bg-green-600",
      url: (text: string, url: string) => `https://wa.me/?text=${encodeURIComponent(`${text} ${url}`)}`,
    },
    {
      id: "twitter",
      name: "Twitter",
      icon: "🐦",
      color: "bg-blue-500 hover:bg-blue-600",
      url: (text: string, url: string) =>
        `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
    },
    {
      id: "facebook",
      name: "Facebook",
      icon: "📘",
      color: "bg-blue-600 hover:bg-blue-700",
      url: (text: string, url: string) =>
        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`,
    },
    {
      id: "instagram",
      name: "Instagram",
      icon: "📷",
      color: "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600",
      url: (text: string, url: string) => `https://www.instagram.com/`,
      note: "Copiá el texto y compartilo en tu historia",
    },
  ]

  const handleShare = (platform: string) => {
    playSound("success")

    if (!content) return

    const shareText = content.message || content.title
    const shareUrl = content.url || window.location.origin

    const option = shareOptions.find((opt) => opt.id === platform)
    if (option) {
      window.open(option.url(shareText, shareUrl), "_blank", "width=600,height=400")
      setSharedPlatforms((prev) => [...prev, platform])
      onShare(platform)
    }
  }

  const handleCopyToClipboard = async () => {
    if (!content) return

    const textToCopy = `${content.title}\n\n${content.message}\n\n${content.url || window.location.origin}`

    try {
      await navigator.clipboard.writeText(textToCopy)
      playSound("success")
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement("textarea")
      textArea.value = textToCopy
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand("copy")
      document.body.removeChild(textArea)
      playSound("success")
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  if (!isOpen || !content) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Share2 className="w-5 h-5 text-blue-500" />
            Compartir
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Content Preview */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 border-purple-200 dark:border-purple-800">
              <CardContent className="p-4">
                <div className="text-center">
                  <motion.div
                    animate={{
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <Sparkles className="w-8 h-8 mx-auto mb-3 text-purple-500" />
                  </motion.div>
                  <h3 className="font-bold text-lg mb-2">{content.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{content.message}</p>
                  <Badge className="bg-purple-500 hover:bg-purple-600 text-white">
                    {content.type === "achievement" ? "Logro" : "Compartir"}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Share Options */}
          <div className="space-y-3">
            <h4 className="font-semibold flex items-center gap-2">
              <ExternalLink className="w-4 h-4" />
              Compartir en redes sociales
            </h4>
            <div className="grid grid-cols-2 gap-3">
              {shareOptions.map((option, index) => (
                <motion.div
                  key={option.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    onClick={() => handleShare(option.id)}
                    className={`w-full h-auto p-4 ${option.color} text-white relative`}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-2xl">{option.icon}</span>
                      <span className="font-medium">{option.name}</span>
                      {option.note && <span className="text-xs opacity-90 text-center">{option.note}</span>}
                    </div>
                    {sharedPlatforms.includes(option.id) && (
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute top-2 right-2">
                        <Check className="w-4 h-4 text-white" />
                      </motion.div>
                    )}
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Copy to Clipboard */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <Button
              onClick={handleCopyToClipboard}
              variant="outline"
              className="w-full h-auto p-4 bg-transparent"
              disabled={copied}
            >
              <div className="flex items-center gap-3">
                <motion.div animate={copied ? { rotate: 360 } : {}} transition={{ duration: 0.5 }}>
                  {copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
                </motion.div>
                <div className="text-left">
                  <p className="font-medium">{copied ? "¡Copiado al portapapeles!" : "Copiar texto"}</p>
                  <p className="text-sm text-muted-foreground">
                    {copied ? "Ahora podés pegarlo donde quieras" : "Copiá el texto para compartir manualmente"}
                  </p>
                </div>
              </div>
            </Button>
          </motion.div>

          {/* Benefits of Sharing */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
            <Card className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
              <CardContent className="p-4">
                <h4 className="font-bold text-blue-700 dark:text-blue-300 mb-3 flex items-center gap-2">
                  <Gift className="w-4 h-4" />
                  Beneficios de compartir
                </h4>
                <div className="space-y-2 text-sm text-blue-600 dark:text-blue-400">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span>Ganás +25 puntos por compartir</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-green-500" />
                    <span>Ayudás a tus amigos a ahorrar</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-purple-500" />
                    <span>Contribuís a la comunidad</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Social Proof */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
            <div className="text-center text-sm text-muted-foreground">
              <p>🔥 +1,247 usuarios compartieron esta semana</p>
              <p>💫 Promedio de 15 puntos ganados por compartir</p>
            </div>
          </motion.div>
        </div>

        <div className="flex gap-2 pt-4 border-t">
          <Button onClick={onClose} variant="outline" className="flex-1 bg-transparent">
            Cerrar
          </Button>
          <Button onClick={handleCopyToClipboard} className="flex-1">
            <Copy className="w-4 h-4 mr-2" />
            Copiar texto
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
