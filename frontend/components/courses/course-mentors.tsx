import Image from "next/image"

interface Mentor {
  id: number
  name: string
  position: string
  bio: string
  photo: string
}

interface CourseMentorsProps {
  mentors: Mentor[]
}

export function CourseMentors({ mentors }: CourseMentorsProps) {
  const baseUrl = "https://libraryapp5.pythonanywhere.com"

  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-[#6a3de8] font-medium mb-2">Наши менторы</div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Самые сильные менторы с большим опытом</h2>
          <p className="text-gray-700 text-lg mb-10 max-w-3xl">
            Помогут вам чтобы вы могли получить качественное образование и освоить эту сферу.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mentors.map((mentor) => (
              <div key={mentor.id} className="relative rounded-3xl overflow-hidden">
                <Image
                  src={`${baseUrl}${mentor.photo}`}
                  alt={mentor.name}
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover"
                  onError={(e) => {
                    // Fallback to a placeholder if image fails to load
                    const target = e.target as HTMLImageElement
                    target.src = "/mentor.png"
                  }}
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 to-transparent text-white">
                  <h3 className="text-2xl font-bold mb-1">{mentor.name}</h3>
                  <p className="text-lg">{mentor.position}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
