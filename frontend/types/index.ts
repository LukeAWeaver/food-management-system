export type UsageType = 'snack' | 'meal_ingredient'

export type FoodItem = {
  id: string
  name: string
  expirationDate: string
  location: string
  usageType: UsageType
  createdAt: string
}