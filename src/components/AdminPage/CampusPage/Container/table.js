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
import deleteInstituteService from '../../../../services/institute/deleteInstitute'
import getAllInstitutes from '../../../../services/institute/getAllInstitutes';
import ConfirmModal from "../../../../components/ConfirmModal"

const max_itens = 3;
const max_left = (max_itens -1)/2;
export default function ContainerCampus({campusList, setInstitutes}){
    const [offset, setoffset] = useState(0);
    const [deleteIndex, setDeleteIndex] = useState(null);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const toast = useToast();
    const {user} = useUser();
    const router = useRouter();

    async function deleteInstitute({id}) {
        const response = await deleteInstituteService({
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
                        const response = await getAllInstitutes({token: user.token});
                        if(response.status == 'success'){
                            setInstitutes(response.data)
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
                <Th backgroundColor={"#DEEEFF"}>Campus</Th>
                <Th backgroundColor={"#DEEEFF"}>Cidade</Th>
                <Th backgroundColor={"#DEEEFF"}>Telefone</Th>
                <Th backgroundColor={"#DEEEFF"}>Abertura</Th>
                <Th backgroundColor={"#DEEEFF"}>Fechamento</Th>
                <Th backgroundColor={"#DEEEFF"}>Acão</Th>
                </Tr>
            </Thead>
            <Tbody>
            {campusList?.slice(offset,offset+5).map((campus) => ( 
                        <Tr>
                            <Td isNumeric>{campus.id}</Td>
                            <Td>{campus.name}</Td>
                            <Td>{campus.city}</Td>
                            <Td>{campus.telephone}</Td>
                            <Td>{campus.openingTime}</Td>
                            <Td>{campus.closingTime}</Td>
                            <td>
                                <Button 
                                       onClick={()=>router.push(`/admin/campus/editar?id=${campus.id}`)} 
                                        variant='ghost' colorScheme='none' border={'Background'} 
                                        alignContent={'center'} justifyContent={'center'}  
                                        marginRight={1} padding={0}>{<BsFillPencilFill />}</Button>
                                <Button 
                                        onClick={()=>{setDeleteIndex(campus.id), setIsOpenModal(true)}} 
                                        variant='ghost' 
                                        colorScheme='none' padding={-1}>{<BsFillTrashFill/>}</Button>
                            </td>
                        </Tr> 
                ))}
                <ConfirmModal 
                    message={"Deseja mesmo excluir essa instituição?"} 
                    confirmAction={() => deleteInstitute({id: deleteIndex})}
                    isOpen={isOpenModal} setIsOpen={setIsOpenModal}
                />
            </Tbody>
            </Table>
        </TableContainer>
        <Pagination 
            limit={5} 
            total={campusList?.length} 
            offset={offset}
            setoffset={setoffset}
        />
    </Box>
    )
}