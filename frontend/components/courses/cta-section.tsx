"use client"

import { useState } from "react"
import Image from "next/image"
import { ContactFormModal } from "@/components/shared/contact-form-modal"

export function CTASection() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <div className="bg-[#050e2d] rounded-[40px] overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#00e5b0] rounded-full -z-0 translate-x-1/3 -translate-y-1/3"></div>
          <div className="absolute bottom-0 right-1/3 w-48 h-48 bg-[#6a3de8] rounded-full -z-0"></div>

          <div className="flex flex-col md:flex-row items-center p-12 md:p-16 relative z-10">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Готовы стать <br />
                <span className="text-[#00e5b0]">учеником Astrum?</span>
              </h2>
              <p className="text-white text-lg mb-8 max-w-md">
                Не упустите возможность записаться на курсы Astrum и начать изучать программирование.
              </p>
              <button
                onClick={openModal}
                className="inline-block bg-[#6a3de8] hover:bg-[#5a2ed8] text-white font-medium py-4 px-8 rounded-full transition-colors"
              >
                Записаться на бесплатный урок
              </button>
            </div>
            <div className="md:w-1/2 flex justify-end">
              <Image
                src="/images/student-with-laptop.png"
                alt="Student with laptop"
                width={500}
                height={500}
                className="relative z-10"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form Modal with pre-filled message */}
      <ContactFormModal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Запись на курс"
        submitButtonText="Отправить заявку"
        initialMessage="Запись на курс"
      />
    </section>
  )
}
