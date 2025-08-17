import { useFoodItems } from 'graphql/queries/foodItems'
import { Spinner, YStack, Text } from 'tamagui'
import type {  UsageType } from 'types'
import { ResponsiveGrid } from './grid/ResponsiveGrid'
import FoodItemCard from './FoodItemCard'

interface FoodListProps {
  usageType: UsageType
}

export default function FoodList({ usageType }: FoodListProps) {
  const { data, isFetching, error } = useFoodItems(usageType)
  if (isFetching) return <Spinner />
  if (error) return <Text>Error loading items</Text>

  if (!data || data.length === 0) {
    return (
      <YStack
        background="$background"
        borderColor="$borderColor"
        borderWidth={1}
        gap="$2"
        overflow="hidden"
      >
        <Text>No items</Text>
      </YStack>
    )
  }

  return (
    <ResponsiveGrid
      data={data}
      gap={8}
      contentPadding={16}
      phoneColumns={2}
      tabletColumns={4}
      renderItem={(item) => <FoodItemCard item={item} usageType={usageType} />}
    />
  )
}
