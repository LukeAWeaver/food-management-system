import { ApolloClient, InMemoryCache, HttpLink, from } from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import { Platform } from 'react-native'

// Web uses the page host (localhost in dev). iPhone uses your dev machine’s LAN IP.
const WEB_HOST =
  typeof window !== 'undefined' && window.location?.hostname
    ? window.location.hostname
    : 'localhost'
const IOS_HOST = process.env.EXPO_PUBLIC_API_HOST || '192.168.0.144'
const PORT = Number(process.env.EXPO_PUBLIC_API_PORT || 3000)

const URI = `http://${Platform.OS === 'web' ? WEB_HOST : IOS_HOST}:${PORT}/graphql`

const errorLink = onError(({ graphQLErrors, networkError, operation }) => {
  if (graphQLErrors?.length) {
    console.warn(`[GraphQL error] ${operation.operationName ?? ''}:`, graphQLErrors.map(e => e.message).join('; '))
  }
  if (networkError) {
    console.warn(`[Network error] ${operation.operationName ?? ''}:`, networkError)
  }
})

const httpLink = new HttpLink({ uri: URI })

const client = new ApolloClient({
  link: from([errorLink, httpLink]),
  cache: new InMemoryCache(),
})

export default client
