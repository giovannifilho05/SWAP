import { cloneElement, useRef } from 'react'
import { Button, Center, HStack } from '@chakra-ui/react'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { ParticipantsForm } from './ParticipantsForm'
import { useMultiStepForm } from '../../../hooks/useMultiStepForm'
import { ProjectNameForm } from './ProjectNameForm'
import { addDoc, collection, doc } from 'firebase/firestore'
import { db } from '@services/firebase'
import { useAuth } from '@hooks/useAuth'

interface CreateProjectFormProps {
  onCreateProject: () => void | Promise<void>
}

const PartipantSchema = z.object({
  id: z.string().nonempty('Digite o nome do participante'),
  role: z.string().nonempty('Selecione a função do participante'),
})

const CreateProjectFormSchema = z.object({
  name: z
    .string()
    .nonempty('Selecione um nome para o projeto')
    .min(2, 'Nome muito curto'),
  course: z.string().nonempty('Selecione o curso/departamento'),
  description: z.string().nonempty('Adicione uma descrição para o projeto'),
  type: z.string().nonempty('Selecione o tipo do projeto'),
  participants: z
    .array(PartipantSchema)
    .nonempty('Adicione pelo menos 1 participante'),
})

export function CreateProjectForm({ onCreateProject }: CreateProjectFormProps) {
  const { user } = useAuth()
  const { step, isLastStep, isFirstStep, nextStep, prevStep } =
    useMultiStepForm([
      <ProjectNameForm key={1} />,
      <ParticipantsForm key={2} />,
    ])

  const methods = useForm({
    resolver: zodResolver(CreateProjectFormSchema),
  })

  const { handleSubmit, trigger } = methods

  const formRef = useRef<{ fields: string[] }>(null)

  async function onSubmit(data: z.infer<typeof CreateProjectFormSchema>) {
    const participants = data.participants.map(({ id, ...rest }) => {
      return doc(db, `user/${id}`)
    })
    participants.push(doc(db, `user/${user.uid}`))

    const roles = {
      [user.uid]: 'Orientador',
    }

    data.participants.forEach(({ id, role }) => {
      roles[id] = role
    })

    const course = doc(db, `departament/${data.course}`)
    const type = doc(db, `projectType/${data.type}`)

    console.log({
      ...data,
      participants,
      roles,
      course,
      type,
    })

    addDoc(collection(db, 'project'), {
      ...data,
      participants,
      roles,
      course,
      type,
    })

    onCreateProject()
  }

  async function handleNextStep() {
    const result = await trigger(formRef.current.fields)

    if (result) nextStep()
  }

  return (
    <FormProvider {...methods}>
      <Center
        as="form"
        w="100%"
        flexDir="column"
        gap="2"
        onSubmit={handleSubmit(onSubmit)}
      >
        {cloneElement(step, { ref: formRef })}

        <HStack alignSelf="flex-end">
          {!isFirstStep && (
            <Button colorScheme="teal" variant="outline" onClick={prevStep}>
              Anterior
            </Button>
          )}
          {!isLastStep && (
            <Button colorScheme="teal" onClick={handleNextStep}>
              Próximo
            </Button>
          )}
          {isLastStep && (
            <Button colorScheme="teal" type="submit">
              Criar
            </Button>
          )}
        </HStack>
      </Center>
    </FormProvider>
  )
}
