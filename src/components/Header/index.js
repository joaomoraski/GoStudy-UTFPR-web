import { Box, Text,Flex, Button  } from "@chakra-ui/react"
import { router } from 'next'
import { useState } from "react";
import useUser from "../../hooks/useUser";
export default function CadastroForm() {
    const { user } = useUser();
    return (
        <Flex alignItems={'center'} justifyContent={'space-evenly'}  height={'100px'} bgColor={'#6BB6FA'} >
          
          <Flex height={'60px'} margin={'50px'}>
            <Flex marginLeft={'10px'} flexDirection={'column'} justifyContent="center">
              <Text fontWeight={900} fontSize={'22px'} color={'white'}>
                {user?.name}
              </Text>
              <Text fontSize={'14px'} color={'white'}>
                RA: {user?.ra}
              </Text>
            </Flex>
          </Flex>
          <Flex></Flex>
          <Flex margin={'50px'}>
            <img src='/logo-utfpr.png'/>
          </Flex>
        </Flex> 
    )


}