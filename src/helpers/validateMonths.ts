import { auth, db } from "../services/firebase";
import { doc, getDoc } from "firebase/firestore";

import { validateUser } from "./validarUser";

export const findMonthById = async(year:string) => {
  const user = auth.currentUser!;
  validateUser(user);

  const userUid = user.uid;
  const userRef = doc(db, "users", userUid);
  const yearDocRef = doc(userRef, "year", year);

  const yearDoc = await getDoc(yearDocRef);
  const months = yearDoc.data()!.month;
  return { months, yearDocRef };
}

export const checkMonthExistence = (monthIndex: number) => {
  if (monthIndex === -1) {
    console.error('No se encontró el mes con el ID proporcionado');
    return;
  }
}