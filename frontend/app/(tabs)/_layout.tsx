import { Tabs, useRouter } from 'expo-router'
import { Pressable, SafeAreaView, View } from 'react-native'
import { Button, Text, useTheme, XStack, YStack } from 'tamagui'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Drumstick, Wheat } from '@tamagui/lucide-icons'

export default function TabLayout() {
  const theme = useTheme()
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: theme.background.val },
        headerTintColor: theme.color.val,
      }}
      tabBar={(props) => <MyTabBar {...props} />}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Snacks',
          tabBarIcon: ({ color }) => <Drumstick color={color as any} />,
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

function MyTabBar({ state, descriptors, navigation }: any) {
  const theme = useTheme()
  const insets = useSafeAreaInsets()
  const router = useRouter()

  const activeColor = theme?.red10?.val
  const inactiveColor = theme.color.val

  const renderTab = (route: any, index: number) => {
    const focused = state.index === index
    const { options } = descriptors[route.key]
    const color = focused ? activeColor : inactiveColor

    const onPress = () => {
      const event = navigation.emit({
        type: 'tabPress',
        target: route.key,
        canPreventDefault: true,
      })
      if (!focused && !event.defaultPrevented) {
        navigation.navigate(route.name)
      }
    }

    return (
      <Pressable
        key={route.key}
        onPress={onPress}
        style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
      >
        <YStack align-items="center" gap="$1" >
          {options.tabBarIcon
            ? options.tabBarIcon({ color, focused, size: 20 })
            : null}
          <Text
            fontSize="$2"
            style={{color: color}}
            opacity={focused ? 1 : 0.8}
          >
            {options.title ?? route.name}
          </Text>
        </YStack>
      </Pressable>
    )
  }
  return (
    <SafeAreaView style={{ backgroundColor: theme.background.val }}>
    <XStack
      align-items="center"
      justify-content="space-between"
      background-color={theme.background.val}
      borderTopWidth={1}
      style={{borderTopColor: theme.borderColor.val, backgroundColor:theme.background.val }}
      padding-horizontal="$3"
      padding-top="$2"
      padding-bottom={Math.max(8, (insets.bottom || 0))}
      gap="$3"
    >
      {renderTab(state.routes[0], 0)}

      <Button
        size="$2"
        theme="red"
        height={"100%"}
        onPress={() => router.push('/forms/FoodForm')}
      >
        + food item
      </Button>

      {renderTab(state.routes[1], 1)}
    </XStack>
    </SafeAreaView>
  )
}
