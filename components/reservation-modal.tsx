"use client"

import { useState, useEffect, useRef } from "react"
import { Loader2, CheckCircle2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SlotCalendar } from "@/components/booking/slot-calendar"
import { useBlockedSlots } from "@/hooks/use-blocked-slots"
import { submitReservation } from "@/lib/reservations-api"
import { buildPrefilledForm, type ReservationPrefill } from "@/components/reservation-provider"
import {
  COMBOS,
  COTILLON_EXTRAS,
  EVENT_TYPES,
  TURNOS,
  formatArs,
  formatDateDisplay,
  formatDateKey,
  getDayOfWeek,
  type CotillonExtraId,
  type ReservationFormData,
  type TurnoId,
} from "@/lib/booking"

interface ReservationModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  prefill?: ReservationPrefill
}

export function ReservationModal({ open, onOpenChange, prefill }: ReservationModalProps) {
  const { isSlotBlocked, isDateFullyBlocked, isDatePartiallyBlocked } = useBlockedSlots(open)
  const [form, setForm] = useState<ReservationFormData>(() => buildPrefilledForm(prefill))
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [contractRead, setContractRead] = useState(false)
  const [acceptedContract, setAcceptedContract] = useState(false)
  const contractRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (open) {
      setForm(buildPrefilledForm(prefill))
      setStep(1)
      setSubmitted(false)
      setError(null)
      setContractRead(false)
      setAcceptedContract(false)
    }
  }, [open, prefill])

  const update = <K extends keyof ReservationFormData>(key: K, value: ReservationFormData[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const validateStep1 = () =>
    form.apellido.trim() &&
    form.nombre.trim() &&
    form.domicilio.trim() &&
    form.telefono.trim() &&
    form.email.trim() &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)

  const validateStep2 = () =>
    form.tipoEvento &&
    form.nombreAgasajado.trim() &&
    form.cantidadPersonas >= 10 &&
    form.comboId

  const validateStep3 = () => contractRead && acceptedContract

  const validateStep4 = () => {
    if (!form.fecha || !form.turno) return false
    return !isSlotBlocked(form.fecha, form.turno)
  }

  const handleSubmit = async () => {
    if (!validateStep4() || !form.fecha || !form.turno) return

    setSubmitting(true)
    setError(null)

    const turnoInfo = TURNOS.find((t) => t.id === form.turno)
    const comboSeleccionado = COMBOS.find((combo) => combo.id === form.comboId)
    const cotillonSeleccionado = COTILLON_EXTRAS.filter((extra) =>
      form.cotillonExtras.includes(extra.id)
    )
    const totalCotillon = cotillonSeleccionado.reduce((acc, extra) => acc + extra.precio, 0)
    const payload = {
      apellido: form.apellido.trim(),
      nombre: form.nombre.trim(),
      domicilio: form.domicilio.trim(),
      telefono: form.telefono.trim(),
      email: form.email.trim(),
      tipoEvento: form.tipoEvento,
      nombreAgasajado: form.nombreAgasajado.trim(),
      cantidadPersonas: form.cantidadPersonas,
      comboId: form.comboId,
      comboNombre: comboSeleccionado?.nombre ?? "",
      comboDetalle: comboSeleccionado?.detalle ?? "",
      comboPrecio: comboSeleccionado?.precio ?? 0,
      cotillonExtras: cotillonSeleccionado.map((item) => item.nombre),
      cotillonTotal: totalCotillon,
      presupuestoTotal: (comboSeleccionado?.precio ?? 0) + totalCotillon,
      fecha: formatDateKey(form.fecha),
      fechaLegible: `${getDayOfWeek(form.fecha)}, ${formatDateDisplay(form.fecha)}`,
      turno: form.turno,
      horario: turnoInfo?.horario ?? "",
    }

    try {
      await submitReservation(payload)
      setSubmitted(true)
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "No pudimos enviar la reserva. Intentá de nuevo o contactanos por teléfono."
      )
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md">
          <div className="flex flex-col items-center text-center py-4 gap-4">
            <CheckCircle2 className="h-14 w-14 text-primary" />
            <DialogHeader className="items-center">
              <DialogTitle>¡Solicitud enviada!</DialogTitle>
              <DialogDescription className="text-center">
                Recibimos tu pedido de reserva. Te contactaremos pronto para confirmar disponibilidad.
              </DialogDescription>
            </DialogHeader>
            <Button onClick={() => onOpenChange(false)} className="rounded-full w-full">
              Cerrar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto p-0 gap-0">
        <div className="p-6 pb-4 border-b bg-primary/5">
          <DialogHeader>
            <DialogTitle>Reservar turno</DialogTitle>
            <DialogDescription>
              Paso {step} de 4 — Datos, contratación, reglamento y reserva
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-2 mt-4">
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className={`h-1.5 flex-1 rounded-full transition-colors ${
                  s <= step ? "bg-primary" : "bg-muted"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="p-6 space-y-4">
          {step === 1 && (
            <>
              <p className="text-sm font-semibold text-foreground">Datos de quien reserva</p>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="nombre">Nombre</Label>
                  <Input
                    id="nombre"
                    value={form.nombre}
                    onChange={(e) => update("nombre", e.target.value)}
                    placeholder="María"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="apellido">Apellido</Label>
                  <Input
                    id="apellido"
                    value={form.apellido}
                    onChange={(e) => update("apellido", e.target.value)}
                    placeholder="González"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="domicilio">Domicilio</Label>
                <Input
                  id="domicilio"
                  value={form.domicilio}
                  onChange={(e) => update("domicilio", e.target.value)}
                  placeholder="Calle, número, ciudad"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="telefono">Teléfono</Label>
                  <Input
                    id="telefono"
                    type="tel"
                    value={form.telefono}
                    onChange={(e) => update("telefono", e.target.value)}
                    placeholder="261 000 0000"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    placeholder="correo@ejemplo.com"
                  />
                </div>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <p className="text-sm font-semibold text-foreground">Datos del evento</p>
              <div className="space-y-1.5">
                <Label htmlFor="tipoEvento">Tipo de evento</Label>
                <select
                  id="tipoEvento"
                  value={form.tipoEvento}
                  onChange={(e) => update("tipoEvento", e.target.value as ReservationFormData["tipoEvento"])}
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none"
                >
                  <option value="">Seleccioná una opción</option>
                  {EVENT_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="nombreAgasajado">Nombre del agasajado/a</Label>
                <Input
                  id="nombreAgasajado"
                  value={form.nombreAgasajado}
                  onChange={(e) => update("nombreAgasajado", e.target.value)}
                  placeholder="Nombre del cumpleañero/a"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="cantidad">Cantidad de personas (máx. 50)</Label>
                <Input
                  id="cantidad"
                  type="number"
                  min={10}
                  max={50}
                  value={form.cantidadPersonas}
                  onChange={(e) => update("cantidadPersonas", Number(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label>Elegí un combo (prueba)</Label>
                <div className="grid gap-2">
                  {COMBOS.map((combo) => (
                    <button
                      key={combo.id}
                      type="button"
                      onClick={() => update("comboId", combo.id)}
                      className={`rounded-xl border p-3 text-left transition-colors ${
                        form.comboId === combo.id
                          ? "border-primary bg-primary/10"
                          : "border-border hover:border-primary/40"
                      }`}
                    >
                      <p className="font-semibold text-foreground">{combo.nombre}</p>
                      <p className="text-sm text-muted-foreground">{combo.detalle}</p>
                      <p className="text-sm font-medium text-primary mt-1">{formatArs(combo.precio)}</p>
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label>Agregados de cotillón</Label>
                <div className="grid gap-2">
                  {COTILLON_EXTRAS.map((extra) => {
                    const checked = form.cotillonExtras.includes(extra.id)
                    return (
                      <label
                        key={extra.id}
                        className="flex items-center justify-between gap-3 rounded-lg border border-border p-3 cursor-pointer"
                      >
                        <div>
                          <p className="text-sm font-medium text-foreground">{extra.nombre}</p>
                          <p className="text-xs text-muted-foreground">{formatArs(extra.precio)}</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={(e) => {
                            const next = e.target.checked
                              ? [...form.cotillonExtras, extra.id]
                              : form.cotillonExtras.filter((id) => id !== extra.id)
                            update("cotillonExtras", next as CotillonExtraId[])
                          }}
                          className="h-4 w-4 accent-primary"
                        />
                      </label>
                    )
                  })}
                </div>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <p className="text-sm font-semibold text-foreground">
                Contratación y reglamento (lectura obligatoria)
              </p>
              <div
                ref={contractRef}
                onScroll={(e) => {
                  const el = e.currentTarget
                  if (el.scrollTop + el.clientHeight >= el.scrollHeight - 8) {
                    setContractRead(true)
                  }
                }}
                className="max-h-[320px] overflow-y-auto rounded-xl border border-border bg-muted/30 p-4 space-y-5"
              >
                <div className="space-y-2">
                  <h4 className="font-semibold text-foreground">Combos de prueba</h4>
                  {COMBOS.map((combo) => (
                    <div key={combo.id} className="rounded-lg border border-border bg-background p-3">
                      <p className="font-medium">{combo.nombre}</p>
                      <p className="text-sm text-muted-foreground">{combo.detalle}</p>
                      <p className="text-sm font-semibold text-primary">{formatArs(combo.precio)}</p>
                    </div>
                  ))}
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-foreground">Agregados de cotillón</h4>
                  {COTILLON_EXTRAS.map((extra) => (
                    <div key={extra.id} className="flex items-center justify-between rounded-lg border border-border bg-background p-3">
                      <p className="text-sm">{extra.nombre}</p>
                      <p className="text-sm font-semibold text-primary">{formatArs(extra.precio)}</p>
                    </div>
                  ))}
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-foreground">Valores de referencia por roturas</h4>
                  <ul className="text-sm text-foreground space-y-1">
                    <li>- Mesa de pool (daño grave): {formatArs(350000)}</li>
                    <li>- Paleta de ping pong: {formatArs(12000)}</li>
                    <li>- Taco de pool: {formatArs(40000)}</li>
                    <li>- Bola de pool: {formatArs(18000)}</li>
                    <li>- Metegol (barra/manija): {formatArs(90000)}</li>
                    <li>- Mesa de tejo (daño estructural): {formatArs(150000)}</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-foreground">Reglamento resumido</h4>
                  <ul className="text-sm text-foreground space-y-1">
                    <li>1) Se respeta la cantidad contratada; hay costo adicional por invitado.</li>
                    <li>2) Ingreso 15 min antes; exceder horario tiene recargo.</li>
                    <li>3) Incluye juegos, cocina y personal según contrato.</li>
                    <li>4) El salón debe devolverse en el mismo estado.</li>
                    <li>5) Confirmar invitados 2 días antes.</li>
                    <li>6) Cancelaciones con menos de 15 días hábiles pierden anticipo.</li>
                    <li>7) Prohibido alimentos/bebidas en zona de juegos.</li>
                    <li>8) En cocina solo se calienta, no se cocina.</li>
                    <li>9) El personal vigila juegos, no reemplaza cuidado parental.</li>
                    <li>10) Inflable: no apto para mayores de 1,20 m.</li>
                    <li>11) Prohibido fuego, confeti, papel picado, humo y espuma.</li>
                    <li>12) Prohibido fumar dentro del salón.</li>
                    <li>13) Prohibido ingresar tanques de gas.</li>
                    <li>14) Respetar señalización, evacuación y emergencias.</li>
                    <li>15) No hay responsabilidad por vehículos estacionados.</li>
                    <li>16) Piñata y globos sin papel picado; sin vidrio. Precios sujetos a cambios.</li>
                  </ul>
                  <p className="font-bold text-fuchsia-700 underline">
                    PROHIBIDO EL INGRESO DE BEBIDAS ALCOHÓLICAS.
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                <p className={`text-xs ${contractRead ? "text-primary" : "text-muted-foreground"}`}>
                  {contractRead
                    ? "Lectura completa detectada. Ya podés aceptar el reglamento."
                    : "Deslizá hasta el final del contrato para habilitar la aceptación."}
                </p>
                <label className="flex items-center gap-2 text-sm text-foreground">
                  <input
                    type="checkbox"
                    disabled={!contractRead}
                    checked={acceptedContract}
                    onChange={(e) => setAcceptedContract(e.target.checked)}
                    className="h-4 w-4 accent-primary"
                  />
                  Acepto el reglamento, condiciones de contratación y valores informados.
                </label>
              </div>
            </>
          )}

          {step === 4 && (
            <>
              <p className="text-sm font-semibold text-foreground">Fecha y turno</p>
              <SlotCalendar
                selectedDate={form.fecha}
                selectedTurno={form.turno}
                onDateSelect={(date) => update("fecha", date)}
                onTurnoSelect={(turno) => update("turno", turno as TurnoId | null)}
                isSlotBlocked={isSlotBlocked}
                isDateFullyBlocked={isDateFullyBlocked}
                isDatePartiallyBlocked={isDatePartiallyBlocked}
              />
              {form.fecha && form.turno && (
                <p className="text-sm text-muted-foreground bg-muted/50 rounded-lg p-3">
                  <span className="font-medium text-foreground">Resumen: </span>
                  {getDayOfWeek(form.fecha)}, {formatDateDisplay(form.fecha)} —{" "}
                  {TURNOS.find((t) => t.id === form.turno)?.label} (
                  {TURNOS.find((t) => t.id === form.turno)?.horario})
                </p>
              )}
            </>
          )}

          {error && (
            <p className="text-sm text-destructive bg-destructive/10 rounded-lg p-3">{error}</p>
          )}
        </div>

        <div className="p-6 pt-0 flex gap-3">
          {step > 1 && (
            <Button type="button" variant="outline" onClick={() => setStep((s) => (s - 1) as 1 | 2 | 3 | 4)} className="flex-1 rounded-full">
              Atrás
            </Button>
          )}
          {step < 4 ? (
            <Button
              type="button"
              onClick={() => {
                if (step === 1 && validateStep1()) setStep(2)
                else if (step === 2 && validateStep2()) setStep(3)
                else if (step === 3 && validateStep3()) setStep(4)
              }}
              disabled={
                step === 1
                  ? !validateStep1()
                  : step === 2
                    ? !validateStep2()
                    : !validateStep3()
              }
              className="flex-1 rounded-full"
            >
              Continuar
            </Button>
          ) : (
            <Button
              type="button"
              onClick={handleSubmit}
              disabled={!validateStep4() || submitting}
              className="flex-1 rounded-full"
            >
              {submitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Enviando...
                </>
              ) : (
                "Confirmar reserva"
              )}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
