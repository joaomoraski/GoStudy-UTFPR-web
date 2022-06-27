import {useRouter} from "next/router";
import { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import {parseCookies,setCookie, destroyCookie} from 'nookies';
import { useToast } from "@chakra-ui/toast";
import auth from "../services/auth";
import getUserById from "../services/user/getUserById";
const UserContext = createContext();

export function UserProvider({children}){
    const toast = useToast();
    const router = useRouter();
    const [user, setUser] = useState({
        id: null,
        fk_id_institute: null,
        name: null,
        ra: null,
        telephone: null,
        email: null,
        password: null,
        isAdmin: null,
     })
     const [isLoadingAuth, setIsLoadingAuth] = useState(false);


    useEffect(
        ()=>{
            const { 'gostudy-token': token } = parseCookies();
            if(!token) return router.push('/signin')
            setIsLoadingAuth(true)
            let decodedToken = jwt_decode(token);   
            if(decodedToken.id){
               (async  () => {
                const response = await getUserById({id: decodedToken.id, token: token})
                if(response.status == 'success'){
                    setUser({token: token, ...response.data})
                }else{
                    toast(
                        {
                            title: "Falha de consulta ao usuário",
                            status: response.status,
                            duration: 3000,
                            isClosable: true,
                            position: "top"
                        }
                    )
                    signout();
                }
               })()
            }
            setIsLoadingAuth(false)
        },[]
    )

    async function signin({email,ra, password}){
        setIsLoadingAuth(true)
        const response = await auth({email,ra, password});
        console.log(response);
        if(response){
            toast({
                title: response.message,
                description: response.data?.message || "" ,
                status: response.status,
                duration: 3000,
                isClosable: true,
                position: "top"
            })     
            if(response.status=="success" && response.data ){
                if(response.data.token && response.data.user){
                    setUser({token: response.data?.token, ...response.data?.user})
                    setCookie(undefined,"gostudy-token",response.data?.token,{
                        maxAge: 60 * 60 * 24 //24h
                    })
                    if(response.data.user.isAdmin){
                        router.push('/admin');
                    }else{
                        router.push('/');
                    }
                }
            }
        }
        setIsLoadingAuth(false)
    }
    function signout(){
        setIsLoadingAuth(true)
        new Promise((resolve, reject) => {
            destroyCookie({}, 'gostudy-token')
            setUser({
                id: null,
                fk_id_institute: null,
                name: null,
                ra: null,
                telephone: null,
                email: null,
                password: null,
                isAdmin: null,
             })
             resolve(
                router.push("/signin")
             )
        });
            
        
            
        
        
         setIsLoadingAuth(false)

    }

    return <UserContext.Provider
     value={{
        user,
        setUser,
        signin,
        signout
     }}>
       {children} 
    </UserContext.Provider>
}

export const UserConsumer = UserContext.Consumer;

export default UserContext;
