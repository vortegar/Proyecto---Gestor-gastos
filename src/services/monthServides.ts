import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from './cloudDatabase';

// Crear
export const addMonth = async (data) => {
    try {
      const docRef = await addDoc(collection(db, "month"), {
        name     : data,
        expenses : [],
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
          }
        }
      );
      fn(namesArray)
    } catch (e) {
      console.error("Error fetching documents: ", e);
    }
  };
