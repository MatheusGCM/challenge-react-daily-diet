import { api } from '@/lib/axios'

interface RegisterUserProps {
  name: string
  email: string
  password: string
}

export async function registerUser(body: RegisterUserProps) {
  await api.post('/user', body)
}
