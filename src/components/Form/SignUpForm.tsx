import {
  Flex,
  Heading,
  HStack,
  Button,
  InputLeftAddon,
  VStack,
} from '@chakra-ui/react'
import { Input } from './Input'
import { Select } from './Select'
import { FieldError, SubmitHandler, useForm } from 'react-hook-form'
import InputMask from 'react-input-mask'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { isCPFValid, onlyNumbers } from '../../utils/usefulMethods'
import { Roles } from '../../contexts/AuthContext'

export type PersonalData = {
  name: string
  lastName: string
  cpf: string
  phone: string
  userType: string
}

interface SignUpFormProps {
  onSubmit: SubmitHandler<PersonalData>
  defaultValues?: Partial<PersonalData>
}

const signUpFormSchema = yup.object().shape({
  name: yup
    .string()
    .matches(/^[a-zA-z]{3,15}$/, 'Insira um nome válido')
    .required('Nome é obrigatório.'),
  lastName: yup
    .string()
    .matches(/^[a-zA-z]{3,15}$/, 'Insira um sobrenome válido')
    .required('Sobrenome é obrigatório.'),
  cpf: yup
    .string()
    .required('CPF é obrigatório.')
    .test('CPF válido', 'CPF inválido', (value) => isCPFValid(value)),
  phone: yup
    .string()
    .required('Telefone é obrigatório.')
    .test('Telefone válido', 'Telefone inválido', (value) => {
      const numbers = onlyNumbers(value)
      return numbers.length === 11 // 11 dígitos
    }),
  userType: yup
    .string()
    .oneOf(Object.keys(Roles))
    .required('O Tipo do Usuário é obrigatório.'),
})

export function SignUpForm({ defaultValues, onSubmit }: SignUpFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(signUpFormSchema),
    defaultValues,
  })

  return (
    <Flex as="form" w="100%" flexDir="column" onSubmit={handleSubmit(onSubmit)}>
      <Heading as="h1" size="lg" color="teal.500" mb="8">
        Dados pessoais
      </Heading>

      <VStack gap="2">
        <HStack w="100%" alignItems="start">
          <Input
            name="name"
            label="Nome"
            error={errors.name as FieldError}
            {...register('name')}
          />
          <Input
            name="lastName"
            label="Sobrenome"
            error={errors.lastName as FieldError}
            {...register('lastName')}
          />
        </HStack>

        <VStack gap="2" align="center" w="100%">
          <HStack w="100%" alignItems="start">
            <Input
              as={InputMask}
              name="cpf"
              label="CPF"
              // @ts-ignore
              mask="999.999.999-99"
              alwaysShowMask={false}
              maskPlaceholder="___.___.___-__"
              error={errors.cpf as FieldError}
              {...register('cpf')}
            />
            <Input
              as={InputMask}
              name="phone"
              label="Telefone"
              leftAddon={<InputLeftAddon>+55</InputLeftAddon>}
              // @ts-ignore
              mask="(99) 9 9999-9999"
              alwaysShowMask={false}
              maskPlaceholder="(__) _ ____-____"
              error={errors.phone as FieldError}
              {...register('phone')}
            />
          </HStack>

          <Select
            name="userType"
            placeholder="Selecione um tipo"
            label="Tipo do Usuário"
            error={errors.userType as FieldError}
            {...register('userType')}
          >
            {Object.keys(Roles).map((role) => (
              <option value={role} key={Roles[role]}>
                {Roles[role]}
              </option>
            ))}
          </Select>
        </VStack>
      </VStack>

      <HStack justifyContent="end" p="8">
        <Button
          size="lg"
          colorScheme="teal"
          type="submit"
          isLoading={isSubmitting}
          loadingText="Salvando..."
        >
          Salvar
        </Button>
      </HStack>
    </Flex>
  )
}
