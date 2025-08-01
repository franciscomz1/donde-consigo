"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Gift, ChevronRight } from "lucide-react"

interface WelcomeStepProps {
  onNext: () => void
}

export function WelcomeStep({ onNext }: WelcomeStepProps) {
  return (
    <Card className="text-center">
      <CardContent className="p-8">
        <div className="mb-8">
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
            <Gift className="w-10 h-10 text-white" />
          </div>

          <h2 className="text-2xl font-bold mb-4">Promos todos los días</h2>
          <p className="text-muted-foreground mb-6">Descubrí qué banco te conviene según el día y tu tarjeta</p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3 p-3 bg-purple-50 dark:bg-purple-950 rounded-lg">
            <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">1</span>
            </div>
            <p className="text-sm">Encontrá las mejores promociones</p>
          </div>

          <div className="flex items-center gap-3 p-3 bg-pink-50 dark:bg-pink-950 rounded-lg">
            <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">2</span>
            </div>
            <p className="text-sm">Ganá puntos y desbloqueá beneficios</p>
          </div>

          <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">3</span>
            </div>
            <p className="text-sm">Competí en el ranking con otros usuarios</p>
          </div>
        </div>

        <Button
          onClick={onNext}
          className="w-full mt-8 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
        >
          Siguiente
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </CardContent>
    </Card>
  )
}
