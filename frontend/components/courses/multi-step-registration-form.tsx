"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useLanguage } from "@/lib/context/language-context"
import { translations } from "@/lib/translations"
import { registerForCourse } from "@/lib/services/api"
import { RegistrationSuccess } from "./registration-success"

interface FormData {
  first_name: string
  last_name: string
  middle_name: string
  birth_date: string
  phone: string
  email: string
  passport_series: string
  passport_number: string
  passport_image: File | null
  pinfl: string
  telegram_username?: string
  course: number | null
}

interface MultiStepRegistrationFormProps {
  courseId?: number
  onSuccess?: () => void
}

// Changed to named export instead of default export
export const MultiStepRegistrationForm: React.FC<MultiStepRegistrationFormProps> = ({ courseId, onSuccess }) => {
  // Update the currentStep state to allow for 4 steps instead of 3
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    first_name: "",
    last_name: "",
    middle_name: "",
    birth_date: "",
    phone: "",
    email: "",
    passport_series: "",
    passport_number: "",
    passport_image: null,
    pinfl: "",
    telegram_username: "",
    course: courseId || null,
  })
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { language } = useLanguage()

  // Add these new state variables after the existing useState declarations
  const [isPhoneVerified, setIsPhoneVerified] = useState(false)
  const [otpCode, setOtpCode] = useState("")
  const [isRequestingOtp, setIsRequestingOtp] = useState(false)
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false)
  const [otpSent, setOtpSent] = useState(false)
  const [otpError, setOtpError] = useState<string | null>(null)

  // Add a countdown timer state
  const [countdown, setCountdown] = useState(240) // 4 minutes in seconds
  const [countdownActive, setCountdownActive] = useState(false)

  // Update the useEffect to handle the countdown timer
  // Add this after the existing useState declarations
  useEffect(() => {
    let timer: NodeJS.Timeout

    if (countdownActive && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1)
      }, 1000)
    } else if (countdown === 0) {
      setOtpSent(false)
      setCountdownActive(false)
    }

    return () => {
      if (timer) clearInterval(timer)
    }
  }, [countdownActive, countdown])

  // Get translations for the current language
  const formTexts =
    translations.multiStepForm?.[language as keyof typeof translations.multiStepForm] || translations.multiStepForm?.ru

  const tooManyAttemptsMessage =
    formTexts?.tooManyAttempts ||
    (language === "uz"
      ? "Juda ko'p urinishlar, keyinroq qayta urinib ko'ring"
      : language === "en"
        ? "Too many attempts, please try again later"
        : "Слишком много попыток, попробуйте позже")

  // Modify the nextStep function to automatically send OTP when reaching step 4
  const nextStep = () => {
    if (validateForm()) {
      const nextStepNumber = currentStep + 1
      setCurrentStep(nextStepNumber)
      setError(null)

      // Automatically send OTP when reaching step 4
      if (nextStepNumber === 4) {
        requestOtp()
      }
    }
  }

  const prevStep = () => {
    setCurrentStep(currentStep - 1)
    setError(null)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target

    // Apply specific validations based on field name
    let validatedValue = value

    if (name === "first_name" || name === "last_name" || name === "middle_name") {
      // Allow letters, spaces, and punctuation marks like hyphens, apostrophes, and periods
      validatedValue = value.replace(/[^A-Za-zА-Яа-яЁёҚқҒғҲҳЎўЧчШшЪъ\s\-.']/g, "")
    } else if (name === "phone") {
      // Ensure phone always starts with +998 and only contains digits after that
      if (!value.startsWith("+")) {
        validatedValue = "+" + value.replace(/\D/g, "")
      } else {
        validatedValue = "+" + value.substring(1).replace(/\D/g, "")
      }

      // Limit to Uzbekistan format (+998XXXXXXXXX)
      if (validatedValue.length > 13) {
        validatedValue = validatedValue.substring(0, 13)
      }
    } else if (name === "passport_series") {
      // Force uppercase for passport series and only allow letters
      validatedValue = value.replace(/[^A-Za-z]/g, "").toUpperCase()
      if (validatedValue.length > 2) {
        validatedValue = validatedValue.substring(0, 2)
      }
    } else if (name === "passport_number" || name === "pinfl") {
      // Only allow digits for passport number and PINFL
      validatedValue = value.replace(/\D/g, "")
    }

    setFormData({ ...formData, [name]: validatedValue })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, passport_image: e.target.files[0] })
    }
  }

  // Update the validateForm function to include step 4
  const validateForm = (): boolean => {
    setError(null)

    if (currentStep === 1) {
      if (!formData.first_name || !formData.last_name || !formData.middle_name || !formData.birth_date) {
        setError(formTexts?.requiredFields || "Please fill in all required fields")
        return false
      }
    } else if (currentStep === 2) {
      if (!formData.phone || !formData.email) {
        setError(formTexts?.requiredFields || "Please fill in all required fields")
        return false
      }

      // Simple email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.email)) {
        setError(formTexts?.invalidEmail || "Please enter a valid email")
        return false
      }

      // Simple phone validation
      const phoneRegex = /^\+998\d{9}$/
      if (!phoneRegex.test(formData.phone)) {
        setError(formTexts?.invalidPhone || "Please enter a valid phone number in the format +998XXXXXXXXX")
        return false
      }
    } else if (currentStep === 3) {
      if (!formData.passport_series || !formData.passport_number || !formData.passport_image || !formData.pinfl) {
        setError(formTexts?.requiredFields || "Please fill in all required fields")
        return false
      }

      // Simple PINFL validation (14 digits)
      const pinflRegex = /^\d{14}$/
      if (!pinflRegex.test(formData.pinfl)) {
        setError(formTexts?.invalidPinfl || "PINFL must contain 14 digits")
        return false
      }

      // Simple passport series validation (2 uppercase letters)
      const passportSeriesRegex = /^[A-Z]{2}$/
      if (!passportSeriesRegex.test(formData.passport_series)) {
        setError(formTexts?.invalidPassportSeries || "Passport series must contain 2 uppercase letters")
        return false
      }

      // Simple passport number validation (7 digits)
      const passportNumberRegex = /^\d{7}$/
      if (!passportNumberRegex.test(formData.passport_number)) {
        setError(formTexts?.invalidPassportNumber || "Passport number must contain 7 digits")
        return false
      }
    }

    return true
  }

  // Update the requestOtp function to reset and start the countdown
  const requestOtp = async () => {
    // Don't allow resending if countdown is still active
    if (countdownActive && countdown > 0) {
      setOtpError(formTexts?.waitBeforeResend || "Please wait before requesting a new code")
      return
    }

    // Validate phone number format
    const phoneRegex = /^\+998\d{9}$/
    if (!phoneRegex.test(formData.phone)) {
      setOtpError(formTexts?.invalidPhone || "Please enter a valid phone number in the format +998XXXXXXXXX")
      return
    }

    setIsRequestingOtp(true)
    setOtpError(null)

    try {
      // Remove the + from the phone number before sending to backend
      const phoneWithoutPlus = formData.phone.replace("+", "")

      const response = await fetch("https://api.programiz.uz/api/request-otp/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone: phoneWithoutPlus,
        }),
      })

      const data = await response.json()

      if (data.success) {
        setOtpSent(true)
        setOtpError(null)
        // Reset and start the countdown
        setCountdown(240)
        setCountdownActive(true)
      } else {
        // Convert any error to a string to avoid [object Object]
        let errorMessage = tooManyAttemptsMessage

        // Try to extract a meaningful error message if possible
        try {
          if (data.message) {
            if (typeof data.message === "string") {
              errorMessage = data.message
            } else if (typeof data.message === "object") {
              errorMessage = JSON.stringify(data.message)
            }
          } else if (data.errors && Array.isArray(data.errors) && data.errors.length > 0) {
            const firstError = data.errors[0]
            if (typeof firstError === "string") {
              errorMessage = firstError
            } else if (firstError && typeof firstError === "object") {
              errorMessage = firstError.message || JSON.stringify(firstError)
            }
          }
        } catch (e) {
          // If anything goes wrong parsing the error, use the default message
          console.error("Error parsing API error response:", e)
        }

        // Always use the "too many attempts" message for any error that might be related
        const errorString = String(errorMessage).toLowerCase()
        if (
          errorString.includes("too many") ||
          errorString.includes("attempts") ||
          errorString.includes("try again") ||
          errorString.includes("limit")
        ) {
          errorMessage = tooManyAttemptsMessage
        }

        setOtpError(errorMessage)
      }
    } catch (err) {
      console.error("Error requesting OTP:", err)
      setOtpError(formTexts?.otpSendFailed || "Failed to send OTP code. Please try again.")
    } finally {
      setIsRequestingOtp(false)
    }
  }

  // Similarly, let's rewrite the verifyOtp function:
  const verifyOtp = async () => {
    if (!otpCode || otpCode.length !== 6) {
      setOtpError("Please enter a valid 6-digit OTP code")
      return
    }

    setIsVerifyingOtp(true)
    setOtpError(null)

    try {
      // Remove the + from the phone number before sending to backend
      const phoneWithoutPlus = formData.phone.replace("+", "")

      const response = await fetch("https://api.programiz.uz/api/verify-otp/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone: phoneWithoutPlus,
          otp_code: otpCode,
        }),
      })

      const data = await response.json()

      if (data.success && data.data?.verified) {
        setIsPhoneVerified(true)
        setOtpError(null)
      } else {
        // Convert any error to a string to avoid [object Object]
        let errorMessage = "Invalid or expired OTP code"

        // Try to extract a meaningful error message if possible
        try {
          if (data.message) {
            if (typeof data.message === "string") {
              errorMessage = data.message
            } else if (typeof data.message === "object") {
              errorMessage = JSON.stringify(data.message)
            }
          } else if (data.errors && Array.isArray(data.errors) && data.errors.length > 0) {
            const firstError = data.errors[0]
            if (typeof firstError === "string") {
              errorMessage = firstError
            } else if (firstError && typeof firstError === "object") {
              errorMessage = firstError.message || JSON.stringify(firstError)
            }
          }
        } catch (e) {
          // If anything goes wrong parsing the error, use the default message
          console.error("Error parsing API error response:", e)
        }

        // Always use the "too many attempts" message for any error that might be related
        const errorString = String(errorMessage).toLowerCase()
        if (
          errorString.includes("too many") ||
          errorString.includes("attempts") ||
          errorString.includes("try again") ||
          errorString.includes("limit")
        ) {
          errorMessage = tooManyAttemptsMessage
        }

        setOtpError(errorMessage)
      }
    } catch (err) {
      console.error("Error verifying OTP:", err)
      setOtpError(formTexts?.otpVerifyFailed || "Failed to verify OTP code. Please try again.")
    } finally {
      setIsVerifyingOtp(false)
    }
  }

  // Modify the handleOtpChange function to handle OTP input
  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow digits and limit to 6 characters
    const value = e.target.value.replace(/\D/g, "").substring(0, 6)
    setOtpCode(value)
  }

  // Update the handleSubmit function to check for phone verification
  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()

    if (!isPhoneVerified) {
      setError("Phone number must be verified before submitting the form")
      return
    }

    if (validateForm()) {
      setIsSubmitting(true)
      setError(null)

      try {
        // Prepare the data for submission
        const submissionData = {
          ...formData,
          course: courseId,
        }

        console.log("Submitting registration data:", submissionData)

        // Send the registration request
        const response = await registerForCourse(submissionData, language)

        console.log("Registration response:", response)

        // Check if the response indicates success
        if (!response.success) {
          throw new Error(response.message || "Registration failed")
        }

        // Set submitted state to true to show success message
        console.log("Setting isSubmitted to true")
        setIsSubmitted(true)

        // Call the onSuccess callback if provided
        if (onSuccess) {
          console.log("Calling onSuccess callback")
          onSuccess()
        }
      } catch (err) {
        console.error("Registration failed:", err)
        setError(err instanceof Error ? err.message : "Registration failed. Please try again.")
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  // Format the countdown time
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`
  }

  if (isSubmitted) {
    console.log("Rendering success message")
    return (
      <RegistrationSuccess
        firstName={formData.first_name}
        lastName={formData.last_name}
        email={formData.email}
        phone={formData.phone}
        onClose={() => {
          if (onSuccess) onSuccess()
        }}
      />
    )
  }

  return (
    <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
      {error && <div className="bg-red-50 p-3 rounded-lg text-red-700 text-sm">{error}</div>}

      {/* Progress indicator */}

      <div className="flex justify-between mb-4">
        {[1, 2, 3, 4].map((step) => (
          <div
            key={step}
            className={`w-1/4 h-2 rounded-full mx-1 ${currentStep >= step ? "bg-[#6a3de8]" : "bg-gray-200"}`}
          ></div>
        ))}
      </div>

      {currentStep === 1 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold mb-3">{formTexts?.step1Title || "Step 1: Personal Information"}</h3>
          <div>
            <label htmlFor="first_name" className="block text-sm font-medium text-gray-700 mb-1">
              {formTexts?.firstName || "First Name"}
            </label>
            <input
              type="text"
              id="first_name"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              required
              maxLength={50}
              pattern="[A-Za-zА-Яа-яЁёҚқҒғҲҳЎўЧчШшЪъ\s\-\.']+"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#6a3de8] focus:border-transparent"
              placeholder={formTexts?.enterFirstName || "Enter your first name"}
            />
          </div>
          <div>
            <label htmlFor="last_name" className="block text-sm font-medium text-gray-700 mb-1">
              {formTexts?.lastName || "Last Name"}
            </label>
            <input
              type="text"
              id="last_name"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              required
              maxLength={50}
              pattern="[A-Za-zА-Яа-яЁёҚқҒғҲҳЎўЧчШшЪъ\s\-\.']+"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#6a3de8] focus:border-transparent"
              placeholder={formTexts?.enterLastName || "Enter your last name"}
            />
          </div>
          <div>
            <label htmlFor="middle_name" className="block text-sm font-medium text-gray-700 mb-1">
              {formTexts?.middleName || "Middle Name"}
            </label>
            <input
              type="text"
              id="middle_name"
              name="middle_name"
              value={formData.middle_name}
              onChange={handleChange}
              required
              maxLength={50}
              pattern="[A-Za-zА-Яа-яЁёҚқҒғҲҳЎўЧчШшЪъ\s\-\.']+"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#6a3de8] focus:border-transparent"
              placeholder={formTexts?.enterMiddleName || "Enter your middle name"}
            />
          </div>
          <div>
            <label htmlFor="birth_date" className="block text-sm font-medium text-gray-700 mb-1">
              {formTexts?.birthDate || "Birth Date"}
            </label>
            <input
              type="date"
              id="birth_date"
              name="birth_date"
              value={formData.birth_date}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#6a3de8] focus:border-transparent"
            />
          </div>
        </div>
      )}

      {currentStep === 2 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold mb-3">{formTexts?.step2Title || "Step 2: Contact Information"}</h3>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              {formTexts?.phone || "Phone"}
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              maxLength={13} // +998 XX XXX XX XX (13 characters)
              pattern="\+998\d{9}"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#6a3de8] focus:border-transparent"
              placeholder={formTexts?.enterPhone || "Enter your phone number in the format +998XXXXXXXXX"}
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              {formTexts?.email || "Email"}
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              maxLength={100}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#6a3de8] focus:border-transparent"
              placeholder={formTexts?.enterEmail || "Enter your email"}
            />
          </div>
          <div>
            <label htmlFor="telegram_username" className="block text-sm font-medium text-gray-700 mb-1">
              {formTexts?.telegramUsername || "Telegram Username (optional)"}
            </label>
            <input
              type="text"
              id="telegram_username"
              name="telegram_username"
              value={formData.telegram_username || ""}
              onChange={handleChange}
              maxLength={32}
              pattern="@?[a-zA-Z0-9_]+"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#6a3de8] focus:border-transparent"
              placeholder={formTexts?.enterTelegramUsername || "Enter your Telegram username (e.g., @username)"}
            />
          </div>
        </div>
      )}

      {currentStep === 3 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold mb-3">{formTexts?.step3Title || "Step 3: Documents"}</h3>
          <div>
            <label htmlFor="passport_series" className="block text-sm font-medium text-gray-700 mb-1">
              {formTexts?.passportSeries || "Passport Series"}
            </label>
            <input
              type="text"
              id="passport_series"
              name="passport_series"
              value={formData.passport_series}
              onChange={handleChange}
              required
              maxLength={2}
              pattern="[A-Z]{2}"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#6a3de8] focus:border-transparent"
              placeholder={formTexts?.enterPassportSeries || "Enter passport series (2 uppercase letters)"}
            />
          </div>
          <div>
            <label htmlFor="passport_number" className="block text-sm font-medium text-gray-700 mb-1">
              {formTexts?.passportNumber || "Passport Number"}
            </label>
            <input
              type="text"
              id="passport_number"
              name="passport_number"
              value={formData.passport_number}
              onChange={handleChange}
              required
              maxLength={7}
              pattern="\d{7}"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#6a3de8] focus:border-transparent"
              placeholder={formTexts?.enterPassportNumber || "Enter passport number (7 digits)"}
            />
          </div>
          <div>
            <label htmlFor="passport_image" className="block text-sm font-medium text-gray-700 mb-1">
              {formTexts?.passportImage || "Passport Image"}
            </label>
            <input
              type="file"
              id="passport_image"
              name="passport_image"
              onChange={handleFileChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#6a3de8] focus:border-transparent"
            />
          </div>
          <div>
            <label htmlFor="pinfl" className="block text-sm font-medium text-gray-700 mb-1">
              {formTexts?.pinfl || "PINFL"}
            </label>
            <input
              type="text"
              id="pinfl"
              name="pinfl"
              value={formData.pinfl}
              onChange={handleChange}
              required
              maxLength={14}
              pattern="\d{14}"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#6a3de8] focus:border-transparent"
              placeholder={formTexts?.enterPinfl || "Enter PINFL (14 digits)"}
            />
          </div>
        </div>
      )}

      {currentStep === 4 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold mb-3">{formTexts?.step4Title || "Step 4: Phone Verification"}</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{formTexts?.phone || "Phone"}</label>
            <div className="flex items-center">
              <input
                type="tel"
                value={formData.phone}
                disabled
                className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50"
              />
            </div>
          </div>

          <div className="mt-3">
            <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-1">
              {formTexts?.enterOtp || "Enter 6-digit verification code"}
            </label>
            <div className="flex space-x-2">
              <input
                type="text"
                id="otp"
                value={otpCode}
                onChange={handleOtpChange}
                required
                maxLength={6}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#6a3de8] focus:border-transparent"
                placeholder={formTexts?.enterOtp || "Enter 6-digit verification code"}
              />
              <button
                type="button"
                onClick={verifyOtp}
                disabled={isVerifyingOtp || otpCode.length !== 6}
                className="bg-[#6a3de8] text-white py-2 px-4 rounded-lg font-medium hover:bg-[#5a2ed8] transition-colors whitespace-nowrap disabled:opacity-70"
              >
                {isVerifyingOtp ? formTexts?.verifying || "Verifying..." : formTexts?.verify || "Verify"}
              </button>
            </div>

            {countdownActive && (
              <div className="mt-2 text-sm text-gray-600">
                {formTexts?.otpValidFor || "Code valid for:"} {formatTime(countdown)}
              </div>
            )}

            {isPhoneVerified && (
              <div className="mt-2 text-green-600 text-sm flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-1"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                {formTexts?.phoneVerified || "Phone number verified"}
              </div>
            )}

            <div className="mt-2 flex justify-between items-center">
              <button
                type="button"
                onClick={requestOtp}
                disabled={isRequestingOtp || (countdownActive && countdown > 0)}
                className={`text-sm ${
                  countdownActive && countdown > 0
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-[#6a3de8] hover:underline"
                }`}
              >
                {isRequestingOtp
                  ? formTexts?.sending || "Sending..."
                  : countdownActive && countdown > 0
                    ? `${formTexts?.waitBeforeResend || "Wait"} ${formatTime(countdown)}`
                    : formTexts?.resendOtp || "Resend code"}
              </button>
            </div>

            {otpError && (
              <div className="mt-2 text-red-600 text-sm">
                {typeof otpError === "string"
                  ? otpError
                  : otpError === null
                    ? ""
                    : formTexts?.tooManyAttempts || "Too many attempts, please try again later"}
              </div>
            )}
          </div>
        </div>
      )}

      <div className="flex justify-between mt-6">
        {currentStep > 1 ? (
          <button
            type="button"
            onClick={prevStep}
            className="bg-gray-200 text-gray-700 py-3 px-6 rounded-full font-medium hover:bg-gray-300 transition-colors"
          >
            {formTexts?.back || "Back"}
          </button>
        ) : (
          <div></div>
        )}
        {currentStep < 4 ? (
          <button
            type="button"
            onClick={nextStep}
            className="bg-[#6a3de8] text-white py-3 px-6 rounded-full font-medium hover:bg-[#5a2ed8] transition-colors"
          >
            {formTexts?.next || "Next"}
          </button>
        ) : (
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={isSubmitting || !isPhoneVerified}
            className="bg-[#6a3de8] text-white py-3 px-6 rounded-full font-medium hover:bg-[#5a2ed8] transition-colors disabled:opacity-70"
          >
            {isSubmitting ? formTexts?.sending || "Sending..." : formTexts?.submit || "Submit Application"}
          </button>
        )}
      </div>
    </form>
  )
}
