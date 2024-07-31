import { api } from '@/lib/axios'

export interface OverviewResponse {
  total: number
  within_diet: number
  outside_diet: number
  best_sequence_within_diet: number
}

export async function getOverview() {
  const {
    data: { overview },
  } = await api.get<{ overview: OverviewResponse }>('/user/overview')

  return overview
}
