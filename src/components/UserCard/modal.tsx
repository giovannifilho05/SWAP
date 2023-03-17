import { forwardRef, ReactElement, Ref, useImperativeHandle } from "react"
import { useDisclosure, Button, Modal as ModalChakra, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from "@chakra-ui/react"
import { Input } from "../Form/Input";
import { useTheme } from "@emotion/react";
import { Form } from "./Form";

interface ModalProps {
    children: ReactElement;
}

interface RefProps {
    onOpen: () => void;
}

interface Theme {
    colors: {
        pink: {
            400: string; 
        }
    }
}

function ModalComponent({ children }: ModalProps, ref: Ref<RefProps>) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const theme: Theme = useTheme() as Theme

    useImperativeHandle(ref, () => ({
        onOpen
    }), [])

    return (
        <>
            {children}

            <ModalChakra isOpen={isOpen} onClose={onClose} >
                <ModalOverlay />
                <ModalContent bgColor="gray.600">
                    <ModalHeader color='white' >Editando Permissão de Usuário</ModalHeader>
                    <ModalBody>
                    </ModalBody>
                        <Form />
                    <ModalFooter>
                        <Button colorScheme='pink' mr={3} onClick={onClose}>
                            Salvar
                        </Button>
                        <Button variant='outline' _hover={{ bgColor: `${theme.colors?.pink[400]}30`, }} colorScheme='pink'>Cancelar</Button>
                    </ModalFooter>
                </ModalContent>
            </ModalChakra>
        </>
    )
}

export const Modal = forwardRef(ModalComponent)