import { useFoodItems } from 'graphql/queries/foodItems'
import {  Spinner, YStack, Text,  useTheme } from 'tamagui'
import FoodItem from './FoodItem'
import { UsageType } from 'types'
                                                                            
interface FoodListProps {
  usageType: UsageType
}

const FoodList = ( props : FoodListProps) => {
  const { usageType } = props
  const { data, loading, error } = useFoodItems(usageType)
  const theme = useTheme()

  const cardBg: string = theme.accentBackground?.val ?? theme.backgroundHover?.val ?? theme.background.val
  const cardBorder: string = theme.borderColor.val
  
  if (loading) {
    return <Spinner />
  }

  if (error) {
    return <Text>Error loading items</Text>
  }
    if (!data || !data.foodItemsByUsageType || data.foodItemsByUsageType.length === 0) {
    return (
      <YStack
        background="$background"
        borderColor="$borderColor"
        borderWidth={1}
        gap="$2"
        p="$2"
        style={{ borderRadius: 8, overflow: 'hidden' }}
      >
        <Text>No items</Text>
      </YStack>
    )
  }

  return (
      <YStack
      borderWidth={1}
      borderColor="$borderColor"
      gap="$2"
      p="$2"
      style={{ backgroundColor: cardBg, borderColor: cardBorder, borderRadius: 4 }}
    >
      {data.foodItemsByUsageType.map((item: FoodItem) => (
        <FoodItem item={item} key={item.id} usageType={usageType} />
      ))}
    </YStack>
  )
}

export default FoodList