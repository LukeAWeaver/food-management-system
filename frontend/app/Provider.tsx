import React from 'react'
import { Platform, useColorScheme } from 'react-native'
import { TamaguiProvider, type TamaguiProviderProps } from 'tamagui'
import { PortalProvider, PortalHost } from '@tamagui/portal'   // ✅ correct package
import { ToastProvider, ToastViewport } from '@tamagui/toast'
import { ApolloProvider } from '@apollo/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { CurrentToast } from '../components/CurrentToast'       // ✅ NOT under app/
import { config } from '../tamagui.config'
import client from 'services/apolloClient'

const queryClient = new QueryClient()

export default function Provider({ children, ...rest }: Omit<TamaguiProviderProps, 'config'>) {
  const colorScheme = useColorScheme()

  return (
    <ApolloProvider client={client}>
      <QueryClientProvider client={queryClient}>
        <TamaguiProvider
          config={config}
          defaultTheme={colorScheme === 'dark' ? 'dark' : 'light'}
          {...rest}
        >
          <PortalProvider>
            {/* Extra-safe: ensure a host exists on native */}
            {Platform.OS !== 'web' && <PortalHost name="root" />}

            <ToastProvider swipeDirection="horizontal" duration={6000} native={[]}>
              {children}
              <CurrentToast />
              <ToastViewport top="$8" left={0} right={0} />
            </ToastProvider>
          </PortalProvider>
        </TamaguiProvider>
      </QueryClientProvider>
    </ApolloProvider>
  )
}
