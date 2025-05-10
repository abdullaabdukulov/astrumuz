"use client"

import type React from "react"

import { useState } from "react"
import { registerForCourse } from "@/lib/services/api"

interface RegistrationFormProps {
  courseSlug: string
  courseId?: number
  onSuccess?: () => void
}

export function RegistrationForm({ courseSlug, courseId, onSuccess }: RegistrationFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
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
      const response = await registerForCourse({
        course: courseId || null,
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        message: formData.message,
      })

      if (!response.success) {
        throw new Error(response.message || "Произошла ошибка при регистрации")
      }

      setIsSubmitted(true)
      setFormData({ name: "", phone: "", email: "", message: "" })
    } catch (err) {
      console.error("Error submitting form:", err)
      setError(err instanceof Error ? err.message : "Произошла ошибка при регистрации")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="bg-green-50 p-6 rounded-xl text-center">
        <h3 className="text-xl font-bold text-green-700 mb-2">Спасибо за вашу заявку!</h3>
        <p className="text-green-600 mb-4">Наш менеджер свяжется с вами в ближайшее время.</p>
        <button
          onClick={() => {
            setIsSubmitted(false)
            if (onSuccess) onSuccess()
          }}
          className="bg-[#6a3de8] text-white px-6 py-2 rounded-full"
        >
          Закрыть
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white rounded-xl">
      {error && (
        <div className="bg-red-50 p-3 rounded-lg text-red-700 text-sm">
          <p>{error}</p>
        </div>
      )}

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Ваше имя
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#6a3de8] focus:border-transparent"
          placeholder="Введите ваше имя"
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
          Телефон
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
          Email
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
          Сообщение (необязательно)
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#6a3de8] focus:border-transparent"
          placeholder="Расскажите о ваших пожеланиях"
        ></textarea>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-[#6a3de8] text-white py-3 px-6 rounded-full font-medium hover:bg-[#5a2ed8] transition-colors disabled:opacity-70"
      >
        {isSubmitting ? "Отправка..." : "Зарегистрироваться"}
      </button>
    </form>
  )
}
