"use client"

import { useEffect } from "react"
import Link from "next/link"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-600 mb-4">Что-то пошло не так</h1>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          Произошла ошибка при загрузке страницы. Пожалуйста, попробуйте снова или вернитесь на главную страницу.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => reset()}
            className="bg-[#6a3de8] text-white py-3 px-8 rounded-full font-medium hover:bg-[#5a2ed8] transition-colors"
          >
            Попробовать снова
          </button>
          <Link
            href="/"
            className="bg-gray-200 text-gray-800 py-3 px-8 rounded-full font-medium hover:bg-gray-300 transition-colors"
          >
            Вернуться на главную
          </Link>
        </div>
      </div>
    </div>
  )
}
