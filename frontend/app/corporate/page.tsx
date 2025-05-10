import type { Metadata } from "next"
import { pageMetadata } from "@/lib/seo-config"
import { MarqueeBanner } from "@/components/ui/marquee-banner"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { MobileNavigation } from "@/components/layout/mobile-navigation"
import { TrainingGrid } from "@/components/corporate/training-grid"
import { MobileContactForm } from "@/components/courses/mobile-contact-form"

export const metadata: Metadata = {
  title: pageMetadata.corporate.title,
  description: pageMetadata.corporate.description,
  keywords: pageMetadata.corporate.keywords,
}

export default function CorporatePage() {
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

      {/* Mobile view */}
      <div className="md:hidden">
        <div className="px-4 py-6">
          <h1 className="text-2xl font-bold mb-6">Корпоративное обучение</h1>

          {/* Corporate Training Cards */}
          <TrainingGrid />
        </div>
      </div>

      {/* Mobile Contact Form - only visible on mobile */}
      <MobileContactForm />

      {/* Desktop view - to be implemented */}
      <div className="hidden md:block">{/* Desktop corporate training content would go here */}</div>

      {/* Footer - hidden on mobile */}
      <div className="hidden md:block">
        <Footer />
      </div>

      {/* Mobile Navigation */}
      <MobileNavigation />
    </main>
  )
}
