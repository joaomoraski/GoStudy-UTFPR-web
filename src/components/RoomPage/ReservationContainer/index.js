import { Box, Text, Grid, GridItem, Flex, Center, Button, flexbox, Input } from "@chakra-ui/react"

import BoxSalas from "./boxsalas"
import DropDown from "./dropdown"
import Horarios from "./horarios"
import {Spacer, useToast } from '@chakra-ui/react'
import { BsCheckCircle, BsXCircle} from "react-icons/bs";
import {MdCheckCircleOutline} from 'react-icons/md'
import useReservation from '../../../hooks/useReservation'
import { useEffect, useState } from "react"
import getAllRooms from "../../../services/room/getAllRooms"
import useUser from "../../../hooks/useUser"
import ConfirmModal from "../../../components/ConfirmModal"
import createReservation from '../../../services/reservation/createReservation'
import ShowReservationRoomDate from '../../../services/reservation/ShowReservationsRoomAndDate'
import { useRouter } from "next/router"

export default function ReservationContainer() {
    const { user } = useUser();
    const toast = useToast();
    const router = useRouter()
    const {reservations, filteredReservations,getRoomsReservations} = useReservation();
    const [rooms, setRooms] = useState([]);
    const [selectedRoom, setSelectedRoom ] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [isOpenModal,setIsOpenModal] = useState(false);
    const [schedules, setSchedules] = useState([]);
    const [selectedSchedule, setSelectedSchedule] = useState(null);
    useEffect(
        ()=>{
            let date = new Date;
            var day = date.getDate();
            var month = date.getMonth() + 1;
            var year = date.getFullYear();
            if (month < 10) month = "0" + month;
            if (day < 10) day = "0" + day;

            (async()=>{
              if(user.token){
                const response = await getAllRooms({token: user?.token});
                
                if(response.status == "success"){
                  setRooms(response.data);
                  setSelectedRoom(response.data[0].id)
                  setSelectedDate(`${year}-${month}-${day}`)
                }
              }
            })()
        },[user]
    )

    useEffect(
        ()=>{
            getReservations();
        },[selectedRoom,selectedDate ]
    )

    async function getReservations( ){
        if(selectedRoom && selectedDate){
        //    getRoomsReservations({idRoom:selectedRoom,date:selectedDate});
            const response = await ShowReservationRoomDate({token:user?.token, idRoom:selectedRoom, reservationDate: selectedDate});
            if(response.status == "success"){ 
                console.log(response.data)  
                setSchedules(response.data)
            }
        }
    }
    
    async function makeReservation(){
        
        const response = await createReservation(
            {
                token: user?.token,  
                id_room: selectedRoom,
                id_user: user.id,
                id_schedule: selectedSchedule.id,
                reservationDate: selectedDate,
            });
        if(response){
            toast(
                {
                    title: response.message,
                    status: response.status,
                    description: response.data?.message || "",
                    duration: 3000,
                    isClosable: true,
                    position: "top"
                }
            )
            if(response.status == 'success'){
                router.push("/")
                getReservations();
            }
        }
        setSelectedSchedule(null)
        setIsOpenModal(false)
    }
    
    return(
        <Box borderRadius={'5px'} borderWidth={'1px'}
        borderColor={'#b2b2b2'} p={6} bgColor={'#FFFFFF'}
        maxWidth={'1150px'} marginTop='0px' width={"100%"}  height={'100%'} display={'flex'}>
            
            <BoxSalas salas={rooms} selectedRoom={selectedRoom} setSelectedRoom={setSelectedRoom} />
            <Spacer />       
            <Box alignItems={'center'} alignContent={'center'} >
                <Flex width={'100%'} alignItems={'center'} justifyContent="center">
                    <Text fontSize={'22px'} fontWeight='700' mr={'20px'}> Data Reserva: </Text>
                    <Input value={selectedDate} onChange={(e)=>setSelectedDate(e.target.value)}
                    type='date' width={'150px'} />
                </Flex>
                <Flex marginLeft={'200px'}>
                    <Box p={5} display={'flex'} alignItems={'center'}>
                        <BsCheckCircle color="green" />
                        <Text marginLeft={3}>Disponivel</Text>
                    </Box>
                    <Box p={5} display={'flex'} alignItems={'center'}>
                        <BsXCircle color="red" fontSize="large" />
                        <Text marginLeft={3}>Reservado</Text>
                    </Box>
                </Flex>
                <Box borderRadius={'5px'} 
                    p={6} bgColor={'#FFFFFF'}
                    width={"100%"}>
                    <Grid  templateColumns='repeat(3, 1fr)' gap={6}>
                    {schedules?.map((horario, index) => (
                        <GridItem colSpan={1} >
                              <Button onClick={()=>{setSelectedSchedule(horario), setIsOpenModal(true)}}
                              disabled={!horario.isFree}
                              borderRadius={'5px'}  bgColor={horario.isFree?'#F0FFF5':'#FFEDED'}>
                                    <Flex p={1}>
                                        <BsXCircle color={horario.isFree?"green":"red"} />
                                        <Text marginLeft={2}  marginTop={-0.5} fontSize='16px'>
                                        {horario.initial_time} - {horario.final_time}
                                        </Text>
                                    </Flex>
                                </Button>
                        </GridItem>
                    ))}
                    </Grid>
                </Box>
             </Box> 
             <ConfirmModal message={'Deseja mesmo reservar horário?'}  confirmAction={()=>makeReservation()}
                isOpen={isOpenModal} setIsOpen={setIsOpenModal}
             />
        </Box>
    )
}