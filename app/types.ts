export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  points: number
  level: "Novato" | "Experto" | "Leyenda"
  streak: number
  totalSavings: number
  promosShared: number
  referralCode: string
  joinDate: Date
  achievements: Achievement[]
  favoriteStores: string[]
  favoriteBanks: string[]
  favoriteCards: string[]
}

// Agregar alias para compatibilidad
export type UserProfile = User

export interface Bank {
  id: string
  name: string
  color: string
  icon: string
}

export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  unlockedAt: Date
  points: number
}

export interface Challenge {
  id: string
  title: string
  description: string
  icon: string
  progress: number
  target: number
  reward: number
  expiresAt: Date
  completed: boolean
}

export interface Promo {
  id: string
  title: string
  description: string
  bank: Bank
  category: string
  discount: string
  validUntil: string
  location?: {
    lat: number
    lng: number
    address: string
    storeName: string
  }
  daysActive: string[]
  userId: string
  userName: string
  userLevel: string
  likes: number
  comments: Comment[]
  verified: boolean
  createdAt: Date
}

export interface Comment {
  id: string
  userId: string
  userName: string
  content: string
  createdAt: Date
  helpful: number
}

export interface CommunityPost {
  id: string
  user: User
  content: string
  image?: string
  location: string
  hashtags: string[]
  likes: number
  timestamp: Date
}

export interface Reward {
  id: string
  title: string
  description: string
  pointsCost: number
  category: "gift_card" | "discount" | "raffle"
  image: string
  available: boolean
}
