import Router from 'next/router'
import { Button, Flex, Stack } from "@chakra-ui/react";
import { FieldError, SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'

import { GetServerSideProps, NextPage } from "next";
import { useContext } from "react";

import { Input } from "../components/Form/Input";
import { AuthContext } from "../contexts/AuthContext";
import { withSSRGuest } from '../utils/withSSRGuest';

type SignInFormData = {
    email: string;
    password: string;
}

const signInFormSchema = yup.object().shape({
    email: yup.string().email("E-mail deve ser válido.").required("E-mail é obrigatório."),
    password: yup.string().required('Senha é obrigatória.')
})

const Home: NextPage = () => {
    const { signIn } = useContext(AuthContext)
    
    const { register, handleSubmit, formState, formState: { errors } } = useForm({
        resolver: yupResolver(signInFormSchema),
    })

    const handleSignIn: SubmitHandler<SignInFormData> = async (data) => {
        const { success } = await signIn(data)

        if(success) {
            Router.push('dashboard')
        } else {
            alert('You\'re not authorized')
        }
    }

    return (
        <Flex
            w="100vw"
            h="100vh"
            align="center"
            justify="center"
        >
            <Flex
                as="form"
                w="100%"
                maxWidth={360}
                bg="gray.800"
                p="8"
                borderRadius={8}
                flexDir="column"
                onSubmit={handleSubmit(handleSignIn)}
            >
                <Stack spacing="4">
                    <Input
                        name="email"
                        type="email"
                        label="Email"
                        error={errors.email as FieldError}
                        {...register('email')}
                    />
                    <Input
                        name="password"
                        type="password"
                        label="Senha"
                        error={errors.password as FieldError}
                        {...register('password')}
                    />
                </Stack>

                <Button
                    type="submit"
                    mt="6"
                    size="lg"
                    colorScheme="pink"
                    isLoading={formState.isSubmitting}
                >
                    Entrar
                </Button>
            </Flex>
        </Flex>
    )
}

export default Home

export const getServerSideProps: GetServerSideProps = withSSRGuest(async (ctx) => {
  return {
    props: {
      users: []
    }
  }
});