import { Box, Text, Grid, GridItem, Flex, Center, Button } from "@chakra-ui/react"






const salas = [
    {
      sala: "Sala 01",
     
    },
    {
      sala: "Sala 02",
      
    },
    {
      sala: "Sala 03",
      
    },
    {
      sala: "Sala 04",
      
    },
    {
      sala: "Sala 05",
      
    },
    {
      sala: "Sala 06",
      
    },
    {
      sala: "Sala 07",
      
    },
    {
      sala: "Sala 08",
      
    },

  ]

export default function Salas() {
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
                {salas.map((salas, index) => (
                  <GridItem margin={'-2'}>
                    <Button   borderRadius={'5px'} borderWidth={'1px'} 
                      borderColor={'#b2b2b2'} bgColor={'#EEEDEA'}
                      width={'130px'} height={'52px'} css={{'&:focus':{ background: "#6BB6FA", boxShadow: 'none'}, }}>
                        <Text  fontSize='20px' textColor={'#313131'}>
                          {salas.sala}
                        </Text>
                    </Button>
                  </GridItem>
                ))}
              </Grid>
            </Box>
          
         
    )
}