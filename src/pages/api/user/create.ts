import { UserRecord } from "firebase-admin/lib/auth/user-record";
import { NextApiRequest, NextApiResponse } from "next";
import { firebaseAdmin } from "../../../services/firebase-admin";

export interface CreateUserResponse {
    user?: UserRecord,
    message?: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<CreateUserResponse>) {
    if (req.method === 'POST') {
        const { user } = req.body

        try {
            const userData = await firebaseAdmin.auth().createUser({
                emailVerified: false,
                ...user
            })

            return res
                .status(201) //Created
                .json({
                    user: userData
                })
        } catch (error) {
            if (error.code === 'auth/email-already-exists') {
                return res
                    .status(409) //Conflict
                    .json({
                        message: error.message
                    })
            }
        }
    } else {
        return res
            .status(405) //Method not allowed
    }
}