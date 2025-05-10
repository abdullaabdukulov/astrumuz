import Link from "next/link"

interface NavItem {
  title: string
  href: string
  isActive?: boolean
}

interface CustomNavProps {
  items: NavItem[]
}

export function CustomNav({ items }: CustomNavProps) {
  return (
    <nav className="bg-white rounded-[40px] shadow-lg max-w-5xl mx-auto">
      <ul className="flex justify-center py-5 px-12">
        {items.map((item) => (
          <li key={item.title} className="mx-5">
            <Link
              href={item.href}
              className={`${item.isActive ? "text-[#6a3de8]" : "text-gray-700 hover:text-[#6a3de8]"} font-medium`}
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
