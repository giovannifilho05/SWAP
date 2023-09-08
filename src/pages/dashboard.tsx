import { NextPage } from "next";
import Head from "next/head";

import { Center, 
  Flex, 
  SimpleGrid, 
  Spinner, 
  Card, 
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Image, 
  Text, 
  Button } from "@chakra-ui/react";
import { Header } from "../components/Header";
import { SideBar } from "../components/SideBar";
import { useAuth } from "../hooks/useAuth";
import { useEffect } from "react";
import { useRouter } from "next/router";

const Dashboard: NextPage = () => {
  const { user, isLoading, isAuthenticated, authState } = useAuth()
  const router = useRouter()

  useEffect(() => {
    const { success, redirect } = isAuthenticated()

    if (!isLoading) {
      if (!success) router.replace(redirect.path)
    }
  }, [isLoading, user]);//no isLoading do return eu mudei o spinner de lugar para visualizar o código pois o firebase fica carregando

  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>

      <Flex direction="column" h="100vh">
        <Header />
 
        <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
          <SideBar />

          {isLoading
            ? (
              <SimpleGrid flex="1" gap="4" 
              minChildWidth="320px" 
              alignItems="center"
              padding='30px'>
                <Card backgroundColor='gray.100'
                borderColor='black'
                border='2px'
                maxWidth='150vh'
                borderRadius='3xl'>

                  <CardHeader>
                    <Heading fontSize='xxx-large' 
                      color="teal.500"
                      marginStart='30px'
                      textAlign="center"
                    > O Instituto
                    </Heading>
                  </CardHeader>

                  <CardBody textAlign='justify'
                  marginLeft='30px'>
                    <Image 
                      align='center'
                      alt='imagem do projeto'
                      width='850px'
                      height='250px'
                      src='https://leitorcompulsivo.com.br/wp-content/uploads/2019/11/o_Instituto_King.jpg'
                    />

                    <br/>

                    <Text as='b' 
                    marginRight='30px'
                    noOfLines={[1, 2, 3, 4]}> 
                        No meio da noite, em uma casa no subúrbio de Minneapolis, um grupo de invasores assassina os pais de Luke e sequestra silenciosamente o menino de doze anos. A operação leva menos de dois minutos.
                      Quando Luke acorda, ele está no Instituto, em um quarto que parece muito o dele, exceto pelo fato de que não tem janela. E do lado de fora tem outras portas, e atrás delas, outras crianças com talentos especiais, que chegaram àquele lugar do mesmo jeito que Luke. O grupo formado por ele, Kalisha, Nick, George, Iris e o caçula, Avery Dixon, de apenas dez anos, está na Parte da Frente. Outros jovens, Luke descobre, foram levados para a Parte de Trás e nunca mais vistos.
                      Nessa instituição sinistra, a equipe se dedica impiedosamente a extrair dessas crianças toda a força de seus poderes paranormais. Não existem escrúpulos. Conforme cada nova vítima vai desaparecendo para a Parte de Trás, Luke fica mais e mais desesperado para escapar e procurar ajuda. Mas até hoje ninguém nunca conseguiu fugir do Instituto.
                      Tão aterrorizante quanto A incendiária e tão espetacular quando It: a Coisa, este novo livro de Stephen King mostra um mundo onde o bem nem sempre vence o mal.
                    </Text>
                    <Text fontSize='xl'
                    color='teal.500'
                    textAlign='left'
                    >Stephen King</Text>
                  </CardBody>

                  <CardFooter alignSelf='center'>
                    <Button colorScheme='teal'
                    size='lg'> Ver projeto</Button>
                  </CardFooter>
                </Card>
              </SimpleGrid>
            ): (
              <Center w="100%" h="100%">
                <Spinner size='xl' color="teal.500" />
              </Center>
          )}
        </Flex>
      </Flex>
    </>
  )
}

export default Dashboard