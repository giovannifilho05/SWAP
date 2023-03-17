import { NextPage } from "next";
import Head from "next/head";

import { Flex, SimpleGrid } from "@chakra-ui/react";
import { Header } from "../components/Header";
import { SideBar } from "../components/SideBar";
import { withSSRAuth } from "../utils/withSSRAuth";

const Dashboard: NextPage = () => {
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
           
          </SimpleGrid>
        </Flex>
      </Flex>
    </>
  )
}


export const getServerSideProps = withSSRAuth(async (ctx) => {
  return {
    props: {}
  }
})

export default Dashboard