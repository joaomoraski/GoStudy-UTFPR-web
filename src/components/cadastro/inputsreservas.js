import { Box, Text, Grid, GridItem, Flex, Center, Button, flexbox } from "@chakra-ui/react"
import { Input } from '@chakra-ui/react'
import { Spacer } from '@chakra-ui/react'
import { Select } from '@chakra-ui/react'
import Horarios from "./horarios"



export default function Retornar() {
    return(
        <Box borderRadius={'5px'} borderWidth={'1px'}
        borderColor={'#b2b2b2'} p={10} bgColor={'#FFFFFF'}
        maxWidth={'1150px'}  width={"100%"} maxHeight={'400px'} height={'100%'}  justifyContent={'center'} alignItems={'center'} alignContent={'center'}>
            <Box display={'flex'} justifyContent={'center'} >   
                    <Box margin={5} >
                    <Text>RA ou E-mail do usuário</Text>
                    <Input size='md' borderColor={"gray.400"} />         
                    </Box> 

                    <Box margin={5} minWidth={250} >
                    <Text>Sala</Text>
                        <Select placeholder='Selecione' borderColor={"gray.400"}>
                            <option value='option1'>101</option>
                            <option value='option2'>102</option>
                            <option value='option2'>103</option>
                        </Select>      
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