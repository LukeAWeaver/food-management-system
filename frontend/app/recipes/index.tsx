import { X } from '@tamagui/lucide-icons'
import { useLocalSearchParams, router } from 'expo-router'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { FlatList, Image, Pressable } from 'react-native'
import { YStack, XStack, Text, Input, Button, Spinner, SizableText } from 'tamagui'

type MealListItem = {
  idMeal: string
  strMeal: string
  strMealThumb: string
}

type MealListResponse = {
  meals: MealListItem[] | null
}

type MealDetail = {
  idMeal: string
  strIngredient1: string | null
  strIngredient2: string | null
  strIngredient3: string | null
  strIngredient4: string | null
  strIngredient5: string | null
  strIngredient6: string | null
  strIngredient7: string | null
  strIngredient8: string | null
  strIngredient9: string | null
  strIngredient10: string | null
  strIngredient11: string | null
  strIngredient12: string | null
  strIngredient13: string | null
  strIngredient14: string | null
  strIngredient15: string | null
  strIngredient16: string | null
  strIngredient17: string | null
  strIngredient18: string | null
  strIngredient19: string | null
  strIngredient20: string | null
}

type MealDetailResponse = {
  meals: MealDetail[] | null
}

type IngredientsMap = Record<string, string[]>

export default function RecipesScreen(): React.ReactElement {
  const { ingredient } = useLocalSearchParams<{ ingredient?: string }>()
  const [query, setQuery] = useState<string>(ingredient ?? '')
  const [meals, setMeals] = useState<MealListItem[]>([])
  const [ingredientsById, setIngredientsById] = useState<IngredientsMap>({})
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [detailsLoading, setDetailsLoading] = useState<boolean>(false)

  const encodedQuery: string = useMemo(() => {
    if (query.trim().length > 0) {
      return encodeURIComponent(query.trim())
    } else {
      return ''
    }
  }, [query])

  const requestUrl: string = useMemo(() => {
    if (encodedQuery.length > 0) {
      return `https://www.themealdb.com/api/json/v1/1/filter.php?i=${encodedQuery}`
    } else {
      return ''
    }
  }, [encodedQuery])

  const fetchMeals = useCallback(async (): Promise<void> => {
    if (requestUrl.length === 0) {
      setMeals([])
      setIngredientsById({})
      setError(null)
      setLoading(false)
      return
    } else {
      setLoading(true)
      setError(null)
      try {
        const res: Response = await fetch(requestUrl)
        const json: MealListResponse = await res.json()
        if (json.meals === null) {
          setMeals([])
          setIngredientsById({})
        } else {
          setMeals(json.meals)
        }
      } catch (e: unknown) {
        const message: string = e instanceof Error ? e.message : 'Unknown error'
        setError(message)
        setMeals([])
        setIngredientsById({})
      } finally {
        setLoading(false)
      }
    }
  }, [requestUrl])

  const fetchIngredientsFor = useCallback(async (list: MealListItem[]): Promise<void> => {
    if (list.length === 0) {
      setIngredientsById({})
      return
    }
    setDetailsLoading(true)
    try {
      const pairs: Array<[string, string[]]> = await Promise.all(
        list.map(async (m: MealListItem): Promise<[string, string[]]> => {
          const url: string = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${encodeURIComponent(m.idMeal)}`
          const res: Response = await fetch(url)
          const json: MealDetailResponse = await res.json()
          const det: MealDetail | undefined = Array.isArray(json.meals) ? json.meals[0] : undefined
          if (!det) {
            return [m.idMeal, []]
          }
          const all: Array<string | null> = [
            det.strIngredient1, det.strIngredient2, det.strIngredient3, det.strIngredient4, det.strIngredient5,
            det.strIngredient6, det.strIngredient7, det.strIngredient8, det.strIngredient9, det.strIngredient10,
            det.strIngredient11, det.strIngredient12, det.strIngredient13, det.strIngredient14, det.strIngredient15,
            det.strIngredient16, det.strIngredient17, det.strIngredient18, det.strIngredient19, det.strIngredient20
          ]
          const cleaned: string[] = all
            .map((s: string | null): string => (s ?? '').trim())
            .filter((s: string): boolean => s.length > 0 && s.toLowerCase() !== 'null' && s.toLowerCase() !== 'undefined')
          return [m.idMeal, cleaned]
        })
      )
      const mapped: IngredientsMap = pairs.reduce((acc: IngredientsMap, [id, arr]: [string, string[]]) => {
        acc[id] = arr
        return acc
      }, {} as IngredientsMap)
      setIngredientsById(mapped)
    } catch (e: unknown) {
      setIngredientsById({})
    } finally {
      setDetailsLoading(false)
    }
  }, [])

  useEffect(() => {
    void fetchMeals()
  }, [fetchMeals])

  useEffect(() => {
    void fetchIngredientsFor(meals)
  }, [meals, fetchIngredientsFor])

  const onSubmit = useCallback((): void => {
    if (query.trim().length > 0) {
      router.replace(`/recipes?ingredient=${encodeURIComponent(query.trim())}`)
      void fetchMeals()
    } else {
      setMeals([])
      setIngredientsById({})
      setError(null)
    }
  }, [query, fetchMeals])

  const renderIngredients = useCallback((idMeal: string): React.ReactElement | null => {
    const items: string[] | undefined = ingredientsById[idMeal]
    if (!items || items.length === 0) {
      return null
    }
    return (
      <YStack gap="$1" mt="$2">
        {items.map((ing: string, idx: number) => ( <XStack justify-items="center" key={`${idMeal}-ing-${idx}`} gap="$1">
            <X/>
            <SizableText key={`${idMeal}-${idx}`} size="$2" color="$color">
                {ing}
            </SizableText>
          </XStack>
        ))}
      </YStack>
    )
  }, [ingredientsById])

  const renderItem = useCallback(({ item }: { item: MealListItem }): React.ReactElement => {
    return (
      <Pressable onPress={() => router.push(`/recipes/${item.idMeal}`)}>
        <XStack background="$red8" align-items="center" p="$3" style={{ borderRadius: 12 }} borderWidth={1} border-color="$gray5" mx="$2" my="$2" gap="$3">
          <Image
            source={{ uri: item.strMealThumb }}
            style={{ width: 72, height: 72, borderRadius: 12 }}
            resizeMode="cover"
          />
          <YStack flex={1}>
            <Text fontSize="$6" numberOfLines={2}>
              {item.strMeal}
            </Text>
            <SizableText size="$2" color="$color">
              ID: {item.idMeal}
            </SizableText>
            {renderIngredients(item.idMeal)}
          </YStack>
        </XStack>
      </Pressable>
    )
  }, [renderIngredients])

  const keyExtractor = useCallback((item: MealListItem): string => {
    return item.idMeal
  }, [])

  return (
    <YStack background="$blue5" flex={1} p="$3" gap="$3">
      <Text fontSize="$8" text-align="center">
        Meal ideas by ingredient
      </Text>

      <XStack gap="$2" align-items="center">
        <Input
          flex={1}
          value={query}
          onChangeText={setQuery}
          placeholder="e.g., chicken, beef, tomato"
          accessibilityLabel="Ingredient"
        />
        <Button onPress={onSubmit} size="$3">
          Search
        </Button>
      </XStack>

      {loading ? (
        <YStack flex={1} align-items="center" justify-content="center" gap="$2">
          <Spinner size="large" />
          <Text>Loading meals…</Text>
        </YStack>
      ) : (
        <>
          {error ? (
            <YStack flex={1} align-items="center" justify-content="center" gap="$2">
              <Text color="$red10">Error: {error}</Text>
            </YStack>
          ) : (
            <>
              {meals.length === 0 ? (
                <YStack flex={1} align-items="center" justify-content="center" gap="$2">
                  <Text>No results. Try another ingredient.</Text>
                </YStack>
              ) : (
                <>
                  {detailsLoading && (
                    <YStack align-items="center" justify-content="center" gap="$2">
                      <Spinner />
                      <Text>Loading ingredients…</Text>
                    </YStack>
                  )}
                  <FlatList
                    data={meals}
                    renderItem={renderItem}
                    keyExtractor={keyExtractor}
                    contentContainerStyle={{ paddingVertical: 8 }}
                  />
                </>
              )}
            </>
          )}
        </>
      )}
    </YStack>
  )
}
