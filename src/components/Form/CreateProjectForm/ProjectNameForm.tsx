import { Heading, VStack } from '@chakra-ui/react'
import { Input } from '../Input'
import { Select } from '../Select'

export function ProjectNameForm() {
  return (
    <VStack w="100%" alignItems="start" gap="4">
      <Heading as="h1" mb="8" w="100%">
        Criar projeto
      </Heading>

      <Input
        name="porjectName"
        label="Nome do Projeto"
        placeholder="Nome do projeto"
        // error={errors.name as FieldError}

        // {...register('name')}
      />

      <Select
        name="course"
        label="Curso/Departamento"
        placeholder="Selecione um curso"
        // error={errors.userType as FieldError}

        // {...register('userType')}
      >
        <option>Ciências da Computação / DECOMP</option>
        <option>Ciências da Computação / DECOMP</option>
        <option>Ciências da Computação / DECOMP</option>
      </Select>
    </VStack>
  )
}
