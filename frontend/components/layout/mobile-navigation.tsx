import Link from "next/link"
import { MobileMenu } from "./mobile-menu"
// Import the LanguageSwitcher component
import { LanguageSwitcher } from "./language-switcher"

export function MobileNavigation() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40 md:hidden">
      <div className="flex justify-around items-center h-16">
        <Link
          href="/"
          className="flex flex-col items-center justify-center text-gray-500 hover:text-[#6a3de8] transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-home"
          >
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          <span className="text-xs mt-1 font-medium">Главная</span>
        </Link>
        <Link
          href="/courses"
          className="flex flex-col items-center justify-center text-[#6a3de8] hover:text-[#6a3de8] transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-book-open"
          >
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
          </svg>
          <span className="text-xs mt-1 font-medium">Курсы</span>
        </Link>
        <div className="flex flex-col items-center justify-center">
          <LanguageSwitcher size="small" />
          <span className="text-xs mt-1 font-medium text-gray-500">Язык</span>
        </div>
        <Link
          href="/career"
          className="flex flex-col items-center justify-center text-gray-500 hover:text-[#6a3de8] transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-briefcase"
          >
            <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
          </svg>
          <span className="text-xs mt-1 font-medium">Карьера</span>
        </Link>

        {/* Mobile Menu */}
        <MobileMenu />
      </div>
    </div>
  )
}
