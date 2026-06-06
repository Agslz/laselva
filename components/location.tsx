import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ReserveButton } from "@/components/reserve-button"
import { SectionBackground } from "@/components/section-background"
import { UBICACION_CHARACTERS } from "@/lib/madagascar-characters"
import { MapPin, Clock, Phone, MapPinned } from "lucide-react"

const schedules = [
  { day: "Lunes a Sábado", morning: "9:30 a 14:00 hs", afternoon: "18:00 a 21:30 hs" },
  { day: "Domingo", morning: "10:30 a 14:00 hs", afternoon: "-" },
]

export function Location() {
  return (
    <SectionBackground id="ubicacion" variant="playful" characters={UBICACION_CHARACTERS}>
        <div className="text-center mb-16">
          <span className="badge-safari bg-primary/15 text-primary mb-4">
            <MapPinned className="h-4 w-4" />
            Visitanos
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Ubicación y Contacto
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Estamos en Godoy Cruz, Mendoza. Vení a conocer nuestro salón con temática Madagascar y descubrí por qué somos una de las opciones favoritas para cumpleaños infantiles.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <div className="rounded-2xl overflow-hidden shadow-xl ring-2 ring-primary/15 h-[400px] lg:h-full min-h-[400px]">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4042.388931066086!2d-68.86186262354103!3d-32.92369477073112!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x967e097e4d2e4915%3A0x7a07b4a48b7c70b3!2sPelotero%20la%20selva!5e1!3m2!1ses-419!2sar!4v1778335069244!5m2!1ses-419!2sar" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación de La Selva Pelotero Infantil"
            />
          </div>

          <div className="space-y-6">
            <Card className="card-jungle">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/15 flex items-center justify-center shrink-0">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground text-lg mb-1">Dirección</h3>
                    <p className="text-muted-foreground">
                      Godoy Cruz, Mendoza, Argentina
                    </p>
                    <Button 
                      variant="link" 
                      className="p-0 h-auto text-primary"
                      asChild
                    >
                      <a 
                        href="https://www.google.com/maps/place/Pelotero+la+selva" 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        Ver en Google Maps
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-jungle">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-secondary/25 flex items-center justify-center shrink-0">
                    <Clock className="h-6 w-6 text-secondary-foreground" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-foreground text-lg mb-3">Horarios de Atención</h3>
                    <div className="space-y-2">
                      {schedules.map((schedule, index) => (
                        <div key={index} className="flex flex-wrap justify-between text-sm">
                          <span className="font-medium text-foreground">{schedule.day}</span>
                          <span className="text-muted-foreground">
                            {schedule.morning} {schedule.afternoon !== "-" && `y ${schedule.afternoon}`}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg"
                className="flex-1 bg-primary hover:bg-primary/90 rounded-full py-6 text-base sm:text-lg shadow-md"
                asChild
              >
                <a href="tel:+5492613455391">
                  <Phone className="mr-2 h-5 w-5" />
                  Llamar Ahora
                </a>
              </Button>
            </div>

            <div className="bg-gradient-to-r from-primary via-emerald-600 to-secondary rounded-2xl p-8 text-white text-center shadow-xl">
              <h3 className="text-2xl font-bold mb-2">¿Listo para reservar?</h3>
              <p className="text-white/90 mb-4">
                Animate a festejar distinto en un salón lleno de color y diversión.
              </p>
              <ReserveButton 
                size="lg" 
                variant="secondary"
                className="rounded-full shadow-md"
              >
                Reservar Mi Fecha
              </ReserveButton>
            </div>
          </div>
        </div>
    </SectionBackground>
  )
}
