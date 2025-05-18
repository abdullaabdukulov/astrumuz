"use client"

import { useState } from "react"
import Image from "next/image"

interface SafeImageProps {
  src: string
  alt: string
  width: number
  height: number
  className?: string
  fallbackSrc?: string
}

export function SafeImage({
  src,
  alt,
  width,
  height,
  className = "",
  fallbackSrc = "/placeholder.svg",
}: SafeImageProps) {
  const [error, setError] = useState(false)

  // Rasm URL-ni olish
  const imageSrc = error ? fallbackSrc : src

  return (
    <Image
      src={imageSrc || "/placeholder.svg"}
      alt={alt}
      width={width}
      height={height}
      className={className}
      onError={() => setError(true)}
      unoptimized={true} // Tashqi URL-lar uchun
    />
  )
}
