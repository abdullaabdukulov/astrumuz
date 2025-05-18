"use client"

import { useEffect } from "react"
import Link from "next/link"

export default function CourseDetailError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Course detail error:", error)
  }, [error])

  // Safely extract error message as a string
  let errorMessage = "An unknown error occurred"

  try {
    if (typeof error === "string") {
      errorMessage = error
    } else if (error instanceof Error) {
      errorMessage = error.message
    } else if (error && typeof error === "object") {
      // Convert the error object to a string representation
      errorMessage = "Error details: " + JSON.stringify(error, null, 2)
    }
  } catch (e) {
    errorMessage = "Could not process error details"
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold text-red-500 mb-4">Ошибка загрузки курса</h1>
      <p className="text-gray-700 mb-6">Не удалось загрузить данные курса</p>
      <div className="flex flex-col sm:flex-row gap-4">
        <button onClick={() => reset()} className="bg-[#6a3de8] text-white px-6 py-3 rounded-full">
          Попробовать снова
        </button>
        <Link href="/courses" className="bg-gray-200 text-gray-800 px-6 py-3 rounded-full text-center">
          Вернуться к курсам
        </Link>
      </div>
    </div>
  )
}
