import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ReserveButton } from "@/components/reserve-button"
import { SectionBackground } from "@/components/section-background"
import { venueImages } from "@/lib/venue-images"
import { Check, Star, Phone, Coins } from "lucide-react"

const plans = [
  {
    name: "Lunes a Jueves",
    subtitle: "Sin menú",
    price: "$200.000",
    popular: false,
    features: [
      "Turno de 3 horas",
      "2 mozas incluidas",
      "Servicio de Candy Bar SIN CARGO",
      "Todos los juegos habilitados",
      "Ideal para eventos entre semana",
    ],
    highlight: "Nueva Promoción",
  },
  {
    name: "Lunes a Jueves",
    subtitle: "Con menú incluido",
    price: "$280.000",
    popular: true,
    features: [
      "Turno de 3 horas",
      "2 mozas incluidas",
      "Menú completo incluido",
      "Todos los juegos habilitados",
      "Candy Bar incluido",
      "La mejor relación calidad-precio",
    ],
    highlight: "Recomendado",
  },
  {
    name: "Viernes a Domingo",
    subtitle: "Con menú incluido",
    price: "$300.000",
    popular: false,
    features: [
      "Turno de 3 horas",
      "2 mozas incluidas",
      "Menú completo incluido",
      "Todos los juegos habilitados",
      "Incluye feriados",
      "Perfecto para fines de semana",
    ],
    highlight: "Fines de semana",
  },
]

export function Pricing() {
  return (
    <SectionBackground id="precios" image={venueImages.juegos} variant="jungle" imageOpacity={0.16}>
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="badge-safari bg-secondary/30 text-secondary-foreground mb-4">
            <Coins className="h-4 w-4" />
            Valores Transparentes
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Nuestros Precios
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Elegí la opción que mejor se adapte a tus necesidades. Todos los turnos incluyen acceso completo a las instalaciones.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`relative overflow-hidden transition-all hover:shadow-xl card-jungle ${
                plan.popular 
                  ? "border-2 border-primary scale-105 shadow-lg ring-2 ring-primary/20" 
                  : ""
              }`}
            >
              {plan.highlight && (
                <div className={`absolute top-0 left-0 right-0 py-2 text-center text-sm font-semibold ${
                  plan.popular 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-accent text-accent-foreground"
                }`}>
                  {plan.popular && <Star className="inline h-4 w-4 mr-1" />}
                  {plan.highlight}
                </div>
              )}
              
              <CardHeader className={`text-center ${plan.highlight ? "pt-12" : "pt-8"}`}>
                <CardTitle className="text-xl font-bold text-foreground">
                  {plan.name}
                </CardTitle>
                <p className="text-muted-foreground">{plan.subtitle}</p>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                </div>
              </CardHeader>
              
              <CardContent className="pb-8">
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <ReserveButton 
                  className={`w-full rounded-full ${
                    plan.popular 
                      ? "bg-primary hover:bg-primary/90" 
                      : "bg-accent hover:bg-accent/90 text-accent-foreground"
                  }`}
                >
                  <Phone className="mr-2 h-4 w-4" />
                  Consultar
                </ReserveButton>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground text-sm">
            * Promociones no acumulables. Hora extra: $40.000. Adicional por persona: $3.600.
          </p>
        </div>
    </SectionBackground>
  )
}
