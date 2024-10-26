import { Dispatch, SetStateAction } from 'react';

import { auth, db } from './firebase';
import { addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";

import { validateUser } from '../helpers/validarUser';
import { formatToUpperCase } from '../helpers/formatData';

import { FixedSpentInputs, FnState } from '../components/intercafeComponents';

import { FixedSpent } from '../interface/ComponentsInterface';

import { message } from 'antd';

import { MESSAGE_ADD_ITEM, MESSAGE_DELETE_ITEM, MESSAGE_ERROR } from '../constants/constantesServices';

import { getFixedSpentsCollection } from '../helpers/collection';

// Crear
  export const addFixedSpent = async (data: FixedSpentInputs) => {
    try {
      const formData = formatToUpperCase(data.fixed_spent_name);
      const personCollectionRef = getFixedSpentsCollection();
      
      await addDoc(personCollectionRef, {
        fixed_spent_name: formData,
        });
        message.success(MESSAGE_ADD_ITEM);
      } catch (e) {
        message.error(MESSAGE_ERROR);
        console.error(MESSAGE_ERROR, e);
      }
    };

// Leer 
export const getDataFixedSpent = async (fn: Dispatch<SetStateAction<FixedSpent[]>>) => {
  try {
    const personCollectionRef = getFixedSpentsCollection();

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
      message.error(MESSAGE_ERROR);
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
      message.success(MESSAGE_DELETE_ITEM);
    } catch (error) {
      message.error(MESSAGE_ERROR);
      console.error(MESSAGE_ERROR, error);
    }
  };
  