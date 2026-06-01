"use client"

import { createContext, useCallback, useContext, useState, type ReactNode } from "react"
import {
  createEmptyReservation,
  type ReservationFormData,
  type TurnoId,
} from "@/lib/booking"
import { ReservationModal } from "@/components/reservation-modal"
import { MobileReserveBar } from "@/components/mobile-reserve-bar"

export interface ReservationPrefill {
  fecha?: Date | null
  turno?: TurnoId | null
  cantidadPersonas?: number
}

interface ReservationContextValue {
  openReservation: (prefill?: ReservationPrefill) => void
  closeReservation: () => void
  isOpen: boolean
}

const ReservationContext = createContext<ReservationContextValue | null>(null)

export function ReservationProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [prefill, setPrefill] = useState<ReservationPrefill | undefined>()

  const openReservation = useCallback((nextPrefill?: ReservationPrefill) => {
    setPrefill(nextPrefill)
    setIsOpen(true)
  }, [])

  const closeReservation = useCallback(() => {
    setIsOpen(false)
    setPrefill(undefined)
  }, [])

  return (
    <ReservationContext.Provider value={{ openReservation, closeReservation, isOpen }}>
      {children}
      <ReservationModal
        open={isOpen}
        onOpenChange={(open) => (open ? setIsOpen(true) : closeReservation())}
        prefill={prefill}
      />
      <MobileReserveBar />
    </ReservationContext.Provider>
  )
}

export function useReservation() {
  const ctx = useContext(ReservationContext)
  if (!ctx) {
    throw new Error("useReservation debe usarse dentro de ReservationProvider")
  }
  return ctx
}

export function buildPrefilledForm(
  prefill?: ReservationPrefill
): ReservationFormData {
  const base = createEmptyReservation()
  if (!prefill) return base
  return {
    ...base,
    fecha: prefill.fecha ?? base.fecha,
    turno: prefill.turno ?? base.turno,
    cantidadPersonas: prefill.cantidadPersonas ?? base.cantidadPersonas,
  }
}
