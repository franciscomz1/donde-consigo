"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CreditCard, Star, ChevronRight } from "lucide-react"

interface BanksStepProps {
  onNext: (data: any) => void
  onSkip: () => void
}

const banks = [
  { id: "santander", name: "Santander", color: "bg-red-500" },
  { id: "bbva", name: "BBVA", color: "bg-blue-500" },
  { id: "galicia", name: "Galicia", color: "bg-orange-500" },
  { id: "macro", name: "Macro", color: "bg-green-500" },
  { id: "nacion", name: "Nación", color: "bg-blue-600" },
  { id: "provincia", name: "Provincia", color: "bg-purple-500" },
  { id: "icbc", name: "ICBC", color: "bg-red-600" },
  { id: "hsbc", name: "HSBC", color: "bg-red-700" },
]

export function BanksStep({ onNext, onSkip }: BanksStepProps) {
  const [selectedBanks, setSelectedBanks] = useState<string[]>([])

  const toggleBank = (bankId: string) => {
    setSelectedBanks((prev) => (prev.includes(bankId) ? prev.filter((id) => id !== bankId) : [...prev, bankId]))
  }

  const handleNext = () => {
    onNext({
      favoriteBanks: selectedBanks,
      points: selectedBanks.length > 0 ? 50 : 0,
    })
  }

  return (
    <Card className="text-center">
      <CardContent className="p-8">
        <div className="mb-8">
          <CreditCard className="w-12 h-12 mx-auto mb-4 text-purple-500" />
          <h2 className="text-xl font-bold mb-2">Bancos favoritos</h2>
          <p className="text-muted-foreground mb-4">Seleccioná tus bancos para recibir promociones personalizadas</p>

          <div className="flex items-center justify-center gap-2 text-sm text-yellow-600 dark:text-yellow-400 mb-6">
            <Star className="w-4 h-4" />
            <span>+50 puntos por completar este paso</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-8">
          {banks.map((bank) => (
            <button
              key={bank.id}
              onClick={() => toggleBank(bank.id)}
              className={`p-4 rounded-lg border-2 transition-all ${
                selectedBanks.includes(bank.id)
                  ? "border-purple-500 bg-purple-50 dark:bg-purple-950"
                  : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
              }`}
            >
              <div className={`w-8 h-8 ${bank.color} rounded-full mx-auto mb-2`} />
              <p className="text-sm font-medium">{bank.name}</p>
            </button>
          ))}
        </div>

        {selectedBanks.length > 0 && (
          <div className="mb-6">
            <p className="text-sm text-muted-foreground mb-2">Bancos seleccionados:</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {selectedBanks.map((bankId) => {
                const bank = banks.find((b) => b.id === bankId)
                return (
                  <Badge key={bankId} variant="secondary">
                    {bank?.name}
                  </Badge>
                )
              })}
            </div>
          </div>
        )}

        <div className="space-y-3">
          <Button
            onClick={handleNext}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
          >
            {selectedBanks.length > 0 ? "Finalizar configuración" : "Continuar sin seleccionar"}
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>

          <Button variant="ghost" onClick={onSkip} className="w-full text-muted-foreground">
            Saltar este paso
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
