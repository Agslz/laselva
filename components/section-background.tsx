import { cn } from "@/lib/utils"

type SectionVariant = "jungle" | "safari" | "playful" | "sunset"

const variantStyles: Record<SectionVariant, string> = {
  jungle:
    "bg-gradient-to-br from-emerald-50/95 via-lime-50/90 to-green-100/95",
  safari:
    "bg-gradient-to-br from-amber-50/95 via-orange-50/88 to-yellow-50/95",
  playful:
    "bg-gradient-to-br from-sky-50/92 via-pink-50/88 to-amber-50/95",
  sunset:
    "bg-gradient-to-br from-orange-50/92 via-rose-50/88 to-amber-50/95",
}

interface SectionBackgroundProps {
  id?: string
  className?: string
  image?: string
  imageOpacity?: number
  variant?: SectionVariant
  children: React.ReactNode
}

export function SectionBackground({
  id,
  className,
  image,
  imageOpacity = 0.18,
  variant = "jungle",
  children,
}: SectionBackgroundProps) {
  return (
    <section
      id={id}
      className={cn("relative py-20 overflow-hidden", className)}
    >
      {image && (
        <div
          aria-hidden
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('${image}')`,
            opacity: imageOpacity,
          }}
        />
      )}

      <div
        aria-hidden
        className={cn("absolute inset-0", variantStyles[variant])}
      />

      <div aria-hidden className="absolute inset-0 jungle-pattern opacity-40" />

      <div
        aria-hidden
        className="absolute -top-20 -right-16 h-56 w-56 rounded-full bg-primary/12 blur-3xl"
      />
      <div
        aria-hidden
        className="absolute -bottom-24 -left-20 h-64 w-64 rounded-full bg-secondary/20 blur-3xl"
      />
      <div
        aria-hidden
        className="absolute top-1/2 right-1/4 h-40 w-40 rounded-full bg-accent/10 blur-2xl"
      />

      <div className="relative z-10 container mx-auto px-4">{children}</div>
    </section>
  )
}
