"use client"

import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { Button } from "@/components/ui/button"
import { useReservation } from "@/components/reservation-provider"

export function MobileReserveBar() {
  const { openReservation, isOpen } = useReservation()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted || isOpen) return null

  return createPortal(
    <div
      className="hidden max-md:flex fixed inset-x-0 bottom-0 z-[100] justify-center px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-2 pointer-events-none"
      role="presentation"
    >
      <Button
        type="button"
        onClick={() => openReservation()}
        className="pointer-events-auto min-h-11 rounded-full px-10 py-3 h-auto text-base font-bold shadow-lg bg-secondary text-secondary-foreground hover:bg-secondary/90 border-2 border-white/40"
        aria-label="Reservar"
      >
        Reservar
      </Button>
    </div>,
    document.body
  )
}
