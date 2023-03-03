import { NextPage } from "next";
import Head from "next/head";
import dynamic from "next/dynamic";
import { Box, Flex, SimpleGrid, Text, theme } from "@chakra-ui/react";
import { ApexOptions } from "apexcharts";
import { useContext } from "react";

import { Header } from "../components/Header";
import { SideBar } from "../components/SideBar";
import { AuthContext } from "../contexts/AuthContext";
import { withSSRAuth } from "../utils/withSSRAuth";


const Dashboard: NextPage = () => {
  const { user } = useContext(AuthContext)

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