import { firebaseConfig } from "./firebase";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
 