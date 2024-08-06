import { auth, db } from './firebase';
import { collection, addDoc, getDocs, doc } from "firebase/firestore";

import { formatArrayMonth } from '../helpers/formatData';

// Crear
export const addMonth = async (data) => {
  const userUid = auth.currentUser;
    try {
      const userRef = doc(db, 'users', userUid?.uid);
  
      const monthCollectionRef = collection(userRef, 'month');
      await addDoc(monthCollectionRef, {
        month: data,
        expenses: [],
        fixed_expenses: []
      });
      // console.log(docRef)
    } catch (e) {
      console.error("Error añadiendo a: ", e);
    }
  };

  export const getDataMonth = async (fn) => {
    try {
      const user = auth.currentUser;
      
      const userUid = user.uid;
      const userRef = doc(db, "users", userUid);
      const monthCollectionRef = collection(userRef, "month");
  
      const querySnapshot = await getDocs(monthCollectionRef);
      const monthArrays = querySnapshot.docs.map(doc => ({
        id: doc.id,
        month: doc.data().month,
        expenses: doc.data().expenses,
        fixed_expenses: doc.data().fixed_expenses,
      }));
      const formatData = formatArrayMonth(monthArrays, 'month');
      fn(formatData);
    } catch (e) {
      console.error("Error: ", e);
    }
  };
