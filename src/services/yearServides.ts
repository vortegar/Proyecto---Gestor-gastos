import { Dispatch, SetStateAction } from 'react';

import { auth, db } from './firebase';
import { collection, addDoc, getDocs, doc, getDoc, deleteDoc } from "firebase/firestore";

import { validateUser } from '../helpers/validarUser';

import { Year } from '../interface/YearInterface';
import { FnState } from '../components/intercafeComponents';

// Crear
export const addYear = async (data: string) => {
  const user = auth.currentUser;
    try {
      validateUser(user);

      const userRef = doc(db, "users", user!.uid); 
  
      const yearCollectionRef = collection(userRef, 'year');
      await addDoc(yearCollectionRef, {
        year: data,
        month: [],
      });
      // console.log(docRef)
    } catch (e) {
      console.error("Error añadiendo a: ", e);
    }
  };

  // Obtener data de meses
  export const getDataYear = async (fn: Dispatch<SetStateAction<Year[]>>) => {
    try {
      const user = auth.currentUser;
      validateUser(user);
      
      const userUid = user!.uid;
      const userRef = doc(db, "users", userUid);
      const yearCollectionRef = collection(userRef, "year");
  
      const querySnapshot = await getDocs(yearCollectionRef);
      const yearArrays = querySnapshot.docs.map(doc => ({
        id: doc.id,
        year: doc.data().year,
        month: doc.data().month,
      }));
      const orderYearArrays = yearArrays.sort((a, b) => a.year - b.year);

      fn(orderYearArrays);
    } catch (e) {
      console.error("Error: ", e);
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
    console.error("Error al obtener el mes: ", e);
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
    console.log("Mes eliminado correctamente:", id);
  } catch (e) {
    console.error("Error al eliminar el mes: ", e);
  }
};