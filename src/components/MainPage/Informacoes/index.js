import { Box, Text, Button, Flex } from "@chakra-ui/react"
import { router } from 'next'
import useUser from "../../../hooks/useUser"
import { useEffect, useState } from "react"
import ShowReservationsAfterDate from '../../../services/reservation/ShowReservationsAfterDate'
import useReservation from "../../../hooks/useReservation"
export default function Informacoes() {
  const {signout, user } = useUser();
  const {reservas, setReservas} = useReservation();

  useEffect(
    ()=>{
      let date = new Date;
      var day = date.getDate();
      var month = date.getMonth() + 1;
      var year = date.getFullYear();
      if (month < 10) month = "0" + month;
      if (day < 10) day = "0" + day;
      (async ()=>{
        if(user.token){
          const response = await ShowReservationsAfterDate({token:user.token, reservationDate:`${day}-${month}-${year}`})
          if(response.status == 'success'){
            setReservas(response.data.filter((reserva)=>reserva.user.id == user.id))

          }
        }
        
      })()
    },[user]
  )

  return (
        <Box borderRadius={'5px'} borderWidth={'1px'}
            borderColor={'#b2b2b2'} p={6} bgColor={'#FFFFFF'}
            maxWidth={'1200px'} marginTop='30px' width={"100%"}>
                <Text fontWeight={'bold'} fontSize='26px'>Informações Gerais: </Text>
                <Text fontWeight={'bold'} fontSize='20px'>{
                  reservas?.length>=4
                  ?"Você atingiu o limite semanal e não pode mais reservar salas "
                  : `Você ainda pode fazer ${4-reservas?.length} reserva` 
                }</Text>
                <Flex marginTop={'30px'} width='100%' justifyContent={"center"}>
                  <Button disabled={!(reservas?.length<4)}
                  marginRight='50px'  width='200px' onClick={()=>router.push("/rooms")}>
                    Reservar
                  </Button>
                  <Button  width='200px' color='white' bgColor='#FC6565' onClick={()=>signout()}>
                    Sair
                  </Button>
                </Flex>
          </Box>
    )
}