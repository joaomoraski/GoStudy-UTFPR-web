import { Box, Text, Button, Flex } from "@chakra-ui/react"
import { router } from 'next'

export default function Informacoes() {
    return (
        <Box borderRadius={'5px'} borderWidth={'1px'}
            borderColor={'#b2b2b2'} p={6} bgColor={'#FFFFFF'}
            maxWidth={'1200px'} marginTop='30px' width={"100%"}>
                <Text fontWeight={'bold'} fontSize='26px'>Informações Gerais: </Text>
                <Text fontWeight={'bold'} fontSize='20px'>Você atingiu o limite semanal e não pode mais reservar salas </Text>
                <Flex marginTop={'30px'} width='100%' justifyContent={"center"}>
                  <Button marginRight='50px'  width='200px' bgColor='#E6E6E6' color={"rgb(0,0,0,0.4)"} onClick={()=>router.push("/rooms")}>
                    Reservar
                  </Button>
                  <Button width='200px' color='white' bgColor='#FC6565' onClick={()=>router.push("/signin")}>
                    Sair
                  </Button>
                </Flex>
          </Box>
    )
}