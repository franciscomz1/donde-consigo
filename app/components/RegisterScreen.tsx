"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft } from "lucide-react"

interface RegisterScreenProps {
  setCurrentScreen: (screen: string) => void
}

export default function RegisterScreen({ setCurrentScreen }: RegisterScreenProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle registration logic here
    setCurrentScreen("bankSelection")
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col">
      {/* Header */}
      <div className="pt-12 pb-8 px-8">
        <button
          onClick={() => setCurrentScreen("login")}
          className="flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 mb-8"
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
            />
          </div>

          <Button
            type="submit"
            className="w-full h-16 bg-sky-500 hover:bg-sky-600 text-white font-semibold text-lg rounded-2xl shadow-xl mt-8"
          >
            Crear cuenta
          </Button>

          <div className="text-center">
            <button
              type="button"
              onClick={() => setCurrentScreen("login")}
              className="text-sky-600 dark:text-sky-400 font-semibold hover:text-sky-700 dark:hover:text-sky-300"
            >
              Volver al inicio
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
