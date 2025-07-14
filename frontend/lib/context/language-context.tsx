"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Language = "ru" | "uz" | "en"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  isInitialized: boolean
}

// Create context with default values to avoid undefined errors
const LanguageContext = createContext<LanguageContextType>({
  language: "ru",
  setLanguage: () => {},
  isInitialized: false,
})

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Get initial language from localStorage or default to "ru"
  const [language, setLanguageState] = useState<Language>("ru")
  const [isInitialized, setIsInitialized] = useState(false)

  // Load saved language preference on initial render
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        const savedLanguage = localStorage.getItem("language") as Language
        if (savedLanguage && ["ru", "uz", "en"].includes(savedLanguage)) {
          setLanguageState(savedLanguage)
        }
        setIsInitialized(true)
      }
    } catch (error) {
      console.error("Error accessing localStorage:", error)
      setIsInitialized(true) // Still mark as initialized to prevent infinite loading
    }
  }, [])

  // Update localStorage and cookie when language changes
  const setLanguage = (lang: Language) => {
    try {
      setLanguageState(lang)
      if (typeof window !== "undefined") {
        // Save to localStorage
        localStorage.setItem("language", lang)

        // Save to cookie for server-side access
        document.cookie = `language=${lang}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`

        // Force reload the page to ensure all components get the updated language
        window.location.reload()
      }
    } catch (error) {
      console.error("Error setting language:", error)
    }
  }

  // Provide a loading state or fallback while initializing
  if (!isInitialized && typeof window !== "undefined") {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, isInitialized }}>{children}</LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)

  // Return default values if context is undefined (shouldn't happen with our setup)
  if (context === undefined) {
    console.error("useLanguage must be used within a LanguageProvider")
    return { language: "ru", setLanguage: () => {}, isInitialized: true }
  }

  return context
}
