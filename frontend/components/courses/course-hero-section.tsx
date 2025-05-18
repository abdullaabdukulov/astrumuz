"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { RegistrationModal } from "./registration-modal"
import { useLanguage } from "@/lib/context/language-context"
import { translations } from "@/lib/translations"

interface CourseHeroSectionProps {
  course: {
    id?: number
    title: string
    description: string
    level: string
    duration: string
    slug: string
    isNew?: boolean
    featured?: boolean
  }
}

export function CourseHeroSection({ course }: CourseHeroSectionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { language } = useLanguage()

  // Get translations for the current language
  const heroText = translations.hero[language as keyof typeof translations.hero] || translations.hero.ru
  const navItems = translations.navItems[language as keyof typeof translations.navItems] || translations.navItems.ru

  // Translations for course-specific texts
  const courseTexts = {
    ru: {
      register: "Зарегистрироваться",
      level: "Уровень",
      duration: "Длительность",
      new: "Новый",
      popular: "Популярный",
    },
    uz: {
      register: "Ro'yxatdan o'tish",
      level: "Daraja",
      duration: "Davomiyligi",
      new: "Yangi",
      popular: "Mashhur",
    },
    en: {
      register: "Register",
      level: "Level",
      duration: "Duration",
      new: "New",
      popular: "Popular",
    },
  }

  const currentCourseText = courseTexts[language as keyof typeof courseTexts] || courseTexts.ru

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  return (
    <>
      {/* Desktop Hero Section */}
      <div className="relative hidden md:block">
        {/* Background image container */}
        <div className="container mx-auto px-4 relative">
          <div className="rounded-[40px] overflow-hidden relative">
            {/* Gradient background */}
            <div className="absolute inset-0 z-0">
              <Image
                src="/images/gradient-background.png"
                alt="Gradient background"
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Navigation with curved edges - now at the very top of hero */}
            <div className="relative z-20 mt-0">
              <nav className="bg-white rounded-t-none rounded-b-[30px] shadow-lg max-w-4xl mx-auto">
                <ul className="flex justify-center pt-1 pb-6 px-4 flex-wrap md:flex-nowrap">
                  {navItems.map((item) => (
                    <li key={item.title} className="mx-2 md:mx-3 whitespace-nowrap">
                      <Link
                        href={item.href}
                        className={`${
                          item.isActive ? "text-[#6a3de8]" : "text-gray-800 hover:text-[#6a3de8]"
                        } font-bold text-base`}
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* Hero content */}
            <div className="relative z-10 pt-[55px] pb-[71px] text-center">
              <div className="text-[#00e5b0] text-xl sm:text-2xl font-bold mb-3 sm:mb-4">{heroText.courses}</div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 sm:mb-4 px-4">
                {course.title}
                {course.isNew && (
                  <span className="ml-3 inline-block bg-green-500 text-white text-sm px-2 py-1 rounded-full align-middle">
                    {currentCourseText.new}
                  </span>
                )}
              </h1>
              <p className="text-white text-sm sm:text-base md:text-lg max-w-3xl mx-auto px-4">{course.description}</p>

              {/* Course badges */}
              <div className="flex justify-center gap-3 sm:gap-4 mt-4 sm:mt-6 flex-wrap px-4">
                <div className="flex items-center gap-1 sm:gap-2 bg-[#5a2ed8] rounded-full px-3 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="sm:w-4 sm:h-4"
                  >
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                  </svg>
                  <span>{course.level}</span>
                </div>

                <div className="flex items-center gap-1 sm:gap-2 bg-[#5a2ed8] rounded-full px-3 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="sm:w-4 sm:h-4"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  <span>{course.duration}</span>
                </div>

                {course.featured && (
                  <div className="flex items-center gap-1 sm:gap-2 bg-[#00e5b0] text-black rounded-full px-3 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="sm:w-4 sm:h-4"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                    <span>{currentCourseText.popular}</span>
                  </div>
                )}
              </div>

              {/* Registration button */}
              <div className="mt-4 sm:mt-6">
                <button
                  onClick={openModal}
                  className="inline-block bg-white text-[#6a3de8] font-bold py-2 sm:py-3 px-6 sm:px-8 rounded-full hover:bg-gray-100 transition-colors text-sm sm:text-base"
                >
                  {currentCourseText.register}
                </button>
              </div>
            </div>

            {/* Bottom curved section - similar to top navbar but inverted */}
            <div className="relative z-20 mb-0">
              <div className="bg-white rounded-b-none rounded-t-[30px] shadow-lg max-w-4xl mx-auto h-[59px]"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Hero Section */}
      <div className="md:hidden pt-16 pb-6">
        <div className="bg-[#6a3de8] text-white p-4 sm:p-6">
          <div className="text-center">
            <h1 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3">
              {course.title}
              {course.isNew && (
                <span className="ml-2 inline-block bg-green-500 text-white text-xs px-2 py-0.5 rounded-full align-middle">
                  {currentCourseText.new}
                </span>
              )}
            </h1>
            <p className="text-xs sm:text-sm mb-4 sm:mb-6">{course.description}</p>

            {/* Course badges */}
            <div className="flex justify-center gap-2 sm:gap-3 mb-4 sm:mb-6 flex-wrap">
              <div className="flex items-center gap-1 bg-[#5a2ed8] rounded-full px-2 sm:px-3 py-1 text-xs">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                </svg>
                <span>{course.level}</span>
              </div>

              <div className="flex items-center gap-1 bg-[#5a2ed8] rounded-full px-2 sm:px-3 py-1 text-xs">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                <span>{course.duration}</span>
              </div>

              {course.featured && (
                <div className="flex items-center gap-1 bg-[#00e5b0] text-black rounded-full px-2 sm:px-3 py-1 text-xs">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                  <span>{currentCourseText.popular}</span>
                </div>
              )}
            </div>

            {/* Registration button */}
            <button
              onClick={openModal}
              className="w-full bg-white text-[#6a3de8] font-bold py-2 sm:py-3 px-4 sm:px-6 rounded-full text-sm"
            >
              {currentCourseText.register}
            </button>
          </div>
        </div>
      </div>

      {/* Registration Modal */}
      <RegistrationModal isOpen={isModalOpen} onClose={closeModal} courseSlug={course.slug} courseId={course.id} />
    </>
  )
}
