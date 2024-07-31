import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import { MealResponse } from '@/api/get-meals'

interface DateGroupedMeals {
  date: string
  meals: MealResponse[]
}

export function reduceMeals(meals: MealResponse[]) {
  return meals.reduce<DateGroupedMeals[]>((acc, meal) => {
    const { date } = meal
    const formatDate = format(date, 'dd.MM.yy', { locale: ptBR })

    const existingDateGroup = acc.find((group) => group.date === formatDate)

    if (existingDateGroup) {
      existingDateGroup.meals.push(meal)
    } else {
      acc.push({
        date: formatDate,
        meals: [meal],
      })
    }

    return acc
  }, [])
}
