import { FoodForm } from 'components/FoodForm'
import { View} from 'tamagui'

export default function ModalScreen() {
  return (
    <View flex={1} items="center" justify="center" bg="$background">
      <FoodForm />
    </View>
  )
}
