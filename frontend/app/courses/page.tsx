import type { Metadata } from "next"
import { pageMetadata } from "@/lib/seo-config"
import { MarqueeBanner } from "@/components/ui/marquee-banner"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { HeroSection } from "@/components/courses/hero-section"
import { FilterTabs } from "@/components/courses/filter-tabs"
import { CoursesSection } from "@/components/courses/courses-section"
import { CTASection } from "@/components/courses/cta-section"
import { MobileNavigation } from "@/components/layout/mobile-navigation"
import { MobileCTA } from "@/components/courses/mobile-cta"
import { MobileContactForm } from "@/components/courses/mobile-contact-form"

export const metadata: Metadata = {
  title: pageMetadata.courses.title,
  description: pageMetadata.courses.description,
  keywords: pageMetadata.courses.keywords,
}

export default function CoursesPage() {
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

      {/* Hero section with background image - hidden on mobile */}
      <div className="hidden md:block">
        <HeroSection />
      </div>

      {/* Filter tabs */}
      <FilterTabs />

      {/* Courses section */}
      <CoursesSection />

      {/* Mobile CTA Section - only visible on mobile */}
      <MobileCTA />

      {/* Mobile Contact Form - only visible on mobile */}
      <MobileContactForm />

      {/* Desktop CTA Section - hidden on mobile */}
      <div className="hidden md:block">
        <CTASection />
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
