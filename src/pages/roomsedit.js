import { Box, Flex,Grid,GridItem,Text, Button } from "@chakra-ui/react"
import Header from '../components/Header'
import Salas from "../components/RoomPage/ReservationContainer"
import Retornar from "../components/RoomPage/EditarReserva"
import {parseCookies} from 'nookies'

export default function Home() {
    return (
        <Box bgColor={"#EEEDEA"} width={'100%'} height={'100vh'}>
          <Header/>
          <Box p={4} display = {"flex"} alignItems={"center"} justifyContent = {"center"}>
            <Retornar/>
          </Box>
          <Box p={4} display = {"flex"} alignItems={"center"} justifyContent = {"center"}>
            <Salas/>
          </Box>
        </Box>  
        
    )
  }
  
export const getServerSideProps = async (ctx) => {
  const { 'gostudy-token': token } = parseCookies(ctx);
  if (!token) {
    return {
      redirect: {
        destination: '/signin',
        permanent: false,
      }
    }
  }
  return {
    props: {}
  }
}
  