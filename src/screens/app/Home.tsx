import { ArrowUpRight, Plus } from '@phosphor-icons/react'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

import { getMeals } from '@/api/get-meals'
import { getOverview } from '@/api/get-overview'
import { Button } from '@/components/Button'
import * as CardPercent from '@/components/CardPercent'
import { Header } from '@/components/Header'
import { MealList } from '@/components/MealList'
import { reduceMeals } from '@/utils/reduce-meals'

export function Home() {
  const navigate = useNavigate()

  const { data: meals } = useQuery({
    queryKey: ['meals'],
    queryFn: getMeals,
    retry: 1,
  })

  const { data: overview } = useQuery({
    queryKey: ['overview', 'meals'],
    queryFn: getOverview,
    retry: 1,
  })

  if (!meals || !overview) {
    return
  }

  const nestedByDate = reduceMeals(meals)
  const percentWithinDiet = (overview?.within_diet / overview?.total) * 100

  return (
    <div className="flex flex-col gap-8 p-6">
      <Header />

      {!!meals.length && (
        <CardPercent.Root
          percent={percentWithinDiet}
          onClick={() =>
            navigate('/dashboard', { state: { overview, percentWithinDiet } })
          }
          className="rounded-lg"
        >
          <CardPercent.Header>
            <ArrowUpRight className="absolute right-2 top-2 size-6" />
          </CardPercent.Header>
          <CardPercent.Content />
        </CardPercent.Root>
      )}

      <div className="space-y-2">
        <p className="text-base text-gray-1">Refeições</p>
        <Button
          icon={Plus}
          label="Nova refeição"
          onClick={() => navigate('/meal/new')}
        />
      </div>

      {nestedByDate?.map((item) => {
        return (
          <div className="space-y-2" key={item.date}>
            <p className="text-lg font-bold">{item.date}</p>
            {item.meals.map((meal) => (
              <button
                key={meal.id}
                className="w-full cursor-pointer"
                onClick={() =>
                  navigate(`/meal/${meal.id}`, {
                    state: { isOnDiet: meal.isOnDiet },
                  })
                }
              >
                <MealList {...meal} />
              </button>
            ))}
          </div>
        )
      })}
    </div>
  )
}
