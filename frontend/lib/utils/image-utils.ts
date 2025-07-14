/**
 * Rasmning mavjudligini tekshirish uchun funksiya
 */
export function getImageUrl(path: string, fallback = "/placeholder.svg"): string {
  if (!path) return fallback

  // Agar path to'liq URL bo'lsa (http bilan boshlansa), uni qaytarish
  if (path.startsWith("http")) {
    return path
  }

  // Agar path / bilan boshlanmasa, / qo'shish
  if (!path.startsWith("/")) {
    path = `/${path}`
  }

  return path
}

/**
 * API-dan olingan rasmlar uchun to'liq URL yaratish
 */
export function getApiImageUrl(
  path: string | null | undefined,
  baseUrl = "https://libraryapp5.pythonanywhere.com",
  fallback = "/placeholder.svg",
): string {
  if (!path) return fallback

  // Agar path http bilan boshlansa, uni qaytarish
  if (path.startsWith("http")) {
    return path
  }

  // Agar path / bilan boshlanmasa, / qo'shish
  if (!path.startsWith("/")) {
    path = `/${path}`
  }

  return `${baseUrl}${path}`
}
