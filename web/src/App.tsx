//import { ChakraProvider } from '@chakra-ui/react' // Import ChakraProvider from Chakra UI

import { FatalErrorBoundary, RedwoodProvider } from '@redwoodjs/web'
import { RedwoodApolloProvider } from '@redwoodjs/web/apollo'

import FatalErrorPage from 'src/pages/FatalErrorPage'
import Routes from 'src/Routes'

import './index.css'

const App = () => (
  <FatalErrorBoundary page={FatalErrorPage}>
    <RedwoodProvider titleTemplate="%PageTitle | %AppTitle">
      <RedwoodApolloProvider>
        {/* Wrap your app in ChakraProvider */}
        {/* <ChakraProvider> */}
        <Routes />
        {/* </ChakraProvider> */}
        {/* End ChakraProvider */}
      </RedwoodApolloProvider>
    </RedwoodProvider>
  </FatalErrorBoundary>
)

export default App
