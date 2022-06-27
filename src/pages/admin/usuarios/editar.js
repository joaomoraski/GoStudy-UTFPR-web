import jwt_decode from "jwt-decode"
import { parseCookies, destroyCookie } from "nookies"
import { useState, useEffect } from 'react'
import useUser from "../../../hooks/useUser"
import getUserById from "../../../services/user/getUserById"
import editUser from '../../../services/user/editUser'
import { Box, Flex, Grid, GridItem, Text, Button, useToast } from "@chakra-ui/react"
import Header from '../../../components/Header'
import Retornar from "../../../components/AdminPage/Retornar"
import Inputs from "../../../components/cadastro/inputsusuarios"
import ConfirmModal from "../../../components/ConfirmModal"
import { useRouter } from 'next/router'

export default function EditarUsuarios() {
    const { user } = useUser();
    const toast = useToast();
    const router = useRouter();
    const [idValue, setIdValue] = useState(null);
    const [instituteValue, setInstituteValue] =  useState(null);
    const [nameValue, setNameValue] =  useState(null);
    const [telephoneValue, setTelephoneValue] =  useState(null);
    const [emailValue, setEmailValue] =  useState(null);
    const [passwordValue, setPasswordValue] =  useState(null);
    const [raValue, setRaValue] = useState(null);
    const [isAdminValue, setIsAdminValue] = useState(false);
    const [isOpenModal, setIsOpenModal] = useState(false);

    useEffect(()=>{ setIdValue(router.query.id); }, [])

    useEffect(()=>{
        if (!idValue || !user.token) return;
        (async function(){
            const response = await getUserById({
                token:user?.token,
                id: idValue
            })
            if(response){
                if(response.status == "success") {
                    setInstituteValue(response.data.fk_id_institute);
                    setNameValue(response.data.name);
                    setTelephoneValue(response.data.telephone);
                    setEmailValue(response.data.email);
                    setPasswordValue(response.data.password);
                    setRaValue(response.data.ra);
                    setIsAdminValue(response.data.isAdmin);
                }
            }
        })()
    }, [idValue, user])


    async function editarUsuario(){
        const response = await editUser({
            token:user?.token,
            id: idValue,
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
                    <Text p={100}>Editar</Text>
                </Button>
            </Flex>
          </Box>  
          <ConfirmModal message={"Deseja mesmo alterar este usuário?"} confirmAction={editarUsuario} isOpen={isOpenModal} setIsOpen={setIsOpenModal}/>     
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