import { auth, db } from './firebase';
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";

import { validateUser } from "../helpers/validarUser";
import { formatToUpperCase } from "../helpers/formatData";
import { FnState, PersonInputs } from '../components/intercafeComponents';
import { Dispatch, SetStateAction } from 'react';
import { Person } from '../interface/ComponentsInterface';

// Crear
export const addPerson = async (data: PersonInputs) => {
  const user = auth.currentUser;
  try {
    validateUser(user);
    const formData = formatToUpperCase(data!.name)
    const userRef = doc(db, 'users', user!.uid);

    const personCollectionRef = collection(userRef, 'person');
    await addDoc(personCollectionRef, {
        name: formData
      });
      console.log("Documento Agregado: ");
    } catch (e) {
      console.error("Error añadiendo a: ", e);
    }
  };

// Leer 
export const getDataPerson = async (fn: Dispatch<SetStateAction<Person[]>>) => {
  
  try {
    const user = auth.currentUser;
    validateUser(user);

    const userUid = user!.uid;
    const userRef = doc(db, "users", userUid);
    const personCollectionRef = collection(userRef, "person");

    const querySnapshot = await getDocs(personCollectionRef);
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
  export const deletePerson = async (personId: string, fnBlock: FnState, fnRefresh: FnState) => {
    try {
      const user = auth.currentUser;
      validateUser(user);
      fnBlock();
  
      const userUid = user!.uid;
      const docRef = doc(db, "users", userUid, "person", personId);
  
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
  