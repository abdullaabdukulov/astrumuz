import { API_BASE_URL, API_ENDPOINTS } from "@/lib/constants/api"

// Helper function to get the current language
function getCurrentLanguage(): string {
  try {
    if (typeof window !== "undefined") {
      return localStorage.getItem("language") || "ru"
    }
  } catch (error) {
    console.error("Error accessing localStorage:", error)
  }
  return "ru" // Default to Russian if not in browser or error occurs
}

// Base API service for making HTTP requests
export async function fetchAPI<T>(endpoint: string, options?: RequestInit, language?: string): Promise<T> {
  try {
    // Use provided language or get from localStorage
    const currentLanguage = language || getCurrentLanguage()

    console.log(`API Request: ${endpoint} with language: ${currentLanguage}`)

    const headers = {
      ...(options?.headers || {}),
      "Accept-Language": currentLanguage,
      "Content-Type": "application/json",
    }

    const response = await fetch(`${API_BASE_URL}/api/${endpoint}`, {
      ...options,
      headers,
    })

    if (!response.ok) {
      console.error(`API error: ${response.status} ${response.statusText}`)
      throw new Error(`API error: ${response.statusText}`)
    }

    const data = await response.json()
    return data as T
  } catch (error) {
    console.error("API request failed:", error)
    throw error
  }
}

// Course-specific API methods
export async function getCourses(category?: string, language?: string) {
  try {
    const endpoint = category && category !== "all" ? `courses?category=${category}` : "courses"
    return await fetchAPI<{ success: boolean; data: any[] }>(endpoint, undefined, language)
  } catch (error) {
    console.error("Failed to fetch courses:", error)
    return { success: false, data: [] }
  }
}

// Get course categories
export async function getCategories(language?: string) {
  try {
    return await fetchAPI<{ success: boolean; data: { results: any[] } }>("categories", undefined, language)
  } catch (error) {
    console.error("Failed to fetch categories:", error)
    return { success: false, data: { results: [] } }
  }
}

// Contact form submission
export async function submitContactForm(data: any, language?: string) {
  try {
    const currentLanguage = language || getCurrentLanguage()

    const response = await fetch(API_ENDPOINTS.CONTACT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept-Language": currentLanguage,
      },
      body: JSON.stringify(data),
    })

    return await response.json()
  } catch (error) {
    console.error("Contact form submission failed:", error)
    return { success: false, message: "Произошла ошибка при отправке" }
  }
}

// Newsletter subscription
export async function subscribeToNewsletter(email: string, language?: string) {
  try {
    const currentLanguage = language || getCurrentLanguage()

    const response = await fetch(API_ENDPOINTS.SUBSCRIBE, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept-Language": currentLanguage,
      },
      body: JSON.stringify({ email }),
    })

    return await response.json()
  } catch (error) {
    console.error("Newsletter subscription failed:", error)
    return { success: false, message: "Произошла ошибка при подписке" }
  }
}

// Course registration
export async function registerForCourse(data: any, language?: string) {
  try {
    const currentLanguage = language || getCurrentLanguage()

    // Create a FormData object for file upload
    const formData = new FormData()

    // Add all fields to the FormData
    Object.entries(data).forEach(([key, value]) => {
      if (key === "phone") {
        // Remove the + from the phone number before sending to backend
        formData.append(key, String(value).replace("+", ""))
      } else if (key === "passport_image" && value instanceof File) {
        formData.append(key, value)
      } else if (value !== null && typeof value !== "undefined") {
        formData.append(key, String(value))
      }
    })

    console.log("Sending registration data to:", API_ENDPOINTS.REGISTER)

    // Log form data entries for debugging
    for (const pair of formData.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`)
    }

    const response = await fetch(API_ENDPOINTS.REGISTER, {
      method: "POST",
      headers: {
        "Accept-Language": currentLanguage,
        // Don't set Content-Type when using FormData, the browser will set it with the boundary
      },
      body: formData,
    })

    console.log("Registration response status:", response.status)

    let responseData
    try {
      responseData = await response.json()
      console.log("Registration response data:", responseData)
    } catch (parseError) {
      console.error("Error parsing response:", parseError)
      // If we can't parse the response, create a default response based on the HTTP status
      responseData = {
        success: response.ok,
        message: response.ok ? "Registration successful" : "Registration failed",
      }
    }

    // If the API doesn't return a success field, assume success if status is 2xx
    if (responseData.success === undefined) {
      responseData = {
        ...responseData,
        success: response.ok,
      }
    }

    return responseData
  } catch (error) {
    console.error("Course registration failed:", error)
    // Return a structured error response
    return {
      success: false,
      message: error instanceof Error ? error.message : "Произошла ошибка при регистрации",
    }
  }
}

// Get course detail
export async function getCourseDetail(slug: string, language?: string) {
  try {
    // Use provided language or get from helper function
    const currentLanguage = language || getCurrentLanguage()

    // Add timestamp to prevent browser caching
    const timestamp = new Date().getTime()

    const response = await fetch(`${API_BASE_URL}/api/courses/${slug}/?t=${timestamp}`, {
      headers: {
        "Accept-Language": currentLanguage,
        "Content-Type": "application/json",
        // Prevent caching at all levels
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
      // Add cache: 'no-store' to prevent caching and always get fresh data
      cache: "no-store",
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch course detail: ${response.statusText}`)
    }

    const data = await response.json()
    return { success: true, data: data.data }
  } catch (error) {
    console.error(`Failed to fetch course detail for ${slug}:`, error)
    return { success: false, data: null }
  }
}
