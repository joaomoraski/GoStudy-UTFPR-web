
import { Box, Text, Grid, GridItem, Flex, Center } from "@chakra-ui/react"

const reservas = [
    {
      diaSemana: "Segunda-feira",
      horarioInicio: "10:00",
      horarioFim: "12:00",
      data : "01/01/2020",
    },
    {
      diaSemana: "Segunda-feira",
      horarioInicio: "10:00",
      horarioFim: "12:00",
      data : "01/01/2020",
    },
    {
      diaSemana: "Segunda-feira",
      horarioInicio: "10:00",
      horarioFim: "12:00",
      data : "01/01/2020",
    },
    {
      diaSemana: "Segunda-feira",
      horarioInicio: "10:00",
      horarioFim: "12:00",
      data : "01/01/2020",
    },
  ]

export default function Reservas() {
    return(
        <Box borderRadius={'5px'} borderWidth={'1px'}
           borderColor={'#b2b2b2'} p={6} bgColor={'#FFFFFF'}
           maxWidth={'1200px'} width={"100%"}>
            <Text fontWeight={'bold'} fontSize='26px'>
                Suas reservas: 
            </Text>
            <Grid templateColumns='repeat(2, 1fr)' gap={6}>
              {reservas.map((reserva, index) => (
                <GridItem>
                   <Box fontWeight={'bold'} borderRadius={'5px'} borderWidth={'1px'}
                    borderColor={'#b2b2b2'} p={4} bgColor={'#ECF4FB'}
                    maxWidth={'500px'}>
                    <Text fontSize='16px'>
                      {reserva.diaSemana} ~ {reserva.data}
                    </Text>
                    <Flex >
                      <Text fontSize='14px'>
                        {reserva.horarioInicio} ~ {reserva.horarioFim}
                      </Text>
                       
                    </Flex>
                  </Box>
                </GridItem>
              ))}
            </Grid>
            
          </Box>
    )
}