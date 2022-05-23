import { Box, Text, Grid, GridItem, Flex, Center, Button, Spacer } from "@chakra-ui/react"
import { IconButton } from '@chakra-ui/react'
import { ArrowBackIcon } from '@chakra-ui/icons'
export default function Retornar() {

    return(
        <Flex borderRadius={'5px'} borderWidth={'1px'}
        borderColor={'#b2b2b2'} p={6} bgColor={'#FFFFFF'}
        maxWidth={'1150px'} marginTop='30px' width={"100%"} height={"90px"} >
            <IconButton 
                marginRight={'10px'}
                colorScheme='gray'
                bgColor={'whiteAlpha.100'}
                fontSize='20px'
                size='lg'
                icon={<ArrowBackIcon/>}
            /> 
            <Text fontWeight={'medium'} fontSize='26px'>
                 Retornar 
            </Text>
            
            
          </Flex>
    )
};