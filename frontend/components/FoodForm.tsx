import { useCreateFoodItem } from 'graphql/mutations/createFoodItem'
import { useState } from 'react'
import { Input, Button, Select, YStack } from 'tamagui'

export function FoodForm() {
  const [name, setName] = useState('')
  const [location, setLocation] = useState('')
  const [expirationDate, setExpirationDate] = useState('')
  const [usageType, setUsageType] = useState<'snack' | 'meal_ingredient'>('snack')
  const [createFoodItem] = useCreateFoodItem()

  const handleSubmit = async () => {
    await createFoodItem({
      variables: {
        input: {
          name,
          location,
          expirationDate: new Date(expirationDate).toISOString(),
          usageType
        }
      }
    })
  }

  return (
    <YStack gap="$2">
      <Input value={name} onChangeText={setName} placeholder="Name" />
      <Input value={location} onChangeText={setLocation} placeholder="Location" />
      <Input value={expirationDate} onChangeText={setExpirationDate} placeholder="YYYY-MM-DD" />
      <Select
        value={usageType}
        onValueChange={(value) => setUsageType(value as 'snack' | 'meal_ingredient')}
      >
        <Select.Item value="snack" index={0}>
            <Select.ItemText>Snack</Select.ItemText>
        </Select.Item>
        <Select.Item value="meal_ingredient" index={1}>
            <Select.ItemText>Meal Ingredient</Select.ItemText>
        </Select.Item>
      </Select>
      <Button onPress={handleSubmit}>Add Item</Button>
    </YStack>
  )
}
