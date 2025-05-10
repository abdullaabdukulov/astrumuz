"use client"

import { useState, useEffect } from "react"
import { API_ENDPOINTS } from "@/lib/constants/api"

interface Category {
  id: number
  name: string
  slug: string
}

interface FilterTabsProps {
  onCategoryChange: (category: string) => void
}

export function FilterTabs({ onCategoryChange }: FilterTabsProps) {
  const [categories, setCategories] = useState<Category[]>([])
  const [activeCategory, setActiveCategory] = useState<string>("all")
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchCategories() {
      try {
        setIsLoading(true)
        const response = await fetch(API_ENDPOINTS.CATEGORIES)

        if (!response.ok) {
          throw new Error("Failed to fetch categories")
        }

        const data = await response.json()

        if (data.success && data.data.results) {
          setCategories(data.data.results)
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
  }, [])

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category)
    onCategoryChange(category)
  }

  return (
    <section className="bg-white py-4 px-4 md:py-0 md:-mt-[24px] relative z-30 md:w-[500px] mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center md:hidden">Курсы</h1>
      <div className="w-full">
        {isLoading ? (
          <div className="text-center py-2">Загрузка...</div>
        ) : error ? (
          <div className="text-center text-red-500 py-2">{error}</div>
        ) : (
          <div className="grid grid-cols-3 gap-2">
            <button
              className={`py-3 px-2 ${activeCategory === "all" ? "bg-[#6a3de8] text-white" : "bg-gray-100 text-gray-700"} rounded-full font-medium w-full text-sm`}
              onClick={() => handleCategoryChange("all")}
            >
              Все
            </button>

            {categories.map((category) => (
              <button
                key={category.id}
                className={`py-3 px-2 ${activeCategory === category.slug ? "bg-[#6a3de8] text-white" : "bg-gray-100 text-gray-700"} rounded-full font-medium w-full text-sm`}
                onClick={() => handleCategoryChange(category.slug)}
              >
                {category.name}
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
