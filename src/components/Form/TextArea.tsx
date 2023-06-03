import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  TextareaProps as ChakraTextAreaProps,
  Textarea,
} from '@chakra-ui/react'
import { forwardRef, ForwardRefRenderFunction } from 'react'
import { FieldError } from 'react-hook-form'

interface TextAreaProps extends ChakraTextAreaProps {
  name: string
  placeholder: string
  label?: string
  error?: FieldError
}

const TextAreaBase: ForwardRefRenderFunction<
  HTMLTextAreaElement,
  TextAreaProps
> = ({ id, name, label, error, ...rest }, ref) => {
  return (
    <FormControl isInvalid={!!error}>
      {label && <FormLabel htmlFor={id ?? name}>{label}</FormLabel>}
      <Textarea
        ref={ref}
        id={name}
        name={name}
        size="sm"
        _focus={{ borderColor: 'teal.200', borderWidth: '2px' }}
        colorScheme="teal"
        {...rest}
      />
      {error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  )
}

export const TextArea = forwardRef(TextAreaBase)
