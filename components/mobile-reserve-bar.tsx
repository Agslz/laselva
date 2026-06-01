"use client"

import { CalendarDays } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useReservation } from "@/components/reservation-provider"

export function MobileReserveBar() {
  const { openReservation, isOpen } = useReservation()

  if (isOpen) return null

  return (
    <div className="fixed bottom-4 left-1/2 z-40 -translate-x-1/2 md:hidden">
      <Button
        onClick={() => openReservation()}
        className="rounded-full shadow-lg px-6 py-5 bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold text-sm border border-white/20 backdrop-blur-sm"
        aria-label="Reservar ahora"
      >
        <CalendarDays className="mr-2 h-4 w-4" />
        Reservar ahora
      </Button>
    </div>
  )
}
