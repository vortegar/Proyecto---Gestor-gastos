import { Dispatch, SetStateAction } from 'react';

import { auth, db } from './firebase';
import { addDoc, getDocs, doc, getDoc, deleteDoc } from "firebase/firestore";

import { validateUser } from '../helpers/validarUser';

import { Year } from '../interface/YearInterface';
import { FnState } from '../components/intercafeComponents';
import { getYearCollection } from '../helpers/collection';

import { MESSAGE_DELETE_ITEM, MESSAGE_ERROR } from '../constants/constantesServices';

import { message } from 'antd';

// Crear
export const addYear = async (data: string) => {
  try {
      const yearCollectionRef = getYearCollection()

      await addDoc(yearCollectionRef, {
        year: data,
        month: [],
      });
    } catch (e) {
      console.error(MESSAGE_ERROR, e);
    }
  };

  // Obtener data de meses
  export const getDataYear = async (fn: Dispatch<SetStateAction<Year[]>>) => {
    try {
      const yearCollectionRef = getYearCollection();
  
      const querySnapshot = await getDocs(yearCollectionRef);
      const yearArrays = querySnapshot.docs.map(doc => ({
        id: doc.id,
        year: doc.data().year,
        month: doc.data().month,
      }));
      const orderYearArrays = yearArrays.sort((a, b) => a.year - b.year);

      fn(orderYearArrays);
    } catch (e) {
      console.error(MESSAGE_ERROR, e);
    }
  };

  // Buscar un Mes
export const getYearById = async (id: string, fn: Dispatch<SetStateAction<Year>>, fnBlock: FnState) => {
  const user = auth.currentUser;
  
  try {
    validateUser(user);
    const userRef = doc(db, "users", user!.uid); 
    const monthDocRef = doc(userRef, "year", id);
    
    const yearDoc = await getDoc(monthDocRef);
    
    if (yearDoc.exists()) {
      const yearData = yearDoc.data() as Year;
      fn(yearData)
      console.log("Mes encontrado:", yearDoc.data());
      fnBlock()
    } else {
      console.log("No se encontró un mes con el ID proporcionado");
    }
  } catch (e) {
    console.error(MESSAGE_ERROR, e);
  }
};

// Eliminar Mes
export const deleteYearById = async (id: string, fnBlock: FnState, fnRefresh: FnState) => {
  const user = auth.currentUser;
  try {
    fnBlock();
    validateUser(user);
    const userRef = doc(db, "users", user!.uid); 
    const yearDocRef = doc(userRef, "year", id);

    await deleteDoc(yearDocRef);
    fnRefresh();
    setTimeout(() => {
      fnBlock()
    }, 300);
    message.success(MESSAGE_DELETE_ITEM);
  } catch (e) {
    message.error(MESSAGE_ERROR);
    console.error(MESSAGE_ERROR, e);
  }
};