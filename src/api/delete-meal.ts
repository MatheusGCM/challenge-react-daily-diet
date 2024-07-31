import { api } from '@/lib/axios'

export async function deleteMeal(mealId: string) {
  await api.delete(`/meal/${mealId}`)
}
