"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface LazyGalleryImageProps {
  src: string
  alt: string
  category: string
  featured?: boolean
  onOpen: () => void
}

export function LazyGalleryImage({
  src,
  alt,
  category,
  featured,
  onOpen,
}: LazyGalleryImageProps) {
  const rootRef = useRef<HTMLButtonElement>(null)
  const [shouldLoad, setShouldLoad] = useState(false)

  useEffect(() => {
    const node = rootRef.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true)
          observer.disconnect()
        }
      },
      { rootMargin: featured ? "80px" : "40px", threshold: 0.01 }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [featured])

  return (
    <button
      ref={rootRef}
      type="button"
      onClick={onOpen}
      className={cn(
        "gallery-cell relative w-full overflow-hidden rounded-xl text-left",
        "ring-2 ring-primary/10 shadow-sm",
        featured && "sm:col-span-2 sm:row-span-2 md:col-span-2 md:row-span-2"
      )}
    >
      <div className="relative aspect-square bg-emerald-100/60">
        {!shouldLoad && (
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-100 to-lime-50" aria-hidden />
        )}
        {shouldLoad && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={alt}
            decoding="async"
            loading="lazy"
            fetchPriority={featured ? "high" : "low"}
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 to-transparent pt-8 pb-3 px-3 pointer-events-none">
          <span className="inline-block rounded-full bg-white/95 px-3 py-1 text-sm font-medium text-foreground">
            {category}
          </span>
        </div>
      </div>
    </button>
  )
}
