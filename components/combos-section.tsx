"use client"

import { SectionBackground } from "@/components/section-background"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { COMBOS, COTILLON_EXTRAS, formatArs } from "@/lib/booking"
import { venueImages } from "@/lib/venue-images"
import { PartyPopper, Gift } from "lucide-react"

export function CombosSection() {
  return (
    <SectionBackground id="combos" image={venueImages.candyBar} variant="playful" imageOpacity={0.18}>
      <div className="text-center mb-14">
        <span className="badge-safari bg-primary/15 text-primary mb-4">
          <PartyPopper className="h-4 w-4" />
          Combos y Agregados
        </span>
        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Armá tu combo</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Podés elegir un combo base y sumarle cotillón para personalizar el festejo.
          Los valores son de referencia y pueden ajustarse.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
        <div>
          <h3 className="text-2xl font-bold text-foreground mb-4">Combos de prueba</h3>
          <div className="space-y-4">
            {COMBOS.map((combo) => (
              <Card key={combo.id} className="card-jungle">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl">{combo.nombre}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{combo.detalle}</p>
                  <p className="text-primary font-bold mt-2">{formatArs(combo.precio)}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-bold text-foreground mb-4">Agregados de cotillón</h3>
          <div className="space-y-4">
            {COTILLON_EXTRAS.map((extra) => (
              <Card key={extra.id} className="card-jungle">
                <CardContent className="py-5 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <Gift className="h-5 w-5 text-accent" />
                    <p className="font-medium text-foreground">{extra.nombre}</p>
                  </div>
                  <p className="text-primary font-semibold">{formatArs(extra.precio)}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </SectionBackground>
  )
}
