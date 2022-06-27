import { Box, Input, Text, Button } from "@chakra-ui/react"
import { router } from 'next'
import { useState } from "react";
import useUser from "../../../hooks/useUser";
export default function LoginForm() {
    const { user, signin } = useUser();
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    
    return (
        <Box fontSize='14px'>
            <Box marginBottom={'15px'}>
                <Text>E-mail: </Text>
                <Input value={email} onChange={(e)=>setEmail(e.target.value)}  
                fontSize='16px'  />
            </Box>
            <Box marginBottom={'15px'}>
                <Text>Senha:</Text>
                <Input onKeyDown={(e)=>{e.key == 'Enter'?signin({email,password}):null}}
                 value={password} onChange={(e)=>setPassword(e.target.value)} type='password' fontSize='16px' />
            </Box>
            <Box  textAlign={'center'}>
                <Button 
                width="100%" color={'white'} onClick={()=>signin({email,password})} background={"#1E6CBF"} _hover={
                    {
                        background: "#1E6CBF",
                    }
                }>
                    Entrar
                </Button>
            </Box>
        </Box>
    )


}