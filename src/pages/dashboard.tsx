import { NextPage } from "next";
import Head from "next/head";
import { Button, Flex, SimpleGrid } from "@chakra-ui/react";
import { useEffect } from "react";

import { Header } from "../components/Header";
import { SideBar } from "../components/SideBar";
import { useRouter } from "next/router";
import { auth } from "../services/firebase";
import { useAuth } from "../hooks/useAuth";
import { getApp } from "firebase/app";
import { onAuthStateChanged } from "firebase/auth";


const Dashboard: NextPage = () => {
  const { user, signOut, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/')
    }
  }, [user, isLoading])

  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>

      <Flex direction="column" h="100vh">
        <Header />

        <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
          <SideBar />

          <SimpleGrid flex="1" gap="4" minChildWidth="320px" alignItems="flex-start">
            <Button
              type="button"
              onClick={async () => await signOut()}
            >
              SignOut
            </Button>
          </SimpleGrid>
        </Flex>
      </Flex>
    </>
  )
}

export const getServerSideProps = async (ctx) => {
  return {
    props: {}
  }
}

export default Dashboard