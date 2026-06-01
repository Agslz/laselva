"use client"

import { SectionBackground } from "@/components/section-background"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { venueImages } from "@/lib/venue-images"
import { AlertTriangle } from "lucide-react"
import { formatArs } from "@/lib/booking"

const DAMAGE_VALUES = [
  { item: "Mesa de pool (daño grave)", valor: 350000 },
  { item: "Paleta de ping pong", valor: 12000 },
  { item: "Taco de pool", valor: 40000 },
  { item: "Bola de pool", valor: 18000 },
  { item: "Metegol (rotura de barra/manija)", valor: 90000 },
  { item: "Mesa de tejo (daño estructural)", valor: 150000 },
]

export function DamageValues() {
  return (
    <SectionBackground id="roturas" image={venueImages.juegos} variant="sunset" imageOpacity={0.14}>
      <div className="text-center mb-14">
        <span className="badge-safari bg-destructive/15 text-destructive mb-4">
          <AlertTriangle className="h-4 w-4" />
          Valores por Roturas
        </span>
        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
          Cuidado de juegos y mobiliario
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          En caso de daños durante el evento, estos son valores de referencia para reposición.
          Se abonan al finalizar el cumpleaños.
        </p>
      </div>

      <Card className="card-jungle max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Listado de referencia</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {DAMAGE_VALUES.map((row) => (
            <div
              key={row.item}
              className="flex items-center justify-between gap-4 rounded-lg border border-border bg-card/70 px-4 py-3"
            >
              <span className="text-foreground font-medium">{row.item}</span>
              <span className="text-primary font-semibold">{formatArs(row.valor)}</span>
            </div>
          ))}
          <p className="text-xs text-muted-foreground mt-4">
            * Valores orientativos sujetos a actualización según costo de reposición.
          </p>
        </CardContent>
      </Card>
    </SectionBackground>
  )
}
