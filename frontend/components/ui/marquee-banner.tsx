"use client"

import { useLanguage } from "@/lib/context/language-context"
import { translations } from "@/lib/translations"

export function MarqueeBanner() {
  const { language } = useLanguage()

  // Get the marquee text for the current language
  const marqueeText = translations.marquee[language as keyof typeof translations.marquee] || translations.marquee.ru

  return (
    <div className="bg-[#6a3de8] text-white py-2 marquee-container">
      <div className="flex whitespace-nowrap">
        <div className="animate-marquee marquee-content">
          {Array(10)
            .fill(0)
            .map((_, i) => (
              <span key={i} className="mx-4">
                {marqueeText}
              </span>
            ))}
        </div>
        <div className="animate-marquee marquee-content" aria-hidden="true">
          {Array(10)
            .fill(0)
            .map((_, i) => (
              <span key={i + 10} className="mx-4">
                {marqueeText}
              </span>
            ))}
        </div>
      </div>
    </div>
  )
}
