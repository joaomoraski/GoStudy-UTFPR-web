import { Box, Text, Grid, GridItem, Flex, Center, Button, flexbox } from "@chakra-ui/react"
import { Input } from '@chakra-ui/react'
import { Spacer } from '@chakra-ui/react'
import { Select } from '@chakra-ui/react'
import Horarios from "../cadastro/horarios"
import useUser from "../../hooks/useUser"
import getAllInstitutes from "../../services/institute/getAllInstitutes"
import { useEffect, useState } from "react"

export default function InputsSalas({
    number, setNumber,
    idInstitute, setIdInstitute

}) {
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
        maxWidth={'1150px'}  width={"100%"} maxHeight={'400px'} height={'100%'}  justifyContent={'center'} alignItems={'center'} alignContent={'center'}>
            <Box display={'flex'} justifyContent={'center'} > 
                    <Box margin={5} minWidth={200} >
                    <Text>Instituição</Text>
                    <Select value={idInstitute} onChange={(e)=>setIdInstitute(e.target.value)} placeholder='Selecione' borderColor={"gray.400"}>
                            {institutes.map(
                                (i)=><option value={i?.id}>{i?.name}</option>
                            )}
                        </Select>    
                    </Box>  
                    <Box margin={5} >
                    <Text>Número da sala</Text>
                    <Input value={number} onChange={(e)=>setNumber(e.target.value)}
                    size='md' borderColor={"gray.400"} />         
                    </Box>  
            </Box> 
          
        </Box>
    )
}