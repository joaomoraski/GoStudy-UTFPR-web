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
import { useRouter } from 'next/router'
import Pagination from '../../Pagination'
import deleteUserService from '../../../../services/user/deleteUser';
import getAllUsers from '../../../../services/user/getAllUsers';
import ConfirmModal from "../../../../components/ConfirmModal";
import useUser from "../../../../hooks/useUser"

const max_itens = 3;

export default function TableUser({userList, setUsers}){
    const [offset, setoffset] = useState(0);
    const [deleteIndex, setDeleteIndex] = useState(null);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const router = useRouter();
    const {user} = useUser();
    const toast = useToast();


    async function deleteUser({id}) {
        const response = await deleteUserService({
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
                        const response = await getAllUsers({token: user.token});
                        if(response.status == 'success'){
                            setUsers(response.data)
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
                <Th backgroundColor={"#DEEEFF"}>Nome</Th>
                <Th backgroundColor={"#DEEEFF"}>RA</Th>
                <Th backgroundColor={"#DEEEFF"}>Telefone</Th>
                <Th backgroundColor={"#DEEEFF"}>E-mail</Th>
                <Th backgroundColor={"#DEEEFF"}>Senha</Th>
                <Th backgroundColor={"#DEEEFF"}>Admin</Th>
                <Th backgroundColor={"#DEEEFF"}>Ações</Th>
                </Tr>
            </Thead>
            <Tbody>
            {userList?.slice(offset,offset+5).map((user) => ( 
                    <Tr>
                        <Td isNumeric>{user.id}</Td>
                        <Td>{user.name}</Td>
                        <Td>{user.ra}</Td>
                        <Td>{user.telephone}</Td>
                        <Td>{user.email}</Td>
                        <Td>{user.password.replace(user.password, "******")}</Td>
                        <Td>{user.isAdmin ? "Sim" : "Não"}</Td>
                        <td>
                            <Button 
                                    onClick={()=>router.push(`/admin/usuarios/editar?id=${user.id}`)} 
                                    variant='ghost' colorScheme='none' border={'Background'} 
                                    alignContent={'center'} justifyContent={'center'}  
                                    marginRight={1} padding={0}>{<BsFillPencilFill />}</Button>
                            <Button 
                                     onClick={()=>{setDeleteIndex(user.id), setIsOpenModal(true)}} 
                                    variant='ghost' colorScheme='none' 
                                    padding={-1}>{<BsFillTrashFill/>}</Button>
                        </td>
                    </Tr> 
                ))}
                <ConfirmModal 
                    message={"Deseja mesmo excluir esse usuário?"} 
                    confirmAction={() => deleteUser({id: deleteIndex})}
                    isOpen={isOpenModal} setIsOpen={setIsOpenModal}
                />
            </Tbody>
            </Table>
        </TableContainer>
        <Pagination 
            limit={5} 
            total={userList?.length} 
            offset={offset}
            setoffset={setoffset}
        />
    </Box>
    )
}