import { Box, Text, Grid, GridItem, Flex, Center, Button, Spacer } from "@chakra-ui/react"
import { IconButton } from '@chakra-ui/react'
import { ArrowBackIcon } from '@chakra-ui/icons'
import { router } from 'next'
export default function BotoesUsuarios({setIsOpenModal}) {

    return(
        <Flex borderRadius={'5px'} borderWidth={'1px'}
        borderColor={'#b2b2b2'} p={10} bgColor={'#FFFFFF'}
        maxWidth={'1150px'}  width={"100%"} height={"60px"} alignItems={'center'} alignContent={''} justifyContent={'space-evenly'} >
            <Button
                      borderColor={'#b2b2b2'} bgColor={'#EEEDEA'} onClick={()=>router.push("/rooms")}
                       height={'52px'} css={{'&:focus':{ background: "#6BB6FA", boxShadow: 'none'}, }} >
                <Text p={100}>Cancelar</Text>
            </Button>
            
            <Button  onClick={()=>setIsOpenModal(true) }
             borderColor={'#b2b2b2'} bgColor={'#EEEDEA'}
             height={'52px'} css={{'&:focus':{ background: "#6BB6FA", boxShadow: 'none'}, }}>
                <Text p={100}>Cadastrar</Text>
            </Button>
          </Flex>
    )
};
