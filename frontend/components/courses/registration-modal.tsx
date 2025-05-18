"use client"
import { useState } from "react"
import { MultiStepRegistrationForm } from "./multi-step-registration-form"
import { useLanguage } from "@/lib/context/language-context"

interface RegistrationModalProps {
  isOpen: boolean
  onClose: () => void
  courseSlug: string
  courseId?: number
}

export function RegistrationModal({ isOpen, onClose, courseSlug, courseId }: RegistrationModalProps) {
  const { language } = useLanguage()
  const [formSubmitted, setFormSubmitted] = useState(false)

  if (!isOpen) return null

  const handleSuccess = () => {
    setFormSubmitted(true)
    // Don't close the modal immediately so the user can see the success message
    // setTimeout(onClose, 3000);
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div
        className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative animate-in fade-in zoom-in duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          aria-label="Close modal"
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
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>

        <div className="p-6 pt-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
            {language === "ru"
              ? "Регистрация на курс"
              : language === "uz"
                ? "Kursga ro'yxatdan o'tish"
                : "Course registration"}
          </h2>
          <MultiStepRegistrationForm courseId={courseId} onSuccess={handleSuccess} />
        </div>
      </div>
    </div>
  )
}
