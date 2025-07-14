export interface NavItem {
  title: string
  href: string
  isActive?: boolean
}

export interface Course {
  title: string
  icon: string
  level: string
  duration: string
  featured?: boolean
}
