import { Box, Text, Grid, GridItem, Flex, Center, Button, flexbox } from "@chakra-ui/react"
import { Input } from '@chakra-ui/react'
import { Spacer } from '@chakra-ui/react'
import { Select } from '@chakra-ui/react'
import { Checkbox, CheckboxGroup } from '@chakra-ui/react'
import { raw } from "next/dist/build/webpack/loaders/next-middleware-wasm-loader"
import { useEffect, useState } from "react"
import useUser from "../../hooks/useUser"
import getAllInstitutes from "../../services/institute/getAllInstitutes"

export default function InputsUsuarios({
    institute, setInstitute,
    telephone, setTelephone,
    name, setName,
    email, setEmail,
    password, setPassword,
    ra,setRa,
    isAdmin,setIsAdmin
}) {
    const {user} = useUser();
    const [institutes, setInstitutes] = useState([]);

    useEffect(
        ()=>{
            (async ()=>{
                if(user?.token){
                    const response = await getAllInstitutes({token: user.token});
                    if(response.status == 'success'){
                        setInstitutes(response.data)
                    }
                }
                
            })()
        },[user]
    )
    
    return(
        <Box borderRadius={'5px'} borderWidth={'1px'}
        borderColor={'#b2b2b2'} p={10} bgColor={'#FFFFFF'}
        maxWidth={'1150px'}  width={"100%"} maxHeight={'350px'} height={'100%'} justifyContent={'center'} alignItems={'center'} alignContent={'center'}>
            <Box display={'flex'} justifyContent={'center'} >   
                
                    <Box margin={5} minWidth={220} >
                    <Text>Instituição</Text>
                        <Select value={institute} onChange={(e)=>setInstitute(e.target.value)} placeholder='Selecione' borderColor={"gray.400"}>
                            {institutes.map(
                                (i)=><option value={i?.id}>{i?.name}</option>
                            )}
                        </Select>  
                    </Box>  
                
                
                    <Box margin={5}>
                        <Text>Nome</Text>
                        <Input value={name} onChange={(e)=>setName(e.target.value)}
                         size='md' type={"text"} borderColor={"gray.400"} />         
                    </Box>  
                
                
                    <Box margin={5}>
                        <Text>Telefone</Text>
                        <Input  value={telephone} onChange={(e)=>setTelephone(e.target.value)}
                         size='md' type={"tel"} borderColor={"gray.400"} />         
                    </Box>  
               
            </Box> 
            <Box display={'flex'} justifyContent={'center'} >   
                    <Box margin={5}>
                        <Text>E-mail</Text>
                        <Input value={email} onChange={(e)=>setEmail(e.target.value)}
                        size='md' type={"email"} borderColor={"gray.400"}  />         
                    </Box>  
                
                
                    <Box margin={5}>
                        <Text>Senha</Text>
                        <Input value={password} onChange={(e)=>setPassword(e.target.value)}
                        size='md' type={"password"} borderColor={"gray.400"}  />         
                    </Box>   
                    <Box margin={5}>
                        <Text>RA</Text>
                        <Input  disabled={isAdmin}
                        value={ra} onChange={(e)=>setRa(e.target.value)}
                        size='md' name='RA' id="RA" borderColor={"gray.400"}  />         
                    </Box>  
            </Box> 
            <Box display={'flex'} justifyContent={'center'} marginTop={10}>   
                <Checkbox value={isAdmin} isChecked={isAdmin} onChange={e =>setIsAdmin(!isAdmin)}
                 size='lg' name="check" >Usuário administrador</Checkbox>
            </Box> 
        </Box>
    )
}