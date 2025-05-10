"use client"

import { useState } from "react"

interface CourseDescriptionProps {
  courseSlug: string
  description: string
  whatWillLearn: string
}

export function CourseDescription({ courseSlug, description, whatWillLearn }: CourseDescriptionProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  // Split the description into paragraphs
  const descriptionParagraphs = description.split("\n").filter((p) => p.trim() !== "")

  // If there's only one paragraph, use it directly
  const mainDescription = descriptionParagraphs.length > 0 ? descriptionParagraphs[0] : description

  // Additional paragraphs for the expanded view
  const additionalParagraphs = descriptionParagraphs.slice(1)

  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-[#6a3de8] font-medium mb-2">Описание</div>
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Описание курса</h2>

          <div className="space-y-4 mb-8">
            <p>{mainDescription}</p>

            {isExpanded && additionalParagraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}

            {isExpanded && (
              <div>
                <h3 className="text-xl font-bold mt-6 mb-3">Чему вы научитесь:</h3>
                <p>{whatWillLearn}</p>
              </div>
            )}
          </div>

          {(additionalParagraphs.length > 0 || whatWillLearn) && (
            <button className="flex items-center text-[#6a3de8] font-medium" onClick={() => setIsExpanded(!isExpanded)}>
              {isExpanded ? "Показать меньше" : "Показать больше"}
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
          )}
        </div>
      </div>
    </section>
  )
}
