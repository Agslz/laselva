"use client"

import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { galleryImages } from "@/lib/gallery-images"

interface GalleryLightboxProps {
  index: number
  onClose: () => void
  onPrevious: () => void
  onNext: () => void
}

export function GalleryLightbox({
  index,
  onClose,
  onPrevious,
  onNext,
}: GalleryLightboxProps) {
  const image = galleryImages[index]

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
      role="dialog"
      aria-modal
      aria-label="Vista ampliada de la galería"
    >
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-4 right-4 text-white hover:bg-white/10"
        onClick={onClose}
      >
        <X className="h-6 w-6" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 text-white hover:bg-white/10"
        onClick={onPrevious}
      >
        <ChevronLeft className="h-8 w-8" />
      </Button>

      <div className="relative flex h-[80vh] w-full max-w-5xl items-center justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image.src}
          alt={image.alt}
          decoding="async"
          className="max-h-full max-w-full object-contain"
        />
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 text-white hover:bg-white/10"
        onClick={onNext}
      >
        <ChevronRight className="h-8 w-8" />
      </Button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center text-white">
        <p className="font-medium">{image.alt}</p>
        <p className="mt-1 text-sm text-white/60">
          {index + 1} / {galleryImages.length}
        </p>
      </div>
    </div>
  )
}
