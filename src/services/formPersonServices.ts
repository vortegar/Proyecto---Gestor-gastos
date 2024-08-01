import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from '../services/cloudDatabase';

// Crear
export const addPerson = async (data) => {
    try {
      const docRef = await addDoc(collection(db, "person"), {
        name: data.name,
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
      const namesArray = querySnapshot.docs.map(doc => {
        return{
          id: doc.id,
          person_name: doc.data().name
          }
        }
      );
      fn(namesArray)
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