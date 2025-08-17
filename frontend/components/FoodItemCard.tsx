import { router } from 'expo-router'
import { useEffect, useMemo, useState } from 'react'
import { Button, ListItem, XStack, SizableText, YStack, useTheme } from 'tamagui'
import { UsageType, FoodItem } from 'types'

interface FoodItemProps {
  item: FoodItem
  usageType: UsageType
}

const clamp = (v: number, min: number, max: number): number => {
  if (v < min) return min
  if (v > max) return max
  return v
}

const formatRemaining = (expirationISO: string, nowMs: number): string => {
  const expMs = new Date(expirationISO).getTime()
  const diffMs = expMs - nowMs
  if (diffMs <= 0) {
    return 'EXPIRED'
  }
  const days = Math.floor(diffMs / 86400000)
  const hours = Math.floor((diffMs % 86400000) / 3600000)
  const mins = Math.floor((diffMs % 3600000) / 60000)
  const secs = Math.floor((diffMs % 60000) / 1000)
  if (days > 0) return `${days}d ${hours}h ${mins}m ${secs}s`
  if (hours > 0) return `${hours}h ${mins}m ${secs}s`
  if (mins > 0) return `${mins}m ${secs}s`
  return `${secs}s`
}

const FoodItemCard = ({ item, usageType }: FoodItemProps) => {
  const theme = useTheme()

  const createdMs = useMemo(() => new Date(item.createdAt).getTime(), [item.createdAt])
  const expMs = useMemo(() => new Date(item.expirationDate).getTime(), [item.expirationDate])

  const totalMs = useMemo(() => Math.max(expMs - createdMs, 0), [createdMs, expMs])

  const [nowMs, setNowMs] = useState<number>(Date.now())
  const [label, setLabel] = useState<string>(formatRemaining(item.expirationDate, Date.now()))

  useEffect(() => {
    setLabel(formatRemaining(item.expirationDate, Date.now()))
    const id = setInterval(() => {
      const t = Date.now()
      setNowMs(t)
      setLabel(formatRemaining(item.expirationDate, t))
    }, 1000)
    return () => clearInterval(id)
  }, [item.expirationDate])

  const remainingMs = useMemo(() => Math.max(expMs - nowMs, 0), [expMs, nowMs])

  const progressRatio = useMemo(() => {
    if (totalMs <= 0) return 0
    return clamp(remainingMs / totalMs, 0, 1)
  }, [remainingMs, totalMs])

  const barBg = theme?.green5?.val
  const barFill = theme.green10?.val

  const isExpired = label === 'EXPIRED'

  return (
    <ListItem
      key={item.id}
      borderWidth={1}
      style={{ borderRadius: 8}}
      borderColor="$borderColor"
      padding="$2"
      title={
        <XStack flex={1} width="100%" justify-content="space-between">
          <SizableText size={"$6"} fontWeight={"bold"}>{item.name}</SizableText>
          { usageType === 'meal_ingredient' &&
           <Button size="$2" marginLeft="$2"   onPress={(): void => {
            router.push({ pathname: '/recipes', params: { ingredient: item.name } })
            }} >
            Recipe Ideas
          </Button>}
        </XStack>
      }
      subTitle={
        <YStack gap="$4">
          <XStack gap="$2" flexWrap="wrap">
            <SizableText size="$2" color="$color">
              {`Expires: ${new Date(item.expirationDate).toLocaleDateString()}`}
            </SizableText>
            <SizableText size="$2" color="$color">
              {`Location: ${item.location}`}
            </SizableText>
          </XStack>
          <YStack>
            <SizableText
                size="$2"
                color={isExpired ? 'red' : '$color'}
                fontWeight={isExpired ? 'bold' : 'normal'}
            >
                { (isExpired ? "" : "Spoil Time: ") + label}
            </SizableText>
            <YStack
                marginTop="$2"
                width="100%"
                height={8}
                borderWidth={1}
                borderColor="$borderColor"
                style={{ backgroundColor: barBg, borderRadius: 6, overflow: 'hidden' }}
            >
                <YStack
                height="100%"
                style={{
                    width: `${progressRatio * 100}%`,
                    backgroundColor: barFill
                }}
                />
            </YStack>
          </YStack>
        </YStack>
      }
    />
  )
}

export default FoodItemCard
