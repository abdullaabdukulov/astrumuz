import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Страница не найдена | Astrum IT Academy",
  description: "Запрашиваемая страница не найдена. Вернитесь на главную страницу Astrum IT Academy.",
}

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-[#6a3de8] mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-6">Страница не найдена</h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          Извините, запрашиваемая страница не существует или была перемещена.
        </p>
        <Link
          href="/"
          className="inline-block bg-[#6a3de8] text-white py-3 px-8 rounded-full font-medium hover:bg-[#5a2ed8] transition-colors"
        >
          Вернуться на главную
        </Link>
      </div>
    </div>
  )
}
