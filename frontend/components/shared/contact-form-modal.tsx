"use client"

import type React from "react"
import { useState } from "react"
import { API_ENDPOINTS } from "@/lib/constants/api"
import { useLanguage } from "@/lib/context/language-context"
import { translations } from "@/lib/translations"

interface ContactFormModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  submitButtonText?: string
  successTitle?: string
  successMessage?: string
  initialMessage?: string
}

export function ContactFormModal({
  isOpen,
  onClose,
  title,
  submitButtonText,
  successTitle,
  successMessage,
  initialMessage = "",
}: ContactFormModalProps) {
  const { language } = useLanguage()

  // Get translations for the current language
  const formText =
    translations.contactForm[language as keyof typeof translations.contactForm] || translations.contactForm.ru

  // Use provided props or fallback to translations
  const modalTitle =
    title || (language === "ru" ? "Хочу учиться!" : language === "uz" ? "O'qishni xohlayman!" : "I want to study!")
  const modalSubmitButtonText = submitButtonText || formText.submit
  const modalSuccessTitle = successTitle || formText.thanks
  const modalSuccessMessage = successMessage || formText.managerContact

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: initialMessage || "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch(API_ENDPOINTS.CONTACT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": language,
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || formText.error)
      }

      setIsSubmitted(true)
      setFormData({ name: "", phone: "", email: "", message: "" })
    } catch (err) {
      console.error("Error submitting form:", err)
      setError(err instanceof Error ? err.message : formText.error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto relative">
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

        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6 text-center">{modalTitle}</h2>

          {isSubmitted ? (
            <div className="bg-green-50 p-6 rounded-xl text-center">
              <h3 className="text-xl font-bold text-green-700 mb-2">{modalSuccessTitle}</h3>
              <p className="text-green-600 mb-4">{modalSuccessMessage}</p>
              <button onClick={onClose} className="bg-[#6a3de8] text-white px-6 py-2 rounded-full">
                {formText.close}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-red-50 p-3 rounded-lg text-red-700 text-sm">
                  <p>{error}</p>
                </div>
              )}

              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  {formText.yourName}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#6a3de8] focus:border-transparent"
                  placeholder={formText.enterName}
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  {formText.phone}
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#6a3de8] focus:border-transparent"
                  placeholder="+998 __ ___ __ __"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  {formText.email}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#6a3de8] focus:border-transparent"
                  placeholder="example@mail.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  {formText.message}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#6a3de8] focus:border-transparent"
                  placeholder={formText.wishes}
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#6a3de8] text-white py-3 px-6 rounded-full font-medium hover:bg-[#5a2ed8] transition-colors disabled:opacity-70"
              >
                {isSubmitting ? formText.sending : modalSubmitButtonText}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
