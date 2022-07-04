import { Box, Flex,Grid,GridItem,Text, Button } from "@chakra-ui/react"
import Header from '../components/Header'
import ReservationContainer from "../components/RoomPage/ReservationContainer"
import Retornar from "../components/RoomPage/Retornar"
import {parseCookies} from 'nookies'
import getAllReservation from "../services/reservation/getAllReservation"
import { useEffect, useState } from "react"
import useUser from "../hooks/useUser"

export default function Rooms() {
    const { user } = useUser();
    
    return (
        <Box bgColor={"#EEEDEA"} width={'100%'} height={'100vh'}>
          <Header/>
          <Box p={4} display = {"flex"} alignItems={"center"} justifyContent = {"center"}>
            <Retornar/>
          </Box>
          <Box p={4} display = {"flex"} alignItems={"center"} justifyContent = {"center"}>
            <ReservationContainer/>
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
  