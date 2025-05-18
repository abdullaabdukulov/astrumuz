"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "@/lib/context/language-context"

interface LanguageSwitcherProps {
  variant?: "light" | "dark"
  size?: "small" | "medium" | "large"
}

type Language = "ru" | "uz" | "en"

export function LanguageSwitcher({ variant = "light", size = "medium" }: LanguageSwitcherProps) {
  const { language, setLanguage } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const [currentLang, setCurrentLang] = useState(language)
  // Add a loading state to the language switcher
  const [isChangingLanguage, setIsChangingLanguage] = useState(false)

  // Синхронизируем локальное состояние с контекстом
  useEffect(() => {
    setCurrentLang(language)
  }, [language])

  const toggleDropdown = () => setIsOpen(!isOpen)
  const closeDropdown = () => setIsOpen(false)

  // Update the handleLanguageChange function
  const handleLanguageChange = (lang: Language) => {
    if (currentLang !== lang) {
      setIsChangingLanguage(true)
      // Add a small delay to show the loading state
      setTimeout(() => {
        setLanguage(lang)
        setCurrentLang(lang) // This won't actually be visible due to the page reload
        closeDropdown()
      }, 300)
    } else {
      closeDropdown()
    }
  }

  // Size classes
  const buttonSizeClasses = {
    small: "w-8 h-8 text-xs",
    medium: "w-10 h-10 text-sm",
    large: "w-12 h-12 text-base",
  }

  // Функция для определения класса кнопки
  const getButtonColorClass = () => {
    if (variant === "light") {
      return currentLang ? "bg-[#6a3de8] text-white border-[#6a3de8]" : "bg-white text-gray-700 border-gray-300"
    } else {
      return currentLang ? "bg-[#6a3de8] text-white border-[#6a3de8]" : "bg-gray-800 text-gray-400 border-gray-700"
    }
  }

  // Отображение языков
  const languageNames = {
    ru: "Русский",
    uz: "O'zbek",
    en: "English",
  }

  // Translations for dropdown labels
  const dropdownTexts = {
    ru: {
      selectLanguage: "Выберите язык",
    },
    uz: {
      selectLanguage: "Tilni tanlang",
    },
    en: {
      selectLanguage: "Select language",
    },
  }

  const dropdownText = dropdownTexts[language as keyof typeof dropdownTexts] || dropdownTexts.ru

  return (
    <div className="relative inline-block">
      {/* Update the button to show loading state */}
      <button
        onClick={toggleDropdown}
        className={`rounded-full border flex items-center justify-center font-medium ${
          buttonSizeClasses[size]
        } ${getButtonColorClass()} ${isChangingLanguage ? "opacity-50" : ""}`}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label={dropdownText.selectLanguage}
        disabled={isChangingLanguage}
      >
        {isChangingLanguage ? (
          <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        ) : (
          currentLang.toUpperCase()
        )}
      </button>

      {isOpen && (
        <>
          {/* Backdrop to close dropdown when clicking outside */}
          <div className="fixed inset-0 z-[90]" onClick={closeDropdown}></div>

          {/* Dropdown menu - mobile optimized */}
          <div className="fixed left-0 right-0 bottom-16 mx-auto w-[200px] rounded-xl shadow-lg bg-white z-[100] py-2 border border-gray-200">
            <div className="flex flex-col space-y-1">
              {(["ru", "uz", "en"] as const).map((lang) => (
                <button
                  key={lang}
                  onClick={() => handleLanguageChange(lang)}
                  className={`flex items-center justify-center w-full py-3 ${
                    currentLang === lang ? "bg-[#6a3de8] text-white font-medium" : "bg-gray-50 text-gray-700"
                  }`}
                >
                  {languageNames[lang]}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
