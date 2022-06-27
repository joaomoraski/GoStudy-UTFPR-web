
import { Box, Text, Grid, GridItem, Flex, Center, Button, useToast } from "@chakra-ui/react"
import { useEffect, useState} from "react";
import ShowReservationsAfterDate from "../../../services/reservation/ShowReservationsAfterDate"
import getOneSchedule from '../../../services/schedule/getOneSchedule'
import getOneRoom from '../../../services/room/getOneRoom'
import deleteReservation from "../../../services/reservation/deleteReservation";
import useUser from "../../../hooks/useUser";
import {IoIosCloseCircle} from 'react-icons/io'
export default function Reservas() {
  let date = new Date;
  var day = date.getDate();
  var month = date.getMonth() + 1;
  var year = date.getFullYear();
  if (month < 10) month = "0" + month;
  if (day < 10) day = "0" + day;

    const [reservas, setReservas] = useState([]);
    const { user } = useUser();
    const toast = useToast();
    useEffect(
      ()=>{
        (async ()=>{
          if(user.token){
            const response = await ShowReservationsAfterDate({token:user.token, reservationDate:`${day}-${month}-${year}`})
            console.log(response)
            if(response.status == 'success'){
              setReservas(response.data.filter((reserva)=>reserva.user.id == user.id))

            }
          }
        })()
      },[user]
    )

    function handleReservas(nReservas){
      setReservas(nReservas);
    }

    async function deletarReserva(id){
     const response  = await deleteReservation({token: user.token,  id:id});
     if(response){
        toast(
          {
              title: response.message,
              status: response.status ,
              duration: 3000,
              isClosable: true,
              position: "top"
        })
      if(response.status == "success"){
        (async ()=>{
          if(user.token){
            const response = await ShowReservationsAfterDate({token:user.token, reservationDate:`${day}-${month}-${year}`})
            console.log(response)
            if(response.status == 'success'){
              setReservas(response.data.filter((reserva)=>reserva.user.id == user.id))
            }
          }
        })()
      }
      
     }
    }



    return(
        <Box borderRadius={'5px'} borderWidth={'1px'}
           borderColor={'#b2b2b2'} p={6} bgColor={'#FFFFFF'}
           maxWidth={'1200px'} width={"100%"}>
            <Text fontWeight={'bold'} fontSize='26px'>
                Suas reservas: 
            </Text>
            <Grid templateColumns='repeat(2, 1fr)' gap={6}>
              
              {reservas.map((reserva, index) => (
                <GridItem>
                  <Flex position="relative"
                    maxWidth={'300px'} 
                    fontWeight={'bold'} borderRadius={'5px'} borderWidth={'1px'}
                    borderColor={'#b2b2b2'} p={4} bgColor={'#ECF4FB'}>
                   <Box  
                    >
                    
                    <Text fontSize='16px'>
                      Sala {reserva.room.number}
                    </Text>
                    <Flex >
                      <Text fontSize='14px'>
                        {reserva.schedule.initial_time} ~ {reserva.schedule.final_time}
                      </Text>
                    </Flex>
                    <Text fontSize='14px'>
                      {reserva.reservationDate}
                    </Text>
                  </Box>
                  <Text onClick={()=>deletarReserva(reserva.id)} 
                   fontSize={"20px"} position="absolute" top={1} right={1} >
                    <IoIosCloseCircle/>
                  </Text>
                  </Flex>
                </GridItem>
              ))}
            </Grid>
            
          </Box>
    )
}