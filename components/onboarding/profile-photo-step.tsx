"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Camera, Upload, Star, ChevronRight } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface ProfilePhotoStepProps {
  onNext: (data: any) => void
  onSkip: () => void
}

export function ProfilePhotoStep({ onNext, onSkip }: ProfilePhotoStepProps) {
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null)

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setProfilePhoto(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleNext = () => {
    onNext({ profilePhoto, points: profilePhoto ? 20 : 0 })
  }

  return (
    <Card className="text-center">
      <CardContent className="p-8">
        <div className="mb-8">
          <Camera className="w-12 h-12 mx-auto mb-4 text-purple-500" />
          <h2 className="text-xl font-bold mb-2">¡Poné tu mejor foto!</h2>
          <p className="text-muted-foreground mb-4">Subí una foto de perfil y sumá 20 puntos extra</p>

          <div className="flex items-center justify-center gap-2 text-sm text-yellow-600 dark:text-yellow-400 mb-6">
            <Star className="w-4 h-4" />
            <span>+20 puntos por completar este paso</span>
          </div>
        </div>

        <div className="mb-8">
          <Avatar className="w-24 h-24 mx-auto mb-4">
            <AvatarImage src={profilePhoto || undefined} />
            <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white text-2xl">
              <Camera className="w-8 h-8" />
            </AvatarFallback>
          </Avatar>

          <label htmlFor="photo-upload" className="cursor-pointer">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors">
              <Upload className="w-4 h-4" />
              <span className="text-sm font-medium">{profilePhoto ? "Cambiar foto" : "Subir foto"}</span>
            </div>
          </label>
          <input id="photo-upload" type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
        </div>

        <div className="space-y-3">
          <Button
            onClick={handleNext}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
          >
            {profilePhoto ? "Continuar" : "Continuar sin foto"}
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
