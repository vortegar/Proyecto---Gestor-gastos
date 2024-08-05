import { db } from '../services/cloudDatabase';
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";

import { formatToUpperCase } from "../helpers/formatData";

// Crear
export const addPerson = async (data) => {
  const formData = formatToUpperCase(data.name)
    try {
      const docRef = await addDoc(collection(db, "person"), {
        name: formData
      });
      // console.log("Documento Agregado: ", docRef.id);
    } catch (e) {
      console.error("Error añadiendo a: ", e);
    }
  };

// Leer 
export const getDataPerson = async (fn) => {
    try {
      const querySnapshot = await getDocs(collection(db, "person"));
      const personsArray = querySnapshot.docs.map(doc => {
        return{
          id: doc.id,
          person_name: doc.data().name
          }
        }
      );
      personsArray.sort((a, b) => a.person_name.localeCompare(b.person_name));
      fn(personsArray)
    } catch (e) {
      console.error("Error fetching documents: ", e);
    }
  };

//   Eliminar
  export const deletePerson = async (name, fnBlock, fnRefresh) => {
    try {
        fnBlock();
      const docRef = doc(db, "person", name.id); 
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