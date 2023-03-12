import { createContext, ReactNode } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

import { auth } from "../services/firebase";
import { signOut as signOutAuth, User as FirebaseUser } from 'firebase/auth'
import useFirebaseAuth from "../hooks/useFirebaseAuth";

interface User extends FirebaseUser {
  // permissions: string;
  // roles: string[];
}

export type SignInMethod = 'google' | 'email'

type SignInCredentials = {
  email: string;
  password: string;
}

type SignInProps = {
  signInMethod: SignInMethod,
  credentials?: SignInCredentials
}
type SignInResponse = {
  success: boolean;
  message?: string;
}

type AuthContextData = {
  user?: User;
  signIn(signInMethod: SignInMethod, credentials?: SignInCredentials): Promise<SignInResponse>;
  signOut(): Promise<void>;
  isLoading: boolean;
}

type AuthProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps) {
  const { isLoading, authUser: user } = useFirebaseAuth();

  async function signOut() {
    try {
      console.log('SignOuting')
      await signOutAuth(auth)
    } catch (error) {
      console.log('Error on signOut', error)
    }
  }

  async function signInWithGoogleProvider() {
    try {
      const provider = new GoogleAuthProvider();
      const user = await signInWithPopup(auth, provider);

      return !!user
    } catch (error) {
      console.log('Error Google Auth Provider', error)
      return false
    }
  }

  async function signIn(signInMethod: SignInMethod, credentials: SignInCredentials) {
    // const { email, password } = credentials ?? {}

    switch (signInMethod) {
      case 'google':
        const success = await signInWithGoogleProvider()
        return {
          success,
        }

      default:
        return {
          success: false,
          message: 'Sign in method not found'
        }
    }
  }
  
  return (
    <AuthContext.Provider value={{
      user,
      signIn,
      signOut,
      isLoading
    }}>
      {children}
    </AuthContext.Provider>
  )
}