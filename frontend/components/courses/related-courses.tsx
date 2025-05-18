"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

interface RelatedCourse {
  id: number
  title: string
  slug: string
  description: string
  icon: string | null
  icon_type: string
  level: string
  duration: string
  featured: boolean
  is_new: boolean
  category: number
  category_name: string
}

interface RelatedCoursesProps {
  currentCourseSlug: string
  relatedCourses: RelatedCourse[]
}

export function RelatedCourses({ currentCourseSlug, relatedCourses = [] }: RelatedCoursesProps) {
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({})

  // Handle image error
  const handleImageError = (courseId: number) => {
    setImageErrors((prev) => ({
      ...prev,
      [courseId]: true,
    }))
  }

  // Function to render the appropriate icon based on icon_type
  const renderCourseIcon = (iconType: string) => {
    switch (iconType) {
      case "python":
        return "/python-logo.png"
      case "php":
        return "/php-logo.png"
      case "node":
        return "/nodejs-logo.png"
      case "csharp":
        return "/csharp-logo.png"
      case "react":
        return "/react-logo.png"
      case "3d":
        return "/3dmax-logo.png"
      default:
        return "/online-learning-platform.png"
    }
  }

  // Filter out the current course and ensure we have valid courses
  const filteredCourses = relatedCourses
    .filter((course) => course && course.slug && course.slug !== currentCourseSlug)
    .slice(0, 3) // Limit to 3 courses

  // If no related courses, don't render the section
  if (!filteredCourses || filteredCourses.length === 0) {
    return null
  }

  return (
    <section className="py-12 md:py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-[#6a3de8] font-medium mb-2">Рекомендации</div>
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Так же студенты выбирают</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <div key={course.id} className="bg-white rounded-xl p-6 shadow-sm">
                <div className="mb-4 h-16 flex items-center">
                  {!imageErrors[course.id] ? (
                    <Image
                      src={renderCourseIcon(course.icon_type || "")}
                      alt={course.title || "Course"}
                      width={64}
                      height={64}
                      className="object-contain"
                      onError={() => handleImageError(course.id)}
                    />
                  ) : (
                    <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                      <span className="text-gray-500 text-xs">Курс</span>
                    </div>
                  )}
                </div>
                <h3 className="text-xl font-bold mb-4">{course.title || "Курс"}</h3>

                <div className="flex flex-wrap gap-3 mb-6">
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
                    <span>
                      {course.level === "beginner"
                        ? "Новички"
                        : course.level === "intermediate"
                          ? "Средний"
                          : "Продвинутый"}
                    </span>
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
                    <span>{course.duration || "8-12 месяцев"}</span>
                  </div>
                </div>

                <Link
                  href={`/courses/${course.slug}`}
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors ml-auto"
                >
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
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
