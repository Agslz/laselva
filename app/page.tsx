import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { Services } from "@/components/services"
import { Gallery } from "@/components/gallery"
import { Pricing } from "@/components/pricing"
import { Promo } from "@/components/promo"
import { Location } from "@/components/location"
import { Footer } from "@/components/footer"
import { ReservationProvider } from "@/components/reservation-provider"

export default function Home() {
  return (
    <ReservationProvider>
      <main className="min-h-screen pb-24 md:pb-0">
        <Navbar />
        <Hero />
        <Services />
        <Gallery />
        <Pricing />
        <Promo />
        <Location />
        <Footer />
      </main>
    </ReservationProvider>
  )
}
