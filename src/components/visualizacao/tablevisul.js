import { Box, Text, Grid, GridItem, Flex, Center, Button, list } from "@chakra-ui/react"
import { BsFillPencilFill, BsFillTrashFill } from 'react-icons/bs';
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
  } from '@chakra-ui/react'
import React, { useEffect, useState } from "react";
import {
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
} from '@chakra-ui/react'

import {IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
const max_itens = 3;
const max_left = (max_itens -1)/2;

  const Pagination = ({limit, total, offset, setoffset}) => {
      const atual = offset ? (offset / limit) + 1 : 1;
      const pages = Math.ceil(total / limit );
      const first = Math.max(atual - max_left, 1);
  
      function onPageChange(page){
        setoffset( (page - 1) * limit);
      }
      return (
          <List display={"flex"} alignContent={'center'} justifyContent={'center'}>
              <Button marginTop={2} disabled={atual === 1} onClick={() => onPageChange(atual - 1)}>{<IoIosArrowBack/>}</Button>
              {Array.from({length: Math.min(max_itens, pages)})
              .map((_, index)=> index + first)
              .map((page)=> 
              <ListItem key={page} padding={2}>
                  <Button
  
              onClick={() => onPageChange(page)}
              >
                  {page}
              </Button>
              </ListItem>
              )}  
               <Button marginTop={2}  onClick={() => onPageChange(atual + 1)}>{<IoIosArrowForward/>}</Button>
          </List>
      )
    }

  export default function CampusTable({campusList}){
    
    const [offset, setoffset] = useState(0);

    return(
        <Box borderRadius={'5px'} >
        <TableContainer>
        <Table variant='unstyled'>
          <Thead>
            <Tr>
              <Th isNumeric backgroundColor={"#DEEEFF"}>Id</Th>
              <Th backgroundColor={"#DEEEFF"}>Campus</Th>
              <Th backgroundColor={"#DEEEFF"}>Cidade</Th>
              <Th backgroundColor={"#DEEEFF"}>Telefone</Th>
              <Th backgroundColor={"#DEEEFF"}>abertura</Th>
              <Th backgroundColor={"#DEEEFF"}>fechamento</Th>
              <Th backgroundColor={"#DEEEFF"} >Acão</Th>
            </Tr>
          </Thead>
          <Tbody>
          {campusList?.slice(offset,offset+5).map((campus) => (  
                <Tr>
                <Td isNumeric>{campus.id}</Td>
                <Td>{campus.name}</Td>
                <Td>{campus.city}</Td>
                <Td>{campus.telephone}</Td>
                <Td>{campus.openingTime}</Td>
                <Td>{campus.closingTime}</Td>
                <td>
                    <Button variant='ghost' colorScheme='none' border={'Background'} alignContent={'center'} justifyContent={'center'}  marginRight={1} padding={0}>{<BsFillPencilFill />}</Button>
                    <Button variant='ghost' colorScheme='none' padding={-1}>{<BsFillTrashFill />}</Button>
                </td>
                </Tr>    
              ))}
          </Tbody>
        </Table>
      </TableContainer>
      <Pagination 
            limit={5} 
            total={campusList?.length} 
            offset={offset}
            setoffset={setoffset}
            />
    </Box>
    )
}