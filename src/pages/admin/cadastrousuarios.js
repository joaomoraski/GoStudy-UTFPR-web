import { Box, Flex,Grid,GridItem,Text, Button } from "@chakra-ui/react"
import Header from '../../components/Header'
import Retornar from "../../components/cadastro/retornar"
import Botoes from "../../components/cadastro/botoes"
import Inputs from "../../components/cadastro/inputsusuarios"
export default function Home() {
    return (
        <Box bgColor={"#EEEDEA"} width={'100%'} height={'100vh'}>
          <Header/>
          <Box p={4} display = {"flex"} alignItems={"center"} justifyContent = {"center"}>
            <Retornar titulo={'Usuários'}/>
          </Box>
          <Box p={4} display = {"flex"} alignItems={"center"} justifyContent = {"center"}>
            <Inputs/>
          </Box>
          <Box p={4} display = {"flex"} alignItems={"center"} justifyContent = {"center"}>
          <Botoes/>
          </Box>       
        </Box>  
    )
  }
  