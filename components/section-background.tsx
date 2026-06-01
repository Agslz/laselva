import { cn } from "@/lib/utils"

type SectionVariant = "jungle" | "safari" | "playful" | "sunset"

const variantStyles: Record<SectionVariant, string> = {
  jungle:
    "bg-gradient-to-br from-emerald-50 via-lime-50/95 to-green-100",
  safari:
    "bg-gradient-to-br from-amber-50 via-orange-50/90 to-yellow-50",
  playful:
    "bg-gradient-to-br from-sky-50 via-pink-50/90 to-amber-50",
  sunset:
    "bg-gradient-to-br from-orange-50 via-rose-50/90 to-amber-50",
}

interface SectionBackgroundProps {
  id?: string
  className?: string
  /** Solo en 1–2 secciones clave; cada foto extra ralentiza el scroll */
  image?: string
  imageOpacity?: number
  variant?: SectionVariant
  children: React.ReactNode
}

export function SectionBackground({
  id,
  className,
  image,
  imageOpacity = 0.14,
  variant = "jungle",
  children,
}: SectionBackgroundProps) {
  return (
    <section
      id={id}
      className={cn("relative py-20 overflow-hidden content-auto", className)}
    >
      {image && (
        <img
          src={image}
          alt=""
          aria-hidden
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover pointer-events-none select-none"
          style={{ opacity: imageOpacity }}
        />
      )}

      <div aria-hidden className={cn("absolute inset-0", variantStyles[variant])} />

      <div
        aria-hidden
        className="absolute inset-0 jungle-pattern opacity-25 md:opacity-30"
      />

      {/* Acentos de color sin blur (más liviano en GPU) */}
      <div
        aria-hidden
        className="absolute -top-16 -right-12 h-40 w-40 rounded-full bg-primary/10 md:bg-primary/15"
      />
      <div
        aria-hidden
        className="absolute -bottom-20 -left-16 h-48 w-48 rounded-full bg-secondary/15"
      />

      <div className="relative z-10 container mx-auto px-4">{children}</div>
    </section>
  )
}
