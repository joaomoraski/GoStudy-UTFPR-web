import { Box, Input, Text, Button } from "@chakra-ui/react"
import { router } from 'next'
import { useState } from "react";

export default function CadastroForm() {
   
    return (
        <Box fontSize='14px'>
            <Box marginBottom={'15px'}>
                <Text>E-mail ou RA: </Text>
                <Input fontSize='16px' />
            </Box>
            <Box marginBottom={'15px'}>
                <Text>Senha:</Text>
                <Input type='password'  fontSize='16px' />
            </Box>
            <Box marginBottom={'15px'}>
                <Text>Confirme sua Senha:</Text>
                <Input type='password'  fontSize='16px' />
            </Box>
            <Box  textAlign={'center'}>
                <Button width="100%" color={'white'} onClick={()=>router.push("/")} background={"#1E6CBF"} _hover={
                    {
                        background: "#1E6CBF",
                    }
                }>
                    Cadastrar
                </Button>
            </Box>
        </Box>
    )


}