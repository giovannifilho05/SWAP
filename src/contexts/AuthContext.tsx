import Router from "next/router";
import { createContext, ReactNode, useEffect, useState } from "react";

import { api } from "../services/api";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { useQuery } from "@tanstack/react-query";

type User = {
  name: string;
  email: string;
  permissions: string;
  roles: string[];
}

type SignInCredentials = {
  email: string;
  password: string;
}
type SignInResponse = {
  success: boolean;
}

type AuthContextData = {
  user?: User;
  signIn(credentials: SignInCredentials): Promise<SignInResponse>;
  signOut(): void;
  isAuthenticated: boolean;
}

type AuthProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData)

export function signOut() {
  destroyCookie(undefined, 'nextauth.token')
  destroyCookie(undefined, 'nextauth.refreshToken')

  Router.push('/')
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>()
  const isAuthenticated = !!user;

  useEffect(() => {
    const { 'nextauth.token': token } = parseCookies()
    if (token) {
      api.get('me')
        .then(({ data: user }) => {
          const { name, email, permissions, roles } = user

          setUser({ name, email, permissions, roles })
        })
        .catch(() => {
          signOut()
        })

    }
  }, [])

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const response = await api.post('sessions', {
        email,
        password
      })

      const { name, token, refreshToken, permissions, roles } = response.data

      setCookie(undefined, 'nextauth.token', token, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/',
      })
      setCookie(undefined, 'nextauth.refreshToken', refreshToken, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/',
      })
      setUser({
        name,
        email,
        permissions,
        roles
      })

      api.defaults.headers['Authorization'] = `Bearer ${token}`

      return {
        success: true,
      }

    } catch (err) {
      console.log('Catch\n', err);

      return {
        success: false,
      }
    }
  }

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}