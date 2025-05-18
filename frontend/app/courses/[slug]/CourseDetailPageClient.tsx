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
import { CourseStructuredData } from "@/components/seo/structured-data"
import { useLanguage } from "@/lib/context/language-context"
import { getCourseDetail } from "@/lib/services/api"

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
  const { language } = useLanguage()

  // Update the useEffect hook to properly handle language changes
  useEffect(() => {
    async function fetchCourseDetail() {
      try {
        setIsLoading(true)
        setError(null)

        // Always pass the current language to the API call
        const response = await getCourseDetail(params.slug, language)

        if (!response.success || !response.data) {
          throw new Error("Failed to fetch course details")
        }

        setCourseData(response.data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
        console.error("Error fetching course details:", err)
      } finally {
        setIsLoading(false)
      }
    }

    // Clear previous data when language changes to avoid showing stale data
    if (language) {
      setCourseData(null)
      fetchCourseDetail()
    }
  }, [params.slug, language]) // Re-fetch when language changes

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
    id: courseData.id || 0,
    title: courseData.title || "Курс",
    description: courseData.description || "",
    level:
      courseData.level === "beginner" ? "Новички" : courseData.level === "intermediate" ? "Средний" : "Продвинутый",
    duration: courseData.duration || "8-12 месяцев",
    icon: courseData.icon_type || "",
    slug: courseData.slug || params.slug,
    videoHours: courseData.video_hours || 0,
    codingExercises: courseData.coding_exercises || 0,
    articles: courseData.articles || 0,
    hasCertificate: Boolean(courseData.has_certificate),
    whatWillLearn: courseData.what_will_learn || "",
    outcomes: Array.isArray(courseData.outcomes) ? courseData.outcomes : [],
    isNew: Boolean(courseData.is_new),
    featured: Boolean(courseData.featured),
  }

  // Ensure arrays exist with fallbacks
  const companies = Array.isArray(courseData.companies) ? courseData.companies : []
  const testimonials = Array.isArray(courseData.testimonials) ? courseData.testimonials : []
  const mentors = Array.isArray(courseData.mentors) ? courseData.mentors : []
  const relatedCourses = Array.isArray(courseData.related_courses) ? courseData.related_courses : []

  return (
    <main className="min-h-screen flex flex-col">
      {/* Mobile Course Header */}
      <MobileCourseHeader title={course.title} />

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
        courseId={course.id}
        outcomes={course.outcomes}
        videoHours={course.videoHours}
        codingExercises={course.codingExercises}
        articles={course.articles}
        hasCertificate={course.hasCertificate}
      />

      {/* Mobile Course Description */}
      <MobileCourseDescription
        courseSlug={params.slug}
        description={course.description}
        whatWillLearn={course.whatWillLearn}
      />

      {/* Mobile Company Logos section */}
      <MobileCompanyLogos companies={companies} />

      {/* Mobile Testimonials section */}
      <MobileTestimonials testimonials={testimonials} />

      {/* Course description section - hidden on mobile */}
      <div className="hidden md:block">
        <CourseDescription
          courseSlug={params.slug}
          description={course.description}
          whatWillLearn={course.whatWillLearn}
        />
      </div>

      {/* Company logos section - hidden on mobile */}
      <div className="hidden md:block">
        <CompanyLogos companies={companies} />
      </div>

      {/* Course testimonials section - hidden on mobile */}
      <div className="hidden md:block">
        <CourseTestimonials testimonials={testimonials} />
      </div>

      {/* Course mentors section */}
      <CourseMentors mentors={mentors} />

      {/* Related courses section */}
      <RelatedCourses currentCourseSlug={params.slug} relatedCourses={relatedCourses} />

      {/* Footer - hidden on mobile */}
      <div className="hidden md:block">
        <Footer />
      </div>

      {/* Mobile Navigation */}
      <MobileNavigation />
      <CourseStructuredData
        name={course.title}
        description={course.description}
        provider="Astrum IT Academy"
        url={`https://astrum.uz/courses/${params.slug}`}
        image={courseData.icon ? `https://libraryapp5.pythonanywhere.com${courseData.icon}` : undefined}
      />
    </main>
  )
}
