import { db } from './cloudDatabase';
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";

import { formatToUpperCase } from "../helpers/formatData";

// Crear
export const addSpent = async (data) => {
  const formatData = formatToUpperCase(data.spent_name)
    try {
      const docRef = await addDoc(collection(db, "spent"), {
        spent_name: formatData,
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
      const spentArray = querySnapshot.docs.map(doc => {
        return{
          id: doc.id,
          spent_name: doc.data().spent_name
          }
        }
      );
      spentArray.sort((a, b) => a.spent_name.localeCompare(b.spent_name));
      fn(spentArray)
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