import jwt_decode from "jwt-decode"
import { parseCookies, destroyCookie } from "nookies"
import { useState } from 'react'
import useUser from "../../../hooks/useUser"
import getUserById from "../../../services/user/getUserById"
import createUser from '../../../services/user/createUser'
import { Box, Flex, Grid, GridItem, Text, Button, useToast } from "@chakra-ui/react"
import Header from '../../../components/Header'
import Retornar from "../../../components/AdminPage/Retornar"
import Inputs from "../../../components/cadastro/inputsusuarios"
import ConfirmModal from "../../../components/ConfirmModal"
import { useRouter } from 'next/router'


export default function CadastroUsuarios() {
    const {user } = useUser();
    const toast = useToast();
    const router = useRouter();
    const [instituteValue, setInstituteValue] =  useState('');
    const [nameValue, setNameValue] =  useState('');
    const [telephoneValue, setTelephoneValue] =  useState('');
    const [emailValue, setEmailValue] =  useState('');
    const [passwordValue, setPasswordValue] =  useState('');
    const [raValue, setRaValue] = useState('');
    const [isAdminValue, setIsAdminValue] = useState(false);
    const [isOpenModal, setIsOpenModal] = useState(false);


    async function cadastrarUsuario(){
        
        const response = await createUser({
            token:user?.token,
            id_institute: instituteValue,
            name: nameValue,
            telephone: telephoneValue,
            email: emailValue,
            password: passwordValue,
            ra: raValue,
            isAdmin: isAdminValue
        })
        if(response){
            setIsOpenModal(false)
            toast(
                {
                    title: response.message,
                    status: response.status,
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
                router.push('/admin/usuarios');
            }
        }
    }

    return (
        <Box bgColor={"#EEEDEA"} width={'100%'} height={'100vh'}>
          <Header/>
          <Box p={4} display = {"flex"} alignItems={"center"} justifyContent = {"center"}>
            <Retornar titulo={'Usuários'} direction={'usuarios'}/>
          </Box>
          <Box p={4} display = {"flex"} alignItems={"center"} justifyContent = {"center"}>
            <Inputs 
                institute={instituteValue}  setInstitute={setInstituteValue} 
                telephone={telephoneValue} setTelephone={setTelephoneValue} 
                name={nameValue} setName={setNameValue}
                email={emailValue} setEmail={setEmailValue}
                password={passwordValue} setPassword={setPasswordValue}
                ra={raValue} setRa={setRaValue}
                isAdmin = {isAdminValue}  setIsAdmin = {setIsAdminValue}/>
          </Box>
          <Box p={4} display = {"flex"} alignItems={"center"} justifyContent = {"center"}>
            <Flex 
                borderRadius={'5px'} borderWidth={'1px'}
                borderColor={'#b2b2b2'} p={10} bgColor={'#FFFFFF'}
                maxWidth={'1150px'}  width={"100%"} height={"60px"} alignItems={'center'} alignContent={''} justifyContent={'space-evenly'} >
               
                <Button  onClick={()=>setIsOpenModal(true)}
                borderColor={'#b2b2b2'} bgColor={'green.500'}
                height={'52px'} css={{'&:focus':{ background: "green.100", boxShadow: 'none'}, }}
                _hover={{}}
                color="white">
                    <Text p={100}>Cadastrar</Text>
                </Button>
            </Flex>
          </Box>  
          <ConfirmModal message={"Deseja mesmo cadastrar este usuário?"} confirmAction={cadastrarUsuario} isOpen={isOpenModal} setIsOpen={setIsOpenModal}/>     
        </Box>  
    )
}

export const getServerSideProps = async (ctx) => {
    const { 'gostudy-token': token } = parseCookies(ctx);
    if (!token) {
        return {
            redirect: {
                destination: '/signin',
                permanent: false,
            }
        }
    }
    let decodedToken = jwt_decode(token);   
    if(decodedToken.id){
        const response = await getUserById({id: decodedToken.id, token: token})
        if(response.status != 'success'){
            destroyCookie({}, 'gostudy-token');
            return {
                redirect: {
                    destination: '/signin',
                    permanent: false,
                }
            }
        }
        if(!response.data.isAdmin){
            return {
                redirect: {
                    destination: '/',
                    permanent: false,
                }
            }
        }
    }
    return {
        props: {}
    }
}