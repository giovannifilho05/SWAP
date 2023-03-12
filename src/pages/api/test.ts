import { auth, db } from "../../services/firebase";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";

export default async function handler(req, res) {
    const docRef = doc(db, "cities", "SF");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
    res.status(200).json({ data: docSnap.data() })
}