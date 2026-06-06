import { cn } from "@/lib/utils"
import { SectionCharacter, type SectionCharacterConfig } from "@/components/section-character"

type SectionVariant = "jungle" | "safari" | "playful" | "sunset"

const variantStyles: Record<SectionVariant, string> = {
  jungle: "bg-gradient-to-br from-emerald-100/70 via-lime-50/60 to-green-100/70",
  safari: "bg-gradient-to-br from-amber-100/70 via-orange-50/60 to-yellow-100/70",
  playful: "bg-gradient-to-br from-sky-100/70 via-pink-50/60 to-amber-100/70",
  sunset: "bg-gradient-to-br from-orange-100/70 via-rose-50/60 to-amber-100/70",
}

interface SectionBackgroundProps {
  id?: string
  className?: string
  variant?: SectionVariant
  characters?: SectionCharacterConfig[]
  children: React.ReactNode
}

export function SectionBackground({
  id,
  className,
  variant = "jungle",
  characters,
  children,
}: SectionBackgroundProps) {
  return (
    <section
      id={id}
      className={cn("relative py-20 overflow-x-clip", className)}
    >
      <div aria-hidden className={cn("absolute inset-0 z-0", variantStyles[variant])} />
      <div aria-hidden className="absolute inset-0 z-0 jungle-pattern opacity-20" />

      {id &&
        characters?.map((character) => (
          <SectionCharacter key={character.src} sectionId={id} {...character} />
        ))}

      <div className="relative z-10 container mx-auto px-4 md:px-6">{children}</div>
    </section>
  )
}
