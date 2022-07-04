import jwt_decode from "jwt-decode"
import { parseCookies, destroyCookie } from "nookies"
import getUserById from "../../../services/user/getUserById"
import editSchedule from "../../../services/schedule/editSchedule"
import getOneSchedule from "../../../services/schedule/getOneSchedule"
import { Box, Flex,Grid,GridItem,Text, Button,useToast } from "@chakra-ui/react"
import Header from '../../../components/Header'
import Retornar from "../../../components/cadastro/retornar"
import Inputs from "../../../components/cadastro/inputshorarios"
import { useState, useEffect } from "react"
import useUser from "../../../hooks/useUser"
import ConfirmModal from "../../../components/ConfirmModal"
import { useRouter } from 'next/router'

export default function EditarHorario() {
    const {user} = useUser();
    const router = useRouter();
    const [idValue, setIdValue] = useState(null);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const toast = useToast();
    const [labelValue, setLabelValue] = useState('');
    const [initialTimeValue, setInitialTimeValue] = useState('');
    const [finalTimeValue, setFinalTimeValue] = useState('');
   
    useEffect(()=>{ setIdValue(router.query.id); }, [])

    useEffect(()=>{
        if (!idValue || !user.token) return;
        (async function(){
            const response = await getOneSchedule({
                token:user?.token,
                id: idValue
            })
            if(response){
                if(response.status == "success") {
                    setLabelValue(response.data.label);
                    setInitialTimeValue(response.data.initial_time);
                    setFinalTimeValue(response.data.final_time);
                }
            }
        })()
    }, [idValue, user])

    async function editarHorario(){
        const response = await editSchedule({
            token:user?.token,
            id: idValue,
            label: labelValue,
            initial_time: initialTimeValue,
            final_time: finalTimeValue
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
            if (response.status == "success"){
                setIsOpenModal(false);
                setLabelValue('');
                setInitialTimeValue('');
                setFinalTimeValue('');
                router.push('/admin/schedules');

            }
        }
    }

    return (
        <Box bgColor={"#EEEDEA"} width={'100%'} height={'100vh'}>
          <Header/>
          <Box p={4} display = {"flex"} alignItems={"center"} justifyContent = {"center"}>
            <Retornar titulo={'Horários'} direction={'schedules'}/>
          </Box>
          <Box p={4} display = {"flex"} alignItems={"center"} justifyContent = {"center"}>
            <Inputs
                label={labelValue} setLabel={setLabelValue}
                initialTime={initialTimeValue} setInitialTime={setInitialTimeValue}
                finalTimeValue={finalTimeValue} setFinalTime={setFinalTimeValue}
            />
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
                    <Text p={100}>Alterar</Text>
                </Button>
            </Flex>
          </Box>    
          <ConfirmModal message="Deseja mesmo alterar esse horário?" confirmAction={editarHorario} isOpen={isOpenModal} setIsOpen={setIsOpenModal}/>   
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