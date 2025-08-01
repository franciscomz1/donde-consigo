// Configuración centralizada de la aplicación
export const APP_CONFIG = {
  // Información de la app
  app: {
    name: "Donde Consigo",
    version: "1.0.0",
    description: "Encontrá las mejores promociones y precios",
    tagline: "Tu compañero de ahorro inteligente",
  },

  // Colores del tema
  colors: {
    primary: "#6366f1",
    primaryHover: "#4f46e5",
    primaryLight: "#e0e7ff",
    secondary: "#f59e0b",
    secondaryHover: "#d97706",
    secondaryLight: "#fef3c7",
    accent: "#10b981",
    accentHover: "#059669",
    accentLight: "#d1fae5",
    error: "#dc2626",
    warning: "#f59e0b",
    success: "#10b981",
    info: "#3b82f6",
  },

  // Animaciones
  animations: {
    duration: {
      fast: 150,
      normal: 250,
      slow: 350,
    },
    easing: {
      default: "cubic-bezier(0.4, 0, 0.2, 1)",
      bounce: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
      smooth: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
    },
  },

  // Sistema de gamificación
  gamification: {
    pointsPerAction: {
      // Onboarding
      completeProfile: 50,
      uploadPhoto: 50,
      addPersonalInfo: 30,
      selectBanks: 40,
      completeOnboarding: 100,

      // Acciones diarias
      dailyLogin: 10,
      firstSearchOfDay: 20,
      priceSearch: 15,
      createAlert: 25,
      favoritePromo: 10,
      shareContent: 20,
      completeChallenge: 100,

      // Hitos especiales
      firstFavorite: 25,
      first10Searches: 50,
      first5Alerts: 75,
      inviteFriend: 100,
      weeklyStreak: 150,
      monthlyActive: 300,
    },

    levels: {
      1: { min: 0, max: 100, name: "Explorador", emoji: "🔍", color: "#10b981" },
      2: { min: 101, max: 300, name: "Cazador", emoji: "🎯", color: "#f59e0b" },
      3: { min: 301, max: 600, name: "Experto", emoji: "⭐", color: "#6366f1" },
      4: { min: 601, max: 1000, name: "Maestro", emoji: "🏆", color: "#8b5cf6" },
      5: { min: 1001, max: 1500, name: "Leyenda", emoji: "👑", color: "#ec4899" },
      6: { min: 1501, max: 2500, name: "Campeón", emoji: "🚀", color: "#06b6d4" },
      7: { min: 2501, max: 5000, name: "Héroe", emoji: "💎", color: "#84cc16" },
      8: { min: 5001, max: 10000, name: "Titán", emoji: "⚡", color: "#f97316" },
      9: { min: 10001, max: 20000, name: "Dios", emoji: "🌟", color: "#ef4444" },
      10: { min: 20001, max: 999999, name: "Infinito", emoji: "♾️", color: "#a855f7" },
    },

    badges: {
      onboardingComplete: { name: "Bienvenido", emoji: "🎉", description: "Completaste el registro" },
      firstPhoto: { name: "Fotogénico", emoji: "📸", description: "Subiste tu primera foto" },
      firstFavorite: { name: "Coleccionista", emoji: "❤️", description: "Tu primera promoción favorita" },
      firstSearch: { name: "Investigador", emoji: "🔍", description: "Tu primera búsqueda de precios" },
      firstAlert: { name: "Vigilante", emoji: "🔔", description: "Tu primera alerta de precio" },
      socialButterfly: { name: "Social", emoji: "🦋", description: "Compartiste 5 veces" },
      weeklyStreak: { name: "Constante", emoji: "🔥", description: "7 días consecutivos" },
      monthlyActive: { name: "Fiel", emoji: "💪", description: "Activo todo el mes" },
      inviter: { name: "Embajador", emoji: "👥", description: "Invitaste 3 amigos" },
      savingsExpert: { name: "Ahorrador", emoji: "💰", description: "Ahorraste $10,000" },
    },
  },

  // Mensajes y copys
  messages: {
    greetings: {
      morning: ["¡Buenos días", "¡Buen día", "¡Hola"],
      afternoon: ["¡Buenas tardes", "¡Hola", "¡Qué tal"],
      evening: ["¡Buenas noches", "¡Hola", "¡Buenas"],
    },

    motivational: [
      "¡Estás a un paso de tu próximo logro!",
      "¡Seguí así, vas genial!",
      "¡Tu progreso es increíble!",
      "¡Cada punto cuenta!",
      "¡Sos imparable!",
      "¡El ahorro está en tus manos!",
    ],

    tips: [
      "💡 Usá el buscador antes de comprar para encontrar el mejor precio",
      "🎯 Configurá alertas para que te avisen cuando baje el precio",
      "⭐ Completá tu perfil para recibir promociones personalizadas",
      "🏆 Compartí tu ranking para ganar puntos extra",
      "📱 Los viernes se publican las mejores promociones del fin de semana",
      "💳 Configurá todos tus bancos para no perderte ninguna promo",
      "🔍 Revisá el historial para repetir búsquedas exitosas",
      "🔔 Las alertas te ayudan a comprar en el momento perfecto",
    ],

    errors: {
      generic: "Algo salió mal. Intentá de nuevo en unos segundos.",
      network: "Verificá tu conexión a internet e intentá nuevamente.",
      notFound: "No encontramos lo que buscás. Probá con otros términos.",
      timeout: "La búsqueda está tardando más de lo normal. ¿Querés seguir esperando?",
      validation: "Revisá los datos ingresados e intentá nuevamente.",
    },

    success: {
      pointsEarned: "¡Genial! Ganaste {points} puntos",
      levelUp: "¡Felicitaciones! Subiste al nivel {level}",
      badgeUnlocked: "¡Nuevo logro desbloqueado: {badge}!",
      challengeComplete: "¡Desafío completado! +{points} puntos",
      profileUpdated: "Tu perfil se actualizó correctamente",
      alertCreated: "Te avisaremos cuando baje el precio",
      shared: "¡Compartido! Ganaste {points} puntos extra",
    },
  },

  // Configuración de funcionalidades
  features: {
    onboarding: {
      steps: ["welcome", "photo", "personal", "banks", "preferences"],
      skippableSteps: ["photo", "banks", "preferences"],
      requiredSteps: ["welcome", "personal"],
    },

    search: {
      maxHistoryItems: 10,
      searchTimeout: 30000,
      maxStores: 8,
      minQueryLength: 3,
    },

    alerts: {
      maxActiveAlerts: 20,
      checkInterval: 3600000, // 1 hora
      notificationDelay: 300000, // 5 minutos
    },

    social: {
      maxSharesPerDay: 10,
      sharePointsLimit: 100,
      referralBonus: 100,
    },
  },

  // URLs y enlaces
  links: {
    support: "mailto:soporte@dondeconsigo.app",
    privacy: "/privacidad",
    terms: "/terminos",
    about: "/nosotros",
    feedback: "https://forms.gle/feedback",
    appStore: "#",
    playStore: "#",
    website: "https://dondeconsigo.app",
  },

  // Configuración de desarrollo
  dev: {
    enableDebug: process.env.NODE_ENV === "development",
    enableAnalytics: process.env.NODE_ENV === "production",
    apiUrl: process.env.NEXT_PUBLIC_API_URL || "https://api.dondeconsigo.app",
    version: process.env.NEXT_PUBLIC_APP_VERSION || "1.0.0",
  },

  // Límites y validaciones
  limits: {
    maxFileSize: 5 * 1024 * 1024, // 5MB
    maxImageDimensions: { width: 1024, height: 1024 },
    maxNameLength: 50,
    maxBioLength: 200,
    maxSearchLength: 200,
    minPasswordLength: 8,
  },

  // Configuración de notificaciones
  notifications: {
    types: {
      priceAlert: { title: "¡Precio rebajado!", icon: "💰", priority: "high" },
      newPromo: { title: "Nueva promoción", icon: "🎉", priority: "medium" },
      levelUp: { title: "¡Subiste de nivel!", icon: "🏆", priority: "high" },
      challenge: { title: "Nuevo desafío", icon: "🎯", priority: "low" },
      reminder: { title: "Te extrañamos", icon: "💙", priority: "low" },
    },

    schedule: {
      morning: { start: 9, end: 12 },
      afternoon: { start: 14, end: 18 },
      evening: { start: 19, end: 21 },
    },
  },

  // Configuración de accesibilidad
  accessibility: {
    minTouchTarget: 44, // px
    minContrastRatio: 4.5,
    focusRingWidth: 2, // px
    animationDuration: {
      reduced: 0.01, // para usuarios con prefers-reduced-motion
      normal: 0.3,
    },
  },

  // Métricas y analytics
  analytics: {
    events: {
      onboardingStart: "onboarding_start",
      onboardingComplete: "onboarding_complete",
      searchPerformed: "search_performed",
      alertCreated: "alert_created",
      promoFavorited: "promo_favorited",
      contentShared: "content_shared",
      levelUp: "level_up",
      badgeEarned: "badge_earned",
    },
  },
}

export type AppConfig = typeof APP_CONFIG
