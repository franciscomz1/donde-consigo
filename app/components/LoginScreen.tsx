"use client"

import { Button } from "@/components/ui/button"
import { Mail, Moon, Sun } from "lucide-react"

interface LoginScreenProps {
  setCurrentScreen: (screen: string) => void
  darkMode: boolean
  setDarkMode: (dark: boolean) => void
}

export default function LoginScreen({ setCurrentScreen, darkMode, setDarkMode }: LoginScreenProps) {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col">
      {/* Header with dark mode toggle */}
      <div className="pt-12 px-8 flex justify-end">
        <Button variant="ghost" size="sm" onClick={() => setDarkMode(!darkMode)} className="rounded-full p-2">
          {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </Button>
      </div>

      {/* Header */}
      <div className="pt-8 pb-8 px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">Ingresá a Dónde Consigo</h1>
          <p className="text-gray-600 dark:text-gray-300 text-xl">Descubrí las mejores ofertas cerca tuyo</p>
        </div>
      </div>

      {/* Logo/Icon area */}
      <div className="flex-1 flex items-center justify-center px-8">
        <div className="w-full max-w-sm">
          <div className="w-32 h-32 bg-gradient-to-br from-sky-400 via-blue-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-16 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
            <div className="relative z-10 text-center">
              <div className="text-white font-bold text-2xl mb-1">Dónde</div>
              <div className="text-white/90 font-medium text-lg">Consigo</div>
              <div className="w-8 h-1 bg-white/60 rounded-full mx-auto mt-2"></div>
            </div>
          </div>

          {/* Login buttons */}
          <div className="space-y-4">
            <Button
              className="w-full h-16 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 font-semibold text-lg rounded-2xl shadow-lg"
              onClick={() => {
                // Simular autenticación con Google
                console.log("Iniciando sesión con Google...")
                setCurrentScreen("bankSelection")
              }}
            >
              <svg className="w-6 h-6 mr-3" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continuar con Google
            </Button>

            <Button
              onClick={() => setCurrentScreen("register")}
              className="w-full h-16 bg-sky-500 hover:bg-sky-600 text-white font-semibold text-lg rounded-2xl shadow-xl"
            >
              <Mail className="w-6 h-6 mr-3" />
              Continuar con email
            </Button>
          </div>

          {/* Sign in link */}
          <div className="text-center mt-10">
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              ¿Ya tenés cuenta?{" "}
              <button
                onClick={() => setCurrentScreen("signin")}
                className="text-sky-600 dark:text-sky-400 font-semibold hover:text-sky-700 dark:hover:text-sky-300"
              >
                Iniciar sesión
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
