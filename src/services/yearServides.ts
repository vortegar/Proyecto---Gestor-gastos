
import { auth, db } from './firebase';
import { addDoc, getDocs, doc, getDoc, deleteDoc } from "firebase/firestore";

import { Action } from '../reducers/AnioActualReducer';
import { validateUser } from '../helpers/validarUser';

import { getYearCollection } from '../helpers/collection';
import { FnState } from '../components/intercafeComponents';

import { MESSAGE_DELETE_ITEM, MESSAGE_ERROR, MESSAGE_FIND_YEAR } from '../constants/constantesServices';

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
  export const getDataYear = async (fn: React.Dispatch<Action>) => {
    try {
      const yearCollectionRef = getYearCollection();
  
      const querySnapshot = await getDocs(yearCollectionRef);
      const yearArrays = querySnapshot.docs.map(doc => ({
        id: doc.id,
        year: doc.data().year,
        month: doc.data().month,
      }));
      const orderYearArrays = yearArrays.sort((a, b) => a.year - b.year);
      fn({ type: "SET_YEARS", payload: orderYearArrays });
    } catch (e) {
      console.error(MESSAGE_ERROR, e);
    }
  };

export const getYearById = async(
  year   : string, 
  fnYear : React.Dispatch<Action>, 
  fnBlock: FnState
) => {
  const user = auth.currentUser!;
  validateUser(user);
  const userRef = doc(db, "users", user.uid);
  const yearDocRef = doc(userRef, "year", year);
  const yearDoc = await getDoc(yearDocRef);
  
  if (yearDoc.exists()) {
    fnYear({ type: "SEARCH_YEAR", payload: yearDocRef.id });
    message.success(MESSAGE_FIND_YEAR);

    console.log("Mes encontrado:", yearDoc.data());
    fnBlock()
  } else {
    console.log("No se encontró un mes con el ID proporcionado");
  }  
  return { yearDoc, yearDocRef }
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