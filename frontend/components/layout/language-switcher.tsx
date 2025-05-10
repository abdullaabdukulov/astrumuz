"use client"

import { useState } from "react"
import { useLanguage } from "@/lib/context/language-context"

interface LanguageSwitcherProps {
  variant?: "light" | "dark"
  size?: "small" | "medium" | "large"
}

export function LanguageSwitcher({ variant = "light", size = "medium" }: LanguageSwitcherProps) {
  const { language, setLanguage } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)

  const toggleDropdown = () => setIsOpen(!isOpen)
  const closeDropdown = () => setIsOpen(false)

  const handleLanguageChange = (lang: "ru" | "uz" | "en") => {
    setLanguage(lang)
    closeDropdown()
  }

  // Size classes
  const buttonSizeClasses = {
    small: "w-8 h-8 text-xs",
    medium: "w-10 h-10 text-sm",
    large: "w-12 h-12 text-base",
  }

  // Color classes based on variant
  const buttonColorClasses = {
    light: {
      active: "bg-[#6a3de8] text-white border-[#6a3de8]",
      inactive: "bg-white text-gray-700 border-gray-300",
    },
    dark: {
      active: "bg-[#6a3de8] text-white border-[#6a3de8]",
      inactive: "bg-gray-800 text-gray-400 border-gray-700",
    },
  }

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className={`rounded-full border flex items-center justify-center font-medium ${
          buttonSizeClasses[size]
        } ${buttonColorClasses[variant][language === "ru" ? "active" : "inactive"]}`}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {language.toUpperCase()}
      </button>

      {isOpen && (
        <>
          {/* Backdrop to close dropdown when clicking outside */}
          <div className="fixed inset-0 z-40" onClick={closeDropdown}></div>

          {/* Dropdown menu */}
          <div className="absolute right-0 mt-2 w-24 rounded-md shadow-lg bg-white z-50 py-1 border border-gray-200">
            <button
              onClick={() => handleLanguageChange("ru")}
              className={`block w-full text-left px-4 py-2 text-sm ${
                language === "ru" ? "bg-gray-100 text-[#6a3de8] font-medium" : "text-gray-700"
              }`}
            >
              Русский
            </button>
            <button
              onClick={() => handleLanguageChange("uz")}
              className={`block w-full text-left px-4 py-2 text-sm ${
                language === "uz" ? "bg-gray-100 text-[#6a3de8] font-medium" : "text-gray-700"
              }`}
            >
              O'zbek
            </button>
            <button
              onClick={() => handleLanguageChange("en")}
              className={`block w-full text-left px-4 py-2 text-sm ${
                language === "en" ? "bg-gray-100 text-[#6a3de8] font-medium" : "text-gray-700"
              }`}
            >
              English
            </button>
          </div>
        </>
      )}
    </div>
  )
}
