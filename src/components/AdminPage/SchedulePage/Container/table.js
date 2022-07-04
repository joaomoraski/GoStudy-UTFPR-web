import { Box, Text, Grid, GridItem, Flex, Center, Button, list, useToast } from "@chakra-ui/react"
import { BsFillPencilFill, BsFillTrashFill } from 'react-icons/bs';
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
  } from '@chakra-ui/react'
import React, { useState } from "react";
import Pagination from '../../Pagination'
import { useRouter } from 'next/router'
import useUser from "../../../../hooks/useUser"
import deleteScheduleService from '../../../../services/schedule/deleteSchedule'
import getAllSchedules from '../../../../services/schedule/getSchedules';
import ConfirmModal from "../../../../components/ConfirmModal"

const max_itens = 3;
const max_left = (max_itens -1)/2;
export default function TableSchedules({schedulesList, setSchedules}){
    const [offset, setoffset] = useState(0);
    const [deleteIndex, setDeleteIndex] = useState(null);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const toast = useToast();
    const {user} = useUser();
    const router = useRouter();

    async function deleteSchedule({id}) {
        const response = await deleteScheduleService({
            token:user?.token,
            id: id,
        })
        if(response){
            setIsOpenModal(false)
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
            if(response.status == "success"){
                (async ()=>{
                    if(user?.token){
                        const response = await getAllSchedules({token: user.token});
                        if(response.status == 'success'){
                            setSchedules(response.data)
                        }
                    } 
                })()
            }
        }
    }

    return(
        <Box borderRadius={'5px'} >
            <TableContainer>
            <Table variant='unstyled'>
            <Thead>
                <Tr>
                <Th isNumeric backgroundColor={"#DEEEFF"}>Id</Th>
                <Th backgroundColor={"#DEEEFF"}>Label</Th>
                <Th backgroundColor={"#DEEEFF"}>Horário inicial</Th>
                <Th backgroundColor={"#DEEEFF"}>Horário final</Th>
                <Th backgroundColor={"#DEEEFF"}>Ações</Th>
                </Tr>
            </Thead>
            <Tbody>
            {schedulesList?.slice(offset,offset+5).map((schedule) => ( 
                        <Tr>
                            <Td isNumeric>{schedule.id}</Td>
                            <Td>{schedule.label}</Td>
                            <Td>{schedule.initial_time}</Td>
                            <Td>{schedule.final_time}</Td>
                            <td>
                                <Button 
                                       onClick={()=>router.push(`/admin/schedules/editar?id=${schedule.id}`)} 
                                        variant='ghost' colorScheme='none' border={'Background'} 
                                        alignContent={'center'} justifyContent={'center'}  
                                        marginRight={1} padding={0}>{<BsFillPencilFill />}</Button>
                                <Button 
                                        onClick={()=>{setDeleteIndex(schedule.id), setIsOpenModal(true)}} 
                                        variant='ghost' 
                                        colorScheme='none' padding={-1}>{<BsFillTrashFill/>}</Button>
                            </td>
                        </Tr> 
                ))}
                <ConfirmModal 
                    message={"Deseja mesmo excluir esse horário?"} 
                    confirmAction={() => deleteSchedule({id: deleteIndex})}
                    isOpen={isOpenModal} setIsOpen={setIsOpenModal}
                />
            </Tbody>
            </Table>
        </TableContainer>
        <Pagination 
            limit={5} 
            total={schedulesList?.length} 
            offset={offset}
            setoffset={setoffset}
        />
    </Box>
    )
}