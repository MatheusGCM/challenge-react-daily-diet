import { api } from '@/lib/axios'

interface RegisterMealBody {
  name: string
  description: string
  date: string
  time: string
  isOnDiet: boolean
}

export async function registerMeal(body: RegisterMealBody) {
  await api.post('/meal', body)
}
