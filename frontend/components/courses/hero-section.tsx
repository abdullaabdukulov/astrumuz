"use client"

import Image from "next/image"
import Link from "next/link"
import { useLanguage } from "@/lib/context/language-context"
import { translations } from "@/lib/translations"

interface HeroSectionProps {
  title?: string
  description?: string
  backgroundImage?: string
  showNavigation?: boolean
}

export function HeroSection({
  title,
  description,
  backgroundImage = "/images/background.jpg",
  showNavigation = true,
}: HeroSectionProps) {
  const { language } = useLanguage()

  // Get translations for the current language
  const heroText = translations.hero[language as keyof typeof translations.hero] || translations.hero.ru
  const navItems = translations.navItems[language as keyof typeof translations.navItems] || translations.navItems.ru

  // Use provided props or fallback to translations
  const heroTitle = title || heroText.title
  const heroDescription = description || heroText.description

  return (
    <div className="relative">
      {/* Background image container */}
      <div className="container mx-auto px-4 relative">
        <div className="rounded-[40px] overflow-hidden relative">
          {/* Background image */}
          <div className="absolute inset-0 z-0">
            <Image
              src={backgroundImage || "/placeholder.svg"}
              alt="IT Academy classroom"
              fill
              className="object-cover object-center object-[0_-100px]"
              priority
            />
            <div className="absolute inset-0 bg-black/50"></div>
          </div>

          {/* Navigation with curved edges - now at the very top of hero */}
          {showNavigation && (
            <div className="relative z-20 mt-0">
              <nav className="bg-white rounded-t-none rounded-b-[30px] shadow-lg max-w-4xl mx-auto">
                <ul className="flex justify-center pt-1 pb-6 px-4 flex-wrap md:flex-nowrap">
                  {navItems.map((item) => (
                    <li key={item.title} className="mx-2 md:mx-3 whitespace-nowrap">
                      <Link
                        href={item.href}
                        className={`${
                          item.isActive ? "text-[#6a3de8]" : "text-gray-800 hover:text-[#6a3de8]"
                        } font-bold text-base`}
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          )}

          {/* Hero content */}
          <div className="relative z-10 pt-24 pb-40 text-center">
            <div className="text-[#00e5b0] text-3xl font-bold mb-6">{heroText.courses}</div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">{heroTitle}</h1>
            <p className="text-white text-lg md:text-xl max-w-3xl mx-auto">{heroDescription}</p>
          </div>

          {/* Bottom curved section - similar to top navbar but inverted */}
          <div className="relative z-20 mb-0">
            <div className="bg-white rounded-b-none rounded-t-[30px] shadow-lg max-w-4xl mx-auto h-[59px]"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
