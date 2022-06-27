import { useEffect, useState } from "react"
import jwt_decode from "jwt-decode"
import { parseCookies, destroyCookie } from "nookies"
import getUserById from "../../../services/user/getUserById"
import useUser from "../../../hooks/useUser"
import createInstitute from "../../../services/institute/createInstitute"
import getOneInstitute from "../../../services/institute/getOneInstitute"
import { Box, Flex,Grid,GridItem,Text, Button, useToast } from "@chakra-ui/react"
import Header from '../../../components/Header'
import Retornar from "../../../components/cadastro/retornar"
import Inputs from "../../../components/cadastro/inputsinstituicao"
import ConfirmModal from "../../../components/ConfirmModal"
import { useRouter } from 'next/router'

export default function CadastroInstituicao() {
    const {user} = useUser();
    const router = useRouter();
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [nameValue, setNameValue] = useState('');
    const [cityValue, setCityValue] = useState('');
    const [telephoneValue, setTelephoneValue] = useState('');
    const [openingTimeValue, setOpeningTimeValue] = useState('');
    const [closingTimeValue, setClosingTimeValue] = useState('');
    const toast = useToast();

    async function editarInstituicao({id}) {
        if(user?.token){
            const response = await getOneInstitute({token: user.token, id: id});
            if(response.status == 'success'){
                setNameValue(response.data.name);
                setTelephoneValue(response.data.telephone);
                setCityValue(response.data.city);
                setOpeningTimeValue(response.data.openingTime);
                setClosingTimeValue(response.data.closingTime);
            }
        } 
    }

    async function cadastrarInstituicao(){
       
        const response = await createInstitute({
            token:user?.token,
            name: nameValue,
            city: cityValue,
            telephone: telephoneValue,
            openingTime: openingTimeValue,
            closingTime: closingTimeValue
        })
        if(response){
            setIsOpenModal(false)
            toast(
                {
                    title: response.message,
                    status: response.status,
                    description: response.data?.message || "",
                    duration: 3000,
                    isClosable: true,
                    position: "top"
                }
            )
            
            if(response.status == "success"){
                setNameValue('');
                setTelephoneValue('');
                setCityValue('');
                setOpeningTimeValue('');
                setClosingTimeValue('');
                router.push('/admin/campus')
            }
        }
        
        
    }

    return (
        <Box bgColor={"#EEEDEA"} width={'100%'} height={'100vh'}>
          <Header/>
          <Box p={4} display = {"flex"} alignItems={"center"} justifyContent = {"center"}>
            <Retornar titulo={'Câmpus'} direction={'campus'}/>
          </Box>
          <Box p={4} display = {"flex"} alignItems={"center"} justifyContent = {"center"}>
            <Inputs
                name={nameValue} setName={setNameValue}
                city={cityValue} setCity={setCityValue}
                telephone={telephoneValue} setTelephone={setTelephoneValue}
                openingTime={openingTimeValue} setOpeningTime={setOpeningTimeValue}
                closingTime={closingTimeValue} setClosingTime={setClosingTimeValue}
            
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
          <ConfirmModal message={"Deseja mesmo cadastrar essa nova instituição?"} confirmAction={cadastrarInstituicao}
            isOpen={isOpenModal} setIsOpen={setIsOpenModal}
          />     
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