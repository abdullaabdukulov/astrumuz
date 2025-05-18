"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { SocialLinks } from "@/components/ui/social-links"
import { useLanguage } from "@/lib/context/language-context"
import { translations } from "@/lib/translations"

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const { language, setLanguage } = useLanguage()

  // Get translations for the current language
  const headerText = translations.header[language as keyof typeof translations.header] || translations.header.ru
  const navItems = translations.navItems[language as keyof typeof translations.navItems] || translations.navItems.ru
  const mobileMenuTexts = {
    ru: {
      menu: "Меню",
      navigation: "Навигация",
      contacts: "Контакты",
      socialNetworks: "Социальные сети",
      close: "Закрыть",
    },
    uz: {
      menu: "Menyu",
      navigation: "Navigatsiya",
      contacts: "Kontaktlar",
      socialNetworks: "Ijtimoiy tarmoqlar",
      close: "Yopish",
    },
    en: {
      menu: "Menu",
      navigation: "Navigation",
      contacts: "Contacts",
      socialNetworks: "Social networks",
      close: "Close",
    },
  }

  const menuText = mobileMenuTexts[language as keyof typeof mobileMenuTexts] || mobileMenuTexts.ru

  // Clean up body styles when component unmounts
  useEffect(() => {
    return () => {
      document.body.style.overflow = ""
    }
  }, [])

  const toggleMenu = () => {
    setIsOpen(!isOpen)
    if (!isOpen) {
      // Prevent scrolling when menu is open
      document.body.style.overflow = "hidden"
    } else {
      // Allow scrolling when menu is closed
      document.body.style.overflow = ""
    }
  }

  return (
    <>
      {/* Menu Button */}
      <button
        onClick={toggleMenu}
        className="flex flex-col items-center justify-center text-gray-500 hover:text-[#6a3de8] transition-colors"
        aria-label={isOpen ? menuText.close : menuText.menu}
        aria-expanded={isOpen}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-menu"
        >
          <line x1="4" x2="20" y1="12" y2="12" />
          <line x1="4" x2="20" y1="6" y2="6" />
          <line x1="4" x2="20" y1="18" y2="18" />
        </svg>
        <span className="text-xs mt-1">{menuText.menu}</span>
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-gradient-to-b from-[#050e2d] to-[#0a1745] z-50 flex flex-col overflow-y-auto mobile-menu-overlay">
          {/* Header */}
          <div className="flex justify-between items-center p-5 border-b border-gray-800">
            <div className="flex items-center">
              <Image src="/images/logo.png" alt="Astrum IT Academy" width={140} height={56} className="h-12 w-auto" />
            </div>
            <button
              onClick={toggleMenu}
              className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-white hover:bg-gray-700 transition-colors"
              aria-label={menuText.close}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-x"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          </div>

          {/* Menu Content */}
          <div className="p-6 flex-1 mobile-menu-content">
            <nav className="space-y-8">
              {/* Main Navigation */}
              <div className="space-y-5">
                <h3 className="text-[#00e5b0] text-sm font-bold uppercase tracking-wider">{menuText.navigation}</h3>
                <ul className="space-y-5">
                  {navItems.map((item) => (
                    <li key={item.title}>
                      <Link
                        href={item.href}
                        className={`block text-xl ${
                          item.isActive ? "text-white font-bold" : "text-gray-300 hover:text-white transition-colors"
                        }`}
                        onClick={toggleMenu}
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact Information */}
              <div className="space-y-5">
                <h3 className="text-[#00e5b0] text-sm font-bold uppercase tracking-wider">{menuText.contacts}</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-[#00e5b0] mr-3 flex-shrink-0"></div>
                    <div>
                      <div className="text-gray-400 text-sm">{headerText.answering}</div>
                      <div className="text-white font-bold text-lg">+998 71 202 42 22</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-[#00e5b0] mr-3 flex-shrink-0"></div>
                    <div>
                      <div className="text-gray-400 text-sm">{headerText.writeUs}</div>
                      <div className="text-white font-bold text-lg">info@astrum.uz</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-[#00e5b0] mr-3 flex-shrink-0"></div>
                    <div>
                      <div className="text-gray-400 text-sm">{headerText.telegram}</div>
                      <div className="text-white font-bold text-lg">@astrumuz</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="space-y-4">
                <h3 className="text-[#00e5b0] text-sm font-bold uppercase tracking-wider">{menuText.socialNetworks}</h3>
                <SocialLinks />
              </div>

              {/* Language Selector */}
              <div className="flex items-center space-x-2 sm:space-x-3">
                <button
                  onClick={() => setLanguage("ru")}
                  className={`rounded-full border ${
                    language === "ru" ? "border-[#6a3de8] bg-[#6a3de8]" : "border-gray-700 bg-gray-800"
                  } w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center ${
                    language === "ru" ? "text-white" : "text-gray-400"
                  } font-medium text-sm sm:text-base`}
                >
                  RU
                </button>
                <button
                  onClick={() => setLanguage("uz")}
                  className={`rounded-full border ${
                    language === "uz" ? "border-[#6a3de8] bg-[#6a3de8]" : "border-gray-700 bg-gray-800"
                  } w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center ${
                    language === "uz" ? "text-white" : "text-gray-400"
                  } font-medium text-sm sm:text-base`}
                >
                  UZ
                </button>
                <button
                  onClick={() => setLanguage("en")}
                  className={`rounded-full border ${
                    language === "en" ? "border-[#6a3de8] bg-[#6a3de8]" : "border-gray-700 bg-gray-800"
                  } w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center ${
                    language === "en" ? "text-white" : "text-gray-400"
                  } font-medium text-sm sm:text-base`}
                >
                  EN
                </button>
              </div>

              {/* CTA Button */}
              <div className="pt-4">
                <button
                  onClick={() => {
                    toggleMenu() // Закрываем меню
                    const coursesSection = document.getElementById("courses")
                    if (coursesSection) {
                      coursesSection.scrollIntoView({ behavior: "smooth" })
                    }
                  }}
                  className="bg-[#6a3de8] hover:bg-[#5a2ed8] text-white w-full py-4 px-6 rounded-full font-bold text-lg transition-colors"
                >
                  {headerText.wantToStudy}
                </button>
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  )
}
