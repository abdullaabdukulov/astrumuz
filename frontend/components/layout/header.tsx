"use client"

import Image from "next/image"
import Link from "next/link"
import { MobileMenu } from "./mobile-menu"
import { useState } from "react"
import { ContactFormModal } from "@/components/shared/contact-form-modal"
import { useLanguage } from "@/lib/context/language-context"
import { translations } from "@/lib/translations"

export function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { language, setLanguage } = useLanguage()

  // Get translations for the current language
  const headerText = translations.header[language as keyof typeof translations.header] || translations.header.ru

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  return (
    <header className="bg-white py-3 sm:py-4 md:py-5">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between md:justify-start">
          <div className="border-r pr-4 sm:pr-6 md:pr-8 mr-4 sm:mr-6 md:mr-8 flex items-center">
            <Link href="/" className="flex-shrink-0">
              <Image
                src="/images/logo.png"
                alt="Astrum IT Academy"
                width={200}
                height={80}
                className="h-8 sm:h-10 md:h-12 w-auto object-contain"
              />
            </Link>
          </div>

          <div className="hidden md:flex items-center justify-between flex-1 flex-wrap lg:flex-nowrap">
            {/* Contact info items - responsive for tablet */}
            <div className="flex items-center md:mb-2 lg:mb-0 md:w-1/2 lg:w-auto xl:mr-4">
              <div className="w-2 h-2 rounded-full bg-[#00e5b0] mr-2 md:mr-3"></div>
              <div>
                <div className="text-gray-500 text-xs md:text-sm">{headerText.answering}</div>
                <div className="font-bold text-sm md:text-base">+998 71 202 42 22</div>
              </div>
            </div>

            <div className="flex items-center md:mb-2 lg:mb-0 md:w-1/2 lg:w-auto xl:mr-4">
              <div className="w-2 h-2 rounded-full bg-[#00e5b0] mr-2 md:mr-3"></div>
              <div>
                <div className="text-gray-500 text-xs md:text-sm">{headerText.writeUs}</div>
                <div className="font-bold text-sm md:text-base">info@astrum.uz</div>
              </div>
            </div>

            <div className="flex items-center md:mb-2 lg:mb-0 md:w-1/2 lg:w-auto xl:mr-4">
              <div className="w-2 h-2 rounded-full bg-[#00e5b0] mr-2 md:mr-3"></div>
              <div>
                <div className="text-gray-500 text-xs md:text-sm">{headerText.telegram}</div>
                <div className="font-bold text-sm md:text-base">@astrumuz</div>
              </div>
            </div>

            {/* Language and CTA buttons */}
            <div className="flex items-center space-x-3 md:space-x-4 lg:space-x-5 md:w-full lg:w-auto md:justify-center lg:justify-start md:mt-3 lg:mt-0">
              <div className="flex space-x-1 sm:space-x-2">
                <button
                  onClick={() => setLanguage("ru")}
                  className={`rounded-full border ${
                    language === "ru" ? "border-[#6a3de8] bg-[#6a3de8] text-white" : "border-gray-300 text-gray-700"
                  } w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 flex items-center justify-center transition-colors text-xs md:text-sm`}
                >
                  RU
                </button>
                <button
                  onClick={() => setLanguage("uz")}
                  className={`rounded-full border ${
                    language === "uz" ? "border-[#6a3de8] bg-[#6a3de8] text-white" : "border-gray-300 text-gray-700"
                  } w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 flex items-center justify-center transition-colors text-xs md:text-sm`}
                >
                  UZ
                </button>
                <button
                  onClick={() => setLanguage("en")}
                  className={`rounded-full border ${
                    language === "en" ? "border-[#6a3de8] bg-[#6a3de8] text-white" : "border-gray-300 text-gray-700"
                  } w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 flex items-center justify-center transition-colors text-xs md:text-sm`}
                >
                  EN
                </button>
              </div>
              <button
                onClick={openModal}
                className="bg-[#f5f3ff] text-[#6a3de8] px-3 py-2 md:px-4 md:py-2 lg:px-6 lg:py-3 rounded-full font-medium text-xs md:text-sm"
              >
                {headerText.wantToStudy}
              </button>
            </div>
          </div>

          <div className="md:hidden">
            <MobileMenu />
          </div>
        </div>
      </div>
      {/* Contact Form Modal */}
      <ContactFormModal isOpen={isModalOpen} onClose={closeModal} />
    </header>
  )
}
