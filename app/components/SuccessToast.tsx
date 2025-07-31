"use client"

import { useEffect, useState } from "react"
import { CheckCircle } from "lucide-react"

interface SuccessToastProps {
  message: string
}

export default function SuccessToast({ message }: SuccessToastProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (message) {
      setIsVisible(true)
      const timer = setTimeout(() => {
        setIsVisible(false)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [message])

  if (!message || !isVisible) return null

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 animate-slide-up">
      <div className="bg-green-500 text-white px-6 py-3 rounded-2xl shadow-xl flex items-center space-x-3">
        <CheckCircle className="w-5 h-5" />
        <span className="font-medium">{message}</span>
      </div>
    </div>
  )
}
