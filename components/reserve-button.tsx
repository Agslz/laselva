"use client"

import { type ComponentProps } from "react"
import { Button } from "@/components/ui/button"
import { useReservation, type ReservationPrefill } from "@/components/reservation-provider"
import { cn } from "@/lib/utils"

interface ReserveButtonProps extends ComponentProps<typeof Button> {
  prefill?: ReservationPrefill
}

export function ReserveButton({ prefill, onClick, className, children, ...props }: ReserveButtonProps) {
  const { openReservation } = useReservation()

  return (
    <Button
      type="button"
      className={cn(
        "bg-secondary hover:bg-secondary/90 text-secondary-foreground rounded-full",
        className
      )}
      onClick={(e) => {
        openReservation(prefill)
        onClick?.(e)
      }}
      {...props}
    >
      {children}
    </Button>
  )
}
