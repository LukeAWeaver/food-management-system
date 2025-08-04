import { useFoodItems } from 'graphql/queries/foodItems'
import { ListItem, Spinner, YStack, Text } from 'tamagui'

const FoodList = ({ usageType }: { usageType: 'snack' | 'meal_ingredient' }) => {
  const { data, loading, error } = useFoodItems(usageType)

  if (loading) {
    return <Spinner />
  }

  if (error) {
    return <Text>Error loading items</Text>
  }

  return (
    <YStack>
      {data?.foodItemsByUsageType?.map((item) => (
        <ListItem
          key={item.id}
          title={item.name}
          subTitle={`Expires: ${new Date(item.expirationDate).toLocaleDateString()} | Location: ${item.location}`}
        />
      ))}
    </YStack>
  )
}

export default FoodList