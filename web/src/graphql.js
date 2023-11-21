// web/src/graphql.js
import { ApolloClient, InMemoryCache } from '@apollo/client'

const client = new ApolloClient({
  uri: 'http://localhost:8915/graphql', // Update the URI to match your API server
  cache: new InMemoryCache(),
})

export default client
