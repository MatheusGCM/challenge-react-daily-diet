import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { z } from 'zod'

import { login } from '@/api/login'
import logo from '@/assets/logo.svg'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { toast } from '@/components/ui/use-toast'

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

type SignInFormProps = z.infer<typeof signInSchema>

export function SignIn() {
  const navigate = useNavigate()
  const { register, handleSubmit } = useForm<SignInFormProps>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: 'matheus@email.com',
      password: 'matheus123',
    },
  })

  const { mutateAsync: loginFn } = useMutation({
    mutationFn: login,
  })

  async function handleSignIn(data: SignInFormProps) {
    try {
      await loginFn(data)
      navigate('/')
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Email ou senha incorretos!',
      })
    }
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <img src={logo} alt="" className="size-36" />
      <form className="w-4/5 space-y-8" onSubmit={handleSubmit(handleSignIn)}>
        <div className="flex flex-col gap-4">
          <Input
            label="E-mail"
            placeholder="@email.com"
            {...register('email')}
          />
          <Input
            label="Senha"
            placeholder="*********"
            {...register('password')}
          />
          <Link to={'/sign-up'} className="text-right text-gray-3 underline">
            Não possui cadastro?
          </Link>
        </div>
        <Button label="Entrar" className="mt-auto" type="submit" />
      </form>
    </div>
  )
}
