"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { CourseCard } from "./course-card"
import { API_ENDPOINTS } from "@/lib/constants/api"

interface Course {
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

interface CoursesSectionProps {
  selectedCategory?: string
}

export function CoursesSection({ selectedCategory = "all" }: CoursesSectionProps) {
  const [courses, setCourses] = useState<Course[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchCourses() {
      try {
        setIsLoading(true)

        // Build the URL based on the selected category
        let url = API_ENDPOINTS.COURSES
        if (selectedCategory !== "all") {
          url += `?category=${selectedCategory}`
        }

        const response = await fetch(url)

        if (!response.ok) {
          throw new Error("Failed to fetch courses")
        }

        const data = await response.json()

        if (data.success && Array.isArray(data.data)) {
          setCourses(data.data)
        } else {
          throw new Error("Invalid data format")
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
        console.error("Error fetching courses:", err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCourses()
  }, [selectedCategory]) // Re-fetch when selectedCategory changes

  // Function to render the appropriate icon based on icon_type
  const renderCourseIcon = (iconType: string) => {
    switch (iconType) {
      case "python":
        return (
          <div className="flex justify-center">
            <div className="w-14 h-14 flex items-center justify-center bg-blue-50 rounded-full p-2">
              <Image
                src="/python-logo.png"
                alt="Python"
                width={48}
                height={48}
                className="object-contain"
                style={{ maxWidth: "100%", height: "auto" }}
              />
            </div>
          </div>
        )
      case "php":
        return (
          <div className="flex justify-center">
            <div className="w-14 h-14 bg-red-500 rounded-full flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-boxes"
              >
                <path d="M7 5v11l4-3 4 3V5" />
                <rect width="18" height="18" x="3" y="3" rx="2" />
              </svg>
            </div>
          </div>
        )
      case "node":
        return (
          <div className="flex justify-center">
            <div className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-hexagon"
              >
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
              </svg>
            </div>
          </div>
        )
      case "csharp":
        return (
          <div className="flex justify-center">
            <div className="w-14 h-14 bg-purple-800 rounded-full flex items-center justify-center">
              <span className="text-white text-xl font-bold">C#</span>
            </div>
          </div>
        )
      case "react":
        return (
          <div className="flex justify-center">
            <div className="w-14 h-14 bg-blue-900 rounded-full flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-atom"
              >
                <circle cx="12" cy="12" r="1" />
                <path d="M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5Z" />
                <path d="M15.7 15.7c4.52-4.54 6.54-9.87 4.5-11.9-2.03-2.04-7.36-.02-11.9 4.5-4.52 4.54-6.54 9.87-4.5 11.9 2.03 2.04 7.36.02 11.9-4.5Z" />
              </svg>
            </div>
          </div>
        )
      case "3d":
        return (
          <div className="flex justify-center">
            <div className="w-14 h-14 bg-teal-500 rounded-full flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-cube"
              >
                <path d="m21 16-9 5-9-5V8l9-5 9 5v8z" />
                <path d="M12 21V12" />
                <path d="m12 12 9-4" />
                <path d="m9 8 3 4" />
              </svg>
            </div>
          </div>
        )
      case "security":
        return (
          <div className="flex justify-center">
            <div className="w-14 h-14 bg-red-700 rounded-full flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-shield"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
          </div>
        )
      default:
        return (
          <div className="flex justify-center">
            <div className="w-14 h-14 bg-gray-500 rounded-full flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-code"
              >
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
              </svg>
            </div>
          </div>
        )
    }
  }

  return (
    <section id="courses" className="bg-white py-6 px-4 md:py-12 lg:py-16">
      <div className="container mx-auto">
        {/* Section header */}
        <div className="mb-6 md:mb-12 lg:mb-16 max-w-[1200px] mx-auto">
          <div className="text-[#6a3de8] text-xl font-medium mb-2 hidden md:block">Образование и курсы</div>
          <div className="flex flex-col md:flex-row md:items-start md:justify-between">
            <h2 className="text-2xl font-bold mb-4 md:text-3xl lg:text-4xl md:mb-0 md:w-1/3">Изучайте IT сферу</h2>
            <p className="text-gray-700 md:w-1/2 hidden md:block lg:text-lg">
              С помощью искусственного интеллекта курсы программирования в нашей академии систематизированы таким
              образом, что к моменту окончания учебы у вас будет достаточно знаний и хорошее портфолио
            </p>
          </div>
        </div>

        {/* Loading state */}
        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#6a3de8]"></div>
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className="text-center py-12">
            <p className="text-red-500 mb-4">{error}</p>
            <button onClick={() => window.location.reload()} className="bg-[#6a3de8] text-white px-4 py-2 rounded-full">
              Попробовать снова
            </button>
          </div>
        )}

        {/* Course cards - responsive grid layout for all devices */}
        {!isLoading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-[1200px] mx-auto">
            {courses.length > 0 ? (
              courses.map((course) => (
                <CourseCard
                  key={course.id}
                  title={course.title}
                  icon={renderCourseIcon(course.icon_type)}
                  level={
                    course.level === "beginner"
                      ? "Новички"
                      : course.level === "intermediate"
                        ? "Средний"
                        : "Продвинутый"
                  }
                  duration={course.duration}
                  slug={course.slug}
                />
              ))
            ) : (
              <div className="col-span-3 text-center py-12">
                <p className="text-gray-500">Курсы не найдены</p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
