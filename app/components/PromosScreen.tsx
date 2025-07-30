"use client"

import { useState } from "react"
import { Calendar, Filter, Star, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Bank } from "../types"

interface PromosScreenProps {
  selectedBanks: Bank[]
}

const weekDays = [
  { day: "Lun", date: "15", active: false },
  { day: "Mar", date: "16", active: true },
  { day: "Mié", date: "17", active: false },
  { day: "Jue", date: "18", active: false },
  { day: "Vie", date: "19", active: false },
  { day: "Sáb", date: "20", active: false },
  { day: "Dom", date: "21", active: false },
]

const mockPromos = [
  {
    id: "1",
    title: "20% OFF en supermercados",
    bank: "Galicia",
    category: "Supermercados",
    discount: "20%",
    validUntil: "Hasta las 23:59",
    color: "bg-orange-500",
  },
  {
    id: "2",
    title: "3 cuotas sin interés",
    bank: "BBVA",
    category: "Indumentaria",
    discount: "3 cuotas",
    validUntil: "Todo el día",
    color: "bg-blue-600",
  },
  {
    id: "3",
    title: "15% OFF + envío gratis",
    bank: "Mercado Pago",
    category: "Farmacia",
    discount: "15%",
    validUntil: "Hasta las 20:00",
    color: "bg-blue-400",
  },
]

export default function PromosScreen({ selectedBanks }: PromosScreenProps) {
  const [selectedDay, setSelectedDay] = useState(1)

  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Promos Bancarias</h1>
          <p className="text-gray-600 dark:text-gray-300">Martes 16 de Enero</p>
        </div>
        <Button variant="ghost" size="sm" className="rounded-full">
          <Filter className="w-5 h-5" />
        </Button>
      </div>

      {/* Week calendar */}
      <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
        {weekDays.map((day, index) => (
          <button
            key={index}
            onClick={() => setSelectedDay(index)}
            className={`flex-shrink-0 p-3 rounded-2xl text-center min-w-[60px] transition-all duration-200 ${
              selectedDay === index
                ? "bg-sky-500 text-white shadow-lg"
                : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600"
            }`}
          >
            <p className="text-sm font-medium">{day.day}</p>
            <p className="text-lg font-bold">{day.date}</p>
            {day.active && selectedDay !== index && (
              <div className="w-2 h-2 bg-sky-500 rounded-full mx-auto mt-1"></div>
            )}
          </button>
        ))}
      </div>

      {/* Featured promos today */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Destacadas hoy</h2>
          <Button variant="ghost" size="sm" className="text-sky-600 dark:text-sky-400">
            Ver todas
          </Button>
        </div>

        <div className="space-y-4">
          {mockPromos.map((promo) => (
            <div
              key={promo.id}
              className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-200 dark:border-gray-600 shadow-sm"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 ${promo.color} rounded-xl flex items-center justify-center`}>
                    <span className="text-white font-bold text-sm">{promo.bank.slice(0, 2)}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">{promo.bank}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{promo.category}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-green-600">{promo.discount}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">OFF</p>
                </div>
              </div>

              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{promo.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{promo.validUntil}</p>

              <div className="flex space-x-2">
                <Button size="sm" className="flex-1 bg-sky-500 hover:bg-sky-600 text-white rounded-xl">
                  <Plus className="w-4 h-4 mr-2" />
                  Agregar a mi calendario
                </Button>
                <Button variant="ghost" size="sm" className="rounded-xl">
                  <Star className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating action button */}
      <Button className="fixed bottom-24 right-4 w-14 h-14 rounded-full bg-sky-500 hover:bg-sky-600 text-white shadow-xl">
        <Calendar className="w-6 h-6" />
      </Button>
    </div>
  )
}
