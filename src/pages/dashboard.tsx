import { NextPage } from 'next'
import Head from 'next/head'

import { Center, Flex, SimpleGrid, Spinner } from '@chakra-ui/react'
import { Header } from '../components/Header'
import { SideBar } from '../components/SideBar'
import { useAuth } from '../hooks/useAuth'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

const Dashboard: NextPage = () => {
  const { user, isLoading, isAuthenticated } = useAuth()
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
        <title>Dashboard</title>
      </Head>

      <Flex direction="column" h="100vh">
        <Header />

        <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
          <SideBar />

          {isLoading ? (
            <Center w="100%" h="100%">
              <Spinner size="xl" color="teal.500" />
            </Center>
          ) : (
            <SimpleGrid
              flex="1"
              gap="4"
              minChildWidth="320px"
              alignItems="flex-start"
            ></SimpleGrid>
          )}
        </Flex>
      </Flex>
    </>
  )
}

export default Dashboard
