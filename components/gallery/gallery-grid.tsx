"use client"

import dynamic from "next/dynamic"
import { useCallback, useState } from "react"
import { galleryImages } from "@/lib/gallery-images"
import { LazyGalleryImage } from "@/components/gallery/lazy-gallery-image"

const GalleryLightbox = dynamic(
  () =>
    import("@/components/gallery/gallery-lightbox").then((m) => m.GalleryLightbox),
  { ssr: false }
)

export function GalleryGrid() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const close = useCallback(() => setSelectedIndex(null), [])

  const goToPrevious = useCallback(() => {
    setSelectedIndex((current) => {
      if (current === null) return null
      return current === 0 ? galleryImages.length - 1 : current - 1
    })
  }, [])

  const goToNext = useCallback(() => {
    setSelectedIndex((current) => {
      if (current === null) return null
      return current === galleryImages.length - 1 ? 0 : current + 1
    })
  }, [])

  return (
    <>
      <div className="gallery-grid grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
        {galleryImages.map((image, index) => (
          <LazyGalleryImage
            key={image.src}
            src={image.src}
            alt={image.alt}
            category={image.category}
            featured={index === 0}
            onOpen={() => setSelectedIndex(index)}
          />
        ))}
      </div>

      {selectedIndex !== null && (
        <GalleryLightbox
          index={selectedIndex}
          onClose={close}
          onPrevious={goToPrevious}
          onNext={goToNext}
        />
      )}
    </>
  )
}
