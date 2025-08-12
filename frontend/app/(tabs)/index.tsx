import { View } from 'tamagui'
import FoodList from 'components/FoodList'

export default function TabOneScreen() {
  return (
    <View flex={1} items="center" justify="center" bg="$background">
      <FoodList usageType="snack" />
    </View>
  )
}
