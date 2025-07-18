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

interface CourseTestimonialsProps {
  testimonials: Testimonial[]
}

export function CourseTestimonials({ testimonials = [] }: CourseTestimonialsProps) {
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

  // Calculate indices for visible testimonials (current and next two)
  const visibleIndices = [
    currentIndex,
    (currentIndex + 1) % testimonials.length,
    (currentIndex + 2) % testimonials.length,
  ]

  return (
    <section className="py-12 md:py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <div className="text-[#6a3de8] font-medium mb-2">Отзывы</div>
              <h2 className="text-3xl font-bold">Отзывы о курсе</h2>
            </div>
            <div className="flex gap-4">
              <button
                onClick={prevTestimonial}
                className="w-12 h-12 rounded-full bg-[#f5f3ff] flex items-center justify-center hover:bg-[#ede9fe] transition-colors"
                aria-label="Previous testimonial"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#6a3de8"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m15 18-6-6 6-6" />
                </svg>
              </button>
              <button
                onClick={nextTestimonial}
                className="w-12 h-12 rounded-full bg-[#6a3de8] flex items-center justify-center hover:bg-[#5a2ed8] transition-colors"
                aria-label="Next testimonial"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {visibleIndices.map((index) => {
              const testimonial = testimonials[index]
              if (!testimonial) return null

              return (
                <div key={testimonial.id} className="bg-white rounded-xl p-6 shadow-sm relative">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full overflow-hidden mr-3 bg-gray-200">
                      {!avatarErrors[testimonial.id] ? (
                        <Image
                          src={`${baseUrl}${testimonial.avatar || ""}`}
                          alt={testimonial.name || "Person"}
                          width={40}
                          height={40}
                          className="object-cover"
                          onError={() => handleAvatarError(testimonial.id)}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-300">
                          <span className="text-xs text-gray-600">{testimonial.name?.charAt(0) || "U"}</span>
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium">{testimonial.name || "Пользователь"}</h3>
                      <p className="text-sm text-gray-500">
                        {testimonial.position || "Студент"}{" "}
                        <span style={{ color: testimonial.company_color || "#6a3de8" }}>
                          {testimonial.company_name || ""}
                        </span>
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-12 text-sm">{testimonial.text || "Отличный курс!"}</p>

                  <div className="absolute bottom-6 left-6">
                    <div className="w-10 h-10 rounded-full bg-white border border-gray-100 flex items-center justify-center shadow-sm">
                      {!logoErrors[testimonial.id] ? (
                        <Image
                          src={`${baseUrl}${testimonial.company_logo || ""}`}
                          alt={testimonial.company_name || "Company"}
                          width={20}
                          height={20}
                          className="object-contain"
                          onError={() => handleLogoError(testimonial.id)}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-[8px] text-gray-500">
                            {testimonial.company_name?.substring(0, 2) || "Co"}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
