"use client"

import { useState, useEffect } from "react"
import { CourseCard } from "./course-card"
import { useLanguage } from "@/lib/context/language-context"
import { getCourses } from "@/lib/services/api"

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

export function CoursesSection({ selectedCategory }: CoursesSectionProps) {
  const [courses, setCourses] = useState<Course[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [currentCategory, setCurrentCategory] = useState<string>(selectedCategory || "all")
  const { language } = useLanguage()

  // Translations for section texts
  const sectionTexts = {
    ru: {
      education: "Образование и курсы",
      learnIT: "Изучайте IT сферу",
      description:
        "С помощью искусственного интеллекта курсы программирования в нашей академии систематизированы таким образом, что к моменту окончания учебы у вас будет достаточно знаний и хорошее портфолио",
      loading: "Загрузка...",
      tryAgain: "Попробовать снова",
      noCoursesFound: "Курсы не найдены",
    },
    uz: {
      education: "Ta'lim va kurslar",
      learnIT: "IT sohasini o'rganing",
      description:
        "Sun'iy intellekt yordamida akademiyamizdagi dasturlash kurslari shunday tizimlashtiriladiki, o'qishni tugatganingizda sizda yetarli bilim va yaxshi portfolio bo'ladi",
      loading: "Yuklanmoqda...",
      tryAgain: "Qayta urinib ko'ring",
      noCoursesFound: "Kurslar topilmadi",
    },
    en: {
      education: "Education and courses",
      learnIT: "Learn IT sphere",
      description:
        "With the help of artificial intelligence, programming courses in our academy are systematized in such a way that by the time you finish your studies, you will have enough knowledge and a good portfolio",
      loading: "Loading...",
      tryAgain: "Try again",
      noCoursesFound: "No courses found",
    },
  }

  const currentText = sectionTexts[language as keyof typeof sectionTexts] || sectionTexts.ru

  // Listen for URL parameter changes or custom events
  useEffect(() => {
    // Set initial category from URL if available
    if (typeof window !== "undefined") {
      try {
        const urlParams = new URLSearchParams(window.location.search)
        const categoryParam = urlParams.get("category")
        if (categoryParam) {
          setCurrentCategory(categoryParam)
        }
      } catch (error) {
        console.error("Error parsing URL parameters:", error)
      }
    }

    // Listen for category changes from FilterTabs
    const handleCategoryChange = (event: CustomEvent) => {
      if (event.detail && event.detail.category) {
        setCurrentCategory(event.detail.category)
      }
    }

    if (typeof window !== "undefined") {
      window.addEventListener("categoryChanged", handleCategoryChange as EventListener)

      return () => {
        window.removeEventListener("categoryChanged", handleCategoryChange as EventListener)
      }
    }

    return undefined
  }, [])

  // Update category when prop changes
  useEffect(() => {
    if (selectedCategory) {
      setCurrentCategory(selectedCategory)
    }
  }, [selectedCategory])

  // Fetch courses when category or language changes
  useEffect(() => {
    async function fetchCourses() {
      try {
        setIsLoading(true)
        const response = await getCourses(currentCategory !== "all" ? currentCategory : undefined)

        if (response?.success && Array.isArray(response.data)) {
          setCourses(response.data)
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
  }, [currentCategory, language]) // Re-fetch when currentCategory or language changes

  // Function to render the appropriate icon based on icon_type
  const renderCourseIcon = (course: Course) => {
    // API-dan kelgan to'liq URL-ni ishlatamiz
    const iconUrl = course.icon || `/images/${course.icon_type || "default"}-logo.png`

    return iconUrl
  }

  return (
    <section id="courses" className="bg-white py-6 px-4 md:py-12 lg:py-16">
      <div className="container mx-auto">
        {/* Section header */}
        <div className="mb-6 md:mb-12 lg:mb-16 max-w-[1200px] mx-auto">
          <div className="text-[#6a3de8] text-xl font-medium mb-2 hidden md:block">{currentText.education}</div>
          <div className="flex flex-col md:flex-row md:items-start md:justify-between">
            <h2 className="text-2xl font-bold mb-4 md:text-3xl lg:text-4xl md:mb-0 md:w-1/3">{currentText.learnIT}</h2>
            <p className="text-gray-700 md:w-1/2 hidden md:block lg:text-lg">{currentText.description}</p>
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
              {currentText.tryAgain}
            </button>
          </div>
        )}

        {/* Course cards - responsive grid layout for all devices */}
        {!isLoading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-[1200px] mx-auto">
            {courses && courses.length > 0 ? (
              courses.map((course) => (
                <CourseCard
                  key={course.id}
                  title={course.title || ""}
                  iconUrl={course.icon || ""}
                  iconType={course.icon_type || "default"}
                  level={course.level || ""}
                  duration={course.duration || ""}
                  slug={course.slug || ""}
                />
              ))
            ) : (
              <div className="col-span-3 text-center py-12">
                <p className="text-gray-500">{currentText.noCoursesFound}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
