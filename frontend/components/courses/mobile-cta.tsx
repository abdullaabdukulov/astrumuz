"use client"

import Link from "next/link"
import { TrainingGrid } from "../corporate/training-grid"
import { useLanguage } from "@/lib/context/language-context"
import { translations } from "@/lib/translations"

export function MobileCTA() {
  const { language } = useLanguage()

  // Get translations for the current language
  const ctaText = translations.mobileCta[language as keyof typeof translations.mobileCta] || translations.mobileCta.ru

  return (
    <section className="px-4 py-6 md:hidden">
      {/* CTA Card */}
      <div className="bg-[#050e2d] rounded-xl p-6 relative overflow-hidden mb-6">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#6a3de8] rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#00e5b0] rounded-full translate-y-1/2 -translate-x-1/2"></div>

        {/* Content */}
        <div className="relative z-10 text-center">
          <h2 className="text-2xl font-bold text-white mb-1">{ctaText.readyToBecome}</h2>
          <h2 className="text-2xl font-bold text-[#00e5b0] mb-3">{ctaText.student}</h2>
          <p className="text-white text-sm mb-6">{ctaText.opportunity}</p>
          <Link href="#courses" className="inline-block bg-[#6a3de8] text-white font-medium py-3 px-8 rounded-full">
            {ctaText.freeLesson}
          </Link>
        </div>
      </div>

      {/* Corporate Training Section */}
      <h3 className="text-xl font-bold mb-4">
        {language === "ru" ? "Корпоративное обучение" : language === "uz" ? "Korporativ ta'lim" : "Corporate training"}
      </h3>

      {/* Corporate Training Cards */}
      <TrainingGrid />
    </section>
  )
}
