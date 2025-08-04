import FoodList from 'components/FoodList'
import { Text, View } from 'tamagui'

export default function TabTwoScreen() {
  return (
    <View flex={1} items="center" justify="center" bg="$background">
      <FoodList usageType="meal_ingredient" />
    </View>
  )
}
