import {
  CircularProgress,
  Modal,
  Text,
  Button,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalHeader,
  ModalFooter,
  ModalCloseButton,
} from '@chakra-ui/react';

type Props = {
  keywords: string[];
  isOpen: boolean;
  closeModal: () => void;
  loading: boolean;
};

export default function KeywordsModal({ keywords, isOpen, closeModal, loading }: Props) {
  return (
    <Modal isOpen={isOpen} onClose={closeModal}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Keywords</ModalHeader>
        <ModalCloseButton />
        <ModalBody display='flex' alignItems='center' justifyContent='center'>
          {loading ? <CircularProgress isIndeterminate color='blue.300' /> : <Text>{keywords}</Text>}
        </ModalBody>
        <ModalFooter>
          <Button colorScheme='blue' mr={3} onClick={closeModal}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
