import { Box, Text, Grid, GridItem, Flex, Center, Button, flexbox } from "@chakra-ui/react"
import { Input } from '@chakra-ui/react'
import { Spacer } from '@chakra-ui/react'
import { Select } from '@chakra-ui/react'
import Horarios from "../cadastro/horarios"



export default function Retornar() {
    return(
        <Box borderRadius={'5px'} borderWidth={'1px'}
        borderColor={'#b2b2b2'} p={10} bgColor={'#FFFFFF'}
        maxWidth={'1150px'}  width={"100%"} maxHeight={'400px'} height={'100%'}  justifyContent={'center'} alignItems={'center'} alignContent={'center'}>
            <Box display={'flex'} justifyContent={'center'} >   
                
                    <Box margin={5} minWidth={200} >
                    <Text>Instituição</Text>
                        <Select placeholder='Selecione' borderColor={"gray.400"}>
                            <option value='option1'>UTFPR-CM</option>
                            <option value='option2'>UTFPR-CT</option>
                        </Select>      
                    </Box>  
                    <Box margin={5} >
                    <Text>Número da sala</Text>
                    <Input size='md' borderColor={"gray.400"} />         
                    </Box>  
                    
            </Box> 
            <Box display={'flex'} justifyContent={'center'} >    
                <Text>Selecione os horários de funcionamento</Text>       
            </Box> 
            <Box display={'flex'} justifyContent={'center'} >    
                <Horarios/>       
            </Box>
        </Box>
    )
}