
import { auth, db } from "./firebase";
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";

import { validateUser } from "../helpers/validarUser";
import { formatToUpperCase } from "../helpers/formatData";

// Crear
  export const addSpent = async (data) => {
    const user = auth.currentUser;
    const formData = formatToUpperCase(data.spent_name)
    try {
      validateUser(user);
      const userRef = doc(db, 'users', user?.uid);
  
      const spentCollectionRef = collection(userRef, 'spent');
      await addDoc(spentCollectionRef, {
        spent_name: formData,
        });
        // console.log("Documento Agregado: ");
      } catch (e) {
        console.error("Error añadiendo a: ", e);
      }
    };

// Leer 
  export const getDataSpent = async (fn) => {
    try {
      const user = auth.currentUser;
      validateUser(user);
  
      const userUid = user.uid;
      const userRef = doc(db, "users", userUid);
      const personCollectionRef = collection(userRef, "spent");
  
      const querySnapshot = await getDocs(personCollectionRef);
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
  export const deleteSpent = async (personId, fnBlock, fnRefresh) => {
    try {
      const user = auth.currentUser;
      validateUser(user);
      fnBlock();
  
      const userUid = user.uid;
      const docRef = doc(db, "users", userUid, "spent", personId);
  
      await deleteDoc(docRef);
  
      fnRefresh();
      setTimeout(() => {
        fnBlock();
      }, 300);
  
      console.log("Document successfully deleted!");
    } catch (error) {
      console.error("Error removing document: ", error);
    }
  };
  