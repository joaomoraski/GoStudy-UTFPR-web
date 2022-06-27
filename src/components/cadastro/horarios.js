import { useState, useEffect } from "react";
import { Box, Text, Grid, GridItem, Flex, Center, Button } from "@chakra-ui/react"
import { BsCheckCircle, BsXCircle} from "react-icons/bs";
import { MdCheckCircleOutline } from "react-icons/md";
import getSchedules from "../../services/schedule/getSchedules";
import useUser from "../../hooks/useUser";

const Horarios = [
    {
      horario: "07:30",
      isReservado: true
     
    },
    {
      horario: "08:20",
      isReservado: true
     
    },
    {
      horario: "09:10",
      isReservado: true
     
    },
    {
      horario: "10:00",
      isReservado: true
     
    },
    {
      horario: "11:10",
      isReservado: true
     
    },
    {
      horario: "12:00",
      isReservado: true
     
    },
    {
      horario: "13:00",
      isReservado: true
     
    },
    {
      horario: "13:50",
      isReservado: true
     
    },
    {
      horario: "14:40",
      isReservado: true
     
    },
    {
      horario: "15:30",
      isReservado: true
     
    },
    {
      horario: "16:20",
      isReservado: true
     
    },
    {
      horario: "17:30",
      isReservado: true
     
    },
    {
      horario: "18:20",
      isReservado: true
     
    },
    {
      horario: "19:10",
      isReservado: true
     
    },
    {
      horario: "20:00",
      isReservado: true
     
    }
  ]
  function reservado(horario) {

    return(
        <Button  borderRadius={'5px'} 
          p={4} bgColor={'#FFEDED'}
         maxWidth={'100px'} width={'130px'} height={'30px'} >
        <Flex>
        <BsXCircle color="red" />
        <Text marginLeft={2} marginTop={-0.5} fontSize='16px'>
            {horario.label}
        </Text>
        </Flex>
         
       </Button>
    )
  }

  function livre(horario) {

    return(
      <Button  borderRadius={'5px'} 
       p={3} bgColor={'#F0FFF5'}
      maxWidth={'100px'} width={'100%'} height={'30px'} css={{'&:focus':{boxShadow: 'none'}, }} >
      <Flex>
        <MdCheckCircleOutline  color="green" />
        <Text marginLeft={2} marginTop={-0.5} fontSize='16px'>
            {horario.horario}
        </Text>
        </Flex>
    </Button>
        
    )
}

  export default function horarios() {
    const [horarios, setHorarios] = useState([]);
    const { user } = useUser();
    useEffect(
      ()=>{
        (async ()=>{
          const response = await getSchedules({token: user.token});
          if(response.status == 'success'){
            setHorarios(response.data)
          }
        })()
      },[]
    )

    return(
        <Box borderRadius={'5px'} 
            p={6} bgColor={'#FFFFFF'}
           maxWidth={'1200px'} width={"100%"}>
            <Grid templateColumns='repeat(6, 1fr)' rowGap={3} >

              {horarios.map((horario, index) => (
                <GridItem>
                    { horario?
                        reservado(horario)
                        :
                        livre(horario)
                    } 
                </GridItem>
              ))}
            </Grid>
            
          </Box>
    )
}