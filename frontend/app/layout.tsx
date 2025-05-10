import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ScrollToTop } from "@/components/utils/scroll-to-top"
import { LanguageProvider } from "@/lib/context/language-context"
import { defaultMetadata } from "@/lib/seo-config"
import { OrganizationStructuredData } from "@/components/seo/structured-data"

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
})

export const metadata: Metadata = defaultMetadata

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <LanguageProvider>
          <ScrollToTop />
          {children}
        </LanguageProvider>
        <OrganizationStructuredData
          name="Astrum IT Academy"
          url="https://astrum.uz"
          logo="https://astrum.uz/images/logo.png"
          sameAs={[
            "https://facebook.com/astrumuz",
            "https://twitter.com/astrumuz",
            "https://instagram.com/astrumuz",
            "https://linkedin.com/company/astrumuz",
          ]}
        />
      </body>
    </html>
  )
}
