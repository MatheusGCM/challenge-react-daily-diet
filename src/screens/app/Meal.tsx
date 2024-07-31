import { PencilSimpleLine, Trash } from '@phosphor-icons/react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useNavigate, useParams } from 'react-router-dom'

import { deleteMeal } from '@/api/delete-meal'
import { getMealPerId } from '@/api/get-meals'
import { Button } from '@/components/Button'
import { DeleteMealDialog } from '@/components/DeleteMealDialog'
import { AlertDialog, AlertDialogTrigger } from '@/components/ui/alert-dialog'

export function Meal() {
  const navigate = useNavigate()
  const { mealId } = useParams()

  const { data: meal } = useQuery({
    queryKey: ['meals', mealId],
    queryFn: () => getMealPerId(mealId),
    retry: 1,
  })

  const { mutateAsync: deleteMealFn } = useMutation({
    mutationKey: ['meals'],
    mutationFn: deleteMeal,
  })

  async function handleDeleteMeal() {
    try {
      if (!mealId) {
        return
      }
      await deleteMealFn(mealId)
      navigate('/', { replace: true })
    } catch (error) {
      console.error(error)
    }
  }

  if (!meal) {
    return
  }

  const date = format(meal.date, 'P', { locale: ptBR })
  const time = format(meal.time, 'p', { locale: ptBR })

  return (
    <>
      <h1 className="mb-2 text-xl/[26px] font-bold text-gray-1">
        {meal?.name}
      </h1>
      <h3 className="mb-6 text-base/[20.8px] text-gray-2">
        {meal?.description}
      </h3>

      <p className="mb-2 text-sm/[18.2px] font-bold text-gray-1">Data e hora</p>
      <p className="mb-6 text-base/[20.8px] text-gray-2">{`${date} às ${time}`}</p>

      <div className="flex items-center gap-2 self-start rounded-full bg-gray-6 px-4 py-2">
        <div
          className={`size-2 rounded-full  ${meal?.isOnDiet ? 'bg-green-dark ' : 'bg-red-dark'}`}
        />
        <span className="text-sm text-gray-1">
          {meal?.isOnDiet ? 'dentro' : 'fora'} da dieta
        </span>
      </div>

      <div className="mt-auto flex flex-col gap-2">
        <Button
          label="Editar refeição"
          icon={PencilSimpleLine}
          onClick={() => navigate(`/meal/edit/${mealId}`, { state: { meal } })}
        />

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="secondary" label="Excluir refeição" icon={Trash} />
          </AlertDialogTrigger>
          <DeleteMealDialog onDelete={handleDeleteMeal} />
        </AlertDialog>
      </div>
    </>
  )
}
