import { Toast, useToastState } from '@tamagui/toast'
import { YStack, isWeb } from 'tamagui'

export function CurrentToast() {
const currentToast = useToastState() || { id: null };

  if (!currentToast || currentToast.id === null || currentToast.isHandledNatively) return null

return (
  currentToast && !currentToast.isHandledNatively ? (
    <Toast
      key={currentToast.id}
      duration={currentToast.duration}
      viewportName={currentToast.viewportName}
      enterStyle={{ opacity: 0, scale: 0.5, y: -25 }}
      exitStyle={{ opacity: 0, scale: 1, y: -20 }}
      y={isWeb ? '$12' : 0}
      animation="quick"
    >
      <YStack alignItems="center" padding="$2" gap="$2">
        <Toast.Title fontWeight="bold">{currentToast.title}</Toast.Title>
        {!!currentToast.message && (
          <Toast.Description>{currentToast.message}</Toast.Description>
        )}
      </YStack>
    </Toast> ) : null
  )
}
