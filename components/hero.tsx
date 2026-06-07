import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ReserveButton } from "@/components/reserve-button"
import { assetPath } from "@/lib/asset-path"
import { venueImages } from "@/lib/venue-images"
import { MapPin, Clock, Leaf, Sparkles } from "lucide-react"

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={assetPath(venueImages.hero)}
          alt="Pelotero La Selva — temática Madagascar"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/75 via-emerald-950/45 to-emerald-950/70" />
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(ellipse_85%_70%_at_50%_45%,rgba(6,47,35,0.72)_0%,transparent_72%)]"
        />
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-emerald-950/85 to-transparent"
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-28 md:py-24 text-center">
        <div className="max-w-4xl mx-auto rounded-3xl border border-white/15 bg-emerald-950/55 px-5 py-8 shadow-2xl sm:px-10 sm:py-12">
          <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-secondary text-secondary-foreground rounded-full text-sm font-bold mb-6 shadow-lg motion-safe:animate-bounce">
            <Leaf className="h-4 w-4" />
            Temática Madagascar
          </span>

          <h1 className="hero-title text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight text-balance">
            La Selva
          </h1>

          <p className="hero-text text-xl md:text-2xl text-white font-medium mb-4 flex items-center justify-center gap-2">
            <Sparkles className="h-6 w-6 text-secondary drop-shadow-md" />
            Pelotero Infantil
          </p>

          <p className="hero-text text-lg md:text-xl text-white/95 mb-8 max-w-2xl mx-auto text-pretty">
            Un mundo de aventuras con decoración de selva y personajes de Madagascar.
            Inflables, juegos, fotocabina y mucho más para hasta 50 personas.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
            <ReserveButton
              size="lg"
              className="bg-secondary hover:bg-secondary/90 text-secondary-foreground text-lg px-8 py-6 rounded-full shadow-xl"
            >
              Reservar Ahora
            </ReserveButton>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 rounded-full border-2 border-white bg-black/35 text-white shadow-lg hover:bg-black/50 hover:text-white"
              asChild
            >
              <a href="#galeria">Ver Instalaciones</a>
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            <div className="hero-text flex items-center gap-2 rounded-full bg-black/35 px-4 py-2 text-white">
              <MapPin className="h-5 w-5 text-secondary shrink-0" />
              <span>Godoy Cruz, Mendoza</span>
            </div>
            <div className="hero-text flex items-center gap-2 rounded-full bg-black/35 px-4 py-2 text-white">
              <Clock className="h-5 w-5 text-secondary shrink-0" />
              <span>3 turnos diarios</span>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 motion-safe:animate-bounce hidden sm:block">
        <div className="w-6 h-10 border-2 border-white/80 rounded-full flex justify-center pt-2 shadow-lg bg-black/20">
          <div className="w-1.5 h-3 bg-white/80 rounded-full" />
        </div>
      </div>
    </section>
  )
}
