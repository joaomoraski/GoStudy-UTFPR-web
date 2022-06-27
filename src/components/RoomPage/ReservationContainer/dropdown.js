import { Select } from '@chakra-ui/react'
export default function DropDown({day, setDay}) {
    return(
            <Select value={day} onChange={(e)=>setDay(e.target.value)}
             maxWidth={"200px"} width={"100%"} height={'30px'} marginTop={'5px'} marginLeft={'250px'} bg={'#EEEDEA'}>
                <option value='1' size='lg'>Segunda-Feira</option>
                <option value='2' size='lg'>Terça-Feira</option>
                <option value='3' size='lg'>Quarta-Feira</option>
                <option value='4' size='lg'>Quinta-Feira</option>
                <option value='5' size='lg'>Sexta-Feira</option>
            </Select>
        
    )
}