import {
  Button,
  FormErrorMessage,
  HStack,
  Heading,
  IconButton,
  Text,
  VStack,
} from '@chakra-ui/react'
import { Select } from '../Select'
import { FieldError, useFieldArray, useFormContext } from 'react-hook-form'
import { AddIcon, MinusIcon } from '@chakra-ui/icons'
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import { Input } from '../Input'
import { User, getAllDataFromCollection } from '../../../utils/firebaseMethods'

type ProjectNameFormHandle = {
  fields: string[]
}

const ParticipantsFormComponent: React.ForwardRefRenderFunction<
  ProjectNameFormHandle
> = ({ }, ref) => {
  const {
    register,
    formState: { errors },
    control,
  } = useFormContext()
  const { fields, append, remove } = useFieldArray({
    name: 'participants',
    control,
    rules: {
      required: 'Adicione pelo menos 1 participante',
    },
  })

  const [participants, setParticipants] = useState<User[]>([])
  // const [role, setRole] = useState<>([])

  useEffect(() => {
    getAllDataFromCollection<User>('user').then((users) =>
      setParticipants(users),
    )
  }, [])

  useImperativeHandle(
    ref,
    () => {
      return {
        fields: ['participants'],
      }
    },
    [],
  )

  return (
    <VStack w="100%" alignItems="start" gap="4">
      <Heading as="h1" mb="8" w="100%">
        Participantes
      </Heading>

      <Button
        colorScheme="teal"
        type="button"
        leftIcon={<AddIcon />}
        onClick={() => append({ name: '', role: '' })}
      >
        Novo participante
      </Button>

      <Text fontSize="md" color="red.500">
        {errors?.participants?.message as string}
      </Text>

      {fields.map((field, index) => (
        <HStack key={field.id} w="100%">
          <Select
            name={`participants.${index}.id`}
            label="Participante"
            placeholder="Selecione um participante"
            error={errors?.participants?.[index]?.id as FieldError}
            {...register(`participants.${index}.id` as const)}
          >
            {participants.map((participant) => (
              <option
                key={participant.id}
                value={participant.id}
              >{`${participant.name} ${participant.lastName}`}</option>
            ))}
          </Select>

          <Select
            name={`participants.${index}.role`}
            label="Função"
            placeholder="Selecione uma função"
            error={errors?.participants?.[index]?.role as FieldError}
            {...register(`participants.${index}.role` as const)}
          >
            <option value="dsadsa">Orientador</option>
            <option>Co-Orientador</option>
            <option>Aluno</option>
          </Select>

          <IconButton
            colorScheme="red"
            type="button"
            aria-label="Remover participante"
            size="md"
            icon={<MinusIcon />}
            alignSelf="flex-end"
            onClick={() => remove(index)}
          />
        </HStack>
      ))}
    </VStack>
  )
}

export const ParticipantsForm = forwardRef(ParticipantsFormComponent)
