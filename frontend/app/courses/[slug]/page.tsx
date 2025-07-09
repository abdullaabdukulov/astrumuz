import type { Metadata } from "next"
import { cookies } from "next/headers"
import { pageMetadata } from "@/lib/seo-config"
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
import { notFound } from "next/navigation"
import { getCourseDetail } from "@/lib/services/api"

// Generate metadata for the course detail page
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  try {
    // Get language from cookies or default to "ru"
    const cookieStore = cookies()
    const languageCookie = cookieStore.get("language")
    const language = languageCookie?.value || "ru"

    // Fetch course data with language header
    const response = await fetch(`https://astrum-api.abdukulov.uz/api/courses/${params.slug}/`, {
      next: { revalidate: 3600 },
      headers: { "Accept-Language": language },
      cache: "no-store", // Prevent caching to always get fresh data
    })

    if (!response.ok) {
      return {
        title: "Курс не найден | Astrum IT Academy",
        description: "Запрашиваемый курс не найден. Посмотрите другие курсы Astrum IT Academy.",
      }
    }

    const data = await response.json()

    if (!data.success || !data.data) {
      return {
        title: "Курс не найден | Astrum IT Academy",
        description: "Запрашиваемый курс не найден. Посмотрите другие курсы Astrum IT Academy.",
      }
    }

    const course = data.data

    // Create a description from the course data
    const courseDescription =
      course.description && course.description.length > 160
        ? course.description.substring(0, 157) + "..."
        : course.description || "Курс от Astrum IT Academy"

    return {
      title: pageMetadata.courseDetail.titleTemplate.replace("%s", course.title || ""),
      description: pageMetadata.courseDetail.descriptionTemplate
        .replace("%s", course.title || "")
        .replace("%s", courseDescription),
      keywords: [
        course.title || "",
        course.category_name || "",
        "курс",
        "обучение",
        "IT",
        "программирование",
        "Astrum",
        "Ташкент",
      ].filter(Boolean),
      openGraph: {
        title: course.title || "Курс | Astrum IT Academy",
        description: courseDescription,
        url: `https://astrum.uz/courses/${params.slug}`,
        type: "website",
      },
    }
  } catch (error) {
    console.error("Error generating metadata:", error)
    return {
      title: "Курс | Astrum IT Academy",
      description: "Курсы программирования и IT в Astrum Academy. Начните свой путь в IT с нами!",
    }
  }
}

async function getCourseData(slug: string) {
  try {
    // Get language from cookies or default to "ru"
    const cookieStore = cookies()
    const languageCookie = cookieStore.get("language")
    const language = languageCookie?.value || "ru"

    // Pass language to the API function
    const response = await getCourseDetail(slug, language)

    if (!response?.success || !response?.data) {
      console.error("Invalid data format received from API:", response)
      return null
    }

    return response.data
  } catch (error) {
    console.error("Error fetching course data:", error)
    return null
  }
}

export default async function CourseDetailPage({ params }: { params: { slug: string } }) {
  const courseData = await getCourseData(params.slug)

  // If no course data is found, show 404 page
  if (!courseData) {
    notFound()
  }

  // Format course data for components with fallbacks for missing data
  const course = {
    id: courseData.id || 0,
    title: courseData.title || "Курс",
    description: courseData.description || "",
    level: courseData.level || "Новички",
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

      {/* Structured Data */}
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
