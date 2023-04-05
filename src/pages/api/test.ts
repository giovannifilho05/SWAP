import { auth, db } from "../../services/firebase";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { firebaseAdmin } from "../../services/firebase-admin";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const auth = await firebaseAdmin.auth().updateUser('F39JyGexjfdpcT3MqJ5HBjj5GMm1', {
      email: 'admin@admin.com',
      phoneNumber: '+11234567890',
      emailVerified: true,
      password: 'admin1',
      displayName: 'Jane Doe',
    //   photoURL: 'http://www.example.com/12345678/photo.png',
    //   disabled: true,
    })
    // const docRef = doc(db, "cities", "SF");
    // const docSnap = await getDoc(docRef);

    // if (docSnap.exists()) {
    //     console.log("Document data:", docSnap.data());
    // } else {
    //     // doc.data() will be undefined in this case
    //     console.log("No such document!");
    // }


    res.status(200).json({ data: auth })
}