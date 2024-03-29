import { createContext, ReactNode } from "react";
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";

import { auth } from "../services/firebase";
import { signOut as signOutAuth, User as FirebaseUser } from 'firebase/auth'
import useFirebaseAuth from "../hooks/useFirebaseAuth";
import { useRouter } from "next/router";

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
  const router = useRouter()

  async function signOut() {
    try {
      await signOutAuth(auth)
      router.push('/signIn')
    } catch (error) {
      console.log('Error on signOut', error)
    }
  }

  async function signIn(signInMethod: SignInMethod, credentials: SignInCredentials) {
    let result: SignInResponse
    switch (signInMethod) {
      case 'email':
        const { email, password } = credentials ?? {}
        result = await signInWithEmail(email, password)
        break;

      case 'google':
        result = await signInWithGoogleProvider()
        break;
        
      default:
        return {
          success: false,
          message: 'Sign in method not found'
        }
    }

    return result
  }

  async function signInWithGoogleProvider() {
    try {
      const provider = new GoogleAuthProvider();
      const user = await signInWithPopup(auth, provider);

      return {
        success: !!user,
      }
    } catch (error) {
      console.log('Error Google Auth Provider', error)
      return {
        success: false,
        message: error.code
      }
    }
  }

  async function signInWithEmail(email: string, password: string) {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password)
      
      return {
        success: true,
      }
    } catch (error) {
      console.log(error)
      return {
        success: false,
        message: error.code
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