"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "@/lib/context/language-context"
import { getCategories } from "@/lib/services/api"

interface Category {
  id: number
  name: string
  slug: string
}

interface FilterTabsProps {
  onCategoryChange?: (category: string) => void
}

export function FilterTabs({ onCategoryChange }: FilterTabsProps) {
  const [categories, setCategories] = useState<Category[]>([])
  const [activeCategory, setActiveCategory] = useState<string>("all")
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const { language } = useLanguage()

  // Translations for "All" category
  const allCategoryText = {
    ru: "Все",
    uz: "Barchasi",
    en: "All",
  }

  useEffect(() => {
    async function fetchCategories() {
      try {
        setIsLoading(true)
        const response = await getCategories()

        if (response?.success && response?.data?.results) {
          setCategories(response.data.results)
        } else {
          throw new Error("Invalid data format")
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
        console.error("Error fetching categories:", err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCategories()
  }, [language]) // Re-fetch when language changes

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category)
    if (onCategoryChange) {
      onCategoryChange(category)
    }

    // If no onCategoryChange prop, use URL parameters
    if (!onCategoryChange && typeof window !== "undefined") {
      try {
        const url = new URL(window.location.href)
        if (category === "all") {
          url.searchParams.delete("category")
        } else {
          url.searchParams.set("category", category)
        }
        window.history.pushState({}, "", url.toString())
        // Dispatch an event to notify CoursesSection
        window.dispatchEvent(new CustomEvent("categoryChanged", { detail: { category } }))
      } catch (error) {
        console.error("Error updating URL:", error)
      }
    }
  }

  // Get the appropriate text for "All" based on current language
  const allText = allCategoryText[language as keyof typeof allCategoryText] || allCategoryText.ru

  return (
    <section className="bg-white py-4 px-4 md:py-0 md:-mt-[24px] relative z-30 md:w-[500px] mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center md:hidden">
        {language === "ru" ? "Курсы" : language === "uz" ? "Kurslar" : "Courses"}
      </h1>
      <div className="w-full">
        {isLoading ? (
          <div className="text-center py-2">
            {language === "ru" ? "Загрузка..." : language === "uz" ? "Yuklanmoqda..." : "Loading..."}
          </div>
        ) : error ? (
          <div className="text-center text-red-500 py-2">{error}</div>
        ) : (
          <div className="grid grid-cols-3 gap-2">
            <button
              className={`py-3 px-2 ${
                activeCategory === "all" ? "bg-[#6a3de8] text-white" : "bg-gray-100 text-gray-700"
              } rounded-full font-medium w-full text-sm`}
              onClick={() => handleCategoryChange("all")}
            >
              {allText}
            </button>

            {categories && categories.length > 0 ? (
              categories.map((category) => (
                <button
                  key={category.id}
                  className={`py-3 px-2 ${
                    activeCategory === category.slug ? "bg-[#6a3de8] text-white" : "bg-gray-100 text-gray-700"
                  } rounded-full font-medium w-full text-sm`}
                  onClick={() => handleCategoryChange(category.slug)}
                >
                  {category.name}
                </button>
              ))
            ) : (
              <div className="col-span-3 text-center py-2 text-gray-500">
                {language === "ru"
                  ? "Категории не найдены"
                  : language === "uz"
                    ? "Kategoriyalar topilmadi"
                    : "No categories found"}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
