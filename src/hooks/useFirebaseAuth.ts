import { useState, useEffect } from 'react'
import nookies, { destroyCookie } from 'nookies'
import { User } from 'firebase/auth';
import { useRouter } from 'next/router';
import { doc, getDoc } from 'firebase/firestore';

import { auth, db } from '../services/firebase';
import { useToast } from '@chakra-ui/react';

export type AuthState = 'unauthenticated' | 'authenticated' | 'missingInfo'


async function isProfileComplete(userID: string) {
    console.log({ userID })
    const docRef = doc(db, "user", userID);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        console.log('Profile is complete', { userData: docSnap.data() })

    } else {
        console.log("No such document!");
    }

    return docSnap.exists();
}

export default function useFirebaseAuth() {
    const router = useRouter()
    const toast = useToast()
    
    const [authUser, setAuthUser] = useState<User>(null);
    const [isLoading, setIsLoading] = useState(true);
    let authState = 'unauthenticated' as AuthState
    
    const authStateChanged = async (user: User) => {
        setIsLoading(true)

        if (!user) {
            setAuthUser(null)
            destroyCookie(undefined, process.env.NEXT_PUBLIC_TOKEN_NAME)
            setIsLoading(false)
            
            redirect(false)
            return;
        }

        const token = await user.getIdToken();
        nookies.set(undefined, process.env.NEXT_PUBLIC_TOKEN_NAME, token, { path: '/' })

        setAuthUser(user)


        if (await isProfileComplete(user.uid)) {
            authState = 'authenticated'
        } else {
            authState = 'missingInfo'
        }

        setIsLoading(false)

        redirect(true)
    };

    // listen for Firebase state change
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(authStateChanged);
        return () => unsubscribe();
    }, []);


    function redirect(success: boolean) {
        console.log({ authState, isLoading, success });

        if (success && authState === 'authenticated') {
            toast({
                title: 'Bem-vindo(a) de volta.',
                status: 'success',
                duration: 1500,
                isClosable: true,
            })
            router.push('/dashboard')
        } else if (success && authState === 'missingInfo') {
            toast({
                title: 'Informações pendentes',
                status: 'warning',
                duration: 3000,
                isClosable: true,
            })
            router.push('/signUp/completeProfile')
        }
    }

    return {
        authUser,
        isLoading,
        authState,
    };
}