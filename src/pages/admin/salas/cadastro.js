import jwt_decode from "jwt-decode"
import { parseCookies, destroyCookie } from "nookies"
import getUserById from "../../../services/user/getUserById"
import { Box, Flex,Grid,GridItem,Text, Button, useToast } from "@chakra-ui/react"
import Header from '../../../components/Header'
import Retornar from "../../../components/AdminPage/Retornar"
import Botoes from "../../../components/cadastro/botoes"
import Inputs from "../../../components/cadastro/inputssalas"
import Horarios from "../../../components/RoomPage/ReservationContainer/horarios"
import createRoom from "../../../services/room/createRoom";
import getSchedules from "../../../services/schedule/getSchedules"
import createRoomHasSchedule from "../../../services/roomHasSchedule/createRoomHasSchedule"
import ConfirmModal from "../../../components/ConfirmModal"
import useUser from "../../../hooks/useUser"
import { useState } from "react"
import { useRouter } from 'next/router'

export default function CadastroSalas() {
    const toast = useToast();
    const router = useRouter();
    const [isOpenModal, setIsOpenModal] = useState('');
    const { user } = useUser();
    const [idInstituteValue, setIdInstituteValue] = useState('');   
    const [numberValue, setNumberValue] = useState(''); 

    async function cadastrarSalas(){
        const resCreateRoom = await createRoom({
            token:user?.token,
            id_institute: idInstituteValue,
            number:numberValue
        })
        if(resCreateRoom && resCreateRoom?.status=='success'){
            const resSchedules = await getSchedules({token:user?.token});
            if(resSchedules && resSchedules?.status == "success"){
              
                await resSchedules.data.map(
                    async (schedule)=>{
                        await createRoomHasSchedule({
                            token: user?.token,
                            idRoom: resCreateRoom.data.id,
                            idSchedule: schedule.id
                        })
                    }
                )
                toast(
                    {
                        title: resCreateRoom.message,
                        status: resCreateRoom.status ,
                        duration: 3000,
                        isClosable: true,
                        position: "top"
                    }
                )
                setIsOpenModal(false);
                setIdInstituteValue('');
                setNumberValue('')
                router.push('/admin/salas');
            }
        }
    }

    return (
        <Box bgColor={"#EEEDEA"} width={'100%'} height={'100vh'}>
          <Header/>
          <Box p={4} display = {"flex"} alignItems={"center"} justifyContent = {"center"}>
            <Retornar titulo={'Cadastro de Salas'} direction={'salas'}/>
          </Box>
          <Box p={4} display = {"flex"} alignItems={"center"} justifyContent = {"center"}>
            <Inputs
                idInstitute={idInstituteValue} setIdInstitute={setIdInstituteValue}
                number={numberValue} setNumber={setNumberValue}
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
                    color="white"
                    >
                        <Text p={100}>Cadastrar</Text>
                    </Button>
                </Flex>
          </Box>   
          <ConfirmModal message="Deseja mesmo cadastrar essa sala?" confirmAction={cadastrarSalas} isOpen={isOpenModal} setIsOpen={setIsOpenModal}/>       
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
  