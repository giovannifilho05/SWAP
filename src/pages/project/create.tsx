import { NextPage } from 'next'
import Head from 'next/head'

import { Box, Center, Flex, Heading } from '@chakra-ui/react'
import { SideBar } from '../../components/SideBar'
import { Header } from '../../components/Header'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { CreateProjectForm } from '../../components/Form/CreateProjectForm'

const CreateProject: NextPage = () => {
  const { user, isLoading, isAuthenticated, authState } = useAuth()
  const router = useRouter()

  useEffect(() => {
    const { success, redirect } = isAuthenticated()

    if (!isLoading) {
      if (!success) router.replace(redirect.path)
    }
  }, [isLoading, user])
  return (
    <>
      <Head>
        <title>Criar Novo Projeto</title>
      </Head>

      <Flex direction="column" h="100vh">
        <Header />
        <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6" gap="6">
          <SideBar />

          <Box w="100%" maxW="900px">
            <CreateProjectForm />
          </Box>
        </Flex>
      </Flex>
    </>
  )
}

export default CreateProject
