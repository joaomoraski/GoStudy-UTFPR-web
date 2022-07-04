import { Box, Text, Grid, GridItem, Flex, Center, Button, flexbox } from "@chakra-ui/react"
import { Input } from '@chakra-ui/react'

export default function InputsHorarios(
    {
        label,setLabel,
        initialTime, setInitialTime,
        finalTimeValue,setFinalTime
    }
) {
    return(
        <Box borderRadius={'5px'} borderWidth={'1px'}
        borderColor={'#b2b2b2'} p={10} bgColor={'#FFFFFF'}
        maxWidth={'1150px'}  width={"100%"} maxHeight={'350px'} height={'100%'} justifyContent={'center'} alignItems={'center'} alignContent={'center'}>
            <Box display={'flex'} justifyContent={'center'} >   
                
                    <Box margin={5} >
                    <Text>Nome do horário</Text>
                    <Input value={label} onChange={(e)=>setLabel(e.target.value)}
                        size='md' type={'text'} borderColor={"gray.400"}/>         
                    </Box>  

                    <Box margin={5} >
                    <Text>Horário inicial</Text>
                    <Input value={initialTime} onChange={(e)=>setInitialTime(e.target.value)}
                    size='md' type={'time'} borderColor={"gray.400"} />         
                    </Box>  

                    <Box margin={5} >
                    <Text>Horário final</Text>
                    <Input value={finalTimeValue} onChange={(e)=>setFinalTime(e.target.value)}
                    size='md' type={'time'} borderColor={"gray.400"} />         
                    </Box>  
               
            </Box> 
        </Box>
    )
}