"use client"

// Webhook simplificado
const MAKE_WEBHOOK_URL = "https://hook.us2.make.com/72qy3otvumaxhem84u8w6q2l65joj8n5"

export interface AuthResponse {
  success: boolean
  message: string
  user?: any
  token?: string
}

// Función helper simplificada para localStorage
const storage = {
  get: (key: string): string | null => {
    if (typeof window === "undefined") return null
    try {
      return window.localStorage.getItem(key)
    } catch {
      return null
    }
  },

  set: (key: string, value: string): void => {
    if (typeof window === "undefined") return
    try {
      window.localStorage.setItem(key, value)
    } catch {
      // Silently fail
    }
  },

  remove: (key: string): void => {
    if (typeof window === "undefined") return
    try {
      window.localStorage.removeItem(key)
    } catch {
      // Silently fail
    }
  },
}

export const authService = {
  // Registro simplificado
  register: async (userData: {
    name: string
    email: string
    password: string
  }): Promise<AuthResponse> => {
    try {
      const response = await fetch(MAKE_WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "register",
          name: userData.name,
          email: userData.email,
          password: userData.password,
        }),
      })

      // Respuesta simplificada
      if (response.ok) {
        return {
          success: true,
          message: "Usuario registrado exitosamente",
          user: {
            name: userData.name,
            email: userData.email,
            id: Date.now().toString(),
          },
        }
      } else {
        return {
          success: false,
          message: "Error al registrar usuario",
        }
      }
    } catch (error) {
      return {
        success: false,
        message: "Error de conexión",
      }
    }
  },

  // Login simplificado
  login: async (credentials: {
    email: string
    password: string
  }): Promise<AuthResponse> => {
    try {
      const response = await fetch(MAKE_WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "login",
          email: credentials.email,
          password: credentials.password,
        }),
      })

      if (response.ok) {
        const user = {
          email: credentials.email,
          name: "Usuario",
          id: Date.now().toString(),
        }

        const token = `token_${Date.now()}`
        storage.set("authToken", token)
        storage.set("user", JSON.stringify(user))

        return {
          success: true,
          message: "Inicio de sesión exitoso",
          user: user,
          token: token,
        }
      } else {
        return {
          success: false,
          message: "Credenciales incorrectas",
        }
      }
    } catch (error) {
      return {
        success: false,
        message: "Error de conexión",
      }
    }
  },

  // Reset password simplificado
  resetPassword: async (email: string): Promise<AuthResponse> => {
    try {
      console.log("📤 Enviando solicitud de reset password al webhook:", email)

      const response = await fetch(MAKE_WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "resetPassword",
          email: email,
        }),
      })

      console.log("📥 Respuesta del webhook:", response.status, response.statusText)

      if (response.ok) {
        return {
          success: true,
          message: "Email de recuperación enviado correctamente. Revisa tu bandeja de entrada.",
        }
      } else {
        return {
          success: false,
          message: "No se pudo enviar el email. Verifica que el email esté registrado.",
        }
      }
    } catch (error) {
      console.error("❌ Error en reset password:", error)
      return {
        success: false,
        message: "Error de conexión. Intenta nuevamente.",
      }
    }
  },

  // Obtener usuario actual
  getCurrentUser: (): any | null => {
    try {
      const userStr = storage.get("user")
      return userStr ? JSON.parse(userStr) : null
    } catch {
      return null
    }
  },

  // Verificar autenticación
  isAuthenticated: (): boolean => {
    return !!storage.get("authToken")
  },

  // Cerrar sesión
  logout: (): void => {
    storage.remove("authToken")
    storage.remove("user")
  },
}
