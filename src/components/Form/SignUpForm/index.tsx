
import { Button, Flex, HStack } from "@chakra-ui/react";
import { useEffect } from "react";
import { useMultiStepForm } from "../../../hooks/useMultiStepForm";
import { PersonalInfoForm } from "./PersonalInfo";

export function SignUpForm() {
    const { currentStep, prevStep, nextStep, isLastStep } = useMultiStepForm({ steps: 4 })

    return (
        <Flex
            w="100%"
            // width="clamp(20rem, 30vw, 600px)"
            // bg="black"
            borderRadius={8}
            flexDir="column"
        >
            {currentStep === 1 && (
                <PersonalInfoForm />
            )}

            <HStack justifyContent="end" p="8">
                {currentStep > 1 && (
                    <Button
                        size="lg"
                        colorScheme="teal"
                        variant="outline"
                        onClick={prevStep}
                    >
                        Voltar
                    </Button>
                )}

                {!isLastStep && (
                    <Button
                        size="lg"
                        colorScheme="teal"
                        onClick={nextStep}
                    >
                        Próximo
                    </Button>
                )}


            </HStack>
        </Flex>
    )
}