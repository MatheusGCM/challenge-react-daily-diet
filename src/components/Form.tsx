import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { z } from 'zod'

import { Button } from './Button'
import { Input } from './Input'
import { RadioInput } from './RadioInput'

import { MealResponse } from '@/api/get-meals'
import { registerMeal } from '@/api/register-meal'
import { updateMeal, UpdateMealBody } from '@/api/update-meal'

const newMealFormSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(3),
  datetime: z.string(),
  isOnDiet: z.enum(['yes', 'no']),
})

type NewMealFormProps = z.infer<typeof newMealFormSchema>

export function Form() {
  const navigate = useNavigate()
  const { mealId } = useParams()
  const { pathname, state } = useLocation() as {
    pathname: string
    state: { meal: MealResponse } | undefined
  }
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<NewMealFormProps>({
    resolver: zodResolver(newMealFormSchema),
    defaultValues: {
      name: state?.meal.name ?? '',
      description: state?.meal.description ?? '',
      datetime: state?.meal.date ?? '',
      isOnDiet: state ? (state.meal.isOnDiet ? 'yes' : 'no') : undefined,
    },
  })

  const { mutateAsync: registerMealFn } = useMutation({
    mutationKey: ['meals'],
    mutationFn: registerMeal,
  })

  const { mutateAsync: updateMealFn } = useMutation({
    mutationKey: ['meals'],
    mutationFn: ({ mealId, body }: { mealId: string; body: UpdateMealBody }) =>
      updateMeal(mealId, body),
  })

  async function handleRegisterNewMeal(formData: NewMealFormProps) {
    try {
      const { datetime, isOnDiet } = formData

      if (pathname.includes('edit')) {
        if (!mealId) {
          return
        }

        const body = {
          ...formData,
          date: datetime,
          time: datetime,
          isOnDiet: isOnDiet === 'yes',
        }
        return await updateMealFn({ mealId, body })
      }

      await registerMealFn({
        ...formData,
        date: datetime,
        time: datetime,
        isOnDiet: isOnDiet === 'yes',
      })
      navigate('/feedback', { state: formData.isOnDiet, replace: true })
    } catch (error) {
      console.error(error)
    }
  }

  const selectedRadio = watch('isOnDiet')

  return (
    <form
      className="flex-1 space-y-6"
      onSubmit={handleSubmit(handleRegisterNewMeal)}
    >
      <Input
        id="name"
        label="Nome *"
        isError={!!errors.name}
        {...register('name')}
      />
      <div>
        <label htmlFor="description" className="text-sm font-bold text-gray-2">
          Descrição *
        </label>
        <textarea
          id="description"
          className={`flex min-h-[7.5rem] w-full resize-y items-center rounded-md border border-gray-5 px-3 py-2 outline-none focus:border-gray-3 ${errors.description && 'border-red-500'} `}
          {...register('description')}
        />
      </div>

      <Input
        label="Data e Hora *"
        type="datetime-local"
        {...register('datetime')}
      />

      <div className="flex flex-1 flex-col gap-2">
        <p className="mb-2 text-sm font-bold text-gray-2">
          Está dentro da dieta? *
        </p>
        <div className="flex gap-2">
          <RadioInput
            value="yes"
            isSelected={selectedRadio === 'yes'}
            {...register('isOnDiet')}
          />
          <RadioInput
            value="no"
            isSelected={selectedRadio === 'no'}
            {...register('isOnDiet')}
          />
        </div>
      </div>

      <Button
        isLoading={isSubmitting}
        disabled={isSubmitting}
        type="submit"
        label={
          pathname.includes('new') ? 'Cadastrar refeição' : 'Salvar alterações'
        }
        className="mt-auto"
      />
    </form>
  )
}
