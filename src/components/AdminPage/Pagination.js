import {
    List,
    ListItem,
    ListIcon,
    OrderedList,
    UnorderedList,
} from '@chakra-ui/react'
import { Box, Text, Grid, GridItem, Flex, Center, Button, list } from "@chakra-ui/react"
import {IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
const max_itens = 3;
const max_left = (max_itens -1)/2;
export default function Pagination ({limit, total, offset, setoffset}) {
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