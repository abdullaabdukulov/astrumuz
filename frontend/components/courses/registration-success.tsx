"use client"

import { useLanguage } from "@/lib/context/language-context"
import { translations } from "@/lib/translations"

interface RegistrationSuccessProps {
  firstName: string
  lastName: string
  email: string
  phone: string
  onClose?: () => void
}

export function RegistrationSuccess({ firstName, lastName, email, phone, onClose }: RegistrationSuccessProps) {
  const { language } = useLanguage()

  // Get translations for the current language
  const formTexts =
    translations.multiStepForm?.[language as keyof typeof translations.multiStepForm] || translations.multiStepForm?.ru

  return (
    <div className="bg-green-50 p-6 rounded-xl text-center">
      <div className="flex justify-center mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-green-500"
        >
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
      </div>
      <h3 className="text-xl font-bold text-green-700 mb-2">
        {formTexts?.thanks || "Thank you for your application!"}
      </h3>
      <p className="text-green-600 mb-4">{formTexts?.managerContact || "Our manager will contact you shortly."}</p>
      <div className="text-sm text-gray-600 mb-4">
        <p className="mb-1">
          {firstName} {lastName}
        </p>
        <p className="mb-1">{email}</p>
        <p>{phone}</p>
      </div>
    </div>
  )
}
