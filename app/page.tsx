import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { Services } from "@/components/services"
import { Gallery } from "@/components/gallery"
import { BookingCalendar } from "@/components/booking-calendar"
import { Pricing } from "@/components/pricing"
import { Promo } from "@/components/promo"
import { Location } from "@/components/location"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Services />
      <Gallery />
      <BookingCalendar />
      <Pricing />
      <Promo />
      <Location />
      <Footer />
      <WhatsAppButton />
    </main>
  )
}
