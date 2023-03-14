import { signOut } from "firebase/auth";
import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next"
import nookies, { destroyCookie } from 'nookies'
import { auth } from "../services/firebase";

import { firebaseAdmin } from "../services/firebase-admin";

export function withSSRAuth<P>(fn: GetServerSideProps<P>) {
    return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
        try {
            const cookies = nookies.get(ctx)
            const token = await firebaseAdmin.auth().verifyIdToken(cookies[process.env.NEXT_PUBLIC_TOKEN_NAME]);

            if(!token) {
                throw new Error('Unauthorized')
            }

            return await fn(ctx)
        } catch (error) {
            destroyCookie(ctx, process.env.NEXT_PUBLIC_TOKEN_NAME)
            
            return {
                redirect: {
                    destination: '/signIn',
                    permanent: false,
                }
            }
        }
    }
}