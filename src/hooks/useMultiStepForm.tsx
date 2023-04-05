import { useState } from "react";
import { boolean } from "yup";
interface useMultiStepFormProps {
    steps: number;
    initialStep?: number;
}
export function useMultiStepForm<T>({ steps, initialStep = 1 }: useMultiStepFormProps) {
    const [data, setData] = useState<T | any>({})
    const [step, setStep] = useState<number>(initialStep)
    const isLastStep = (step === steps)

    console.log(`CurrentStep`, step, {isLastStep})
    function prevStep() {
        setStep((currentStep) => {
            if (currentStep > 1) {
                return currentStep - 1
            }
            return 1
        })
    }

    function nextStep() {
        setStep((currentStep) => {
            if (currentStep < steps) {
                return currentStep + 1
            }
            return steps
        })
    }

    return {
        setData,
        data,
        prevStep,
        nextStep,
        currentStep: step,
        isLastStep,
    }
}