import { api } from '@/lib/axios'

interface LoginProps {
  email: string
  password: string
}

export async function login(body: LoginProps) {
  await api.post('/user/login', body)
}
