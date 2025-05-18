"use client"

import { useState } from "react"
import { RegistrationModal } from "./registration-modal"
import { useLanguage } from "@/lib/context/language-context"

interface Outcome {
  id: number
  text: string
  order: number
}

interface CourseOutcomesProps {
  courseSlug: string
  courseId?: number
  outcomes: Outcome[]
  videoHours: number
  codingExercises: number
  articles: number
  hasCertificate: boolean
}

export function CourseOutcomes({
  courseSlug,
  courseId,
  outcomes = [],
  videoHours = 0,
  codingExercises = 0,
  articles = 0,
  hasCertificate = false,
}: CourseOutcomesProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { language } = useLanguage()

  // Translations for course-specific texts
  const courseTexts = {
    ru: {
      register: "Зарегистрироваться",
      level: "Уровень",
      duration: "Длительность",
      new: "Новый",
      popular: "Популярный",
      courseIncludes: "Этот курс включает в себя:",
      videoHours: "час видео по запросу",
      codingExercises: "упражнений по кодированию",
      articles: "статей",
      mobileAccess: "Доступ с мобильных устройств",
      lifetimeAccess: "Пожизненный доступ",
      certificate: "Сертификат об окончании",
      whatYouWillLearn: "Чему вы научитесь",
      afterCompletion: "По окончанию курса",
    },
    uz: {
      register: "Ro'yxatdan o'tish",
      level: "Daraja",
      duration: "Davomiyligi",
      new: "Yangi",
      popular: "Mashhur",
      courseIncludes: "Bu kurs o'z ichiga oladi:",
      videoHours: "soat video so'rov bo'yicha",
      codingExercises: "kodlash mashqlari",
      articles: "maqolalar",
      mobileAccess: "Mobil qurilmalardan foydalanish imkoniyati",
      lifetimeAccess: "Umrbod kirish",
      certificate: "Tugatish sertifikati",
      whatYouWillLearn: "Nimani o'rganasiz",
      afterCompletion: "Kursni tugatgandan so'ng",
    },
    en: {
      register: "Register",
      level: "Level",
      duration: "Duration",
      new: "New",
      popular: "Popular",
      courseIncludes: "This course includes:",
      videoHours: "hours of on-demand video",
      codingExercises: "coding exercises",
      articles: "articles",
      mobileAccess: "Mobile access",
      lifetimeAccess: "Lifetime access",
      certificate: "Certificate of completion",
      whatYouWillLearn: "What you will learn",
      afterCompletion: "After course completion",
    },
  }

  const currentCourseText = courseTexts[language as keyof typeof courseTexts] || courseTexts.ru

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  // Ensure outcomes is an array
  const safeOutcomes = Array.isArray(outcomes) ? outcomes : []

  return (
    <section className="py-4 sm:py-6 md:py-12 lg:py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Mobile Course Includes Section */}
          <div className="md:hidden mb-6 sm:mb-8">
            <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">{currentCourseText.courseIncludes}</h2>

            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#6a3de8] flex items-center justify-center mr-2 sm:mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="sm:w-5 sm:h-5"
                  >
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                </div>
                <span className="text-sm sm:text-base">
                  {videoHours} {currentCourseText.videoHours}
                </span>
              </div>

              <div className="flex items-center">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#6a3de8] flex items-center justify-center mr-2 sm:mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="sm:w-5 sm:h-5"
                  >
                    <polyline points="16 18 22 12 16 6" />
                    <polyline points="8 6 2 12 8 18" />
                  </svg>
                </div>
                <span className="text-sm sm:text-base">
                  {codingExercises} {currentCourseText.codingExercises}
                </span>
              </div>

              <div className="flex items-center">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#6a3de8] flex items-center justify-center mr-2 sm:mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="sm:w-5 sm:h-5"
                  >
                    <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
                    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                    <path d="M12 11h4" />
                    <path d="M12 16h4" />
                    <path d="M8 11h.01" />
                    <path d="M8 16h.01" />
                  </svg>
                </div>
                <span className="text-sm sm:text-base">
                  {articles} {currentCourseText.articles}
                </span>
              </div>
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden md:flex flex-col lg:flex-row gap-6 lg:gap-8">
            {/* Left column - What you will learn */}
            <div className="lg:w-2/3">
              <div className="text-[#6a3de8] font-medium mb-2">{currentCourseText.afterCompletion}</div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 md:mb-8">
                {currentCourseText.whatYouWillLearn}
              </h2>

              <ul className="space-y-3 md:space-y-4">
                {safeOutcomes.map((outcome) => (
                  <li key={outcome.id} className="flex items-start">
                    <span className="text-[#6a3de8] mr-2 mt-1">•</span>
                    <span>{outcome.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right column - Course includes */}
            <div className="lg:w-1/3">
              <div className="bg-gray-50 p-4 md:p-6 rounded-xl">
                <h3 className="text-lg md:text-xl font-bold mb-4 md:mb-6">{currentCourseText.courseIncludes}</h3>

                <div className="space-y-3 md:space-y-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-[#6a3de8] flex items-center justify-center mr-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polygon points="5 3 19 12 5 21 5 3" />
                      </svg>
                    </div>
                    <span>
                      {videoHours} {currentCourseText.videoHours}
                    </span>
                  </div>

                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-[#6a3de8] flex items-center justify-center mr-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="16 18 22 12 16 6" />
                        <polyline points="8 6 2 12 8 18" />
                      </svg>
                    </div>
                    <span>
                      {codingExercises} {currentCourseText.codingExercises}
                    </span>
                  </div>

                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-[#6a3de8] flex items-center justify-center mr-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
                        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                        <path d="M12 11h4" />
                        <path d="M12 16h4" />
                        <path d="M8 11h.01" />
                        <path d="M8 16h.01" />
                      </svg>
                    </div>
                    <span>
                      {articles} {currentCourseText.articles}
                    </span>
                  </div>

                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-[#6a3de8] flex items-center justify-center mr-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                        <polyline points="14 2 14 8 20 8" />
                        <line x1="16" x2="8" y1="13" y2="13" />
                        <line x1="16" x2="8" y1="17" y2="17" />
                        <line x1="10" x2="8" y1="9" y2="9" />
                      </svg>
                    </div>
                    <span>{currentCourseText.mobileAccess}</span>
                  </div>

                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-[#6a3de8] flex items-center justify-center mr-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" x2="12" y1="15" y2="3" />
                      </svg>
                    </div>
                    <span>{currentCourseText.lifetimeAccess}</span>
                  </div>

                  {hasCertificate && (
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-[#6a3de8] flex items-center justify-center mr-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <circle cx="12" cy="8" r="6" />
                          <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
                        </svg>
                      </div>
                      <span>{currentCourseText.certificate}</span>
                    </div>
                  )}
                </div>

                <div className="mt-6 md:mt-8">
                  <button
                    onClick={openModal}
                    className="block w-full bg-[#6a3de8] text-white text-center py-3 md:py-4 px-4 md:px-6 rounded-full font-bold hover:bg-[#5a2ed8] transition-colors"
                  >
                    {currentCourseText.register}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile What You Will Learn Section */}
          <div className="md:hidden">
            <h3 className="text-sm sm:text-base text-gray-600 mb-1">{currentCourseText.afterCompletion}</h3>
            <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">{currentCourseText.whatYouWillLearn}</h2>
            <ul className="space-y-2 sm:space-y-3">
              {safeOutcomes.map((outcome) => (
                <li key={outcome.id} className="flex items-start">
                  <span className="text-[#6a3de8] mr-2 mt-1">•</span>
                  <span className="text-xs sm:text-sm">{outcome.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Registration Modal */}
      <RegistrationModal isOpen={isModalOpen} onClose={closeModal} courseSlug={courseSlug} courseId={courseId} />
    </section>
  )
}
