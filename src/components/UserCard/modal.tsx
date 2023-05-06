import { forwardRef, ReactElement, Ref, useImperativeHandle, useRef } from "react"
import {
    useDisclosure,
    Button,
    Modal as ModalChakra,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    useToast
} from "@chakra-ui/react"

import { FormRefProps, UserCardForm } from "./userCardForm";

interface ModalProps {
    children: ReactElement;
}

interface RefProps {
    onOpen: () => void;
}

function ModalComponent({ children }: ModalProps, ref: Ref<RefProps>) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const formRef = useRef<FormRefProps>(null)
    const toast = useToast()

    useImperativeHandle(ref, () => ({
        onOpen
    }), [])

    return (
        <>
            {children}

            <ModalChakra isOpen={isOpen} onClose={onClose} >
                <ModalOverlay />
                <ModalContent bgColor="white" border="1px solid" borderColor="teal">
                    <ModalHeader color='gray.500' >
                        Editando Permissão de Usuário
                    </ModalHeader>

                    <ModalBody>
                        <UserCardForm ref={formRef}/>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='teal'
                            mr={3}
                            onClick={async () => {
                                try {
                                    await formRef.current?.onSave()

                                    toast({
                                        title: 'Usuário alterado.',
                                        status: 'success',
                                        duration: 1500,
                                        isClosable: true,
                                    })
                                    
                                    onClose();
                                } catch(err) {
                                    console.log(err)

                                    
                                    toast({
                                        title: 'Ocorreu um erro.',
                                        status: 'error',
                                        duration: 1500,
                                        isClosable: true,
                                    })
                                }
                            }}
                        >
                            Salvar
                        </Button>
                        <Button
                            variant='outline'
                            colorScheme='teal'
                            onClick={onClose}
                        >
                            Cancelar
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </ModalChakra>
        </>
    )
}

export const Modal = forwardRef(ModalComponent)