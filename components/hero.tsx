"use client"

import { Button } from "@/components/ui/button"
import { Phone, MapPin, Clock } from "lucide-react"

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/imagen-PfFvn4GGzzlAyAQnjzefZKEI3qnAFv.png')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-primary/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <span className="inline-block px-4 py-2 bg-accent text-accent-foreground rounded-full text-sm font-semibold mb-6 animate-bounce">
            Cumpleaños Inolvidables
          </span>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight text-balance">
            La Selva
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 font-medium mb-4">
            Pelotero Infantil
          </p>
          
          <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto text-pretty">
            El lugar ideal donde la diversión y la seguridad se unen para crear momentos mágicos. 
            Inflables, juegos, fotocabina y mucho más para hasta 50 personas.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8 py-6 rounded-full"
              asChild
            >
              <a href="https://wa.me/5492616817696" target="_blank" rel="noopener noreferrer">
                <Phone className="mr-2 h-5 w-5" />
                Reservar Ahora
              </a>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-8 py-6 rounded-full border-white bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm"
              asChild
            >
              <a href="#galeria">
                Ver Instalaciones
              </a>
            </Button>
          </div>

          {/* Quick Info */}
          <div className="flex flex-wrap justify-center gap-6 text-white/90">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-accent" />
              <span>Godoy Cruz, Mendoza</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-accent" />
              <span>Turnos de 3 horas</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-white/50 rounded-full" />
        </div>
      </div>
    </section>
  )
}
