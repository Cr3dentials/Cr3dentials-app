import React from 'react'

import ReactDOM from 'react-dom'

import { FatalErrorBoundary } from '@redwoodjs/web'
import { RedwoodApolloProvider } from '@redwoodjs/web/apollo'

import FatalErrorPage from 'src/pages/FatalErrorPage'
import Routes from 'src/Routes'

import client from './graphql' // Import your Apollo Client configuration

import './scaffold.css'

ReactDOM.render(
  <FatalErrorBoundary page={FatalErrorPage}>
    <RedwoodApolloProvider client={client}>
      {/* Wrap your app in ChakraProvider */}

        <Routes />

      {/* End ChakraProvider */}
    </RedwoodApolloProvider>
  </FatalErrorBoundary>,
  document.getElementById('redwood-app')
)
