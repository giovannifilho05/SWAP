import { useRouter } from 'next/router'
import { Button, Flex, Stack, Link as ChakraLink, useToast, VStack, Text } from "@chakra-ui/react";
import { FieldError, SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'
import { FcGoogle } from 'react-icons/fc'

import { GetServerSideProps, NextPage } from "next";
import { useContext, useEffect, useRef, useState } from "react";

import { Input } from "../components/Form/Input";
import { AuthContext, SignInMethod } from "../contexts/AuthContext";
import Link from 'next/link';
import { Logo } from '../components/Header/Logo';

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

const Home: NextPage = () => {
    const [signInMethod, setSignMethod] = useState<SignInMethod>('email')
    const { user, signIn } = useContext(AuthContext)
    const router = useRouter()
    const toast = useToast()


    useEffect(() => {
        if (user) {
            router.push('/')
        }
    }, [user])

    const { register, handleSubmit, formState, formState: { errors }, setValue } = useForm({
        resolver: yupResolver(signInFormSchema),
    })

    const handleSignIn: SubmitHandler<SignInFormData> = async (data) => {
        const { success, message } = await signIn(signInMethod, data)

        if (success) {
            setTimeout(() => {
                router.push('/dashboard')
            }, 400);

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
        <VStack
            w="100vw"
            h="100vh"
            align="center"
            justify="center"
        >
            <Logo fontSize={["6xl", "7xl"]}/>
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
                    isLoading={formState.isSubmitting && signInMethod === 'email'}
                >
                    Entrar
                </Button>

                <input checked={signInMethod !== 'email'} type="checkbox" name="providerLogin" {...register('providerLogin')} hidden />

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
                    isLoading={formState.isSubmitting && signInMethod === 'google'}
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