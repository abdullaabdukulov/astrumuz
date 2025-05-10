"use client"

import Image from "next/image"
import Link from "next/link"
import { MobileMenu } from "./mobile-menu"
import { useState } from "react"
import { ContactFormModal } from "@/components/shared/contact-form-modal"
import { useLanguage } from "@/lib/context/language-context"

export function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { language, setLanguage } = useLanguage()

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

          <div className="hidden md:flex items-center justify-between flex-1">
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-[#00e5b0] mr-3"></div>
              <div>
                <div className="text-gray-500 text-sm">Отвечаем на вопросы</div>
                <div className="font-bold">+998 71 202 42 22</div>
              </div>
            </div>

            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-[#00e5b0] mr-3"></div>
              <div>
                <div className="text-gray-500 text-sm">Напишите нам</div>
                <div className="font-bold">info@astrum.uz</div>
              </div>
            </div>

            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-[#00e5b0] mr-3"></div>
              <div>
                <div className="text-gray-500 text-sm">Телеграм</div>
                <div className="font-bold">@astrumuz</div>
              </div>
            </div>

            <div className="flex items-center space-x-5">
              <div className="flex space-x-1 sm:space-x-2">
                <button
                  onClick={() => setLanguage("ru")}
                  className={`rounded-full border ${
                    language === "ru" ? "border-[#6a3de8] bg-[#6a3de8] text-white" : "border-gray-300 text-gray-700"
                  } w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 flex items-center justify-center transition-colors text-sm sm:text-base`}
                >
                  RU
                </button>
                <button
                  onClick={() => setLanguage("uz")}
                  className={`rounded-full border ${
                    language === "uz" ? "border-[#6a3de8] bg-[#6a3de8] text-white" : "border-gray-300 text-gray-700"
                  } w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 flex items-center justify-center transition-colors text-sm sm:text-base`}
                >
                  UZ
                </button>
                <button
                  onClick={() => setLanguage("en")}
                  className={`rounded-full border ${
                    language === "en" ? "border-[#6a3de8] bg-[#6a3de8] text-white" : "border-gray-300 text-gray-700"
                  } w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 flex items-center justify-center transition-colors text-sm sm:text-base`}
                >
                  EN
                </button>
              </div>
              <button
                onClick={openModal}
                className="bg-[#f5f3ff] text-[#6a3de8] px-4 sm:px-5 md:px-7 py-2 sm:py-3 rounded-full font-medium text-sm sm:text-base"
              >
                Хочу учиться!
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
