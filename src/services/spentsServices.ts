import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from './cloudDatabase';

// Crear
export const addSpent = async (data) => {
    try {
      const docRef = await addDoc(collection(db, "spent"), {
        spent_name: data.spent_name,
      });
      // console.log("Documento Agregado: ", docRef.id);
    } catch (e) {
      console.error("Error añadiendo a: ", e);
    }
  };

// Leer 
export const getDataSpent = async (fn) => {
    try {
      const querySnapshot = await getDocs(collection(db, "spent"));
      const namesArray = querySnapshot.docs.map(doc => {
        return{
          id: doc.id,
          spent_name: doc.data().spent_name
          }
        }
      );
      fn(namesArray)
    } catch (e) {
      console.error("Error fetching documents: ", e);
    }
  };

//   Eliminar
  export const deleteSpent = async (name, fnBlock, fnRefresh) => {
    try {
        fnBlock();
      const docRef = doc(db, "spent", name.id); 
      await deleteDoc(docRef);
      fnRefresh();
      setTimeout(() => {
        fnBlock()
      }, 300);
      // console.log("Document successfully deleted!");
    } catch (error) {
      console.error("Error removing document: ", error);
    }
  };