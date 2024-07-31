import { api } from '@/lib/axios'

export interface MealResponse {
  id: string
  name: string
  description: string
  date: string
  time: string
  isOnDiet: boolean
  user_session_id: string
}

export async function getMeals() {
  const {
    data: { meals },
  } = await api.get<{ meals: MealResponse[] }>('/meal')

  return meals
}

export async function getMealPerId(mealId?: string) {
  const {
    data: { meal },
  } = await api.get<{ meal: MealResponse }>(`/meal/${mealId}`)

  return meal
}
