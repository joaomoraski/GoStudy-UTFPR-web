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
import deleteRoomService from '../../../../services/room/deleteRoom'
import getAllRooms from '../../../../services/room/getAllRooms';
import ConfirmModal from "../../../../components/ConfirmModal"

const max_itens = 3;
const max_left = (max_itens -1)/2;
export default function TableSalas({salaList, setRooms}){
    const [offset, setoffset] = useState(0);
    const [deleteIndex, setDeleteIndex] = useState(null);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const toast = useToast();
    const { user } = useUser();
    const router = useRouter();


    async function deleteRoom({id}) {
        const response = await deleteRoomService({
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
                        const response = await getAllRooms({token: user.token});
                        if(response.status == 'success'){
                            setRooms(response.data)
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
                <Th backgroundColor={"#DEEEFF"}>Câmpus</Th>
                <Th backgroundColor={"#DEEEFF"}>Número</Th>
                <Th backgroundColor={"#DEEEFF"}>Ações</Th>
                </Tr>
            </Thead>
            <Tbody>
            {salaList?.slice(offset,offset+5).map((sala) => ( 
                        <Tr>
                            <Td isNumeric>{sala.id}</Td>
                            <Td>{sala.Institute.name}</Td>
                            <Td>{sala.number}</Td>
                            <td>
                                <Button 
                                        onClick={()=>router.push(`/admin/salas/editar?id=${sala.id}`)} 
                                        variant='ghost' colorScheme='none' border={'Background'} 
                                        alignContent={'center'} justifyContent={'center'}  
                                        marginRight={1} padding={0}>{<BsFillPencilFill />}</Button>
                                <Button 
                                        onClick={()=>{setDeleteIndex(sala.id), setIsOpenModal(true)}} 
                                        variant='ghost' 
                                        colorScheme='none' padding={-1}>{<BsFillTrashFill/>}</Button> 
                            </td>
                        </Tr> 
                ))}
            <ConfirmModal 
                message={`Deseja mesmo excluir essa sala? Todas as reservas serão excluidas!`} 
                confirmAction={() => deleteRoom({id: deleteIndex})}
                isOpen={isOpenModal} setIsOpen={setIsOpenModal}
            />
            </Tbody>
            </Table>
        </TableContainer>
        <Pagination 
            limit={5} 
            total={salaList?.length} 
            offset={offset}
            setoffset={setoffset}
        />
    </Box>
    )
}