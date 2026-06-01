export const TURNOS = [
  { id: "manana", label: "Mañana", horario: "13:00 - 16:00" },
  { id: "tarde", label: "Tarde", horario: "16:45 - 19:45" },
  { id: "noche", label: "Noche", horario: "20:30 - 23:30" },
] as const

export const TURNO_IDS = TURNOS.map((t) => t.id)

export type TurnoId = (typeof TURNOS)[number]["id"]

export const EVENT_TYPES = [
  "Cumpleaños infantil",
  "Cumpleaños adolescente",
  "Evento familiar",
  "Otro",
] as const

export type EventType = (typeof EVENT_TYPES)[number]

export const COMBOS = [
  {
    id: "combo-selva-1",
    nombre: "Combo Selva 1",
    detalle: "2 panchos + 1 pack de gaseosa",
    precio: 18000,
  },
  {
    id: "combo-selva-2",
    nombre: "Combo Selva 2",
    detalle: "4 panchos + 2 packs de gaseosa",
    precio: 32000,
  },
  {
    id: "combo-selva-3",
    nombre: "Combo Selva 3",
    detalle: "6 panchos + snacks + 3 packs de gaseosa",
    precio: 49000,
  },
] as const

export type ComboId = (typeof COMBOS)[number]["id"]

export const COTILLON_EXTRAS = [
  { id: "guirnaldas", nombre: "Guirnaldas temáticas", precio: 9500 },
  { id: "globos", nombre: "Set de globos decorativos", precio: 12000 },
  { id: "velas", nombre: "Pack de velas y bengalitas", precio: 6500 },
  { id: "cotillon-personalizado", nombre: "Cotillón personalizado", precio: 18500 },
] as const

export type CotillonExtraId = (typeof COTILLON_EXTRAS)[number]["id"]

export interface BlockedSlot {
  date: string
  turno: TurnoId
}

export interface ReservationFormData {
  apellido: string
  nombre: string
  domicilio: string
  telefono: string
  email: string
  tipoEvento: EventType | ""
  nombreAgasajado: string
  cantidadPersonas: number
  comboId: ComboId | ""
  cotillonExtras: CotillonExtraId[]
  fecha: Date | null
  turno: TurnoId | null
}

export const DAYS = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"]

export const MONTHS = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
]

export function formatDateKey(date: Date): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, "0")
  const d = String(date.getDate()).padStart(2, "0")
  return `${y}-${m}-${d}`
}

export function formatDateDisplay(date: Date): string {
  return `${date.getDate()} de ${MONTHS[date.getMonth()]} de ${date.getFullYear()}`
}

export function getDayOfWeek(date: Date): string {
  const days = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"]
  return days[date.getDay()]
}

export function slotKey(date: Date, turno: TurnoId): string {
  return `${formatDateKey(date)}:${turno}`
}

export function createEmptyReservation(): ReservationFormData {
  return {
    apellido: "",
    nombre: "",
    domicilio: "",
    telefono: "",
    email: "",
    tipoEvento: "",
    nombreAgasajado: "",
    cantidadPersonas: 20,
    comboId: "",
    cotillonExtras: [],
    fecha: null,
    turno: null,
  }
}

export function formatArs(value: number): string {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(value)
}
