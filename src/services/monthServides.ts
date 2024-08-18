import { Dispatch, SetStateAction } from 'react';

import { auth, db } from './firebase';
import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";

import { validateUser } from '../helpers/validarUser';
import { formatArrayMonth } from '../helpers/formatData';

import { Month } from '../interface/MonthInterface';
import { FnState } from '../components/intercafeComponents';

import { v4 as uuidv4 } from 'uuid';
// Crear
export const addMonth = async (year: string, monthData: string) => {
  try {
    const user = auth.currentUser!;
    validateUser(user);

    const userRef = doc(db, "users", user.uid);
    const yearDocRef = doc(userRef, "year", year);
    const yearDoc = await getDoc(yearDocRef);

    if (!yearDoc.exists()) {
     console.log('No se encontro el año')
    }

    const newMonthId = uuidv4();
    const newMonth = {
      id: newMonthId,
      month: monthData,
      expenses: [],
      fixed_expenses: []
    };

    await updateDoc(yearDocRef, {
      month: arrayUnion(newMonth)
    });

    // console.log("Mes agregado con éxito al año:", year);
  } catch (e) {
    console.error("Error actualizando documento: ", e);
  }
};

// Obtener data de meses
export const getDataMonth = async (fn: Dispatch<SetStateAction<Month[]>>, year: string) => {
  try {
    const user = auth.currentUser!;
    validateUser(user);

    const userUid = user.uid;
    const userRef = doc(db, "users", userUid);
    const yearDocRef = doc(userRef, "year", year);

    const yearDoc = await getDoc(yearDocRef);

    if (!yearDoc.exists()) {
      console.error("No se encontró el documento del año");
      return;
    }

    const monthArray = yearDoc.data().month as Month[];
    const formatData = formatArrayMonth(monthArray, 'month');
    
    fn(formatData);
  } catch (e) {
    console.error("Error obteniendo los datos del mes: ", e);
  }
};

// Buscar un Mes
export const getMonthById = async (yearId: string, monthId: string, fn: Dispatch<SetStateAction<Month>>, fnBlock: FnState) => {
  
  try {
    const user = auth.currentUser!;
    validateUser(user);
    const userRef = doc(db, "users", user.uid); 
    const yearDocRef = doc(userRef, "year", yearId);
    
    const yearDoc = await getDoc(yearDocRef);
    
    if (yearDoc.exists()) {
      const yearData = yearDoc.data();
      const months: Month[] = yearData?.month;

      console.log(months)
      const monthData = months.find((month) => month.id === monthId); 

      if (monthData) {
        fn(monthData);
        console.log("Mes encontrado:", monthData);
        fnBlock();
      } else {
        console.log("No se encontró un mes con el ID proporcionado");
      }
    } else {
      console.log("No se encontró el documento del año");
    }
  } catch (e) {
    console.error("Error al obtener el mes: ", e);
  }
};

// Eliminar Mes
export const deleteMonthById = async (year: string, monthId: string, fnBlock: FnState, fnRefresh: FnState) => {
  
  try {
    const user = auth.currentUser!;
    fnBlock();

    validateUser(user);

    const userRef = doc(db, "users", user.uid);
    const yearDocRef = doc(userRef, "year", year);

    const yearDoc = await getDoc(yearDocRef);
    
    if (!yearDoc.exists()) {
      console.error('No se encontró el documento del año');
      return;
    }

    const yearData = yearDoc.data();
    const updatedMonths = yearData?.month.filter((month: Month) => month.id !== monthId);

    await updateDoc(yearDocRef, {
      month: updatedMonths
    });

    fnRefresh(); 
    setTimeout(() => {
      fnBlock(); 
    }, 300);

    console.log("Mes eliminado correctamente:", monthId);
  } catch (e) {
    console.error("Error al eliminar el mes: ", e);
  }
};
