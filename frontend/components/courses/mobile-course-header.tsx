"use client"

import { useRouter } from "next/navigation"

interface MobileCourseHeaderProps {
  title: string
}

export function MobileCourseHeader({ title }: MobileCourseHeaderProps) {
  const router = useRouter()

  return (
    <div className="fixed top-0 left-0 right-0 bg-white z-50 px-3 sm:px-4 py-2 sm:py-3 flex items-center justify-between border-b border-gray-200 md:hidden">
      <button
        onClick={() => router.back()}
        className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center"
        aria-label="Назад"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="sm:w-6 sm:h-6"
        >
          <path d="m15 18-6-6 6-6" />
        </svg>
      </button>

      <div className="text-sm sm:text-base font-medium truncate max-w-[70%] text-center">{title}</div>

      <button className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center" aria-label="Поделиться">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="sm:w-6 sm:h-6"
        >
          <circle cx="18" cy="5" r="3" />
          <circle cx="6" cy="12" r="3" />
          <circle cx="18" cy="19" r="3" />
          <line x1="8.59" x2="15.42" y1="13.51" y2="17.49" />
          <line x1="15.41" x2="8.59" y1="6.51" y2="10.49" />
        </svg>
      </button>
    </div>
  )
}
