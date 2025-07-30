export interface User {
  id: string
  name: string
  email: string
  points: number
  level: "Novato" | "Experto" | "Leyenda"
  avatar?: string
}

export interface Bank {
  id: string
  name: string
  color: string
  icon: string
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
  }
  daysActive: string[]
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
