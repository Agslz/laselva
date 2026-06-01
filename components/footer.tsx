import { MapPin, Clock } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold mb-4">La Selva</h3>
            <p className="text-background/70 mb-4">
              Pelotero Infantil - El lugar ideal para cumpleaños inolvidables en Godoy Cruz, Mendoza.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <a href="#servicios" className="text-background/70 hover:text-background transition-colors">
                  Servicios
                </a>
              </li>
              <li>
                <a href="#galeria" className="text-background/70 hover:text-background transition-colors">
                  Galería
                </a>
              </li>
              <li>
                <a href="#precios" className="text-background/70 hover:text-background transition-colors">
                  Precios
                </a>
              </li>
              <li>
                <a href="#promociones" className="text-background/70 hover:text-background transition-colors">
                  Promociones
                </a>
              </li>
              <li>
                <a href="#ubicacion" className="text-background/70 hover:text-background transition-colors">
                  Ubicación
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-4">Contacto</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-background/70">
                <MapPin className="h-5 w-5" />
                <span>Godoy Cruz, Mendoza</span>
              </li>
              <li className="flex items-center gap-3 text-background/70">
                <Clock className="h-5 w-5" />
                <span>Lun-Sáb: 9:30-14:00 y 18:00-21:30</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-background/20 pt-8 text-center">
          <p className="text-background/60 text-sm">
            © {new Date().getFullYear()} La Selva Pelotero Infantil. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
