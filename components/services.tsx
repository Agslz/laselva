import { Card, CardContent } from "@/components/ui/card"
import { SectionBackground } from "@/components/section-background"
import { venueImages } from "@/lib/venue-images"
import { TURNOS } from "@/lib/booking"
import { 
  Gamepad2, 
  Camera, 
  UtensilsCrossed, 
  Users, 
  Clock, 
  Sparkles,
  Dumbbell,
  Candy,
  Baby,
  Leaf,
} from "lucide-react"

const games = [
  { icon: Dumbbell, name: "Pool", color: "bg-emerald-500/15 text-emerald-700" },
  { icon: Gamepad2, name: "Metegol", color: "bg-orange-500/15 text-orange-700" },
  { icon: Sparkles, name: "Tejo", color: "bg-sky-500/15 text-sky-700" },
  { icon: Dumbbell, name: "Ping-pong", color: "bg-lime-500/15 text-lime-700" },
  { icon: Baby, name: "Inflable", color: "bg-pink-500/15 text-pink-700" },
  { icon: Sparkles, name: "Laberinto", color: "bg-amber-500/15 text-amber-700" },
  { icon: Baby, name: "Plaza Blanda", color: "bg-violet-500/15 text-violet-700" },
  { icon: Camera, name: "Fotocabina", color: "bg-rose-500/15 text-rose-700" },
  { icon: Gamepad2, name: "Videojuegos", color: "bg-cyan-500/15 text-cyan-700" },
  { icon: Candy, name: "Candy Bar", color: "bg-fuchsia-500/15 text-fuchsia-700" },
]

const amenities = [
  {
    icon: UtensilsCrossed,
    title: "Cocina Equipada",
    description: "Cocina completa con freezer para organizar tus alimentos y bebidas",
    color: "bg-orange-500/15 text-orange-600",
  },
  {
    icon: Users,
    title: "2 Mozas Incluidas",
    description: "Personal de servicio asignado durante todo el evento",
    color: "bg-emerald-500/15 text-emerald-600",
  },
  {
    icon: Clock,
    title: "Turnos de 3 Horas",
    description: "Tres horarios diarios. Hora extra: $40.000",
    color: "bg-sky-500/15 text-sky-600",
  },
  {
    icon: Sparkles,
    title: "Hasta 50 Personas",
    description: "Espacio amplio y equipado para todos tus invitados",
    color: "bg-amber-500/15 text-amber-600",
  },
]

export function Services() {
  return (
    <SectionBackground id="servicios" image={venueImages.salon} variant="jungle" imageOpacity={0.22}>
      {/* Section Header */}
      <div className="text-center mb-16">
        <span className="badge-safari bg-secondary/25 text-secondary-foreground mb-4">
          <Leaf className="h-4 w-4" />
          Temática Madagascar
        </span>
        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
          Todo lo que ofrece el salón
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Un espacio decorado con personajes de Madagascar, pensado para que niños y adultos disfruten de un evento completo, seguro y lleno de diversión.
        </p>
      </div>

      {/* Games Grid */}
      <div className="mb-16">
        <h3 className="text-2xl font-bold text-foreground mb-8 text-center flex items-center justify-center gap-2">
          <Gamepad2 className="h-6 w-6 text-accent" />
          Juegos y Entretenimiento
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {games.map((game, index) => (
            <Card key={index} className="group card-jungle hover:shadow-xl transition-all hover:-translate-y-1">
              <CardContent className="p-6 text-center">
                <div className={`w-12 h-12 mx-auto mb-3 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 ${game.color}`}>
                  <game.icon className="h-6 w-6" />
                </div>
                <p className="font-semibold text-foreground">{game.name}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <p className="text-center text-muted-foreground mt-6">
          Todos los juegos habilitados durante el evento para diversión de todas las edades.
        </p>
      </div>

      {/* Amenities */}
      <div>
        <h3 className="text-2xl font-bold text-foreground mb-8 text-center flex items-center justify-center gap-2">
          <Sparkles className="h-6 w-6 text-accent" />
          Comodidades del Espacio
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {amenities.map((amenity, index) => (
            <Card key={index} className="card-jungle hover:shadow-xl transition-all hover:-translate-y-0.5">
              <CardContent className="p-6">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 ${amenity.color}`}>
                  <amenity.icon className="h-7 w-7" />
                </div>
                <h4 className="text-lg font-bold text-foreground mb-2">{amenity.title}</h4>
                <p className="text-muted-foreground">{amenity.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div id="reservar" className="mt-16 max-w-3xl mx-auto">
        <h3 className="text-2xl font-bold text-foreground mb-6 text-center flex items-center justify-center gap-2">
          <Clock className="h-6 w-6 text-primary" />
          Horarios de eventos
        </h3>
        <div className="grid sm:grid-cols-3 gap-4">
          {TURNOS.map((turno) => (
            <Card key={turno.id} className="card-jungle text-center">
              <CardContent className="p-5">
                <p className="font-bold text-foreground text-lg">{turno.label}</p>
                <p className="text-primary font-semibold mt-1">{turno.horario}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <p className="text-center text-muted-foreground text-sm mt-4">
          Reservá tu fecha desde el botón &quot;Reservar&quot; en cualquier sección del sitio.
        </p>
      </div>
    </SectionBackground>
  )
}
