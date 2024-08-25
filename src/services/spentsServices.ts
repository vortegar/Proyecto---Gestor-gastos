import { Dispatch, SetStateAction } from "react";

import { auth, db } from "./firebase";
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";

import { validateUser } from "../helpers/validarUser";
import { formatToUpperCase } from "../helpers/formatData";
import { Spent } from "../context/SpentContextProvider";
import { FnState, SpentsInputs } from "../components/intercafeComponents";
import { message } from "antd";

// Crear
  export const addSpent = async (data: SpentsInputs) => {
    const user = auth.currentUser;
    try {
      validateUser(user);
      const formData = formatToUpperCase(data.spent_name)
      const userRef = doc(db, 'users', user!.uid);
  
      const spentCollectionRef = collection(userRef, 'spent');
      await addDoc(spentCollectionRef, {
        spent_name: formData,
        });
      message.success('Gasto agregado!!!');
        // console.log("Documento Agregado: ");
      } catch (e) {
        console.error("Error añadiendo a: ", e);
      }
    };

// Leer 
  export const getDataSpent = async (fn: Dispatch<SetStateAction<Spent[]>>) => {
    try {
      const user = auth.currentUser;
      validateUser(user);
  
      const userUid = user!.uid;
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
  export const deleteSpent = async (personId: string, fnBlock: FnState, fnRefresh: FnState) => {
    try {
      const user = auth.currentUser;
      validateUser(user);
      fnBlock();
  
      const userUid = user!.uid;
      const docRef = doc(db, "users", userUid, "spent", personId);
  
      await deleteDoc(docRef);
  
      fnRefresh();
      setTimeout(() => {
        fnBlock();
      }, 300);
  
      message.success('Gasto eliminado!!!');
    } catch (error) {
      console.error("Error al eliminar: ", error);
    }
  };
  