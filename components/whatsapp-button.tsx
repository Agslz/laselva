"use client"

import { MessageCircle } from "lucide-react"

const WHATSAPP_NUMBER = "5492613455391"

export function WhatsAppButton() {
  const handleClick = () => {
    const message = encodeURIComponent(
      "Hola! Me comunico desde la web de La Selva Pelotero. Me gustaría obtener más información."
    )
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank")
  }

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-16 h-16 bg-[#25D366] hover:bg-[#20BD5A] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group"
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle className="w-8 h-8 fill-current" />
      <span className="absolute right-full mr-3 px-3 py-2 bg-foreground text-background text-sm font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
        Escribinos
      </span>
    </button>
  )
}
