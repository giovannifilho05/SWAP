import { ReactElement, ReactFragment, useState } from 'react'

type UseMultiStepFormReturn = {
  isLastStep: boolean
  isFirstStep: boolean
  nextStep: () => void
  prevStep: () => void
  step: ReactElement
}

export function useMultiStepForm(
  steps: ReactElement[],
): UseMultiStepFormReturn {
  const [currentStep, setCurrentStep] = useState(0)
  const isLastStep = currentStep === steps.length - 1
  const isFirstStep = currentStep === 0

  function nextStep() {
    setCurrentStep((currentStep) => {
      if (currentStep >= steps.length - 1) return currentStep

      return currentStep + 1
    })
  }

  function prevStep() {
    setCurrentStep((prev) => {
      if (prev <= 0) return prev

      return prev - 1
    })
  }

  return {
    isLastStep,
    isFirstStep,
    nextStep,
    prevStep,
    step: steps[currentStep],
  }
}
