"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useLanguage } from "@/lib/context/language-context"

interface MobileCourseHeaderProps {
  title: string
}

export function MobileCourseHeader({ title }: MobileCourseHeaderProps) {
  const router = useRouter()
  const [pageUrl, setPageUrl] = useState("")
  const { language } = useLanguage()

  // Получаем URL страницы после загрузки компонента на клиенте
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        setPageUrl(window.location.href)
      }
    } catch (error) {
      console.error("Error getting page URL:", error)
      setPageUrl("")
    }
  }, [])

  // Функция для шеринга
  const handleShare = async () => {
    try {
      // Локализованные тексты для шеринга
      const shareTexts = {
        ru: {
          title: `${title} | Astrum IT Academy`,
          text: `Узнайте больше о курсе "${title}" в Astrum IT Academy`,
        },
        uz: {
          title: `${title} | Astrum IT Academy`,
          text: `Astrum IT Academy'da "${title}" kursi haqida ko'proq ma'lumot oling`,
        },
        en: {
          title: `${title} | Astrum IT Academy`,
          text: `Learn more about the "${title}" course at Astrum IT Academy`,
        },
      }

      const currentShareText = shareTexts[language as keyof typeof shareTexts] || shareTexts.ru

      // Данные для шеринга
      const shareData = {
        title: currentShareText.title,
        text: currentShareText.text,
        url: pageUrl || window.location.href,
      }

      // Проверяем поддержку Web Share API
      if (navigator.share) {
        await navigator.share(shareData)
      } else {
        // Если Web Share API не поддерживается, копируем ссылку в буфер обмена
        await navigator.clipboard.writeText(pageUrl || window.location.href)
        const alertText =
          language === "ru"
            ? "Ссылка скопирована в буфер обмена"
            : language === "uz"
              ? "Havola vaqtinchalik xotiraga nusxalandi"
              : "Link copied to clipboard"
        alert(alertText)
      }
    } catch (error) {
      console.error("Ошибка при попытке поделиться:", error)
      // Provide a fallback for sharing
      try {
        const url = pageUrl || window.location.href
        await navigator.clipboard.writeText(url)
        const alertText =
          language === "ru"
            ? "Ссылка скопирована в буфер обмена"
            : language === "uz"
              ? "Havola vaqtinchalik xotiraga nusxalandi"
              : "Link copied to clipboard"
        alert(alertText)
      } catch (clipboardError) {
        console.error("Error copying to clipboard:", clipboardError)
      }
    }
  }

  return (
    <div className="fixed top-0 left-0 right-0 bg-white z-50 px-3 sm:px-4 py-2 sm:py-3 flex items-center justify-between border-b border-gray-200 md:hidden">
      {/* Используем обычную ссылку вместо кнопки */}
      <Link href="/courses" className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center" aria-label="Назад">
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
          className="sm:w-6 sm:h-6"
        >
          <path d="m15 18-6-6 6-6" />
        </svg>
      </Link>

      <div className="text-sm sm:text-base font-medium truncate max-w-[70%] text-center">{title || "Курс"}</div>

      <button
        onClick={handleShare}
        className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center"
        aria-label={language === "ru" ? "Поделиться" : language === "uz" ? "Ulashish" : "Share"}
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
          className="sm:w-6 sm:h-6"
        >
          <circle cx="18" cy="5" r="3" />
          <circle cx="6" cy="12" r="3" />
          <circle cx="18" cy="19" r="3" />
          <line x1="8.59" x2="15.42" y1="13.51" y2="17.49" />
          <line x1="15.41" x2="8.59" y1="6.51" y2="10.49" />
        </svg>
      </button>
    </div>
  )
}
