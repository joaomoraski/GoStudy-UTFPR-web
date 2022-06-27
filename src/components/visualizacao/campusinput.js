import { Box, Text, Grid, GridItem, Flex, Center, Button, flexbox } from "@chakra-ui/react"
import { Input } from '@chakra-ui/react'
import { Spacer } from '@chakra-ui/react'
import { AiOutlineSearch } from 'react-icons/ai';
import { IoIosAddCircleOutline } from 'react-icons/io';
import Table from "./tablevisul"
import getAllInstitutes from "../../services/institute/getAllInstitutes";
import { useEffect, useState } from "react";
import useUser from "../../hooks/useUser";
import { useRouter } from "next/router";

export default function Retornar() {
    const router = useRouter();
    const {user} = useUser();
    const [institutes, setInstitutes] = useState([]);
    
    useEffect(
        ()=>{
            (async ()=>{
                if(user?.token){
                    const response = await getAllInstitutes({token: user.token});
                    if(response.status == 'success'){
                        setInstitutes(response.data)
                    }
                } 
            })()
        },[user]
    )

    return(
        <Box borderRadius={'5px'} borderWidth={'1px'}
        borderColor={'#b2b2b2'} p={10} bgColor={'#FFFFFF'}
        maxWidth={'1150px'}  width={"100%"} maxHeight={'550px'} height={'100%'} justifyContent={'center'} alignItems={'center'} alignContent={'center'}>
            <Flex width={'100%'} justifyContent="right"  marginBottom={'10px'} color={'#3584CC'}>
                <Button onClick={()=>router.push('/admin/campus/cadastro')} leftIcon={<IoIosAddCircleOutline />}  colorScheme='blue' variant='solid'>
                    Adicionar
                </Button>
            </Flex> 
            <Table campusList={institutes}/>
        </Box>
    )
}