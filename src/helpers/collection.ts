import { auth, db } from "../services/firebase";
import { collection, doc, getDoc } from "firebase/firestore";

import { validateUser } from "./validarUser";

export const getFixedSpentsCollection = () => {
      const user = auth.currentUser;
      validateUser(user);
      const userRef = doc(db, 'users', user!.uid);
      return collection(userRef, "fixedspent");
};

export const getPersonCollection = () => {
      const user = auth.currentUser;
      validateUser(user);
      const userRef = doc(db, 'users', user!.uid);
      return collection(userRef, 'person');
};

export const getSpentCollection = () => {
      const user = auth.currentUser;
      validateUser(user);
      const userRef = doc(db, 'users', user!.uid);  
      return collection(userRef, 'spent');

};

export const getYearCollection = () => {
      const user = auth.currentUser;
      validateUser(user);
      const userRef = doc(db, "users", user!.uid); 
      return collection(userRef, 'year');
};

export const getYear = async(year: string) => {
      const user = auth.currentUser!;
      validateUser(user);
      const userRef = doc(db, "users", user.uid);
      const yearDocRef = doc(userRef, "year", year);
      const yearDoc = await getDoc(yearDocRef);
      return {
            yearDoc, 
            yearDocRef
      }
};

