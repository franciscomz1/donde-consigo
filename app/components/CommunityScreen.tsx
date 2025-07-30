"use client"

import { useState } from "react"
import { Heart, MessageCircle, Share, Plus, Filter, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { User } from "../types"

interface CommunityScreenProps {
  user: User | null
}

const mockPosts = [
  {
    id: "1",
    user: { name: "María G.", level: "Experta", avatar: "👩" },
    content: "¡20% OFF en Farmacity con BBVA hasta las 20hs! Confirmado en Palermo 📍",
    hashtags: ["#farmacity", "#bbva", "#palermo"],
    location: "Palermo, CABA",
    likes: 24,
    comments: 5,
    timestamp: "hace 2 horas",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "2",
    user: { name: "Carlos R.", level: "Leyenda", avatar: "👨" },
    content: "Coto con Galicia martes 25% OFF. Stack con descuento de la app = 40% total 🔥",
    hashtags: ["#coto", "#galicia", "#martes"],
    location: "Villa Crespo, CABA",
    likes: 89,
    comments: 12,
    timestamp: "hace 4 horas",
  },
  {
    id: "3",
    user: { name: "Ana L.", level: "Novata", avatar: "👩‍🦱" },
    content: "¿Alguien sabe si el descuento de Santander en Zara aplica online también?",
    hashtags: ["#santander", "#zara", "#consulta"],
    location: "Recoleta, CABA",
    likes: 12,
    comments: 8,
    timestamp: "hace 6 horas",
  },
]

export default function CommunityScreen({ user }: CommunityScreenProps) {
  const [filter, setFilter] = useState<"recent" | "popular" | "nearby">("recent")

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Novato":
        return "bg-green-500 text-white"
      case "Experto":
        return "bg-blue-500 text-white"
      case "Leyenda":
        return "bg-purple-500 text-white"
      default:
        return "bg-gray-500 text-white"
    }
  }

  return (
    <div className="h-full">
      {/* Header */}
      <div className="p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Comunidad</h1>
            <p className="text-gray-600 dark:text-gray-300">Promociones compartidas</p>
          </div>
          <Button variant="ghost" size="sm" className="rounded-full">
            <Filter className="w-5 h-5" />
          </Button>
        </div>

        {/* Filter tabs */}
        <div className="flex space-x-2">
          {[
            { id: "recent", label: "Recientes", icon: null },
            { id: "popular", label: "Populares", icon: TrendingUp },
            { id: "nearby", label: "Cerca mío", icon: null },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id as any)}
              className={`flex items-center px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                filter === tab.id
                  ? "bg-sky-500 text-white"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
              }`}
            >
              {tab.icon && <tab.icon className="w-4 h-4 mr-2" />}
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Posts feed */}
      <div className="p-4 space-y-4">
        {mockPosts.map((post) => (
          <div
            key={post.id}
            className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm"
          >
            {/* User info */}
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center text-lg">
                {post.user.avatar}
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <p className="font-semibold text-gray-900 dark:text-white">{post.user.name}</p>
                  <span className={`px-2 py-1 text-xs font-medium ${getLevelColor(post.user.level)}`}>
                    {post.user.level}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {post.location} • {post.timestamp}
                </p>
              </div>
            </div>

            {/* Content */}
            <p className="text-gray-900 dark:text-white mb-3 leading-relaxed">{post.content}</p>

            {/* Image if exists */}
            {post.image && (
              <div className="mb-3 rounded-xl overflow-hidden">
                <img src={post.image || "/placeholder.svg"} alt="Post image" className="w-full h-48 object-cover" />
              </div>
            )}

            {/* Hashtags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {post.hashtags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-sky-50 dark:bg-sky-900 text-sky-600 dark:text-sky-400 text-sm font-medium rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-6">
                <button className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-red-500">
                  <Heart className="w-5 h-5" />
                  <span className="text-sm font-medium">{post.likes}</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-blue-500">
                  <MessageCircle className="w-5 h-5" />
                  <span className="text-sm font-medium">{post.comments}</span>
                </button>
              </div>
              <button className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100">
                <Share className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Floating action button */}
      <Button className="fixed bottom-24 right-4 w-14 h-14 rounded-full bg-sky-500 hover:bg-sky-600 text-white shadow-xl">
        <Plus className="w-6 h-6" />
      </Button>
    </div>
  )
}
