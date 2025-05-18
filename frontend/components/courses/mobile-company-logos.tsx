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

interface MobileCompanyLogosProps {
  companies: Company[]
}

export function MobileCompanyLogos({ companies = [] }: MobileCompanyLogosProps) {
  const baseUrl = "https://libraryapp5.pythonanywhere.com"
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
    <section className="py-4 sm:py-6 px-4 md:hidden">
      <h2 className="text-sm sm:text-base font-medium text-center mb-4 sm:mb-5">{logoText.leadingCompanies}</h2>
      <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4">
        {companies.map((company) => (
          <div key={company.id} className="h-6 sm:h-8 w-12 sm:w-16 relative grayscale opacity-70">
            {!imageErrors[company.id] ? (
              <Image
                src={`${baseUrl}${company.logo || ""}`}
                alt={company.name || "Company logo"}
                width={64}
                height={32}
                className="object-contain"
                onError={() => handleImageError(company.id)}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-200 rounded">
                <span className="text-[10px] text-gray-500">{company.name?.substring(0, 8) || "Company"}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
