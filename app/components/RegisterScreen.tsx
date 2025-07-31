"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Loader2 } from "lucide-react"
import { authService } from "../services/auth"

interface RegisterScreenProps {
  setCurrentScreen: (screen: string) => void
  setUser: (user: any) => void
}

export default function RegisterScreen({ setCurrentScreen, setUser }: RegisterScreenProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (error) setError("")
    if (success) setSuccess("")
  }

  const validateForm = () => {
    if (!formData.fullName.trim()) {
      setError("El nombre completo es requerido")
      return false
    }
    if (!formData.email.trim()) {
      setError("El email es requerido")
      return false
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError("El email no es válido")
      return false
    }
    if (formData.password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres")
      return false
    }
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)
    setError("")
    setSuccess("")

    try {
      const result = await authService.register({
        name: formData.fullName,
        email: formData.email,
        password: formData.password,
      })

      if (result.success) {
        setSuccess("¡Cuenta creada exitosamente!")
        setFormData({ fullName: "", email: "", password: "" })

        // Crear usuario inicial con puntos de bienvenida
        const newUser = {
          id: Date.now().toString(),
          name: formData.fullName,
          email: formData.email,
          points: 100, // Puntos de bienvenida
          level: "Novato" as const,
          streak: 1,
          totalSavings: 0,
          promosShared: 0,
          referralCode: `REF${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
          joinDate: new Date(),
          achievements: [
            {
              id: "welcome",
              title: "¡Bienvenido!",
              description: "Te uniste a la comunidad",
              icon: "🎉",
              unlockedAt: new Date(),
              points: 50,
            },
          ],
          favoriteStores: [],
          favoriteBanks: [],
          favoriteCards: [],
        }

        // Pasar el usuario al siguiente screen
        setTimeout(() => {
          setCurrentScreen("congratulations")
          // Pasamos el usuario creado
          if (setUser) setUser(newUser)
        }, 2000)
      } else {
        setError(result.message)
      }
    } catch (error) {
      setError("Error inesperado. Intenta nuevamente.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col">
      {/* Header */}
      <div className="pt-12 pb-8 px-8">
        <button
          onClick={() => setCurrentScreen("login")}
          className="flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 mb-8"
          disabled={isLoading}
        >
          <ArrowLeft className="w-6 h-6 mr-2" />
          Volver
        </button>

        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Crear cuenta</h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">Completá tus datos para empezar</p>
        </div>
      </div>

      {/* Form */}
      <div className="flex-1 px-8">
        <form onSubmit={handleSubmit} className="max-w-sm mx-auto space-y-6">
          {/* Mensajes */}
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-4">
              <p className="text-red-600 dark:text-red-400 text-sm text-center">{error}</p>
            </div>
          )}

          {success && (
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-2xl p-4">
              <p className="text-green-600 dark:text-green-400 text-sm text-center">{success}</p>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="fullName" className="text-gray-700 dark:text-gray-200 font-medium">
              Nombre completo
            </Label>
            <Input
              id="fullName"
              type="text"
              value={formData.fullName}
              onChange={(e) => handleInputChange("fullName", e.target.value)}
              placeholder="Tu nombre completo"
              className="h-14 rounded-2xl border-gray-200 dark:border-gray-600 focus:border-sky-500 focus:ring-sky-500 text-lg"
              required
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-700 dark:text-gray-200 font-medium">
              Correo electrónico
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              placeholder="tu@email.com"
              className="h-14 rounded-2xl border-gray-200 dark:border-gray-600 focus:border-sky-500 focus:ring-sky-500 text-lg"
              required
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-gray-700 dark:text-gray-200 font-medium">
              Contraseña
            </Label>
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              placeholder="Mínimo 6 caracteres"
              className="h-14 rounded-2xl border-gray-200 dark:border-gray-600 focus:border-sky-500 focus:ring-sky-500 text-lg"
              required
              minLength={6}
              disabled={isLoading}
            />
          </div>

          <Button
            type="submit"
            className="w-full h-16 bg-sky-500 hover:bg-sky-600 text-white font-semibold text-lg rounded-2xl shadow-xl mt-8 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-6 h-6 mr-3 animate-spin" />
                Creando cuenta...
              </>
            ) : (
              "Crear cuenta"
            )}
          </Button>

          <div className="text-center">
            <button
              type="button"
              onClick={() => setCurrentScreen("login")}
              className="text-sky-600 dark:text-sky-400 font-semibold hover:text-sky-700 dark:hover:text-sky-300 disabled:opacity-50"
              disabled={isLoading}
            >
              Volver al inicio
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
