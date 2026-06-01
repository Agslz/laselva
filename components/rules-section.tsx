"use client"

import { SectionBackground } from "@/components/section-background"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { venueImages } from "@/lib/venue-images"
import { ShieldCheck } from "lucide-react"

const PAGE_ONE_RULES = [
  "Cantidad de personas contratadas y costo adicional por invitado.",
  "Se permite ingreso 15 minutos antes del evento. Exceder horario tiene costo adicional.",
  "Incluye inflable, plaza blanda, pool, castillo inflable, ping pong, metegol, tejo, baños, cocina completa, microondas, freezer, panchera, horno, ayudante y recepcionista.",
  "El locatario recibe el salón en perfecto estado y debe devolverlo en igual condición.",
  "Confirmación de invitados al menos 2 días antes. No se acepta bajar cantidad dentro de los 7 días previos.",
  "Cancelaciones o cambio de fecha con menos de 15 días hábiles: se cobra el total del anticipo.",
  "Prohibido ingresar o permanecer con alimentos/bebidas en la zona de juegos.",
]

const PAGE_TWO_RULES = [
  "En cocina se permite calentar alimentos, no cocinar.",
  "El salón no se responsabiliza por accidentes fuera del salón o en juegos.",
  "No se permite uso del inflable a niños mayores de 1,20 m.",
  "Prohibido fuego, confeti, papel picado, humo y espuma.",
  "Prohibido fumar dentro del salón.",
  "Prohibido ingresar tanques de gas.",
  "Respetar señalización, evacuación y normas de emergencia.",
  "El establecimiento no se responsabiliza por pérdidas/daños de vehículos estacionados.",
]

export function RulesSection() {
  return (
    <SectionBackground id="reglamento" image={venueImages.murales} variant="jungle" imageOpacity={0.12}>
      <div className="text-center mb-14">
        <span className="badge-safari bg-primary/15 text-primary mb-4">
          <ShieldCheck className="h-4 w-4" />
          Reglamento del Salón
        </span>
        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Condiciones de uso</h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Resumen del reglamento para garantizar seguridad, cuidado del espacio y buena convivencia durante el evento.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
        <Card className="card-jungle">
          <CardHeader>
            <CardTitle>Primera hoja (puntos 1 al 7)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {PAGE_ONE_RULES.map((rule, index) => (
              <p key={rule} className="text-sm text-foreground">
                <span className="font-semibold">{index + 1}) </span>
                {rule}
              </p>
            ))}
          </CardContent>
        </Card>

        <Card className="card-jungle">
          <CardHeader>
            <CardTitle>Segunda hoja (puntos 8 al 16)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {PAGE_TWO_RULES.map((rule, index) => (
              <p key={rule} className="text-sm text-foreground">
                <span className="font-semibold">{index + 8}) </span>
                {rule}
              </p>
            ))}
            <div className="mt-4 rounded-lg bg-accent/15 border border-accent/25 p-3">
              <p className="text-sm font-semibold text-foreground">
                Piñata y globos sin papel picado. Sin vidrio. Precios sujetos a modificaciones.
              </p>
            </div>
            <p className="text-base font-extrabold text-center text-fuchsia-700 underline pt-1">
              PROHIBIDO EL INGRESO DE BEBIDAS ALCOHÓLICAS.
            </p>
            <div className="rounded-lg bg-fuchsia-600 p-3 text-center">
              <p className="text-sm font-bold text-white">LEA EL CONTRATO Y TRÁIGALO EL DÍA DEL CUMPLEAÑOS</p>
            </div>
            <p className="text-sm font-bold text-center text-fuchsia-700">
              LA CASA SE RESERVA EL DERECHO DE ADMISIÓN Y PERMANENCIA EN EL ESTABLECIMIENTO.
            </p>
          </CardContent>
        </Card>
      </div>
    </SectionBackground>
  )
}
