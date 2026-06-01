"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  DAYS,
  MONTHS,
  TURNOS,
  type TurnoId,
} from "@/lib/booking"

interface SlotCalendarProps {
  selectedDate: Date | null
  selectedTurno: TurnoId | null
  onDateSelect: (date: Date) => void
  onTurnoSelect: (turno: TurnoId | null) => void
  isSlotBlocked: (date: Date, turno: TurnoId) => boolean
  isDateFullyBlocked: (date: Date) => boolean
  isDatePartiallyBlocked: (date: Date) => boolean
}

export function SlotCalendar({
  selectedDate,
  selectedTurno,
  onDateSelect,
  onTurnoSelect,
  isSlotBlocked,
  isDateFullyBlocked,
  isDatePartiallyBlocked,
}: SlotCalendarProps) {
  const today = new Date()
  const [displayMonth, setDisplayMonth] = useState(today.getMonth())
  const [displayYear, setDisplayYear] = useState(today.getFullYear())

  const getDaysInMonth = (m: number, y: number) => new Date(y, m + 1, 0).getDate()
  const getFirstDayOfMonth = (m: number, y: number) => new Date(y, m, 1).getDay()

  const goToPreviousMonth = () => {
    if (displayMonth === 0) {
      setDisplayMonth(11)
      setDisplayYear(displayYear - 1)
    } else {
      setDisplayMonth(displayMonth - 1)
    }
  }

  const goToNextMonth = () => {
    if (displayMonth === 11) {
      setDisplayMonth(0)
      setDisplayYear(displayYear + 1)
    } else {
      setDisplayMonth(displayMonth + 1)
    }
  }

  const isPastDate = (day: number) => {
    const date = new Date(displayYear, displayMonth, day)
    const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate())
    return date < todayDate
  }

  const handleDateSelect = (day: number) => {
    const date = new Date(displayYear, displayMonth, day)
    if (!isPastDate(day) && !isDateFullyBlocked(date)) {
      onDateSelect(date)
      if (selectedTurno && isSlotBlocked(date, selectedTurno)) {
        onTurnoSelect(null)
      }
    }
  }

  const daysInMonth = getDaysInMonth(displayMonth, displayYear)
  const firstDay = getFirstDayOfMonth(displayMonth, displayYear)
  const emptyDays = Array(firstDay).fill(null)
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)

  const canGoToPreviousMonth =
    displayYear > today.getFullYear() ||
    (displayYear === today.getFullYear() && displayMonth > today.getMonth())

  return (
    <div className="space-y-4">
      <div className="rounded-xl border bg-card/80 p-4">
        <div className="flex items-center justify-between mb-3">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={goToPreviousMonth}
            disabled={!canGoToPreviousMonth}
            className="h-8 w-8"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="font-bold text-foreground text-sm">
            {MONTHS[displayMonth]} {displayYear}
          </span>
          <Button type="button" variant="ghost" size="icon" onClick={goToNextMonth} className="h-8 w-8">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-7 gap-1 mb-1">
          {DAYS.map((day) => (
            <div key={day} className="text-center text-xs font-medium text-muted-foreground py-1">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {emptyDays.map((_, index) => (
            <div key={`empty-${index}`} className="aspect-square" />
          ))}
          {days.map((day) => {
            const date = new Date(displayYear, displayMonth, day)
            const past = isPastDate(day)
            const fullyBlocked = isDateFullyBlocked(date)
            const partial = isDatePartiallyBlocked(date)
            const disabled = past || fullyBlocked
            const isSelected =
              selectedDate?.getDate() === day &&
              selectedDate?.getMonth() === displayMonth &&
              selectedDate?.getFullYear() === displayYear
            const isToday =
              day === today.getDate() &&
              displayMonth === today.getMonth() &&
              displayYear === today.getFullYear()

            return (
              <button
                key={day}
                type="button"
                onClick={() => handleDateSelect(day)}
                disabled={disabled}
                className={cn(
                  "aspect-square flex flex-col items-center justify-center rounded-lg text-xs font-medium transition-all relative",
                  disabled && "text-muted-foreground/40 cursor-not-allowed",
                  !disabled && "hover:bg-primary/10 cursor-pointer",
                  isSelected && "bg-primary text-primary-foreground hover:bg-primary",
                  isToday && !isSelected && "ring-2 ring-primary ring-offset-1",
                  partial && !isSelected && !disabled && "bg-orange-100 text-orange-800",
                  fullyBlocked && "bg-muted line-through"
                )}
              >
                {day}
                {partial && !isSelected && !disabled && (
                  <span className="absolute bottom-0.5 h-1 w-1 rounded-full bg-orange-500" />
                )}
              </button>
            )
          })}
        </div>

        <div className="flex flex-wrap gap-3 mt-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-orange-500" /> Turno parcial
          </span>
          <span className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-muted-foreground/30" /> Completo
          </span>
        </div>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-2">
          <Clock className="h-4 w-4 text-primary" />
          <span className="text-sm font-semibold text-foreground">Turno</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {TURNOS.map((turno) => {
            const blocked = selectedDate ? isSlotBlocked(selectedDate, turno.id) : false
            const isSelected = selectedTurno === turno.id

            return (
              <button
                key={turno.id}
                type="button"
                disabled={!selectedDate || blocked}
                onClick={() => onTurnoSelect(turno.id)}
                className={cn(
                  "p-3 rounded-xl border-2 transition-all text-left text-sm",
                  blocked && "opacity-40 cursor-not-allowed border-border bg-muted",
                  !blocked && isSelected && "border-primary bg-primary/10",
                  !blocked && !isSelected && "border-border hover:border-primary/50"
                )}
              >
                <p className="font-bold text-foreground">{turno.label}</p>
                <p className="text-xs text-muted-foreground">{turno.horario}</p>
                {blocked && (
                  <p className="text-xs text-destructive mt-1">No disponible</p>
                )}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
