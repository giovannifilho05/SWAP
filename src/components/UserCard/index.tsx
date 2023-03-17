import { Button, Text, HStack, Avatar, Box, Select, Spacer, Tag } from "@chakra-ui/react"
import { useRef } from "react"
import { Modal } from './modal'


export function UserCard() {
    const modalRef = useRef(null)

    return (
        <Modal ref={modalRef}>
            <HStack
                as={Button}
                onClick={() => modalRef.current?.onOpen()}
                h="80px"
                bg="transparent"
                _hover={{ bg: "gray.600" }}
            >
                <Avatar name="Giovanni FIlho" />

                <Box mr="4" textAlign="left">
                    <Text fontSize="md">Giovanni Filho</Text>
                    <Text fontSize="sm" color="gray.300">email@email.com</Text>
                </Box>
                <Spacer />

                <Tag size="md" variant='solid' colorScheme='pink'>
                    Administrador
                </Tag>
                {/* <Box>
                    <Select placeholder='Select option' color="gray.900" bg="">
                        <option value='option1' selected>Administrador</option>
                        <option value='option2'>Professor</option>
                        <option value='option3'>Aluno</option>
                    </Select>
                </Box> */}
            </HStack>
        </Modal>
    )
}