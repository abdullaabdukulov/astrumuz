import type { ReactNode } from "react"

interface TrainingCardProps {
  icon: ReactNode
  title: string
  description: string
}

export function TrainingCard({ icon, title, description }: TrainingCardProps) {
  return (
    <div className="bg-gray-50 rounded-xl p-5">
      <div className="bg-[#6a3de8] rounded-full w-12 h-12 flex items-center justify-center mb-3">{icon}</div>
      <h4 className="font-bold text-base mb-2">{title}</h4>
      <p className="text-sm text-gray-700">{description}</p>
    </div>
  )
}
