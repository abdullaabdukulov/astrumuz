import type { Metadata } from "next"
import { pageMetadata } from "@/lib/seo-config"
import CoursesPageClient from "./CoursesPageClient"

export const metadata: Metadata = {
  title: pageMetadata.courses.title,
  description: pageMetadata.courses.description,
  keywords: pageMetadata.courses.keywords,
}

export default function CoursesPage() {
  return <CoursesPageClient />
}
