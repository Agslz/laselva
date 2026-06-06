import { Trees } from "lucide-react"
import { SectionBackground } from "@/components/section-background"
import { GALERIA_CHARACTERS } from "@/lib/madagascar-characters"
import { GalleryGrid } from "@/components/gallery/gallery-grid"

export function Gallery() {
  return (
    <SectionBackground id="galeria" variant="playful" characters={GALERIA_CHARACTERS}>
      <div className="text-center mb-16">
        <span className="badge-safari bg-accent/20 text-accent mb-4">
          <Trees className="h-4 w-4" />
          Conocé el Espacio
        </span>
        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
          Nuestras Instalaciones
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Murales, inflables y decoración de selva con personajes de Madagascar. Descubrí todo lo que La Selva tiene preparado para que tu evento sea inolvidable.
        </p>
      </div>

      <GalleryGrid />
    </SectionBackground>
  )
}
