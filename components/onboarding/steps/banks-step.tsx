"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { CreditCard, Star, ChevronRight, Search, Check, Plus } from "lucide-react"
import { useSound } from "@/lib/hooks/use-sound"

interface BanksStepProps {
  onNext: (data: any, points?: number) => void
  onSkip: () => void
  userData: any
  stepConfig: any
  isCompleted: boolean
}

export function BanksStep({ onNext, onSkip, userData, stepConfig, isCompleted }: BanksStepProps) {
  const [selectedBanks, setSelectedBanks] = useState<string[]>(userData.favoriteBanks || [])
  const [searchTerm, setSearchTerm] = useState("")
  const [customBank, setCustomBank] = useState("")
  const [showCustomInput, setShowCustomInput] = useState(false)
  const { playSound } = useSound()

  const banks = [
    { id: "santander", name: "Santander", color: "from-red-500 to-red-600", popular: true },
    { id: "bbva", name: "BBVA", color: "from-blue-500 to-blue-600", popular: true },
    { id: "galicia", name: "Galicia", color: "from-orange-500 to-orange-600", popular: true },
    { id: "nacion", name: "Banco Nación", color: "from-blue-700 to-blue-800", popular: true },
    { id: "provincia", name: "Banco Provincia", color: "from-green-600 to-green-700", popular: false },
    { id: "macro", name: "Macro", color: "from-yellow-500 to-yellow-600", popular: false },
    { id: "icbc", name: "ICBC", color: "from-red-600 to-red-700", popular: false },
    { id: "supervielle", name: "Supervielle", color: "from-purple-500 to-purple-600", popular: false },
    { id: "patagonia", name: "Patagonia", color: "from-teal-500 to-teal-600", popular: false },
    { id: "mercadopago", name: "Mercado Pago", color: "from-blue-400 to-cyan-500", popular: true },
    { id: "uala", name: "Ualá", color: "from-pink-500 to-pink-600", popular: true },
    { id: "brubank", name: "Brubank", color: "from-purple-600 to-indigo-600", popular: true },
    { id: "naranja", name: "Naranja X", color: "from-orange-500 to-red-500", popular: false },
  ]

  const filteredBanks = banks.filter((bank) => bank.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const popularBanks = filteredBanks.filter((bank) => bank.popular)
  const otherBanks = filteredBanks.filter((bank) => !bank.popular)

  const handleBankToggle = (bankId: string) => {
    playSound("click")
    setSelectedBanks((prev) => (prev.includes(bankId) ? prev.filter((id) => id !== bankId) : [...prev, bankId]))
  }

  const handleAddCustomBank = () => {
    if (customBank.trim() && !selectedBanks.includes(customBank.trim())) {
      playSound("success")
      setSelectedBanks((prev) => [...prev, customBank.trim()])
      setCustomBank("")
      setShowCustomInput(false)
    }
  }

  const handleNext = () => {
    const points = selectedBanks.length > 0 ? stepConfig.points : 0
    onNext({ favoriteBanks: selectedBanks }, points)
  }

  const handleSkip = () => {
    playSound("click")
    onSkip()
  }

  const getBankName = (bankId: string) => {
    const bank = banks.find((b) => b.id === bankId)
    return bank ? bank.name : bankId
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      {/* Main Card */}
      <Card className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-2 border-white/20 shadow-2xl">
        <CardContent className="p-6">
          <div className="text-center mb-6">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", damping: 15 }}>
              <CreditCard className="w-12 h-12 mx-auto mb-4 text-purple-500" />
            </motion.div>

            <h2 className="text-2xl font-bold mb-2">Tus bancos favoritos 💳</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Seleccioná tus bancos para recibir promociones personalizadas
            </p>

            <div className="flex items-center justify-center gap-2 text-sm mb-6">
              <Star className="w-4 h-4 text-yellow-500" />
              <span className="font-medium text-yellow-600 dark:text-yellow-400">
                {selectedBanks.length > 0
                  ? `¡Ganaste ${stepConfig.points} puntos!`
                  : `Sumá ${stepConfig.points} puntos seleccionando al menos un banco`}
              </span>
            </div>
          </div>

          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Buscá tu banco..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Selected Banks Summary */}
          {selectedBanks.length > 0 && (
            <motion.div
              className="mb-4 p-3 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Check className="w-4 h-4 text-green-600" />
                <span className="font-medium text-green-700 dark:text-green-300">
                  {selectedBanks.length} banco{selectedBanks.length !== 1 ? "s" : ""} seleccionado
                  {selectedBanks.length !== 1 ? "s" : ""}
                </span>
              </div>
              <div className="flex flex-wrap gap-1">
                {selectedBanks.map((bankId) => (
                  <Badge key={bankId} variant="secondary" className="text-xs">
                    {getBankName(bankId)}
                  </Badge>
                ))}
              </div>
            </motion.div>
          )}

          {/* Popular Banks */}
          {popularBanks.length > 0 && (
            <div className="mb-6">
              <h3 className="font-bold text-sm mb-3 flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-500" />
                Más populares
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {popularBanks.map((bank, index) => (
                  <motion.div
                    key={bank.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card
                      className={`cursor-pointer transition-all hover:scale-105 ${
                        selectedBanks.includes(bank.id)
                          ? "ring-2 ring-purple-500 bg-purple-50 dark:bg-purple-950"
                          : "hover:shadow-md"
                      }`}
                      onClick={() => handleBankToggle(bank.id)}
                    >
                      <CardContent className="p-3">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-10 h-10 bg-gradient-to-r ${bank.color} rounded-lg flex items-center justify-center`}
                          >
                            <span className="text-white font-bold text-sm">{bank.name.charAt(0)}</span>
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-sm">{bank.name}</p>
                          </div>
                          <Checkbox
                            checked={selectedBanks.includes(bank.id)}
                            onChange={() => handleBankToggle(bank.id)}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Other Banks */}
          {otherBanks.length > 0 && (
            <div className="mb-6">
              <h3 className="font-bold text-sm mb-3">Otros bancos</h3>
              <div className="space-y-2">
                {otherBanks.map((bank, index) => (
                  <motion.div
                    key={bank.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card
                      className={`cursor-pointer transition-all hover:bg-gray-50 dark:hover:bg-gray-800 ${
                        selectedBanks.includes(bank.id) ? "ring-2 ring-purple-500 bg-purple-50 dark:bg-purple-950" : ""
                      }`}
                      onClick={() => handleBankToggle(bank.id)}
                    >
                      <CardContent className="p-3">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-8 h-8 bg-gradient-to-r ${bank.color} rounded-lg flex items-center justify-center`}
                          >
                            <span className="text-white font-bold text-xs">{bank.name.charAt(0)}</span>
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-sm">{bank.name}</p>
                          </div>
                          <Checkbox
                            checked={selectedBanks.includes(bank.id)}
                            onChange={() => handleBankToggle(bank.id)}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Custom Bank Input */}
          <div className="space-y-3">
            {!showCustomInput ? (
              <Button variant="outline" onClick={() => setShowCustomInput(true)} className="w-full bg-transparent">
                <Plus className="w-4 h-4 mr-2" />
                Agregar otro banco
              </Button>
            ) : (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="space-y-2"
              >
                <div className="flex gap-2">
                  <Input
                    placeholder="Nombre del banco..."
                    value={customBank}
                    onChange={(e) => setCustomBank(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleAddCustomBank()}
                    className="flex-1"
                  />
                  <Button onClick={handleAddCustomBank} disabled={!customBank.trim()}>
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setShowCustomInput(false)
                    setCustomBank("")
                  }}
                  className="text-gray-500"
                >
                  Cancelar
                </Button>
              </motion.div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Benefits Card */}
      <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950 border-blue-200 dark:border-blue-800">
        <CardContent className="p-4">
          <h3 className="font-bold text-blue-700 dark:text-blue-300 mb-3 text-center">
            ¿Por qué seleccionar tus bancos?
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Promociones personalizadas solo para vos</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Alertas de ofertas que podés usar</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Filtros automáticos por banco</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="space-y-3">
        <Button
          onClick={handleNext}
          className={`w-full font-medium py-3 shadow-xl transition-all ${
            selectedBanks.length > 0
              ? "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
              : "bg-gradient-to-r from-gray-400 to-gray-500 hover:from-gray-500 hover:to-gray-600 text-white"
          }`}
        >
          <motion.div className="flex items-center gap-2" whileHover={{ x: 5 }}>
            {selectedBanks.length > 0 ? (
              <>
                ¡Perfecto! Continuar ({selectedBanks.length} banco{selectedBanks.length !== 1 ? "s" : ""})
                <ChevronRight className="w-4 h-4" />
              </>
            ) : (
              <>
                Continuar sin seleccionar
                <ChevronRight className="w-4 h-4" />
              </>
            )}
          </motion.div>
        </Button>

        {!stepConfig.required && (
          <Button
            variant="ghost"
            onClick={handleSkip}
            className="w-full text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
          >
            Saltar este paso
          </Button>
        )}

        <div className="text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            💡 Podés cambiar tus bancos favoritos cuando quieras desde tu perfil
          </p>
        </div>
      </div>
    </motion.div>
  )
}
