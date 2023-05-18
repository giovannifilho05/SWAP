import { Button, Center, HStack, VStack } from "@chakra-ui/react";
import { useMultiStepForm } from "../../../hooks/useMultiStepForm";
import { ProjectNameForm } from "./ProjectNameForm";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { cloneElement, useRef } from "react";

const CreateProjectFormSchema = yup.object().shape({});

export function CreateProjectForm() {
  const { step, isLastStep, isFirstStep } = useMultiStepForm([
    <ProjectNameForm key={1} />,
  ]);
  const methods = useForm({
    resolver: yupResolver(CreateProjectFormSchema),
  });
  const currentStepRef = useRef(null);

  return (
    <FormProvider {...methods}>
      <VStack as="form" w="100%">
        <Center flexDir="column" gap="2" w="100%">
          {/* {step} */}
          {cloneElement(step, { ref: currentStepRef })}

          <HStack alignSelf="flex-end">
            {!isFirstStep && (
              <Button colorScheme="teal" variant="outline">
                Anterior
              </Button>
            )}
            {
              // !isLastStep &&
              <Button colorScheme="teal" onClick={() => console.log("teste")}>
                Próximo
              </Button>
            }
            {isLastStep && (
              <Button colorScheme="teal" type="submit">
                Criar
              </Button>
            )}
          </HStack>
        </Center>
      </VStack>
    </FormProvider>
  );
}
