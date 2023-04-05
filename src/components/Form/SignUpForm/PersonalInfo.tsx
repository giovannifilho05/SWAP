
import { Flex, Heading, HStack, InputGroup, InputLeftAddon, VStack } from "@chakra-ui/react";
import { Input } from "../Input";
import { Select } from "../Select";

export function PersonalInfoForm() {
    return (
        <Flex
            as="form"
            w="100%"
            // bg="gray.800"
            flexDir="column"
        >
            <Heading as='h1' size='lg' color="teal.500" mb="8">
                Dados pessoais
            </Heading>

            <VStack gap="2">
                <HStack w="100%">
                    <Input name="name" label="Nome" />
                    <Input name="lastName" label="Sobrenome" />
                </HStack>

                <VStack gap="2" align="center" w="100%">
                    <HStack w="100%">
                        <Input name="cpf" label="CPF" />
                        <Input name="phone" label="Telefone" leftAddon={<InputLeftAddon children='+55' />} />
                    </HStack>

                    <Select name="userType" placeholder='Selecione um tipo' label="Tipo">
                        <option value='option1'>Admin</option>
                        <option value='option2'>Discente</option>
                        <option value='option3'>Docente</option>
                    </Select>
                </VStack>
            </VStack>
        </Flex>
    )
}