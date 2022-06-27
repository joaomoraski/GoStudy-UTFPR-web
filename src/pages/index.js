import {parseCookies} from 'nookies'
import { Box, Flex,Grid,GridItem,Text, Button } from "@chakra-ui/react"
import Header from '../components/Header'
import Reservas from "../components/MainPage/Reservas"
import Informacoes from "../components/MainPage/Informacoes"
import useUser from '../hooks/useUser'

export default function Main() {
  return (
      <Box bgColor={"#E5E5E5"} width={'100%'} height={'100vh'}>
        <Header/>
        <Box p={4} display = {"flex"} alignItems={"center"} justifyContent = {"center"}>
          <Reservas/>
        </Box>
        <Box p={4} display = {"flex"} alignItems={"center"} justifyContent = {"center"}>
          <Informacoes />
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
