import { YStack } from 'tamagui'
import { ToastControl } from 'app/CurrentToast'
import FoodList from 'components/FoodList'

export default function TabOneScreen() {
  return (
    <YStack flex={1} items="center" gap="$8" px="$10" pt="$5" bg="$background">
      <ToastControl />
      <FoodList usageType="snack" />
    </YStack>
  )
}
