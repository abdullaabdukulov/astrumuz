import type { Metadata } from "next"
import CourseDetailPageClient from "./CourseDetailPageClient"
import { API_ENDPOINTS } from "@/lib/constants/api"
import { pageMetadata } from "@/lib/seo-config"

// Generate metadata for the course detail page
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  try {
    // Fetch course data
    const response = await fetch(`${API_ENDPOINTS.COURSES}${params.slug}/`, { next: { revalidate: 3600 } })

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
      course.description.length > 160 ? course.description.substring(0, 157) + "..." : course.description

    return {
      title: pageMetadata.courseDetail.titleTemplate.replace("%s", course.title),
      description: pageMetadata.courseDetail.descriptionTemplate
        .replace("%s", course.title)
        .replace("%s", courseDescription),
      keywords: [course.title, course.category_name, "курс", "обучение", "IT", "программирование", "Astrum", "Ташкент"],
      openGraph: {
        title: course.title,
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

export default function CourseDetailPage({ params }: { params: { slug: string } }) {
  return <CourseDetailPageClient params={params} />
}
