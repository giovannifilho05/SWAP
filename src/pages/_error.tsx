import { Button, Center, Flex, VStack } from "@chakra-ui/react"
import { NextPage } from "next"
import Head from "next/head"
import Image from "next/image"
import Link from "next/link"

import { IoIosHome } from "react-icons/io"
// import Four from '/images/fourOhFour.svg'

const FourOhFour: NextPage = () => {
    return (
        <>
            <Head>
                <title>Está perdido ?</title>
            </Head>

            <Center h="100vh">



                {/* <Image
                    src="https://st2.depositphotos.com/47577860/45977/v/600/depositphotos_459770930-stock-illustration-abduction-alien-cow-icon-in.jpg"
                    alt="404"
                    width="400px"
                    height="400px"
                /> */}
                <Link href="/" passHref >
                    <Button as="a" colorScheme='teal' size='lg' leftIcon={<IoIosHome />}>
                        Voltar
                    </Button>
                </Link>
            </Center>
        </>
    )
}

export default FourOhFour