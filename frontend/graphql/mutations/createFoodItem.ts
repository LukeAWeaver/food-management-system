import { gql, useMutation } from '@apollo/client'

export const CREATE_FOOD_ITEM = gql`
  mutation CreateFoodItem($input: CreateFoodItemInput!) {
    createFoodItem(input: $input) {
      id
      name
    }
  }
`

export function useCreateFoodItem() {
  return useMutation(CREATE_FOOD_ITEM, {
    onError: (e) => {
      console.warn('CreateFoodItem failed:', e.message)
    },
  })
}
