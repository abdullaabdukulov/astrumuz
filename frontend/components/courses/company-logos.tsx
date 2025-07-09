"use client"

import Image from "next/image"
import { useState } from "react"
import { useLanguage } from "@/lib/context/language-context"
import { translations } from "@/lib/translations"

interface Company {
  id: number
  name: string
  logo: string
  color: string
}

interface CompanyLogosProps {
  companies: Company[]
}

export function CompanyLogos({ companies = [] }: CompanyLogosProps) {
  const baseUrl = "https://astrum-api.abdukulov.uz"
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({})
  const { language } = useLanguage()

  // Get translations for the current language
  const logoText =
    translations.companyLogos[language as keyof typeof translations.companyLogos] || translations.companyLogos.ru

  // Handle image error
  const handleImageError = (companyId: number) => {
    setImageErrors((prev) => ({
      ...prev,
      [companyId]: true,
    }))
  }

  if (!companies || companies.length === 0) {
    return null
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">{logoText.leadingCompanies}</h2>
        <div className="max-w-4xl mx-auto flex justify-between items-center flex-wrap">
          {companies.map((company) => (
            <div key={company.id} className="h-10 w-24 relative grayscale opacity-70 m-2">
              {!imageErrors[company.id] ? (
                <Image
                  src={`${baseUrl}${company.logo || ""}`}
                  alt={company.name || "Company logo"}
                  width={96}
                  height={40}
                  className="object-contain"
                  onError={() => handleImageError(company.id)}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-200 rounded">
                  <span className="text-xs text-gray-500">{company.name || "Company"}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
