import { useLocalSearchParams } from 'expo-router'
import { useEffect, useState } from 'react'
import { YStack, Text, Spinner } from 'tamagui'

type MealDetail = {
  idMeal: string
  strMeal: string
  strInstructions: string
}

type MealDetailResponse = {
  meals: MealDetail[]
}

export default function RecipeDetailScreen(): React.ReactElement {
  const { id } = useLocalSearchParams<{ id: string }>()
  const [meal, setMeal] = useState<MealDetail | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchMeal = async (): Promise<void> => {
      const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      const json: MealDetailResponse = await res.json()
      setMeal(json.meals[0])
      setLoading(false)
    }
    fetchMeal()
  }, [id])

  if (loading) {
    return (
      <YStack flex={1} align-items="center" justify-content="center">
        <Spinner size="large" />
      </YStack>
    )
  }

  if (!meal) {
    return (
      <YStack align-items="center" justify-content="center">
        <Text>No meal found</Text>
      </YStack>
    )
  }

  return (
    <YStack background={"$blue5"} p="$3" gap="$3">
      <Text fontSize="$8">{meal.strMeal}</Text>
      <Text>{meal.strInstructions}</Text>
    </YStack>
  )
}
