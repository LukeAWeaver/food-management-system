import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { Platform } from 'react-native'

type UsageType = 'snack' | 'meal_ingredient'

type FoodItem = {
  id: string
  name: string
  expirationDate: string
  location: string
  usageType: UsageType
  createdAt: string
}

type FoodItemsResponse = {
  data: {
    foodItemsByUsageType: FoodItem[]
  }
}

const GET_FOOD_ITEMS_BY_USAGE_TYPE = `
  query GetFoodItems($usageType: UsageType!) {
    foodItemsByUsageType(usageType: $usageType) {
      id
      name
      expirationDate
      location
      usageType
      createdAt
    }
  }
`

const GRAPHQL_URL =
  Platform.OS === 'web'
    ? 'http://localhost:3000/graphql'
    : 'http://192.168.0.144:3000/graphql' // ← change to your LAN IP

async function fetchFoodItems(usageType: UsageType): Promise<FoodItem[]> {
  const res = await fetch(GRAPHQL_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: GET_FOOD_ITEMS_BY_USAGE_TYPE,
      variables: { usageType },
    }),
  })

  if (!res.ok) {
    throw new Error(`Network error: ${res.status} ${res.statusText}`)
  }

  const json: FoodItemsResponse = await res.json()
  return json.data.foodItemsByUsageType
}

export function useFoodItems(usageType: UsageType): UseQueryResult<FoodItem[], Error> {
  return useQuery({
    queryKey: ['foodItemsByUsageType', usageType],
    queryFn: () => fetchFoodItems(usageType),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  })
}
