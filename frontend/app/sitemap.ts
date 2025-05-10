import type { MetadataRoute } from "next"
import { API_ENDPOINTS } from "@/lib/constants/api"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Base URLs
  const baseUrl = "https://astrum.uz"
  const baseRoutes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/courses`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/corporate`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/career`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/partners`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
  ]

  // Fetch courses for dynamic routes
  let courseRoutes: MetadataRoute.Sitemap = []
  try {
    const response = await fetch(API_ENDPOINTS.COURSES, { next: { revalidate: 3600 } })
    if (response.ok) {
      const data = await response.json()
      if (data.success && Array.isArray(data.data)) {
        courseRoutes = data.data.map((course: any) => ({
          url: `${baseUrl}/courses/${course.slug}`,
          lastModified: new Date(),
          changeFrequency: "weekly" as const,
          priority: 0.8,
        }))
      }
    }
  } catch (error) {
    console.error("Error fetching courses for sitemap:", error)
  }

  return [...baseRoutes, ...courseRoutes]
}
