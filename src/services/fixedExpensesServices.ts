import { Dispatch, SetStateAction } from 'react';

import { auth, db } from './firebase';
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";

import { validateUser } from '../helpers/validarUser';
import { formatToUpperCase } from '../helpers/formatData';

import { FixedSpentInputs, FnState } from '../components/intercafeComponents';

import { FixedSpent } from '../interface/ComponentsInterface';
import { message } from 'antd';

// Crear
  export const addFixedSpent = async (data: FixedSpentInputs) => {
    const user = auth.currentUser;
    const formData = formatToUpperCase(data.fixed_spent_name)
    try {
      validateUser(user);
      const userRef = doc(db, 'users', user!.uid);
  
      const personCollectionRef = collection(userRef, 'fixedspent');
      await addDoc(personCollectionRef, {
        fixed_spent_name: formData,
        });
        message.success('Gasto Agregado!!!');
      } catch (e) {
        console.error("Error añadiendo a: ", e);
      }
    };

// Leer 
export const getDataFixedSpent = async (fn: Dispatch<SetStateAction<FixedSpent[]>>) => {
  try {
    const user = auth.currentUser;
    validateUser(user);

    const userUid = user!.uid;
    const userRef = doc(db, "users", userUid);
    const personCollectionRef = collection(userRef, "fixedspent");

    const querySnapshot = await getDocs(personCollectionRef);
      const fixedSpentArray = querySnapshot.docs.map(doc => {
        return{
          id: doc.id,
          fixed_spent_name: doc.data().fixed_spent_name
          }
        }
      );
      fixedSpentArray.sort((a, b) => a.fixed_spent_name.localeCompare(b.fixed_spent_name));
      fn(fixedSpentArray)
    } catch (e) {
      console.error("Error fetching documents: ", e);
    }
  };

//   Eliminar
  export const deleteFixedSpent = async (personId: string, fnBlock: FnState, fnRefresh: FnState) => {
    try {
      const user = auth.currentUser;
      validateUser(user);
      fnBlock();
  
      const userUid = user!.uid;
      const docRef = doc(db, "users", userUid, "fixedspent", personId);
  
      await deleteDoc(docRef);
  
      fnRefresh();
      setTimeout(() => {
        fnBlock();
      }, 300);
      message.success('Gasto Eliminado!!!');
    } catch (error) {
      console.error("Error al eliminar: ", error);
    }
  };
  