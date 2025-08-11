import { useColorScheme } from 'react-native'
import { TamaguiProvider, type TamaguiProviderProps } from 'tamagui'
import { ToastProvider, ToastViewport } from '@tamagui/toast'
import { ApolloProvider } from '@apollo/client'

import { CurrentToast } from './CurrentToast'
import { config } from '../tamagui.config'
import client from 'services/apolloClient'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export default function Provider({ children, ...rest }: Omit<TamaguiProviderProps, 'config'>) {
  const colorScheme = useColorScheme()
  const queryClient: QueryClient = new QueryClient()

  return (
    <ApolloProvider client={client}>
      <QueryClientProvider client={queryClient}>
      <TamaguiProvider
        config={config}
        defaultTheme={colorScheme === 'dark' ? 'dark' : 'light'}
        {...rest}
      >
        <ToastProvider
          swipeDirection="horizontal"
          duration={6000}
          native={[]}
        >
          {children}
          <CurrentToast />
          <ToastViewport top="$8" left={0} right={0} />
        </ToastProvider>
      </TamaguiProvider>
      </QueryClientProvider>
    </ApolloProvider>
  )
}
