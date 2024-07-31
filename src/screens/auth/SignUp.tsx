import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { z } from 'zod'

import { registerUser } from '@/api/register-user'
import logo from '@/assets/logo.svg'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { ToastAction } from '@/components/ui/toast'
import { useToast } from '@/components/ui/use-toast'

const signUpShema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
})

type SignUpFormProps = z.infer<typeof signUpShema>

export function SignUp() {
  const navigate = useNavigate()
  const { toast } = useToast()
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignUpFormProps>({
    resolver: zodResolver(signUpShema),
  })

  const { mutateAsync: registerUserFn } = useMutation({
    mutationFn: registerUser,
  })

  async function handleRegisterUser(data: SignUpFormProps) {
    try {
      await registerUserFn(data)
      toast({
        title: 'Cadastro',
        description: 'Usuário cadastrado com sucesso!',
        action: (
          <ToastAction altText="login" onClick={() => navigate('/sign-in')}>
            Login
          </ToastAction>
        ),
      })
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Algo deu errado.',
        description: 'Houve um problema com o seu cadastro.',
      })
    }
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <img src={logo} alt="" className="size-36" />
      <form
        className="w-4/5 space-y-8"
        onSubmit={handleSubmit(handleRegisterUser)}
      >
        <div className="flex flex-col gap-4">
          <Input label="Nome" placeholder="Jon Doe" {...register('name')} />
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
          <Link to={'/sign-in'} className="text-right text-gray-3 underline">
            Já possui cadastro?
          </Link>
        </div>
        <Button
          label={isSubmitting ? 'Cadastrando...' : 'Cadastrar'}
          className="mt-auto"
          disabled={isSubmitting}
          type="submit"
        />
      </form>
    </div>
  )
}
