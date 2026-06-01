"use client"

import { useCallback, useEffect, useState } from "react"
import { fetchBlockedSlots } from "@/lib/reservations-api"
import { TURNO_IDS, type BlockedSlot, slotKey, type TurnoId } from "@/lib/booking"

export function useBlockedSlots(refreshKey?: boolean | number) {
  const [blockedSet, setBlockedSet] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const reload = useCallback(() => {
    setLoading(true)
    fetchBlockedSlots()
      .then((data: BlockedSlot[]) => {
        setBlockedSet(new Set(data.map((slot) => `${slot.date}:${slot.turno}`)))
        setError(null)
      })
      .catch(() => {
        setError("No se pudieron cargar los turnos ocupados")
        setBlockedSet(new Set())
      })
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    reload()
  }, [reload, refreshKey])

  const isSlotBlocked = (date: Date, turno: TurnoId) =>
    blockedSet.has(slotKey(date, turno))

  const isDateFullyBlocked = (date: Date) =>
    TURNO_IDS.every((turno) => blockedSet.has(slotKey(date, turno)))

  const isDatePartiallyBlocked = (date: Date) => {
    const blocked = TURNO_IDS.filter((turno) => blockedSet.has(slotKey(date, turno)))
    return blocked.length > 0 && blocked.length < TURNO_IDS.length
  }

  return {
    blockedSet,
    loading,
    error,
    isSlotBlocked,
    isDateFullyBlocked,
    isDatePartiallyBlocked,
    reload,
  }
}
