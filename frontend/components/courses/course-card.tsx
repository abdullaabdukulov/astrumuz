"use client"

import type React from "react"

import type { ReactNode } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface CourseCardProps {
  title: string
  icon: ReactNode
  level?: string
  duration?: string
  href?: string
  slug?: string
}

export function CourseCard({
  title,
  icon,
  level = "Новички",
  duration = "8-12 месяцев",
  href = "#",
  slug,
}: CourseCardProps) {
  const router = useRouter()

  // Use the slug for the course detail page if provided
  const courseLink = slug ? `/courses/${slug}` : href

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    // Navigate and scroll to top
    router.push(courseLink)
  }

  return (
    <Link href={courseLink} onClick={handleClick} className="block h-full">
      <div className="bg-gray-50 rounded-xl p-6 h-full flex flex-col group hover:shadow-md transition-shadow">
        {/* Course icon */}
        <div className="mb-6">{icon}</div>

        {/* Course title */}
        <h3 className="text-lg font-bold mb-auto text-gray-900">{title}</h3>

        {/* Bottom section with badges and arrow */}
        <div className="flex items-center justify-between mt-6">
          <div className="flex flex-wrap gap-3">
            {/* Level badge */}
            <div className="flex items-center gap-1 bg-transparent text-xs text-gray-700">
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
                className="lucide lucide-zap"
              >
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
              </svg>
              <span>{level}</span>
            </div>

            {/* Duration badge */}
            <div className="flex items-center gap-1 bg-transparent text-xs text-gray-700">
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
                className="lucide lucide-clock"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <span>{duration}</span>
            </div>
          </div>

          {/* Arrow icon - hidden on mobile */}
          <div className="hidden sm:flex w-10 h-10 rounded-full bg-white items-center justify-center text-gray-400 group-hover:text-[#6a3de8] transition-colors">
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
              className="lucide lucide-arrow-up-right"
            >
              <path d="M7 7h10v10" />
              <path d="M7 17 17 7" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  )
}
