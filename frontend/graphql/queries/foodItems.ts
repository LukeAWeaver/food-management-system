import { gql, useQuery } from '@apollo/client'

export const GET_FOOD_ITEMS_BY_USAGE_TYPE = gql`
  query GetFoodItems($usageType: UsageType!) {
    foodItemsByUsageType(usageType: $usageType) {
      id
      name
      expirationDate
      location
      usageType
    }
  }
`

export function useFoodItems(usageType: 'snack' | 'meal_ingredient') {
  return useQuery(GET_FOOD_ITEMS_BY_USAGE_TYPE, {
    variables: { usageType }
  })
}
