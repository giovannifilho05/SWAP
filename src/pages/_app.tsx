import { AppProps } from "next/app"

import { ChakraProvider } from "@chakra-ui/react"
import { QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { AuthProvider } from '../contexts/AuthContext'
import { SideBarDrawerProvider } from "../contexts/SidebarDrawerContext"
import { queryClient } from "../services/queryClient"

import { theme } from "../styles/theme"

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient} >
      <AuthProvider>
        <ChakraProvider theme={theme}>
          <SideBarDrawerProvider>
            <Component {...pageProps} />
          </SideBarDrawerProvider>
        </ChakraProvider>

        <ReactQueryDevtools />
      </AuthProvider>
    </QueryClientProvider>
  )
}