import { UserRecord } from "firebase-admin/lib/auth/user-record";
import { NextApiRequest, NextApiResponse } from "next";
import { firebaseAdmin } from "../../../services/firebase-admin";
import { log } from "console";

// export interface UserResponse {
//     user?: UserRecord,
//     message?: string;
// }

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    log
    if (req.method === 'GET') {
        try {
            const dataBaseURL = `https://${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}.firebaseio.com/users/jack/name.json`
            console.log(dataBaseURL);
            const userData = await firebaseAdmin.database().ref(dataBaseURL)
            
            
            return res
                .status(200) //Created
                .json(userData)
        } catch (error) {
            // if (error.code === 'auth/email-already-exists') {
                return res
                    // .status(409) //Conflict
                    .json({
                        message: error.message
                    })
            // }
        }
    } else {
        return res
            .status(405) //Method not allowed
    }
}