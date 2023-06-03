import {
  ForwardRefRenderFunction,
  forwardRef,
  useImperativeHandle,
} from 'react'
import { FieldError, useFormContext } from 'react-hook-form'
import { HStack, Heading, VStack } from '@chakra-ui/react'

import { Input } from '../Input'
import { Select } from '../Select'
import { TextArea } from '../Textarea'

type ProjectNameFormHandle = {
  fields: string[]
}

const ProjectNameFormComponent: ForwardRefRenderFunction<
  ProjectNameFormHandle
> = (_, ref) => {
  const {
    register,
    formState: { errors },
  } = useFormContext()

  useImperativeHandle(
    ref,
    () => {
      return {
        fields: ['name', 'course', 'type', 'description'],
      }
    },
    [],
  )

  return (
    <VStack w="100%" alignItems="start" gap="4">
      <Heading as="h1" mb="8" w="100%">
        Criar projeto
      </Heading>

      <Input
        name="name"
        label="Nome do Projeto"
        placeholder="Nome do projeto"
        error={errors.name as FieldError}
        {...register('name', { required: true })}
      />

      <HStack w="100%">
        <Select
          label="Curso/Departamento"
          placeholder="Selecione um curso"
          error={errors.course as FieldError}
          {...register('course')}
        >
          <option value="K7ZsUUE4H2EMrMVh5aae">
            Ciências da Computação/DCOMP - UFSJ
          </option>
        </Select>

        <Select
          name="type"
          label="Tipo do projeto"
          placeholder="Selecione um tipo"
          error={errors.type as FieldError}
          {...register('type')}
        >
          <option value="qdUl1KOch9tFvOQzbJaw">Iniciação Científica</option>
        </Select>
      </HStack>

      <TextArea
        label="Descrição do projeto"
        placeholder="Digite aqui uma descrição"
        error={errors.description as FieldError}
        {...register('description')}
      />
    </VStack>
  )
}

export const ProjectNameForm = forwardRef(ProjectNameFormComponent)
