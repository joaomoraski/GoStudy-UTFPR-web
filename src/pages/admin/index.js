import jwt_decode from "jwt-decode"
import { parseCookies, destroyCookie } from "nookies"
import getUserById from "../../services/user/getUserById"
import { useRouter } from "next/router"
import { Box, Flex, Grid, GridItem, Text } from "@chakra-ui/react"
import Header from '../../components/Header'
import ExitBtnPanel from "../../components/AdminPage/ExitBtnPanel"
export default function Admin() {
    const router = useRouter()
    return (
        <Box width={"100%"} height={"100vh"} bg={'#F4F4F4'}>
            <Header/>
            <Flex justifyContent={'center'}
            width={'100%'} 
            height={'max-content'}
            p={4}
            >
                <Flex p={4} width={'50%'} justifyContent={'center'}>

                <Flex p={4} flexDir={'column'} maxWidth={'400px'} minWidth={'350px'} 
                    bg={'#FFFFFF'} borderRadius={'5px'} borderColor={"rgba(0,0,0,0.1)"} borderWidth='1px'
                    filter={'drop-shadow(0px 4px 4px  rgba(0, 0, 0, 0.5'} 
                    >
                        <Flex mt={2} flexDir={'column'} alignItems={'center'} width='100%'>
                            <Flex 
                                justifyContent={'center'} fontSize={'22'} p={2} bg={"#E6E6E6"} 
                                width={'80%'} mt={2} mb={2}
                                cursor={'pointer'} onClick={()=>router.push('/admin/campus')}>
                                <Text>Câmpus</Text>
                            </Flex>

                            <Flex 
                                justifyContent={'center'} fontSize={'22'} p={2} 
                                bg={"#E6E6E6"} width={'80%'} mt={2} mb={2} cursor={'pointer'}
                                onClick={()=>router.push('/admin/salas')}>
                                <Text>Salas</Text>
                            </Flex>
                            <Flex 
                                justifyContent={'center'} fontSize={'22'} p={2} bg={"#E6E6E6"} 
                                width={'80%'} mt={2} mb={2}
                                cursor={'pointer'} onClick={()=>router.push('/admin/usuarios')}>
                                <Text>Usuários</Text>
                            </Flex>
                            {/* <Flex 
                                justifyContent={'center'} fontSize={'22'} p={2} bg={"#E6E6E6"} 
                                width={'80%'} mt={2} mb={2}
                                cursor={'pointer'} onClick={()=>router.push('/admin/schedules')}>
                                <Text>Horários</Text>
                            </Flex> */}
                        </Flex>
                        
                    </Flex>
                </Flex>
            </Flex>
            <Flex bg={'#696'} justifyContent={'center'} width={'100%'}>
                <ExitBtnPanel/>
            </Flex>
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
  