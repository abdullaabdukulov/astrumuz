import Image from "next/image"

interface Company {
  id: number
  name: string
  logo: string
  color: string
}

interface CompanyLogosProps {
  companies: Company[]
}

export function CompanyLogos({ companies }: CompanyLogosProps) {
  const baseUrl = "https://libraryapp5.pythonanywhere.com"

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
          Ведущие компании предлагают этот курс своим сотрудникам
        </h2>
        <div className="max-w-4xl mx-auto flex justify-between items-center flex-wrap">
          {companies.map((company) => (
            <div key={company.id} className="h-10 w-24 relative grayscale opacity-70 m-2">
              <Image
                src={`${baseUrl}${company.logo}`}
                alt={company.name}
                width={96}
                height={40}
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
      </div>
    </section>
  )
}
