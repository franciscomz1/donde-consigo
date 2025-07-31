"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Gift, Star, X, Clock, Mail } from "lucide-react"

interface RewardsModalProps {
  isOpen: boolean
  onClose: () => void
  userPoints: number
  userName?: string
}

const mockRewards = [
  {
    id: "1",
    title: "1 mes de Spotify Premium",
    description: "Música sin límites por 30 días",
    points: 1200,
    category: "Streaming",
    image: "🎵",
    available: false,
    comingSoon: true,
  },
  {
    id: "2",
    title: "Gift Card $2.000",
    description: "Para usar en MercadoLibre",
    points: 2000,
    category: "Shopping",
    image: "🛍️",
    available: false,
    comingSoon: true,
  },
  {
    id: "3",
    title: "20% OFF en PedidosYa",
    description: "Descuento en tu próximo pedido",
    points: 800,
    category: "Delivery",
    image: "🍕",
    available: false,
    comingSoon: true,
  },
  {
    id: "4",
    title: "Starbucks - Café gratis",
    description: "Cualquier bebida tamaño grande",
    points: 600,
    category: "Café",
    image: "☕",
    available: false,
    comingSoon: true,
  },
  {
    id: "5",
    title: "Uber - $500 de descuento",
    description: "Válido en viajes hasta $2000",
    points: 1000,
    category: "Transporte",
    image: "🚗",
    available: false,
    comingSoon: true,
  },
]

export default function RewardsModal({ isOpen, onClose, userPoints, userName }: RewardsModalProps) {
  const [showNotifyForm, setShowNotifyForm] = useState(false)
  const [email, setEmail] = useState("")
  const [notifySuccess, setNotifySuccess] = useState(false)

  if (!isOpen) return null

  const handleNotifyMe = (e: React.FormEvent) => {
    e.preventDefault()
    // Simular envío de email
    setNotifySuccess(true)
    setTimeout(() => {
      setNotifySuccess(false)
      setShowNotifyForm(false)
      setEmail("")
    }, 2000)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 max-w-md w-full max-h-[80vh] overflow-y-auto relative">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Catálogo de Premios</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Tenés <span className="font-bold text-green-600">{Number(userPoints) || 0} puntos</span> disponibles
            </p>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} className="rounded-full">
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Mensaje motivacional */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-4 mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <Gift className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-semibold text-gray-900 dark:text-white text-sm">¡Hola {userName || "usuario"}! 🎉</p>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Estamos preparando premios increíbles para vos</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {mockRewards.map((reward) => {
            const safeUserPoints = Number(userPoints) || 0
            const pointsNeeded = Math.max(0, reward.points - safeUserPoints)

            return (
              <div
                key={reward.id}
                className="bg-gray-50 dark:bg-gray-700 rounded-2xl p-4 transition-all duration-200 hover:shadow-md"
              >
                <div className="flex items-start space-x-4">
                  <div className="text-4xl">{reward.image}</div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">{reward.title}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{reward.description}</p>
                        <span className="inline-block px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 text-xs rounded-full mt-1">
                          {reward.category}
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-500" />
                          <span className="font-bold text-gray-900 dark:text-white">{reward.points}</span>
                        </div>
                        {pointsNeeded > 0 && <p className="text-xs text-red-500 mt-1">Te faltan {pointsNeeded}</p>}
                      </div>
                    </div>

                    <Button
                      disabled
                      className="w-full bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 rounded-xl cursor-not-allowed"
                      size="sm"
                    >
                      <Clock className="w-4 h-4 mr-2" />
                      Próximamente
                    </Button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* CTA para notificaciones */}
        <div className="mt-6 bg-sky-50 dark:bg-sky-900/20 rounded-2xl p-4">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-2">¿Querés ser el primero en saberlo?</h4>

          {!showNotifyForm ? (
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                Te avisamos cuando los premios estén disponibles
              </p>
              <Button
                onClick={() => setShowNotifyForm(true)}
                className="w-full bg-sky-500 hover:bg-sky-600 text-white rounded-xl"
                size="sm"
              >
                <Mail className="w-4 h-4 mr-2" />
                Avisarme cuando esté listo
              </Button>
            </div>
          ) : notifySuccess ? (
            <div className="text-center py-4">
              <div className="text-3xl mb-2">✅</div>
              <p className="text-green-600 dark:text-green-400 font-semibold">¡Listo! Te avisaremos pronto</p>
            </div>
          ) : (
            <form onSubmit={handleNotifyMe} className="space-y-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                className="w-full h-10 px-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-sky-500"
                required
              />
              <div className="flex space-x-2">
                <Button type="submit" className="flex-1 bg-sky-500 hover:bg-sky-600 text-white rounded-xl" size="sm">
                  Enviar
                </Button>
                <Button
                  type="button"
                  onClick={() => setShowNotifyForm(false)}
                  variant="ghost"
                  size="sm"
                  className="rounded-xl"
                >
                  Cancelar
                </Button>
              </div>
            </form>
          )}
        </div>

        {/* Tips para sumar puntos */}
        <div className="mt-4 bg-green-50 dark:bg-green-900/20 rounded-2xl p-4">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-2">¿Cómo sumar más puntos?</h4>
          <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
            <li>
              • Invitá amigos: <span className="font-semibold text-green-600">+100 puntos</span>
            </li>
            <li>
              • Compartí promociones: <span className="font-semibold text-green-600">+25 puntos</span>
            </li>
            <li>
              • Usá la app diariamente: <span className="font-semibold text-green-600">+5 puntos</span>
            </li>
            <li>
              • Verificá ofertas: <span className="font-semibold text-green-600">+15 puntos</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
