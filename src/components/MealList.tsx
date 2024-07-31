import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

interface MealListProps {
  time: string
  name: string
  isOnDiet: boolean
}

export function MealList({ time, name, isOnDiet }: MealListProps) {
  const formatTime = format(time, 'p', { locale: ptBR })

  return (
    <div className="flex items-center gap-3 rounded-md border border-gray-5 px-4 py-3">
      <span className="text-xs font-bold">{formatTime}</span>
      <span className="flex items-center gap-3 text-base text-gray-2 before:flex before:h-3 before:w-px before:bg-gray-4">
        {name}
      </span>
      <div
        className={`ml-auto size-4 rounded-full ${isOnDiet ? 'bg-green-mid' : 'bg-red-mid'}`}
      />
    </div>
  )
}
