"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { User, Star, ChevronRight } from "lucide-react"

interface PersonalInfoStepProps {
  onNext: (data: any) => void
  onSkip: () => void
}

export function PersonalInfoStep({ onNext, onSkip }: PersonalInfoStepProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")

  const handleNext = () => {
    onNext({
      name,
      email,
      points: name && email ? 30 : 0,
    })
  }

  const isValid = name.trim() && email.trim()

  return (
    <Card className="text-center">
      <CardContent className="p-8">
        <div className="mb-8">
          <User className="w-12 h-12 mx-auto mb-4 text-purple-500" />
          <h2 className="text-xl font-bold mb-2">Datos personales</h2>
          <p className="text-muted-foreground mb-4">Completá tu información básica para personalizar tu experiencia</p>

          <div className="flex items-center justify-center gap-2 text-sm text-yellow-600 dark:text-yellow-400 mb-6">
            <Star className="w-4 h-4" />
            <span>+30 puntos por completar este paso</span>
          </div>
        </div>

        <div className="space-y-4 mb-8 text-left">
          <div>
            <Label htmlFor="name">Nombre completo</Label>
            <Input
              id="name"
              type="text"
              placeholder="Tu nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1"
            />
          </div>
        </div>

        <div className="space-y-3">
          <Button
            onClick={handleNext}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            disabled={!isValid}
          >
            Continuar
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
