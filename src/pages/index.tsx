import Router, { useRouter } from 'next/router'
import { Button, Flex, Stack } from "@chakra-ui/react";
import { FieldError, SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'

import { GetServerSideProps, NextPage } from "next";
import { useContext, useEffect, useState } from "react";

import { Input } from "../components/Form/Input";
import { AuthContext, SignInMethod } from "../contexts/AuthContext";

type SignInFormData = {
    email: string;
    password: string;
}

const signInFormSchema = yup.object().shape({
    email: yup.string().email("E-mail deve ser válido.").required("E-mail é obrigatório."),
    password: yup.string().required('Senha é obrigatória.')
})

const Home: NextPage = () => {
    const [signInMethod, setSignMethod] = useState<SignInMethod>('email')
    const { user, signIn } = useContext(AuthContext)
    const router = useRouter()


    useEffect(() => {
        if (user) {
            router.push('/')
        }
    }, [user])

    const { register, handleSubmit, formState, formState: { errors } } = useForm({
        resolver: yupResolver(signInFormSchema),
    })

    const handleSignIn: SubmitHandler<SignInFormData> = async (data) => {
        console.log({ signInMethod })
        const { success } = await signIn(signInMethod, data)

        if (success) {
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
                <Button
                    type="submit"
                    onClick={() => setSignMethod('google')}
                    mt="6"
                    size="lg"
                    colorScheme="pink"
                    isLoading={formState.isSubmitting}
                >
                    Google
                </Button>
            </Flex>
        </Flex>
    )
}

export default Home

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    return {
        props: {
            users: []
        }
    }
};