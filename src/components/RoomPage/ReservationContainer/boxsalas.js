import { Box, Text, Grid, GridItem, Flex, Center, Button } from "@chakra-ui/react"



export default function Salas({salas, selectedRoom, setSelectedRoom}) {
    return(
            <Box>
              <Grid p={"2"} shadow={"none"} templateColumns='1, 1fr' gap={6} overflow={'scroll'}  maxHeight={'300px'} maxWidth={'200px'} overflowX={"hidden"} width={'100%'} css={{
              '&::-webkit-scrollbar': {
                width: '4px',
              },
              '&::-webkit-scrollbar-track': {
                width: '5px',
              },
              }}>
                {salas.map((sala, index) => (
                  <GridItem margin={'-2'}>
                    <Button onClick={()=>setSelectedRoom(sala.id)} 
                      borderRadius={'5px'} borderWidth={'1px'} 
                      borderColor={'#b2b2b2'} bgColor={sala.id==selectedRoom?"#6BB6FA":'#EEEDEA'}
                      width={'130px'} height={'52px'}>
                        <Text  fontSize='20px' textColor={'#313131'}>
                          Sala {sala.number}
                        </Text>
                    </Button>
                  </GridItem>
                ))}
              </Grid>
            </Box>
          
         
    )
}