"use client"
import { useState } from "react"
import { ContactFormModal } from "@/components/shared/contact-form-modal"
import { useLanguage } from "@/lib/context/language-context"
import { translations } from "@/lib/translations"

export function MobileContactForm() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { language } = useLanguage()

  // Get translations for the current language
  const contactText =
    translations.mobileContact[language as keyof typeof translations.mobileContact] || translations.mobileContact.ru

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  return (
    <section className="px-4 py-6 md:hidden">
      <div className="bg-[#6a3de8] rounded-xl p-6 text-center">
        <h2 className="text-2xl font-bold text-white mb-3">{contactText.leaveRequest}</h2>
        <p className="text-white text-sm mb-6">{contactText.contactYou}</p>
        <button onClick={openModal} className="inline-block bg-[#00e5b0] text-black font-medium py-3 px-8 rounded-full">
          {contactText.submitRequest}
        </button>
      </div>

      {/* Модальное окно с формой */}
      <ContactFormModal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={contactText.leaveRequest}
        submitButtonText={contactText.submitRequest}
      />
    </section>
  )
}
