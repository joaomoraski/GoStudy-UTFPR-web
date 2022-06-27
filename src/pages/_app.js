import { ChakraProvider } from '@chakra-ui/react'
import { UserProvider } from '../context/UserContext'
import { ReservationProvider } from '../context/ReservationContext'
import {theme} from '../theme'

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider  resetCSS={true} theme={theme}> 
      <UserProvider>
        <ReservationProvider>
          <Component {...pageProps} />
        </ReservationProvider>
      </UserProvider>
    </ChakraProvider>
  )
}

export default MyApp
