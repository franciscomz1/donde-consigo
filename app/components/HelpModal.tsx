"use client"

import { Button } from "@/components/ui/button"
import { HelpCircle, X, ChevronDown, ChevronRight } from "lucide-react"
import { useState } from "react"

interface HelpModalProps {
  isOpen: boolean
  onClose: () => void
}

const faqs = [
  {
    id: "1",
    question: "¿Cómo funciona la app?",
    answer:
      "Dónde Consigo te ayuda a encontrar promociones bancarias cerca tuyo. Configurás tus bancos favoritos, activás la ubicación y te mostramos ofertas personalizadas en tiempo real.",
  },
  {
    id: "2",
    question: "¿Cómo sumo puntos?",
    answer:
      "Sumás puntos compartiendo promociones (+10), invitando amigos (+100), usando la app diariamente (+5) y verificando ofertas (+25). Los puntos se pueden canjear por premios reales.",
  },
  {
    id: "3",
    question: "¿Las promociones son reales?",
    answer:
      "Sí, trabajamos con bancos y comercios para verificar las ofertas. Las promociones marcadas con ✓ están verificadas oficialmente. Las reportadas por usuarios se validan constantemente.",
  },
  {
    id: "4",
    question: "¿Cómo invito a un amigo?",
    answer:
      "Desde tu perfil o la sección 'Invitar amigos', compartí tu código único por WhatsApp. Cuando tu amigo se registre con tu código, ambos ganan 100 puntos.",
  },
  {
    id: "5",
    question: "¿Puedo cambiar mis bancos favoritos?",
    answer:
      "Sí, desde tu perfil podés editar tus bancos y categorías favoritas en cualquier momento. Esto actualiza las recomendaciones que recibís.",
  },
]

export default function HelpModal({ isOpen, onClose }: HelpModalProps) {
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null)

  if (!isOpen) return null

  const toggleFaq = (faqId: string) => {
    setExpandedFaq(expandedFaq === faqId ? null : faqId)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 max-w-md w-full max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <HelpCircle className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">¿Cómo funciona?</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Preguntas frecuentes</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} className="rounded-full">
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="space-y-3">
          {faqs.map((faq) => (
            <div key={faq.id} className="border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden">
              <button
                onClick={() => toggleFaq(faq.id)}
                className="w-full p-4 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                <span className="font-medium text-gray-900 dark:text-white pr-4">{faq.question}</span>
                {expandedFaq === faq.id ? (
                  <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-gray-500 flex-shrink-0" />
                )}
              </button>

              {expandedFaq === faq.id && (
                <div className="px-4 pb-4 text-gray-600 dark:text-gray-300 text-sm leading-relaxed animate-slide-up">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-6 bg-gradient-to-r from-sky-50 to-purple-50 dark:from-sky-900/20 dark:to-purple-900/20 rounded-2xl p-4">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-2">¿Necesitás más ayuda?</h4>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
            Escribinos a soporte@dondeconsigo.com o seguinos en redes para novedades.
          </p>
          <div className="flex space-x-2">
            <Button size="sm" variant="outline" className="rounded-xl bg-transparent">
              📧 Email
            </Button>
            <Button size="sm" variant="outline" className="rounded-xl bg-transparent">
              📱 WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
