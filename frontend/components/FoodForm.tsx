import { useToastController } from '@tamagui/toast'
import { useCreateFoodItem } from 'graphql/mutations/createFoodItem'
import { useState } from 'react'
import { Input, Button, Select, YStack } from 'tamagui'

export function FoodForm() {
  const [name, setName] = useState('')
  const [location, setLocation] = useState('')
  const [expirationDate, setExpirationDate] = useState('')
  const [usageType, setUsageType] = useState<'snack' | 'meal_ingredient'>('snack')
  const [createFoodItem] = useCreateFoodItem()
  const toast = useToastController()

  const handleSubmit = async () => {
    const parsedDate = new Date(expirationDate)

    if (isNaN(parsedDate.getTime())) {
      alert('Please enter a valid date (YYYY-MM-DD)')
      return
    }

    try {
      const { data } = await createFoodItem({
        variables: {
          input: {
            name,
            location,
            expirationDate: parsedDate.toISOString(),
            usageType
          }
        }
      })

      console.log('Mutation success:', data)
      toast.show('Successfully saved!', { success: false,
        message: "food item saved",
      })
    } catch (error) {
      console.error('Mutation error:', error)
      toast.show('Successfully saved!', { success: false,
          message: "food item failed to save",
        })
    }
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
        <Select.Trigger>
          <Select.Value />
        </Select.Trigger>

        <Select.Content>
          <Select.Viewport>
            <Select.Item value="snack" index={0}>
              <Select.ItemText>Snack</Select.ItemText>
            </Select.Item>
            <Select.Item value="meal_ingredient" index={1}>
              <Select.ItemText>Meal Ingredient</Select.ItemText>
            </Select.Item>
          </Select.Viewport>
        </Select.Content>
      </Select>
      <Button onPress={handleSubmit}>Add Item</Button>
    </YStack>
  )
}
