import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  UtensilsCrossed, 
  GlassWater, 
  Candy, 
  Package,
  Sparkles,
  Phone
} from "lucide-react"

const menuItems = {
  comida: [
    "30 panchos",
    "6 pizzas",
    "4 docenas de empanadas",
    "2 kg de snacks surtidos",
  ],
  bebidas: [
    "6 gaseosas de 3 litros",
  ],
  dulces: [
    "30 bolsitas",
    "100 caramelos",
    "50 chupetines",
    "30 tutucas",
  ],
  descartables: [
    "50 platos",
    "50 vasos",
    "50 servilletas",
    "50 cucharas",
  ],
}

export function Promo() {
  return (
    <section id="promociones" className="py-20 bg-gradient-to-br from-primary/10 via-background to-accent/10">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-primary text-primary-foreground rounded-full text-sm font-semibold mb-4 animate-pulse">
            <Sparkles className="inline h-4 w-4 mr-1" />
            Promo Especial
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Promo Cumpleaños Todo Incluido
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Una propuesta ideal para que no falte absolutamente nada en el festejo. Todo pensado para que solo te preocupes por disfrutar.
          </p>
        </div>

        {/* Menu Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-12">
          <Card className="border-none bg-card hover:shadow-lg transition-all">
            <CardHeader className="pb-4">
              <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center mb-2">
                <UtensilsCrossed className="h-6 w-6 text-secondary-foreground" />
              </div>
              <CardTitle className="text-lg text-foreground">Comida y Snacks</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {menuItems.comida.map((item, index) => (
                  <li key={index} className="text-muted-foreground flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="border-none bg-card hover:shadow-lg transition-all">
            <CardHeader className="pb-4">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-2">
                <GlassWater className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-lg text-foreground">Bebidas</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {menuItems.bebidas.map((item, index) => (
                  <li key={index} className="text-muted-foreground flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="border-none bg-card hover:shadow-lg transition-all">
            <CardHeader className="pb-4">
              <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center mb-2">
                <Candy className="h-6 w-6 text-accent" />
              </div>
              <CardTitle className="text-lg text-foreground">Dulces y Sorpresas</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {menuItems.dulces.map((item, index) => (
                  <li key={index} className="text-muted-foreground flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="border-none bg-card hover:shadow-lg transition-all">
            <CardHeader className="pb-4">
              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-2">
                <Package className="h-6 w-6 text-muted-foreground" />
              </div>
              <CardTitle className="text-lg text-foreground">Descartables</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {menuItems.descartables.map((item, index) => (
                  <li key={index} className="text-muted-foreground flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground" />
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Flexible Note */}
        <div className="max-w-2xl mx-auto text-center bg-card rounded-2xl p-8 shadow-lg">
          <p className="text-lg text-foreground mb-6">
            <span className="font-semibold">La propuesta puede modificarse</span> o ajustarse según el presupuesto y las necesidades del cliente.
          </p>
          <Button 
            size="lg"
            className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-full"
            asChild
          >
            <a href="https://wa.me/5492616817696" target="_blank" rel="noopener noreferrer">
              <Phone className="mr-2 h-5 w-5" />
              Consultar Promo Completa
            </a>
          </Button>
        </div>

        {/* Bonus Section */}
        <div className="mt-16 max-w-4xl mx-auto">
          <Card className="border-2 border-dashed border-secondary bg-secondary/5">
            <CardContent className="p-8 text-center">
              <span className="inline-block px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm font-semibold mb-4">
                BONUS
              </span>
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Cotillón Manino justo al lado
              </h3>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                A solo unos pasos del pelotero se encuentra <strong>Cotillón Manino</strong>, un local excelente y muy surtido donde podés conseguir absolutamente todo lo necesario para que el cumple quede impecable: descartables, bandejas, platos, vasos, decoración temática, accesorios y mucho más.
              </p>
              <p className="text-foreground font-semibold mt-4">
                ¡Un complemento perfecto para armar un cumpleaños completo sin moverte del lugar!
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
