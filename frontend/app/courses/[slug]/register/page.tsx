import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { MobileNavigation } from "@/components/layout/mobile-navigation"
import { MarqueeBanner } from "@/components/ui/marquee-banner"
import { RegistrationForm } from "@/components/courses/registration-form"

interface RegisterPageParams {
  params: {
    slug: string
  }
}

export default function CourseRegisterPage({ params }: RegisterPageParams) {
  return (
    <main className="min-h-screen flex flex-col">
      {/* Top banner */}
      <MarqueeBanner />

      {/* Header with contact info */}
      <Header />

      {/* Registration section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">Регистрация на курс</h1>
            <RegistrationForm courseSlug={params.slug} />
          </div>
        </div>
      </section>

      {/* Footer */}
      <div className="mt-auto">
        <Footer />
      </div>

      {/* Mobile Navigation */}
      <MobileNavigation />
    </main>
  )
}
