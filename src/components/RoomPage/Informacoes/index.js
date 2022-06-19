import { Box, Text, Button, Flex } from "@chakra-ui/react"
import { router } from 'next'


export default function Informacoes() {
    return (
        <Box 
            p={6} bgColor={'#FFFFFF'}
            maxWidth={'1000px'} marginTop='30px' width={"100%"} maxHeight={'1000px'} height={'500px'}>
                <Flex marginTop={'30px'} width='100%' justifyContent={"center"}>
                  <Button marginRight='50px'  width='200px' bgColor='#E6E6E6' color={"rgb(0,0,0,0.4)"} onClick={()=>router.push("/rooms")}>
                    Segunda-feira
                  </Button>
                  
                </Flex>
          </Box>
    )
}