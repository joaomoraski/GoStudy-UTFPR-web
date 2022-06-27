import { Box, Input, Text, Button, Select, useToast } from "@chakra-ui/react"
import { router } from 'next'
import { useState, useEffect } from "react";
import getAllInstitutes from "../../../services/institute/getAllInstitutes";
import useUser from "../../../hooks/useUser";
import createUser from "../../../services/user/createUser";
import { useRouter } from "next/router";
export default function CadastroForm() {
    const {user} = useUser();
    const [institutes, setInstitutes] = useState([]);
    const toast = useToast();
    const router = useRouter();

    const [instituteValue, setInstituteValue] =  useState('');
    const [nameValue, setNameValue] =  useState('');
    const [telephoneValue, setTelephoneValue] =  useState('');
    const [emailValue, setEmailValue] =  useState('');
    const [passwordValue, setPasswordValue] =  useState('');
    const [raValue, setRaValue] = useState('');
    const [isAdminValue, setIsAdminValue] = useState(false);

    useEffect(
        ()=>{
            (async ()=>{
                const response = await getAllInstitutes({});
                if(response.status == 'success'){
                    setInstitutes(response.data)
                }
        })()
        },[]
    )   

    async function cadastrarUsuario(){
        
        const response = await createUser({
            id_institute: instituteValue,
            name: nameValue,
            telephone: telephoneValue,
            email: emailValue,
            password: passwordValue,
            ra: raValue,
            isAdmin: isAdminValue
        })
        if(response){
            toast(
                {
                    title: response.message,
                    status: response.status ,
                    duration: 3000,
                    isClosable: true,
                    position: "top"
                }
            )
            if(response.status == "success"){
                setInstituteValue('');
                setNameValue('');
                setTelephoneValue('');
                setEmailValue('');
                setPasswordValue('');
                setRaValue('');
                setIsAdminValue('');
            }
        }
    }

    return (
        <Box fontSize='14px'>
            <Box marginBottom={'15px'}>
                <Text>Nome: </Text>
                <Input value={nameValue} onChange={(e)=>setNameValue(e.target.value)}
                 fontSize='16px' />
            </Box>
            <Box marginBottom={'15px'}>
                <Text>RA: </Text>
                <Input value={raValue} onChange={(e)=>setRaValue(e.target.value)}
                fontSize='16px' />
            </Box>
            <Box marginBottom={'15px'}>
                <Text>Telefone: </Text>
                <Input value={ telephoneValue } onChange={ (e)=>setTelephoneValue(e.target.value) }
                fontSize='16px' />
            </Box>
            <Box marginBottom={'15px'}>
                <Text>E-mail: </Text>
                <Input value={ emailValue} onChange={(e)=>setEmailValue(e.target.value)}
                 fontSize='16px' />
            </Box>
            
            <Box marginBottom={'15px'}>
                <Text>Câmpus: </Text>
                <Select value={instituteValue} onChange={(e)=>setInstituteValue(e.target.value)} placeholder='Selecione' borderColor={"gray.400"}>
                    {institutes.map(
                        (i)=><option value={i?.id}>{i?.name}</option>
                    )}
            </Select>   
            </Box>
            
            <Box marginBottom={'15px'}>
                <Text>Senha:</Text>
                <Input value={passwordValue} onChange={(e)=>setPasswordValue(e.target.value)}
                 type='password'  fontSize='16px' />
            </Box>
            
            <Box  textAlign={'center'}>
                <Button onClick={()=>cadastrarUsuario()
                }
                width="100%" color={'white'} background={"#1E6CBF"} 
                _hover={
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