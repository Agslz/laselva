"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, CalendarDays, Clock, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const WHATSAPP_NUMBER = "5492613455391"

const DAYS = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"]
const MONTHS = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
]

const TURNOS = [
  { id: "tarde", label: "Tarde", horario: "15:00 - 18:00" },
  { id: "noche", label: "Noche", horario: "19:00 - 22:00" },
]

export function BookingCalendar() {
  const today = new Date()
  const [currentMonth, setCurrentMonth] = useState(today.getMonth())
  const [currentYear, setCurrentYear] = useState(today.getFullYear())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTurno, setSelectedTurno] = useState<string | null>(null)
  const [cantidadPersonas, setCantidadPersonas] = useState<number>(20)

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay()
  }

  const goToPreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11)
      setCurrentYear(currentYear - 1)
    } else {
      setCurrentMonth(currentMonth - 1)
    }
  }

  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0)
      setCurrentYear(currentYear + 1)
    } else {
      setCurrentMonth(currentMonth + 1)
    }
  }

  const isDateDisabled = (day: number) => {
    const date = new Date(currentYear, currentMonth, day)
    const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate())
    return date < todayDate
  }

  const handleDateSelect = (day: number) => {
    if (!isDateDisabled(day)) {
      setSelectedDate(new Date(currentYear, currentMonth, day))
    }
  }

  const formatDate = (date: Date) => {
    return `${date.getDate()} de ${MONTHS[date.getMonth()]} de ${date.getFullYear()}`
  }

  const getDayOfWeek = (date: Date) => {
    const days = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"]
    return days[date.getDay()]
  }

  const handleReservar = () => {
    if (!selectedDate || !selectedTurno) return

    const turnoInfo = TURNOS.find(t => t.id === selectedTurno)
    const dayOfWeek = getDayOfWeek(selectedDate)
    const formattedDate = formatDate(selectedDate)
    
    const message = encodeURIComponent(
      `Hola! Me comunico desde la web de La Selva Pelotero.\n\n` +
      `Quiero consultar disponibilidad para reservar:\n\n` +
      `Fecha: ${dayOfWeek} ${formattedDate}\n` +
      `Turno: ${turnoInfo?.label} (${turnoInfo?.horario})\n` +
      `Cantidad de personas: ${cantidadPersonas}\n\n` +
      `Aguardo su respuesta. Gracias!`
    )
    
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank")
  }

  const daysInMonth = getDaysInMonth(currentMonth, currentYear)
  const firstDay = getFirstDayOfMonth(currentMonth, currentYear)
  const emptyDays = Array(firstDay).fill(null)
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)

  const canGoToPreviousMonth = () => {
    return currentYear > today.getFullYear() || 
           (currentYear === today.getFullYear() && currentMonth > today.getMonth())
  }

  return (
    <section id="reservar" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
            Reserva Tu Fecha
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Agenda Tu Evento
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Selecciona la fecha y el turno que prefieras. Te contactaremos por WhatsApp para confirmar la disponibilidad.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Calendar */}
            <Card className="border-2 border-border">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={goToPreviousMonth}
                    disabled={!canGoToPreviousMonth()}
                    className="hover:bg-primary/10"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </Button>
                  <CardTitle className="text-xl font-bold text-foreground">
                    {MONTHS[currentMonth]} {currentYear}
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={goToNextMonth}
                    className="hover:bg-primary/10"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {/* Days header */}
                <div className="grid grid-cols-7 gap-1 mb-2">
                  {DAYS.map((day) => (
                    <div key={day} className="text-center text-sm font-medium text-muted-foreground py-2">
                      {day}
                    </div>
                  ))}
                </div>
                
                {/* Calendar grid */}
                <div className="grid grid-cols-7 gap-1">
                  {emptyDays.map((_, index) => (
                    <div key={`empty-${index}`} className="aspect-square" />
                  ))}
                  {days.map((day) => {
                    const isDisabled = isDateDisabled(day)
                    const isSelected = selectedDate?.getDate() === day && 
                                       selectedDate?.getMonth() === currentMonth &&
                                       selectedDate?.getFullYear() === currentYear
                    const isToday = day === today.getDate() && 
                                    currentMonth === today.getMonth() && 
                                    currentYear === today.getFullYear()
                    
                    return (
                      <button
                        key={day}
                        onClick={() => handleDateSelect(day)}
                        disabled={isDisabled}
                        className={`
                          aspect-square flex items-center justify-center rounded-lg text-sm font-medium transition-all
                          ${isDisabled 
                            ? "text-muted-foreground/40 cursor-not-allowed" 
                            : "hover:bg-primary/10 cursor-pointer"
                          }
                          ${isSelected 
                            ? "bg-primary text-primary-foreground hover:bg-primary" 
                            : ""
                          }
                          ${isToday && !isSelected 
                            ? "ring-2 ring-primary ring-offset-2" 
                            : ""
                          }
                        `}
                      >
                        {day}
                      </button>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Booking Details */}
            <div className="space-y-6">
              {/* Selected Date Display */}
              <Card className={`border-2 transition-colors ${selectedDate ? "border-primary bg-primary/5" : "border-border"}`}>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-2">
                    <CalendarDays className="h-5 w-5 text-primary" />
                    <span className="font-semibold text-foreground">Fecha seleccionada</span>
                  </div>
                  {selectedDate ? (
                    <p className="text-lg font-bold text-foreground ml-8">
                      {getDayOfWeek(selectedDate)}, {formatDate(selectedDate)}
                    </p>
                  ) : (
                    <p className="text-muted-foreground ml-8">Selecciona una fecha en el calendario</p>
                  )}
                </CardContent>
              </Card>

              {/* Turno Selection */}
              <Card className="border-2 border-border">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Clock className="h-5 w-5 text-primary" />
                    <span className="font-semibold text-foreground">Selecciona el turno</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {TURNOS.map((turno) => (
                      <button
                        key={turno.id}
                        onClick={() => setSelectedTurno(turno.id)}
                        className={`
                          p-4 rounded-xl border-2 transition-all text-left
                          ${selectedTurno === turno.id 
                            ? "border-primary bg-primary/10" 
                            : "border-border hover:border-primary/50"
                          }
                        `}
                      >
                        <p className="font-bold text-foreground">{turno.label}</p>
                        <p className="text-sm text-muted-foreground">{turno.horario}</p>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Cantidad de personas */}
              <Card className="border-2 border-border">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Users className="h-5 w-5 text-primary" />
                    <span className="font-semibold text-foreground">Cantidad de personas</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setCantidadPersonas(Math.max(10, cantidadPersonas - 5))}
                      className="h-10 w-10"
                    >
                      -
                    </Button>
                    <span className="text-2xl font-bold text-foreground min-w-[60px] text-center">
                      {cantidadPersonas}
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setCantidadPersonas(Math.min(50, cantidadPersonas + 5))}
                      className="h-10 w-10"
                    >
                      +
                    </Button>
                    <span className="text-sm text-muted-foreground">personas (max. 50)</span>
                  </div>
                </CardContent>
              </Card>

              {/* Reservar Button */}
              <Button
                onClick={handleReservar}
                disabled={!selectedDate || !selectedTurno}
                className="w-full h-14 text-lg font-bold bg-[#25D366] hover:bg-[#20BD5A] text-white disabled:opacity-50"
              >
                Reservar por WhatsApp
              </Button>
              <p className="text-center text-sm text-muted-foreground">
                Al hacer clic, se abrira WhatsApp con los datos de tu reserva
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
