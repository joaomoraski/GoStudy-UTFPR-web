import TableSalas from './table'
import { useRouter } from 'next/router'
import useUser from '../../../../hooks/useUser';
import { useState, useEffect } from 'react';
import getAllRooms from '../../../../services/room/getAllRooms'
import getOneInstitute from '../../../../services/institute/getOneInstitute'
import { IoIosAddCircleOutline } from 'react-icons/io';
import { Box, Flex, Button,  } from '@chakra-ui/react';

export default function ContainerSala(){
    const router = useRouter();
    const {user} = useUser();
    const [rooms, setRooms] = useState([]);
    
    useEffect(
        ()=>{
            (async ()=>{
                if(user?.token){
                    const response = await getAllRooms({token: user.token});
                    let formattedRoom = []
                    if(response.status == 'success'){
                        setRooms(response.data)
                        // await response.data.map(
                        //     async (room)=>{
                        //         if(room.fk_id_institute){
                        //             await getOneInstitute({id:room.fk_id_institute,token:user?.token})
                        //             .then(
                        //                 (res)=>{
                        //                     formattedRoom.push({id: room.id, number: room.number, fk_id_institute:res.data.name })
                        //             })
                        //             .catch(err=>console.log(err))
                        //             .finally(
                        //                 ()=>setRooms(formattedRoom)
                        //             )
                        //         }
                        //     }
                        // )
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
                <Button onClick={()=>router.push('/admin/salas/cadastro')} leftIcon={<IoIosAddCircleOutline />}  colorScheme='blue' variant='solid'>
                    Adicionar
                </Button>
            </Flex> 
            <TableSalas salaList={rooms} setRooms={setRooms}/>
        </Box>
    )
}
