import { createContext, ReactNode } from "react";
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";

import { auth } from "../services/firebase";
import { signOut as signOutAuth, User as FirebaseUser } from 'firebase/auth'
import useFirebaseAuth, { AuthState } from "../hooks/useFirebaseAuth";
import { useRouter } from "next/router";
import { useToast } from "@chakra-ui/react";

interface User extends FirebaseUser {
    // permissions: string;
    // roles: string[];
}

type SignInCredentials = {
    email: string;
    password: string;
}

type SignInResponse = {
    success: boolean;
    message?: string;
}

type AuthContextData = {
    user?: User;
    signInWithGoogle(): Promise<SignInResponse>;
    signInWithEmail({ email, password }: SignInCredentials): Promise<SignInResponse>;
    signOut(): Promise<void>;
    isLoading: boolean;
    authState: AuthState;
}

type AuthProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps) {
    const router = useRouter()
    const { isLoading, authUser: user, authState } = useFirebaseAuth();

    async function signOut() {
        try {
            await signOutAuth(auth)
            router.push('/signIn')
        } catch (error) {
            console.log('Error on signOut', error)
        }
    }

    async function signInWithGoogle() {
        try {
            const provider = new GoogleAuthProvider();
            const user = await signInWithPopup(auth, provider);

            return {
                success: !!user
            }
        } catch (error) {
            console.log('Error Google Auth Provider', error)
            return {
                success: false,
                message: error.message
            }
        }
    }

    async function signInWithEmail({ email, password }: SignInCredentials) {
        try {
            await signInWithEmailAndPassword(auth, email, password)

            return {
                success: true
            }
        } catch (error) {
            return {
                success: false,
                message: error.message
            }
        }
    }



    return (
        <AuthContext.Provider value={{
            user,
            signInWithGoogle,
            signInWithEmail,
            signOut,
            isLoading,
            authState
        }}>
            {children}
        </AuthContext.Provider>
    )
}