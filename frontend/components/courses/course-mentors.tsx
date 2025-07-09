"use client"

import Image from "next/image"
import { useState } from "react"
import { useLanguage } from "@/lib/context/language-context"
import { translations } from "@/lib/translations"

interface Mentor {
  id: number
  name: string
  position: string
  bio: string
  photo: string
}

interface CourseMentorsProps {
  mentors: Mentor[]
}

export function CourseMentors({ mentors = [] }: CourseMentorsProps) {
  const baseUrl = "https://astrum-api.abdukulov.uz"
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({})
  const { language } = useLanguage()

  // Get translations for the current language
  const mentorText =
    translations.courseMentors[language as keyof typeof translations.courseMentors] || translations.courseMentors.ru

  // Handle image error
  const handleImageError = (mentorId: number) => {
    setImageErrors((prev) => ({
      ...prev,
      [mentorId]: true,
    }))
  }

  // If no mentors, don't render the section
  if (!mentors || mentors.length === 0) {
    return null
  }

  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-[#6a3de8] font-medium mb-2">{mentorText.ourMentors}</div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{mentorText.strongMentors}</h2>
          <p className="text-gray-700 text-lg mb-10 max-w-3xl">{mentorText.helpDescription}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mentors.map((mentor) => (
              <div key={mentor.id} className="relative rounded-3xl overflow-hidden h-[300px]">
                {!imageErrors[mentor.id] ? (
                  <Image
                    src={`${baseUrl}${mentor.photo || ""}`}
                    alt={mentor.name || "Mentor"}
                    fill
                    className="object-cover"
                    onError={() => handleImageError(mentor.id)}
                  />
                ) : (
                  <div className="w-full h-full bg-gray-300 flex flex-col items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="64"
                      height="64"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#6a3de8"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </div>
                )}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 to-transparent text-white">
                  <h3 className="text-2xl font-bold mb-1">{mentor.name || "Ментор"}</h3>
                  <p className="text-lg">{mentor.position || "Преподаватель"}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
