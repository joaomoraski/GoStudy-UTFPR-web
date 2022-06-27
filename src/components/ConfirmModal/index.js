import { Button, Box, Flex, Text } from '@chakra-ui/react';
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

export default function ConfirmModal({message, confirmAction, isOpen, setIsOpen}) {

  return (
      <Modal
        isOpen={isOpen}
        style={customStyles}
      >
        <Box maxWidth={'400px'}>
            <Text marginBottom={'20px'} fontSize='16px' fontWeight='700'>
                {message}
            </Text>
            <Flex width="100%" justifyContent={'center'}>
                <Button colorScheme={'green'} marginRight={'10px'} onClick={()=>confirmAction()}>
                    Confirmar
                </Button>
                <Button colorScheme={'red'}  marginLeft={'10px'} onClick={()=>setIsOpen(false)}>
                    Cancelar
                </Button>
            </Flex>
        </Box>
      </Modal>
  );
}