import { NextPage } from "next";
import Head from "next/head";

import { Flex, SimpleGrid } from "@chakra-ui/react";
import { Header } from "../components/Header";
import { SideBar } from "../components/SideBar";
import { UserCard } from "../components/UserCard";
import { useAuth } from "../hooks/useAuth";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../services/firebase";
import { User } from "../contexts/UsersContext";
import { useUsers } from "../hooks/useUsers";

const Dashboard: NextPage = () => {
  const { isLoading, user, isAuthenticated } = useAuth()
  const { setUsers } = useUsers()
  const router = useRouter()

  const { isLoading: isLoadingUsers, data: users } = useQuery({
    queryKey: ['users', user?.uid],
    queryFn: async (): Promise<User[]> => {
      let users = [] as User[]

      const q = query(collection(db, "user"), where("email", "!=", user.email));
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        users.push({ id: doc.id, ...doc.data() } as User)
      })

      //Save users in UsersContext
      setUsers(users)

      return users
    },
    staleTime: 1000 * 60 * 10, // 2 minuto
    retry: true,
    enabled: !!user
  })

  useEffect(() => {
    const { success, redirect } = isAuthenticated()

    if (!isLoading) {
      if (!success) router.replace(redirect.path)
    }
  }, [isLoading, user]);


  return (
    <>
      <Head>
        <title>{isLoadingUsers ? 'Carregando...' : 'Usuários'}</title>
      </Head>

      <Flex direction="column" h="100vh">
        <Header />

        <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
          <SideBar />

          <SimpleGrid flex="1" gap="4" minChildWidth="320px" alignItems="flex-start" column={2}>
            {users?.map(user => <UserCard key={user.id} user={user} />)}
          </SimpleGrid>
        </Flex>
      </Flex>
    </>
  )
}

export default Dashboard