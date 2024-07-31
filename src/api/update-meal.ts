import { api } from '@/lib/axios'

export interface UpdateMealBody {
  name: string
  description: string
  date: string
  time: string
  isOnDiet: boolean
}

export async function updateMeal(mealId: string, body: UpdateMealBody) {
  await api.put(`/meal/${mealId}`, body)
}
