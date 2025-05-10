"use client"

import { useState } from "react"

interface MobileCourseDescriptionProps {
  courseSlug: string
  description: string
  whatWillLearn: string
}

export function MobileCourseDescription({ courseSlug, description, whatWillLearn }: MobileCourseDescriptionProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  // Split the description into paragraphs
  const descriptionParagraphs = description.split("\n").filter((p) => p.trim() !== "")

  // If there's only one paragraph, use it directly
  const mainDescription = descriptionParagraphs.length > 0 ? descriptionParagraphs[0] : description

  // Additional paragraphs for the expanded view
  const additionalParagraphs = descriptionParagraphs.slice(1)

  return (
    <section className="py-4 sm:py-6 px-4 md:hidden">
      <div className="mb-2 text-[#6a3de8] text-xs sm:text-sm font-medium">Описание</div>
      <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Описание курса</h2>

      <div className="space-y-2 sm:space-y-3 mb-3 sm:mb-4">
        <p className="text-xs sm:text-sm">{mainDescription}</p>

        {isExpanded &&
          additionalParagraphs.map((paragraph, index) => (
            <p key={index} className="text-xs sm:text-sm">
              {paragraph}
            </p>
          ))}

        {isExpanded && whatWillLearn && (
          <div>
            <h3 className="text-sm sm:text-base font-bold mt-3 mb-2">Чему вы научитесь:</h3>
            <p className="text-xs sm:text-sm">{whatWillLearn}</p>
          </div>
        )}
      </div>

      {(additionalParagraphs.length > 0 || whatWillLearn) && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center text-[#6a3de8] text-xs sm:text-sm font-medium"
        >
          {isExpanded ? "Показать меньше" : "Показать больше"}{" "}
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
            className={`ml-1 transition-transform ${isExpanded ? "rotate-180" : ""}`}
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>
      )}
    </section>
  )
}
