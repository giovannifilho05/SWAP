import * as firebaseAdmin from 'firebase-admin';
import credentials from '../../firebase-admin-credentials.json'

if (!firebaseAdmin.apps.length) {
    firebaseAdmin.initializeApp({
        credential: firebaseAdmin.credential.cert({
            privateKey: credentials.private_key,
            clientEmail: credentials.client_email,
            projectId: credentials.project_id,
        })
    });
}

export { firebaseAdmin };