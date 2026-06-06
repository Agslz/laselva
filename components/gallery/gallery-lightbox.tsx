"use client"

import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
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
  const [mounted, setMounted] = useState(false)
  const image = galleryImages[index]

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const scrollY = window.scrollY
    const { style } = document.body

    style.position = "fixed"
    style.top = `-${scrollY}px`
    style.left = "0"
    style.right = "0"
    style.width = "100%"
    style.overflow = "hidden"

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowLeft") onPrevious()
      if (e.key === "ArrowRight") onNext()
    }

    window.addEventListener("keydown", onKeyDown)

    return () => {
      window.removeEventListener("keydown", onKeyDown)
      style.position = ""
      style.top = ""
      style.left = ""
      style.right = ""
      style.width = ""
      style.overflow = ""
      window.scrollTo(0, scrollY)
    }
  }, [onClose, onNext, onPrevious])

  if (!mounted) return null

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center overscroll-none bg-black/95 p-4 touch-none"
      role="dialog"
      aria-modal="true"
      aria-label="Vista ampliada de la galería"
      onClick={onClose}
    >
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-4 right-4 z-10 text-white hover:bg-white/10"
        onClick={onClose}
        type="button"
      >
        <X className="h-6 w-6" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 z-10 text-white hover:bg-white/10"
        onClick={(e) => {
          e.stopPropagation()
          onPrevious()
        }}
        type="button"
      >
        <ChevronLeft className="h-8 w-8" />
      </Button>

      <div
        className="relative flex h-[80vh] w-full max-w-5xl items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image.src}
          alt={image.alt}
          decoding="async"
          draggable={false}
          className="max-h-full max-w-full object-contain select-none"
        />
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 z-10 text-white hover:bg-white/10"
        onClick={(e) => {
          e.stopPropagation()
          onNext()
        }}
        type="button"
      >
        <ChevronRight className="h-8 w-8" />
      </Button>

      <div
        className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2 text-center text-white pointer-events-none"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="font-medium">{image.alt}</p>
        <p className="mt-1 text-sm text-white/60">
          {index + 1} / {galleryImages.length}
        </p>
      </div>
    </div>,
    document.body
  )
}
