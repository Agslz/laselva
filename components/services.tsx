import { Card, CardContent } from "@/components/ui/card"
import { 
  Gamepad2, 
  Camera, 
  UtensilsCrossed, 
  Users, 
  Clock, 
  Sparkles,
  Dumbbell,
  Candy,
  Baby
} from "lucide-react"

const games = [
  { icon: Dumbbell, name: "Pool" },
  { icon: Gamepad2, name: "Metegol" },
  { icon: Sparkles, name: "Tejo" },
  { icon: Dumbbell, name: "Ping-pong" },
  { icon: Baby, name: "Inflable" },
  { icon: Sparkles, name: "Laberinto" },
  { icon: Baby, name: "Plaza Blanda" },
  { icon: Camera, name: "Fotocabina" },
  { icon: Gamepad2, name: "Videojuegos" },
  { icon: Candy, name: "Candy Bar" },
]

const amenities = [
  {
    icon: UtensilsCrossed,
    title: "Cocina Equipada",
    description: "Cocina completa con freezer para organizar tus alimentos y bebidas"
  },
  {
    icon: Users,
    title: "2 Mozas Incluidas",
    description: "Personal de servicio asignado durante todo el evento"
  },
  {
    icon: Clock,
    title: "Turnos de 3 Horas",
    description: "Con opción de sumar tiempo adicional por $40.000/hora"
  },
  {
    icon: Sparkles,
    title: "Hasta 50 Personas",
    description: "Espacio amplio y equipado para todos tus invitados"
  },
]

export function Services() {
  return (
    <section id="servicios" className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
            Todo Incluido
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Todo lo que ofrece el salón
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Un espacio pensado para que tanto los niños como los adultos disfruten de un evento completo, seguro y lleno de diversión.
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
              <Card key={index} className="group hover:shadow-lg transition-all hover:-translate-y-1 border-none bg-card">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
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
              <Card key={index} className="border-none bg-card hover:shadow-lg transition-all">
                <CardContent className="p-6">
                  <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mb-4">
                    <amenity.icon className="h-7 w-7 text-accent" />
                  </div>
                  <h4 className="text-lg font-bold text-foreground mb-2">{amenity.title}</h4>
                  <p className="text-muted-foreground">{amenity.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center p-6 bg-secondary/20 rounded-2xl">
          <p className="text-foreground">
            <span className="font-semibold">Adicional por persona:</span> $3.600 por persona extra
          </p>
        </div>
      </div>
    </section>
  )
}
