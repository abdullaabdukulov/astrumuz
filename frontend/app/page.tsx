import type { Metadata } from "next"
import { pageMetadata } from "@/lib/seo-config"
import ClientPage from "./ClientPage"

export const metadata: Metadata = {
  title: pageMetadata.home.title,
  description: pageMetadata.home.description,
  keywords: pageMetadata.home.keywords,
}

export default function Home() {
  return <ClientPage />
}
