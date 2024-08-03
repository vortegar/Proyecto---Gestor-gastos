import { db } from './cloudDatabase';
import { collection, addDoc, getDocs } from "firebase/firestore";

// Crear
export const addMonth = async (data) => {
    try {
      const docRef = await addDoc(collection(db, "month"), {
        name     : data,
        expenses : [],
        fixed_expenses : [],
      });
      console.log(docRef)
    } catch (e) {
      console.error("Error añadiendo a: ", e);
    }
  };

// Leer 
export const getDataMonth = async (fn) => {
    try {
      const querySnapshot = await getDocs(collection(db, "month"));
      const namesArray = querySnapshot.docs.map(doc => {
        return {
          id: doc.id,
          name: doc.data().name,
          expenses: doc.data().expenses,
          fixed_expenses: doc.data().fixed_expenses,
          }
        }
      );
      fn(namesArray)
    } catch (e) {
      console.error("Error fetching documents: ", e);
    }
  };
