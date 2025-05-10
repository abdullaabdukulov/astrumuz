"use client"

import { useState, useEffect } from "react"
import { MarqueeBanner } from "@/components/ui/marquee-banner"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { MobileNavigation } from "@/components/layout/mobile-navigation"
import { CourseHeroSection } from "@/components/courses/course-hero-section"
import { CourseOutcomes } from "@/components/courses/course-outcomes"
import { CompanyLogos } from "@/components/courses/company-logos"
import { CourseDescription } from "@/components/courses/course-description"
import { CourseTestimonials } from "@/components/courses/course-testimonials"
import { CourseMentors } from "@/components/courses/course-mentors"
import { RelatedCourses } from "@/components/courses/related-courses"
import { MobileCourseHeader } from "@/components/courses/mobile-course-header"
import { MobileCompanyLogos } from "@/components/courses/mobile-company-logos"
import { MobileCourseDescription } from "@/components/courses/mobile-course-description"
import { MobileTestimonials } from "@/components/courses/mobile-testimonials"
import { API_ENDPOINTS } from "@/lib/constants/api"
import { CourseStructuredData } from "@/components/seo/structured-data"

interface CourseParams {
  params: {
    slug: string
  }
}

interface Outcome {
  id: number
  text: string
  order: number
}

interface Mentor {
  id: number
  name: string
  position: string
  bio: string
  photo: string
}

interface Company {
  id: number
  name: string
  logo: string
  color: string
}

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

interface CourseDetail {
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
  what_will_learn: string
  video_hours: number
  coding_exercises: number
  articles: number
  has_certificate: boolean
  outcomes: Outcome[]
  mentors: Mentor[]
  companies: Company[]
  testimonials: Testimonial[]
  related_courses: RelatedCourse[]
}

export default function CourseDetailPageClient({ params }: CourseParams) {
  const [courseData, setCourseData] = useState<CourseDetail | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchCourseDetail() {
      try {
        setIsLoading(true)
        const response = await fetch(`${API_ENDPOINTS.COURSES}${params.slug}/`)

        if (!response.ok) {
          throw new Error("Failed to fetch course details")
        }

        const data = await response.json()

        if (data.success && data.data) {
          setCourseData(data.data)
        } else {
          throw new Error("Invalid data format")
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
        console.error("Error fetching course details:", err)
      } finally {
        setIsLoading(false)
      }
    }

    if (params.slug) {
      fetchCourseDetail()
    }
  }, [params.slug])

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#6a3de8]"></div>
      </div>
    )
  }

  // Error state
  if (error || !courseData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold text-red-500 mb-4">Ошибка загрузки курса</h1>
        <p className="text-gray-700 mb-6">{error || "Не удалось загрузить данные курса"}</p>
        <button onClick={() => window.location.reload()} className="bg-[#6a3de8] text-white px-6 py-3 rounded-full">
          Попробовать снова
        </button>
      </div>
    )
  }

  // Format course data for components
  const course = {
    id: courseData.id,
    title: courseData.title,
    description: courseData.description,
    level:
      courseData.level === "beginner" ? "Новички" : courseData.level === "intermediate" ? "Средний" : "Продвинутый",
    duration: courseData.duration,
    icon: courseData.icon_type,
    slug: courseData.slug,
    videoHours: courseData.video_hours,
    codingExercises: courseData.coding_exercises,
    articles: courseData.articles,
    hasCertificate: courseData.has_certificate,
    whatWillLearn: courseData.what_will_learn,
    outcomes: courseData.outcomes,
    isNew: courseData.is_new,
    featured: courseData.featured,
  }

  return (
    <main className="min-h-screen flex flex-col">
      {/* Mobile Course Header */}
      <MobileCourseHeader title={courseData.title} />

      {/* Top banner - hidden on mobile */}
      <div className="hidden md:block">
        <MarqueeBanner />
      </div>

      {/* Header with contact info - hidden on mobile */}
      <div className="hidden md:block">
        <Header />
      </div>

      {/* Hero section with course details */}
      <CourseHeroSection course={course} />

      {/* Course outcomes section */}
      <CourseOutcomes
        courseSlug={params.slug}
        courseId={courseData.id}
        outcomes={courseData.outcomes}
        videoHours={courseData.video_hours}
        codingExercises={courseData.coding_exercises}
        articles={courseData.articles}
        hasCertificate={courseData.has_certificate}
      />

      {/* Mobile Course Description */}
      <MobileCourseDescription
        courseSlug={params.slug}
        description={courseData.description}
        whatWillLearn={courseData.what_will_learn}
      />

      {/* Mobile Company Logos section */}
      <MobileCompanyLogos companies={courseData.companies} />

      {/* Mobile Testimonials section */}
      <MobileTestimonials testimonials={courseData.testimonials} />

      {/* Company logos section - hidden on mobile */}
      <div className="hidden md:block">
        <CompanyLogos companies={courseData.companies} />
      </div>

      {/* Course description section - hidden on mobile */}
      <div className="hidden md:block">
        <CourseDescription
          courseSlug={params.slug}
          description={courseData.description}
          whatWillLearn={courseData.what_will_learn}
        />
      </div>

      {/* Course testimonials section - hidden on mobile */}
      <div className="hidden md:block">
        <CourseTestimonials testimonials={courseData.testimonials} />
      </div>

      {/* Course mentors section */}
      <CourseMentors mentors={courseData.mentors} />

      {/* Related courses section */}
      <RelatedCourses currentCourseSlug={params.slug} relatedCourses={courseData.related_courses} />

      {/* Footer - hidden on mobile */}
      <div className="hidden md:block">
        <Footer />
      </div>

      {/* Mobile Navigation */}
      <MobileNavigation />
      <CourseStructuredData
        name={courseData.title}
        description={courseData.description}
        provider="Astrum IT Academy"
        url={`https://astrum.uz/courses/${params.slug}`}
        image={courseData.icon ? `https://libraryapp5.pythonanywhere.com${courseData.icon}` : undefined}
      />
    </main>
  )
}
