import { useQuery } from '@tanstack/react-query'
import { fetchJson } from 'api/mealDB'
import { type FoodItemSuggestion } from 'types'


export function useFoodOptions() {
  return useQuery({
    queryKey: ['ingredients'],
    queryFn: async () => {
      const data = await fetchJson<FoodItemSuggestion[]>('/list.php?i=list')
      return data ?? []
    },
    staleTime: 24 * 60 * 60 * 1000,
    gcTime: Infinity,
  })
}
