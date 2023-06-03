import Head from 'next/head'
import { Flex, Container } from '@chakra-ui/react'
import { Header } from '../../components/Header'
import { SideBar } from '../../components/SideBar'
import { ReactNode } from 'react'

interface DashboardTemplateProps {
  pageTitle: string
  children: ReactNode
}

export function DashboardTemplate({
  pageTitle,
  children,
}: DashboardTemplateProps) {
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>

      <Flex direction="column" h="100vh">
        <Header />
        <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6" gap="6">
          <SideBar />

          <Container maxW="6xl">{children}</Container>
        </Flex>
      </Flex>
    </>
  )
}
