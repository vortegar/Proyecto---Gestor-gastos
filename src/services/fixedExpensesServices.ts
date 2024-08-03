import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from './cloudDatabase';

// Crear
export const addFixedSpent = async (data) => {
    try {
      const docRef = await addDoc(collection(db, "fixedspent"), {
        fixed_spent_name: data.fixed_spent_name,
      });
      // console.log("Documento Agregado: ", docRef.id);
    } catch (e) {
      console.error("Error añadiendo a: ", e);
    }
  };

// Leer 
export const getDataFixedSpent = async (fn) => {
    try {
      const querySnapshot = await getDocs(collection(db, "fixedspent"));
      const namesArray = querySnapshot.docs.map(doc => {
        return{
          id: doc.id,
          fixed_spent_name: doc.data().fixed_spent_name
          }
        }
      );
      fn(namesArray)
    } catch (e) {
      console.error("Error fetching documents: ", e);
    }
  };

//   Eliminar
  export const deleteFixedSpent = async (name, fnBlock, fnRefresh) => {
    try {
        fnBlock();
      const docRef = doc(db, "fixedspent", name.id); 
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