import { GetServerSideProps, NextPage } from "next";
import { useContext, useEffect, useRef, useState } from "react";

import { useRouter } from 'next/router'
import { Button, Flex, Stack, Link as ChakraLink, useToast, VStack, Text } from "@chakra-ui/react";
import { FieldError, SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'
import { FcGoogle } from 'react-icons/fc'

import { Input } from "../components/Form/Input";
import { SignInMethod } from "../contexts/AuthContext";
import Link from 'next/link';
import { Logo } from '../components/Header/Logo';
import { useAuth } from "../hooks/useAuth";
import { withSSRGuest } from "../utils/withSSRGuest";
import Head from "next/head";

type SignInFormData = {
    email: string;
    password: string;
}

const signInFormSchema = yup.object().shape({
    providerLogin: yup.boolean(),
    email: yup
        .string()
        .email("E-mail deve ser válido.")
        .when('providerLogin', {
            is: (val: Boolean) => {
                return val === false
            },
            then: (schema) => schema.required("E-mail é obrigatório.")
        }),
    password: yup
        .string()
        .when('providerLogin', {
            is: (val: Boolean) => {
                return val === false
            },
            then: (schema) => schema.required('Senha é obrigatória.')
        })
})

const SignIn: NextPage = () => {
    const [signInMethod, setSignMethod] = useState<SignInMethod>('email')
    const { signIn } = useAuth()
    const router = useRouter()
    const toast = useToast()

    const { register, handleSubmit, formState: { errors, isSubmitting }, setValue } = useForm({
        resolver: yupResolver(signInFormSchema),
    })

    const handleSignIn: SubmitHandler<SignInFormData> = async (data) => {
        const { success, message } = await signIn(signInMethod, data)

        if (success) {
            toast({
                title: 'Welcome back.',
                status: 'success',
                duration: 1500,
                isClosable: true,
            })
            router.push('/')
        } else {
            toast({
                title: 'Unauthorized.',
                description: message,
                status: 'error',
                duration: 9000,
                isClosable: true,
            })
        }
    }

    return (
        <>
            <Head>
                <title>Entrar</title>
            </Head>

            <VStack
                w="100vw"
                h="100vh"
                align="center"
                justify="center"
            >
                <Logo fontSize={["6xl", "7xl"]} />
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
                            label="E-mail"
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
                        onClick={() => {
                            setValue('providerLogin', false)
                            setSignMethod('email')
                        }}
                        mt="6"
                        size="lg"
                        colorScheme="pink"
                        isLoading={isSubmitting && signInMethod === 'email'}
                    >
                        Entrar
                    </Button>

                    <input
                        checked={signInMethod !== 'email'}
                        type="checkbox"
                        name="providerLogin"
                        hidden
                        {...register('providerLogin')}
                    />

                    <Button
                        type="submit"
                        onClick={() => {
                            setValue('providerLogin', true)
                            setSignMethod('google')
                        }}
                        leftIcon={<FcGoogle />}
                        variant='outline'
                        mt="6"
                        size="lg"
                        colorScheme="white"
                        isLoading={isSubmitting && signInMethod === 'google'}
                    >
                        Google
                    </Button>
                </Flex>
                <Text> Não possui conta ?
                    <Link href="/signUp" passHref>
                        <ChakraLink color='pink.500' ml='2'>
                            Crie uma conta.
                        </ChakraLink>
                    </Link>

                </Text>

            </VStack>
        </>
    )
}

export const getServerSideProps = withSSRGuest(async (ctx) => {
    return {
        props: {}
    }
})

export default SignIn