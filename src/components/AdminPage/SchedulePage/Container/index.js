import TableCampus from './table'
import { useRouter } from 'next/router'
import useUser from '../../../../hooks/useUser';
import { useState, useEffect } from 'react';
import getAllSchedules from '../../../../services/schedule/getSchedules';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { Box, Flex, Button,  } from '@chakra-ui/react';
export default function ContainerCampus(){
    const router = useRouter();
    const {user} = useUser();
    const [schedules, setSchedules] = useState([]);
    
    useEffect(
        ()=>{
            (async ()=>{
                if(user?.token){
                    const response = await getAllSchedules({token: user.token});
                    if(response.status == 'success'){
                        setSchedules(response.data)
                    }
                } 
            })()
        },[user]
    )

    return(
        <Box borderRadius={'5px'} borderWidth={'1px'}
        borderColor={'#b2b2b2'} p={10} bgColor={'#FFFFFF'}
        maxWidth={'1150px'}  width={"100%"} maxHeight={'550px'} height={'100%'} justifyContent={'center'} alignItems={'center'} alignContent={'center'}>
            <Flex width={'100%'} justifyContent="right"  marginBottom={'10px'} color={'#3584CC'}>
                <Button onClick={()=>router.push('/admin/schedules/cadastro')} leftIcon={<IoIosAddCircleOutline />}  colorScheme='blue' variant='solid'>
                    Adicionar
                </Button>
            </Flex> 
            <TableCampus schedulesList={schedules} setSchedules={setSchedules}/>
        </Box>
    )
}
