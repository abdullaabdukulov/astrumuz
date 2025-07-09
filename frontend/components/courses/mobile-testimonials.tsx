"use client"

import { useState } from "react"
import Image from "next/image"

interface Testimonial {
  id: number
  name: string
  position: string
  company: number
  company_name: string
  company_logo: string
  company_color: string
  avatar: string
  text: string
}

interface MobileTestimonialsProps {
  testimonials: Testimonial[]
}

export function MobileTestimonials({ testimonials = [] }: MobileTestimonialsProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [avatarErrors, setAvatarErrors] = useState<Record<number, boolean>>({})
  const [logoErrors, setLogoErrors] = useState<Record<number, boolean>>({})
  const baseUrl = "https://astrum-api.abdukulov.uz"

  // Handle errors
  const handleAvatarError = (testimonialId: number) => {
    setAvatarErrors((prev) => ({
      ...prev,
      [testimonialId]: true,
    }))
  }

  const handleLogoError = (testimonialId: number) => {
    setLogoErrors((prev) => ({
      ...prev,
      [testimonialId]: true,
    }))
  }

  const nextTestimonial = () => {
    if (!testimonials || testimonials.length === 0) return
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    if (!testimonials || testimonials.length === 0) return
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  // If no testimonials, don't render the section
  if (!testimonials || testimonials.length === 0) {
    return null
  }

  const currentTestimonial = testimonials[currentIndex]
  if (!currentTestimonial) return null

  return (
    <section className="py-4 sm:py-6 px-4 md:hidden">
      <div className="mb-2 text-[#6a3de8] text-xs sm:text-sm font-medium">Отзывы</div>
      <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Что о нас говорят студенты?</h2>

      <div className="bg-white rounded-xl p-4 sm:p-5 shadow-sm relative mb-3 sm:mb-4">
        <div className="flex items-center mb-3 sm:mb-4">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden mr-2 sm:mr-3 bg-gray-200">
            {!avatarErrors[currentTestimonial.id] ? (
              <Image
                src={`${baseUrl}${currentTestimonial.avatar || ""}`}
                alt={currentTestimonial.name || "Person"}
                width={40}
                height={40}
                className="object-cover"
                onError={() => handleAvatarError(currentTestimonial.id)}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-300">
                <span className="text-xs text-gray-600">{currentTestimonial.name?.charAt(0) || "U"}</span>
              </div>
            )}
          </div>
          <div>
            <h3 className="font-medium text-sm sm:text-base">{currentTestimonial.name || "Пользователь"}</h3>
            <p className="text-xs text-gray-500 flex items-center">
              {currentTestimonial.position || "Студент"}{" "}
              <span style={{ color: currentTestimonial.company_color || "#6a3de8" }} className="font-medium ml-1">
                {currentTestimonial.company_name || ""}
              </span>
            </p>
          </div>
        </div>
        <p className="text-xs sm:text-sm text-gray-700 mb-3 sm:mb-4">{currentTestimonial.text || "Отличный курс!"}</p>

        <div className="absolute bottom-4 sm:bottom-5 right-4 sm:right-5">
          {!logoErrors[currentTestimonial.id] ? (
            <Image
              src={`${baseUrl}${currentTestimonial.company_logo || ""}`}
              alt={`${currentTestimonial.company_name || "Company"} logo`}
              width={50}
              height={25}
              className="object-contain sm:w-[60px] sm:h-[30px]"
              onError={() => handleLogoError(currentTestimonial.id)}
            />
          ) : (
            <div className="w-[50px] h-[25px] sm:w-[60px] sm:h-[30px] flex items-center justify-center bg-gray-100 rounded">
              <span className="text-xs text-gray-500">
                {currentTestimonial.company_name?.substring(0, 8) || "Company"}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={prevTestimonial}
          className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-100 flex items-center justify-center text-[#6a3de8]"
          aria-label="Предыдущий отзыв"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="sm:w-5 sm:h-5"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>
        <button
          onClick={nextTestimonial}
          className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#6a3de8] flex items-center justify-center text-white"
          aria-label="Следующий отзыв"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="sm:w-5 sm:h-5"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>
      </div>
    </section>
  )
}
