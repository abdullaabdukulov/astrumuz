"use client"

import { useState } from "react"
import { useLanguage } from "@/lib/context/language-context"

interface MobileCourseDescriptionProps {
  courseSlug: string
  description: string
  whatWillLearn: string
}

export function MobileCourseDescription({ courseSlug, description, whatWillLearn }: MobileCourseDescriptionProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const { language } = useLanguage()

  // Get translations for the current language
  const courseTexts = {
    ru: {
      description: "Описание",
      courseDescription: "Описание курса",
      whatYouWillLearn: "Чему вы научитесь:",
      showMore: "Показать больше",
      showLess: "Показать меньше",
    },
    uz: {
      description: "Tavsif",
      courseDescription: "Kurs tavsifi",
      whatYouWillLearn: "Nimani o'rganasiz:",
      showMore: "Ko'proq ko'rsatish",
      showLess: "Yashirish",
    },
    en: {
      description: "Description",
      courseDescription: "Course Description",
      whatYouWillLearn: "What you will learn:",
      showMore: "Show more",
      showLess: "Show less",
    },
  }

  const currentText = courseTexts[language as keyof typeof courseTexts] || courseTexts.ru

  // Split the description into paragraphs
  const descriptionParagraphs = description.split("\n").filter((p) => p.trim() !== "")

  // If there's only one paragraph, use it directly
  const mainDescription = descriptionParagraphs.length > 0 ? descriptionParagraphs[0] : description

  // Additional paragraphs for the expanded view
  const additionalParagraphs = descriptionParagraphs.slice(1)

  return (
    <section className="py-4 sm:py-6 px-4 pb-24 md:hidden">
      <div className="mb-2 text-[#6a3de8] text-xs sm:text-sm font-medium">{currentText.description}</div>
      <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">{currentText.courseDescription}</h2>

      {/* Main description is always visible */}
      <div className="space-y-2 sm:space-y-3 mb-6">
        <p className="text-xs sm:text-sm">{mainDescription}</p>
      </div>

      {/* Expanded content appears after clicking the button */}
      {isExpanded && (
        <div className="space-y-2 sm:space-y-3 mb-10">
          {additionalParagraphs.map((paragraph, index) => (
            <p key={index} className="text-xs sm:text-sm">
              {paragraph}
            </p>
          ))}

          {whatWillLearn && (
            <div>
              <h3 className="text-sm sm:text-base font-bold mt-3 mb-2">{currentText.whatYouWillLearn}</h3>
              <p className="text-xs sm:text-sm">{whatWillLearn}</p>
            </div>
          )}
        </div>
      )}

      {/* Large, prominent button that's easy to tap */}
      {(additionalParagraphs.length > 0 || whatWillLearn) && (
        <div className="mt-4 mb-16">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full py-3 px-4 bg-gray-100 rounded-lg flex items-center justify-center text-[#6a3de8] font-medium text-sm"
            style={{ minHeight: "44px" }} // Ensure minimum touch target size
          >
            {isExpanded ? currentText.showLess : currentText.showMore}
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
              className={`ml-2 transition-transform ${isExpanded ? "rotate-180" : ""}`}
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>
        </div>
      )}
    </section>
  )
}
