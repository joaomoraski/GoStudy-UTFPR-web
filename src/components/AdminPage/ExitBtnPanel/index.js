import { Flex, Button } from "@chakra-ui/react"
import useUser from "../../../hooks/useUser"
export default ()=>{
  const {signout } = useUser();
    return(
        <Flex justifyContent={"center"} borderColor={"rgba(0,0,0,0.1)"} borderWidth='1px' p={4} width={'100%'} bgColor={'#FFFFFF'} height={'100%'}>
            <Button onClick={()=>signout()}
            _hover={{}} width={'300px'} color={'#FFFFFF'} bgColor='#FC6565'>
                 SAIR 
            </Button>
        </Flex>
    )
}