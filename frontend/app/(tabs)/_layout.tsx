import { Link, Tabs } from 'expo-router'
import { Button, useTheme } from 'tamagui'
import { Drumstick, Wheat } from '@tamagui/lucide-icons'

export default function TabLayout() {
  const theme = useTheme()

  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        tabBarActiveTintColor: theme.red10.val,
        tabBarStyle: {
          backgroundColor: theme.background.val,
          borderTopColor: theme.borderColor.val,
        },
        headerStyle: {
          backgroundColor: theme.background.val,
          borderBottomColor: theme.borderColor.val,
        },
        headerTintColor: theme.color.val,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Snacks',
          tabBarIcon: ({ color }) => <Drumstick color={color as any} />,
          headerRight: () => (
            <Link href="/forms/FoodForm" asChild>
              <Button
                size="$2"
                theme="red"
                style={{ marginRight: 10 }}
              >
                + food item
              </Button>
            </Link>
          ),
          }}
      />
      <Tabs.Screen
        name="ingredientsList"
        options={{
          title: 'Ingredients',
          tabBarIcon: ({ color }) => <Wheat color={color as any} />,
        }}
      />
    </Tabs>
  )
}
