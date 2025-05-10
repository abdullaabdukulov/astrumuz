import type { Metadata } from "next"
import { pageMetadata } from "@/lib/seo-config"
import { MarqueeBanner } from "@/components/ui/marquee-banner"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { MobileNavigation } from "@/components/layout/mobile-navigation"
import { ContactForm } from "@/components/contact/contact-form"

export const metadata: Metadata = {
  title: pageMetadata.contact.title,
  description: pageMetadata.contact.description,
  keywords: pageMetadata.contact.keywords,
}

export default function ContactPage() {
  return (
    <main className="min-h-screen flex flex-col pb-16 md:pb-0">
      {/* Top banner - hidden on mobile */}
      <div className="hidden md:block">
        <MarqueeBanner />
      </div>

      {/* Header with contact info - hidden on mobile */}
      <div className="hidden md:block">
        <Header />
      </div>

      {/* Contact Form */}
      <div className="px-4 py-6">
        <h1 className="text-2xl font-bold mb-6 md:text-3xl">Оставьте заявку</h1>
        <ContactForm />
      </div>

      {/* Footer - hidden on mobile */}
      <div className="hidden md:block">
        <Footer />
      </div>

      {/* Mobile Navigation */}
      <MobileNavigation />
    </main>
  )
}
