import { TrainingCard } from "./training-card"

export function TrainingGrid() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <TrainingCard
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-gift"
          >
            <polyline points="20 12 20 22 4 22 4 12" />
            <rect width="20" height="5" x="2" y="7" />
            <line x1="12" x2="12" y1="22" y2="7" />
            <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
            <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
          </svg>
        }
        title="Повышение квалификации"
        description="Переведём ваших сотрудников на следующий уровень"
      />
      <TrainingCard
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-message-square"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        }
        title="Переобучение сотрудников"
        description="Обучим навыкам из смежной области"
      />
      <TrainingCard
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-gift"
          >
            <polyline points="20 12 20 22 4 22 4 12" />
            <rect width="20" height="5" x="2" y="7" />
            <line x1="12" x2="12" y1="22" y2="7" />
            <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
            <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
          </svg>
        }
        title="Обучение технологиям"
        description="Поможем освоить новую технологию для ваших проектов"
      />
      <TrainingCard
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-message-square"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        }
        title="Работа с данными"
        description="Поможем освоить новую технологию для ваших проектов"
      />
    </div>
  )
}
