import { Box, Text, Grid, GridItem, Flex, Center, Button, flexbox } from "@chakra-ui/react"
import { Input } from '@chakra-ui/react'
import { Spacer } from '@chakra-ui/react'



export default function InputsInstituicao({
        name,setName,
        city, setCity,
        telephone, setTelephone,
        openingTime, setOpeningTime,
        closingTime, setClosingTime
    }) {
    return(
        <Box borderRadius={'5px'} borderWidth={'1px'}
        borderColor={'#b2b2b2'} p={10} bgColor={'#FFFFFF'}
        maxWidth={'1150px'}  width={"100%"} maxHeight={'350px'} height={'100%'} justifyContent={'center'} alignItems={'center'} alignContent={'center'}>
            <Box display={'flex'} justifyContent={'center'} >   
                
                    <Box margin={5} >
                    <Text>Nome da instituição</Text>
                    <Input value={name} onChange={(e)=>setName(e.target.value)} 
                    size='md' type={"text"} borderColor={"gray.400"} />         
                    </Box>  
                
                
                    <Box margin={5} >
                    <Text>Cidade</Text>
                    <Input value={city} onChange={(e)=>setCity(e.target.value)} 
                    size='md' type={"text"} borderColor={"gray.400"} />         
                    </Box>  
                
                
                    <Box margin={5} >
                    <Text>Telefone</Text>
                    <Input value={telephone} onChange={(e)=>setTelephone(e.target.value)} 
                     size='md' type={"tel"} borderColor={"gray.400"} />         
                    </Box>  
               
            </Box> 
            <Box display={'flex'} justifyContent={'center'} >   
                    <Box margin={5} >
                    <Text>Horário de abertura</Text>
                    <Input value={openingTime} onChange={(e)=>setOpeningTime(e.target.value)} 
                    size='md' type={"time"} borderColor={"gray.400"}  />         
                    </Box>  
                    <Box margin={5} >
                    <Text>Horário de fechamento</Text>
                    <Input value={closingTime} onChange={(e)=>setClosingTime(e.target.value)} 
                    size='md' type={"time"} borderColor={"gray.400"}  />         
                    </Box>   
            </Box> 
        </Box>
    )
}