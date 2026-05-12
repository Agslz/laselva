"use client"

import { useState } from "react"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const images = [
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/imagen-HozDhyqaJjKeEav5xBu4JWnHMJs6lH.png",
    alt: "Salón principal con mesas y decoración de selva",
    category: "Salón"
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/imagen-zELlAPUlOFkfikRv8lcvKe68aNchAd.png",
    alt: "Zona de juegos con metegol, ping-pong y tejo",
    category: "Juegos"
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/imagen-Png3lETOJYzEwE1KWH9w1ZtFnLuMwR.png",
    alt: "Laberinto y estructura de juegos con inflable",
    category: "Juegos"
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/imagen-RBsHaZXI4L8u3aLDSQxvkvVr0eTQSV.png",
    alt: "Vista del laberinto, inflable y mesa de pool",
    category: "Juegos"
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/imagen-AyoId21M4qwZWjFJlHMhUnNeK0FIHu.png",
    alt: "Inflable grande colorido",
    category: "Inflables"
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/imagen-I9wDTaWKMAFgFeP4mUFoel8HHc011w.png",
    alt: "Plaza blanda con toboganes y juegos para niños pequeños",
    category: "Niños"
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/imagen-MQlIWMT7jAwwVfRbhu6ETJyfgOkgiY.png",
    alt: "Zona de videojuegos arcade y fotocabina",
    category: "Entretenimiento"
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/imagen-96zufCqVYfTQBGO6ikQpbRLbSsfRTn.png",
    alt: "Área de Candy Bar con muebles decorativos",
    category: "Candy Bar"
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/imagen-yUwHuR41CPxN0rwbc6KC5BjzYhkzsR.png",
    alt: "Instalaciones con freezer y murales decorativos",
    category: "Instalaciones"
  },
]

export function Gallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  const openLightbox = (index: number) => setSelectedImage(index)
  const closeLightbox = () => setSelectedImage(null)
  
  const goToPrevious = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? images.length - 1 : selectedImage - 1)
    }
  }
  
  const goToNext = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === images.length - 1 ? 0 : selectedImage + 1)
    }
  }

  return (
    <section id="galeria" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-semibold mb-4">
            Conocé el Espacio
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Nuestras Instalaciones
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Descubrí todo lo que La Selva tiene preparado para que tu evento sea inolvidable.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {images.map((image, index) => (
            <div 
              key={index}
              className={`relative overflow-hidden rounded-xl cursor-pointer group ${
                index === 0 ? "sm:col-span-2 sm:row-span-2 md:col-span-2 md:row-span-2" : ""
              }`}
              onClick={() => openLightbox(index)}
            >
              <div className={`relative ${index === 0 ? "aspect-video sm:aspect-square" : "aspect-video sm:aspect-square"}`}>
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes={index === 0 ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 50vw, 33vw"}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="inline-block px-3 py-1 bg-white/90 text-foreground text-sm font-medium rounded-full">
                    {image.category}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox */}
        {selectedImage !== null && (
          <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 text-white hover:bg-white/10"
              onClick={closeLightbox}
            >
              <X className="h-6 w-6" />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 text-white hover:bg-white/10"
              onClick={goToPrevious}
            >
              <ChevronLeft className="h-8 w-8" />
            </Button>
            
            <div className="relative max-w-5xl max-h-[80vh] w-full h-full">
              <Image
                src={images[selectedImage].src}
                alt={images[selectedImage].alt}
                fill
                className="object-contain"
                sizes="100vw"
              />
            </div>
            
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 text-white hover:bg-white/10"
              onClick={goToNext}
            >
              <ChevronRight className="h-8 w-8" />
            </Button>
            
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-center">
              <p className="font-medium">{images[selectedImage].alt}</p>
              <p className="text-white/60 text-sm mt-1">{selectedImage + 1} / {images.length}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
