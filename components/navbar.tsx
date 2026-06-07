"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ReserveButton } from "@/components/reserve-button"
import { Menu, X, Phone } from "lucide-react"

const navItems = [
  { href: "#servicios", label: "Servicios" },
  { href: "#galeria", label: "Galeria" },
  { href: "#reservar", label: "Reservar" },
  { href: "#precios", label: "Precios" },
  { href: "#promociones", label: "Promociones" },
  { href: "#ubicacion", label: "Ubicacion" },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-200 ${
        isScrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2">
            <span className={`text-2xl font-bold transition-colors ${
              isScrolled ? "text-primary" : "text-white hero-nav-text"
            }`}>
              La Selva
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-accent ${
                  isScrolled ? "text-foreground" : "text-white hero-nav-text"
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <ReserveButton className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-full">
              <Phone className="mr-2 h-4 w-4" />
              Reservar
            </ReserveButton>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
          >
            {isMobileMenuOpen ? (
              <X className={`h-6 w-6 ${isScrolled ? "text-foreground" : "text-white hero-nav-text"}`} />
            ) : (
              <Menu className={`h-6 w-6 ${isScrolled ? "text-foreground" : "text-white hero-nav-text"}`} />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white rounded-2xl shadow-xl p-6 mb-4">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-foreground font-medium py-2 hover:text-accent transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <ReserveButton 
                className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-full mt-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Phone className="mr-2 h-4 w-4" />
                Reservar
              </ReserveButton>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
