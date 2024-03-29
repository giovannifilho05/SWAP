import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input as ChakraInput,
  InputProps as ChakraInputProps
} from "@chakra-ui/react";
import { forwardRef, ForwardRefRenderFunction } from "react";
import { FieldError } from "react-hook-form";

interface InputProps extends ChakraInputProps {
  name: string;
  label?: string;
  error?: FieldError;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = ({ name, label, error, ...rest }, ref) => {
  return (
    <FormControl isInvalid={!!error}>
      {label && <FormLabel htmlFor={rest.id ?? name}>{label}</FormLabel>}
 
      <ChakraInput
        id={name}
        name={name}
        size="lg"
        focusBorderColor="pink.500"
        bgColor="gray.900"
        variant="filled"
        _hover={{ bg: "gray.900" }}
        ref={ref}
        {...rest}
      />

      {error && (<FormErrorMessage>{error.message}</FormErrorMessage>)}
    </FormControl>);
}

export const Input = forwardRef(InputBase)