"use client"

import { Button } from "@/components/ui/button"
import { ReserveButton } from "@/components/reserve-button"
import { venueImages } from "@/lib/venue-images"
import { MapPin, Clock, Leaf, Sparkles } from "lucide-react"

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
        style={{
          backgroundImage: `url('${venueImages.hero}')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/70 via-emerald-900/50 to-orange-600/60" />
        <div className="absolute inset-0 jungle-pattern opacity-20" />
      </div>

      <div
        aria-hidden
        className="absolute top-20 left-10 h-32 w-32 rounded-full bg-secondary/30 blur-3xl"
      />
      <div
        aria-hidden
        className="absolute bottom-32 right-16 h-40 w-40 rounded-full bg-accent/25 blur-3xl"
      />

      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-secondary text-secondary-foreground rounded-full text-sm font-bold mb-6 shadow-lg animate-bounce">
            <Leaf className="h-4 w-4" />
            Temática Madagascar
          </span>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight text-balance drop-shadow-lg">
            La Selva
          </h1>
          
          <p className="text-xl md:text-2xl text-white/95 font-medium mb-4 flex items-center justify-center gap-2">
            <Sparkles className="h-6 w-6 text-secondary" />
            Pelotero Infantil
          </p>
          
          <p className="text-lg md:text-xl text-white/85 mb-8 max-w-2xl mx-auto text-pretty">
            Un mundo de aventuras con decoración de selva y personajes de Madagascar. 
            Inflables, juegos, fotocabina y mucho más para hasta 50 personas.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <ReserveButton 
              size="lg" 
              className="bg-secondary hover:bg-secondary/90 text-secondary-foreground text-lg px-8 py-6 rounded-full shadow-xl"
            >
              Reservar Ahora
            </ReserveButton>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-8 py-6 rounded-full border-2 border-white bg-white/15 text-white hover:bg-white/25 backdrop-blur-sm"
              asChild
            >
              <a href="#galeria">
                Ver Instalaciones
              </a>
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-white/90">
            <div className="flex items-center gap-2 bg-black/20 backdrop-blur-sm rounded-full px-4 py-2">
              <MapPin className="h-5 w-5 text-secondary" />
              <span>Godoy Cruz, Mendoza</span>
            </div>
            <div className="flex items-center gap-2 bg-black/20 backdrop-blur-sm rounded-full px-4 py-2">
              <Clock className="h-5 w-5 text-secondary" />
              <span>3 turnos diarios</span>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/60 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-white/60 rounded-full" />
        </div>
      </div>
    </section>
  )
}
