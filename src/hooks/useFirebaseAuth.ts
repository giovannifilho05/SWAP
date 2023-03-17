import { User } from 'firebase/auth';
import { useState, useEffect } from 'react'
import nookies, { destroyCookie } from 'nookies'

import { auth } from '../services/firebase';
// const formatAuthUser = (user) => ({
//     uid: user.uid,
//     email: user.email
// });

export default function useFirebaseAuth() {
    const [authUser, setAuthUser] = useState<User>(null);
    const [isLoading, setIsLoading] = useState(true);

    const authStateChanged = async (authState: User) => {
        if (!authState) {
            setAuthUser(null)
            destroyCookie(undefined, process.env.NEXT_PUBLIC_TOKEN_NAME)
            setIsLoading(false)
            return;
        }

        setIsLoading(true)
        const token = await authState.getIdToken();
        nookies.set(undefined, process.env.NEXT_PUBLIC_TOKEN_NAME, token, { path: '/' })
        // const formattedUser = formatAuthUser(authState)
        setAuthUser(authState)

        setIsLoading(false)
    };

    // listen for Firebase state change
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(authStateChanged);
        return () => unsubscribe();
    }, []);

    return {
        authUser,
        isLoading
    };
}