import { Box, Flex, Grid, GridItem } from "@chakra-ui/react"
import Header from '../../components/Header'
import Visualization from "../../components/AdminPage/Visualization"
import Register from "../../components/AdminPage/Register"
import ExitBtnPanel from "../../components/AdminPage/ExitBtnPanel"
export default function Admin() {
    return (
        <Box width={"100%"} height={"100vh"} bg={'#F4F4F4'}>
            <Header/>
            <Flex justifyContent={'center'}
            width={'100%'} 
            height={'max-content'}
            p={4}
            >
                <Flex p={4} width={'50%'} justifyContent={'right'}>
                    <Register/>
                </Flex>
                <Flex p={4}  width={'50%'} justifyContent={'left'}>
                    <Visualization/> 
                </Flex>
            </Flex>
            <Flex bg={'#696'} justifyContent={'center'} width={'100%'}>
                <ExitBtnPanel/>
            </Flex>
        </Box>    
    )
  }