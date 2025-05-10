import Image from "next/image"

interface Company {
  id: number
  name: string
  logo: string
  color: string
}

interface MobileCompanyLogosProps {
  companies: Company[]
}

export function MobileCompanyLogos({ companies }: MobileCompanyLogosProps) {
  const baseUrl = "https://libraryapp5.pythonanywhere.com"

  return (
    <section className="py-4 sm:py-6 px-4 md:hidden">
      <h2 className="text-sm sm:text-base font-medium text-center mb-4 sm:mb-5">
        Ведущие компании предлагают этот курс своим сотрудникам
      </h2>
      <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4">
        {companies.map((company) => (
          <div key={company.id} className="h-6 sm:h-8 w-12 sm:w-16 relative grayscale opacity-70">
            <Image
              src={`${baseUrl}${company.logo}`}
              alt={company.name}
              width={64}
              height={32}
              className="object-contain"
              onError={(e) => {
                // Fallback to a placeholder if image fails to load
                const target = e.target as HTMLImageElement
                target.src = "/generic-company-logo.png"
              }}
            />
          </div>
        ))}
      </div>
    </section>
  )
}
