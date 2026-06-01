import { formatDateKey } from "@/lib/booking"
import { TURNO_IDS, type BlockedSlot } from "@/lib/booking"

/** Normaliza fechas que vienen mal del script (ej. "Wed Jun 06 2026...") */
export function normalizeBlockedSlotDate(date: string): string {
  const text = date.trim()
  if (/^\d{4}-\d{2}-\d{2}$/.test(text)) return text

  const parsed = new Date(text)
  if (!isNaN(parsed.getTime())) {
    return formatDateKey(parsed)
  }

  return text
}

export function normalizeBlockedSlots(slots: BlockedSlot[]): BlockedSlot[] {
  const seen = new Set<string>()
  const result: BlockedSlot[] = []

  for (const slot of slots) {
    const date = normalizeBlockedSlotDate(slot.date)
    const turno = slot.turno.trim().toLowerCase()
    if (!date || !TURNO_IDS.includes(turno as (typeof TURNO_IDS)[number])) continue

    const key = `${date}:${turno}`
    if (seen.has(key)) continue
    seen.add(key)
    result.push({ date, turno: turno as BlockedSlot["turno"] })
  }

  return result
}
