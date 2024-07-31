import { ArrowLeft } from '@phosphor-icons/react'
import { useNavigate, useLocation } from 'react-router-dom'

import { OverviewResponse } from '@/api/get-overview'
import * as CardPercent from '@/components/CardPercent'
import { DietStats } from '@/components/DietStats'

export function Dashboard() {
  const navigate = useNavigate()
  const { state } = useLocation() as {
    state: { overview: OverviewResponse; percentWithinDiet: number }
  }

  const isPositiveStatus = state.percentWithinDiet > 50
  const bgColor = isPositiveStatus ? 'bg-green-light' : 'bg-red-light'

  return (
    <div className={`flex flex-1 flex-col pt-9 ${bgColor}`}>
      <CardPercent.Root percent={state.percentWithinDiet}>
        <CardPercent.Header>
          <ArrowLeft
            className="absolute left-2 top-2 size-6"
            onClick={() => navigate(-1)}
          />
        </CardPercent.Header>

        <CardPercent.Content />
      </CardPercent.Root>
      <div className="space-y-6 rounded-[1.25rem] bg-white px-6 py-8 text-center">
        <h3 className="text-sm font-bold text-gray-1">Estatísticas gerais</h3>
        <div className="space-y-3">
          <DietStats
            value={state.overview.best_sequence_within_diet}
            description="melhor sequência de pratos dentro da dieta"
          />
          <DietStats
            value={state.overview.total}
            description="refeições registradas"
          />
          <div className="flex flex-row gap-3">
            <DietStats
              value={state.overview.within_diet}
              description="refeições dentro da dieta"
              className="bg-green-light"
            />
            <DietStats
              value={state.overview.outside_diet}
              description="refeições fora da dieta"
              className="bg-red-light"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
