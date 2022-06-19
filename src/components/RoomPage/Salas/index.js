import { Box, Text, Grid, GridItem, Flex, Center, Button, flexbox } from "@chakra-ui/react"

import Salas from "../Salas/boxsalas"
import DropDown from "../Salas/dropdown"
import Horarios from "../Salas/horarios"
import {Spacer } from '@chakra-ui/react'
import { BsCheckCircle, BsXCircle} from "react-icons/bs";
export default function Retornar() {

    return(
        <Box borderRadius={'5px'} borderWidth={'1px'}
        borderColor={'#b2b2b2'} p={6} bgColor={'#FFFFFF'}
        maxWidth={'1150px'} marginTop='0px' width={"100%"} maxHeight={'350px'} height={'100%'} display={'flex'}>
            <Salas/>
            <Spacer />       
            <Box alignItems={'center'} alignContent={'center'} >
                <DropDown/>
                <Flex marginLeft={'200px'}>
                    <Box p={5} display={'flex'} alignItems={'center'}>
                        <BsCheckCircle color="green" />
                        <Text marginLeft={3}>Disponivel</Text>
                    </Box>
                    <Box p={5} display={'flex'} alignItems={'center'}>
                        <BsXCircle color="red" fontSize="large" />
                        <Text marginLeft={3}>Reservado</Text>
                    </Box>
                </Flex>
                <Horarios/>
             </Box> 
            <Spacer />
        </Box>
    )
}