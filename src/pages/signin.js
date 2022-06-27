import {parseCookies} from 'nookies'
import { Box, useColorMode,Text,Image, Flex } from "@chakra-ui/react"
import { useState } from "react";
import LoginForm from '../components/SigninPage/LoginForm'
import CadastroForm from '../components/SigninPage/CadastroForm'
import useUser from "../hooks/useUser";
export default function Signin() {

    const { colorMode } = useColorMode();
    const brandColor = {light: 'brand.900',dark: 'brand.700'};
    const [ isLogin, setIsLogin ] = useState(true);

    return (
        <Flex 
        justifyContent={'center'}
        alignItems="center"
        position={"relative"}
        width={ `100%`}
        h={`100vh`}
        bgPosition="center"
        bgRepeat="no-repeat"
        padding="0"
        bgSize="cover"
        bgImage={'/background.png'}>  
            <Box borderRadius={'10px'} bg={'white'} height="max-content"  width={'360px'}>
                <Flex cursor={'pointer'} width={"100%"}>
                    <Text  onClick={()=>setIsLogin(true)}
                     bg={isLogin?"":"#D9D8D2"} textAlign={'center'} width={"50%"}  p={2}
                        style={{
                            borderRadius: "10px 0 0 0"
                        }}
                    >
                        Login
                    </Text>
                    <Text onClick={()=>setIsLogin(false)}
                     bg={isLogin?"#D9D8D2":""} textAlign={'center'} width={"50%"} p={2}
                        style={{
                            borderRadius: "0 10px 0 0"
                        }}
                    > 
                        Cadastrar
                    </Text>


                </Flex>
                <Box p={4}>
                    { isLogin?
                        <LoginForm/>
                        :
                        <CadastroForm/>
                    }
                </Box>
            </Box>


        </Flex>    
    )
  }

export const getServerSideProps = async (ctx) => {
    const { 'gostudy-token': token } = parseCookies(ctx)
        if (token) {
            return {
                redirect: {
                    destination: '/',
                    permanent: false,
                }
            }
        }
        return {
            props: {}
        }
    }
  