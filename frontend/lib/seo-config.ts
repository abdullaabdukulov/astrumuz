// SEO configuration for the Astrum Academy website
export const siteConfig = {
  name: "Astrum IT Academy",
  description: "Крупнейшая IT Академия в Ташкенте - обучение программированию, дизайну и IT-профессиям",
  url: "https://astrum.uz",
  ogImage: "/images/og-image.jpg",
  links: {
    twitter: "https://twitter.com/astrumuz",
    facebook: "https://facebook.com/astrumuz",
    instagram: "https://instagram.com/astrumuz",
  },
}

// Default metadata for all pages
export const defaultMetadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} - Крупнейшая IT Академия в Ташкенте`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "IT академия",
    "обучение программированию",
    "курсы IT",
    "Ташкент",
    "Узбекистан",
    "программирование",
    "разработка",
    "дизайн",
    "образование",
    "Astrum",
  ],
  authors: [
    {
      name: "Astrum IT Academy",
      url: siteConfig.url,
    },
  ],
  creator: "Astrum IT Academy",
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: "@astrumuz",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: `${siteConfig.url}/site.webmanifest`,
}

// Page-specific metadata
export const pageMetadata = {
  home: {
    title: "Главная | Astrum IT Academy - Крупнейшая IT Академия в Ташкенте",
    description:
      "Astrum IT Academy - ведущая академия программирования и IT в Ташкенте. Начните свой путь в IT с нами!",
    keywords: ["IT академия", "обучение программированию", "курсы IT", "Ташкент", "Узбекистан", "Astrum", "главная"],
  },
  courses: {
    title: "Курсы | Astrum IT Academy - Обучение IT профессиям",
    description:
      "Выберите курс программирования, дизайна или IT в Astrum Academy. Современные программы обучения с опытными преподавателями.",
    keywords: [
      "IT курсы",
      "программирование",
      "разработка",
      "дизайн",
      "обучение IT",
      "Ташкент",
      "Узбекистан",
      "Astrum курсы",
    ],
  },
  courseDetail: {
    titleTemplate: "%s | Курс в Astrum IT Academy",
    descriptionTemplate: "Курс %s в Astrum IT Academy. %s. Начните обучение сейчас!",
  },
  corporate: {
    title: "Корпоративное обучение | Astrum IT Academy",
    description:
      "Корпоративные IT курсы для вашей компании. Повышение квалификации сотрудников, обучение новым технологиям.",
    keywords: [
      "корпоративное обучение",
      "IT для бизнеса",
      "обучение сотрудников",
      "корпоративные курсы",
      "Ташкент",
      "Узбекистан",
    ],
  },
  contact: {
    title: "Контакты | Astrum IT Academy",
    description: "Свяжитесь с Astrum IT Academy. Ответим на все вопросы о курсах и обучении.",
    keywords: ["контакты", "Astrum", "IT академия", "Ташкент", "Узбекистан", "связаться"],
  },
  about: {
    title: "О нас | Astrum IT Academy",
    description: "Узнайте больше о Astrum IT Academy - нашей миссии, преподавателях и подходе к обучению.",
    keywords: ["о нас", "Astrum", "IT академия", "миссия", "преподаватели", "Ташкент", "Узбекистан"],
  },
  blog: {
    title: "Блог | Astrum IT Academy",
    description: "Блог Astrum IT Academy - статьи о программировании, IT-индустрии и образовании.",
    keywords: ["блог", "IT статьи", "программирование", "образование", "Astrum", "Ташкент", "Узбекистан"],
  },
  career: {
    title: "Карьера | Astrum IT Academy",
    description: "Карьера в Astrum IT Academy. Присоединяйтесь к нашей команде профессионалов.",
    keywords: ["карьера", "вакансии", "работа", "Astrum", "IT академия", "Ташкент", "Узбекистан"],
  },
  partners: {
    title: "Наши партнёры | Astrum IT Academy",
    description: "Партнёры Astrum IT Academy. Сотрудничество с ведущими IT-компаниями.",
    keywords: ["партнёры", "сотрудничество", "IT компании", "Astrum", "Ташкент", "Узбекистан"],
  },
}
