
import getUserById from "../../../services/user/getUserById"
import { parseCookies, destroyCookie } from "nookies"
import jwt_decode from "jwt-decode"
import { Box, Flex,Grid,GridItem,Text, Button } from "@chakra-ui/react"
import Header from '../../../components/Header'
import Retornar from "../../../components/AdminPage/Retornar"
import CampusContainer from "../../../components/AdminPage/CampusPage/Container"


export default function Campus() {
    return (
        <Box bgColor={"#EEEDEA"} width={'100%'} height={'100vh'}>
          <Header/>
          <Box p={4} display = {"flex"} alignItems={"center"} justifyContent = {"center"}>
            <Retornar titulo={'Câmpus'} direction={''}/>
          </Box>
          <Box p={4} display = {"flex"} alignItems={"center"} justifyContent = {"center"}>
            <CampusContainer/>          
          </Box>    
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
