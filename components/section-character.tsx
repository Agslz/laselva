"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

export interface SectionCharacterConfig {
  src: string
  side: "left" | "right"
  width?: number
  height?: number
  bottom?: string
  top?: string
}

interface SectionCharacterProps extends SectionCharacterConfig {
  sectionId: string
}

const MOBILE_WATERMARK_OPACITY = 0.13

export function SectionCharacter({
  sectionId,
  src,
  side,
  width = 200,
  height,
  bottom = "0",
  top,
}: SectionCharacterProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = document.getElementById(sectionId)
    if (!el) return

    const checkVisible = () => {
      const rect = el.getBoundingClientRect()
      return rect.top < window.innerHeight && rect.bottom > 0
    }

    if (checkVisible()) setVisible(true)

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.05, rootMargin: "0px" }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [sectionId])

  const isLeft = side === "left"

  const desktopImgClass = cn(
    "h-auto w-auto drop-shadow-[0_8px_24px_rgba(0,0,0,0.3)]",
    height
      ? "max-h-[min(400px,45vh)] max-w-[min(280px,45vw)]"
      : "max-w-[min(240px,40vw)]"
  )

  const desktopImgStyle = height
    ? { height: `min(${height}px, 45vh)` }
    : { width: `min(${width}px, 40vw)` }

  return (
    <>
      {/* Mobile: marca de agua detrás del contenido (z-10) */}
      <div
        className={cn(
          "absolute z-[1] pointer-events-none motion-safe:transition-opacity motion-safe:duration-700 md:hidden",
          isLeft ? "left-3 top-[22%]" : "right-3 top-[22%]"
        )}
        style={{ opacity: visible ? MOBILE_WATERMARK_OPACITY : 0 }}
        aria-hidden
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt=""
          decoding="async"
          draggable={false}
          className="h-auto w-auto max-h-[100px] max-w-[85px] object-contain"
        />
      </div>

      {/* Desktop: asoma por el borde de la sección */}
      <div
        className={cn(
          "absolute z-20 pointer-events-none motion-safe:transition-[transform,opacity] motion-safe:duration-500 motion-safe:ease-out hidden md:block",
          isLeft ? "left-0" : "right-0"
        )}
        style={{
          ...(top ? { top } : { bottom }),
          opacity: visible ? 1 : 0,
          transform: visible
            ? isLeft
              ? "translateX(-12%)"
              : "translateX(12%)"
            : isLeft
              ? "translateX(-100%)"
              : "translateX(100%)",
        }}
        aria-hidden
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt=""
          decoding="async"
          draggable={false}
          className={desktopImgClass}
          style={desktopImgStyle}
        />
      </div>
    </>
  )
}
