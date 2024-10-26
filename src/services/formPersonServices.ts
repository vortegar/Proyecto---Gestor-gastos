import { Dispatch, SetStateAction } from 'react';

import { auth, db } from './firebase';
import { addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";

import { validateUser } from "../helpers/validarUser";
import { formatToUpperCase } from "../helpers/formatData";
import { getPersonCollection } from '../helpers/collection';

import { FnState, PersonInputs } from '../components/intercafeComponents';

import { Person } from '../interface/ComponentsInterface';

import { message } from 'antd';

import { MESSAGE_ADD_ITEM, MESSAGE_DELETE_ITEM, MESSAGE_ERROR } from '../constants/constantesServices';

// Crear
export const addPerson = async (data: PersonInputs) => {
  try {
    const formData = formatToUpperCase(data!.name)
    const personCollectionRef = getPersonCollection();

    await addDoc(personCollectionRef, {
        name: formData
      });
      message.success(MESSAGE_ADD_ITEM);

    } catch (e) {
      message.error(MESSAGE_ERROR);
      console.error(MESSAGE_ERROR, e);
    }
  };

// Leer 
export const getDataPerson = async (fn: Dispatch<SetStateAction<Person[]>>) => {
  
  try {
    const personCollectionRef = getPersonCollection();

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
      message.error(MESSAGE_ERROR);
      console.error("Error en la peticion: ", e);
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
  
      message.success(MESSAGE_DELETE_ITEM);
    } catch (error) {
      message.error(MESSAGE_ERROR);
      console.error(MESSAGE_ERROR, error);
    }
  };
  