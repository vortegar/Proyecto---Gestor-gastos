import { Dispatch, SetStateAction } from 'react';

import { v4 as uuidv4 } from 'uuid';

import { getYear } from '../helpers/collection';
import { formatArrayMonth } from '../helpers/formatData';

import { updateDoc, arrayUnion } from "firebase/firestore";

import { Month } from '../interface/MonthInterface';
import { FnState } from '../components/intercafeComponents';

import {MESSAGE_ADD_MONTH, MESSAGE_DELETE_ITEM, MESSAGE_ERROR, MESSAGE_FIND_MONTH } from '../constants/constantesServices';

import { message } from 'antd';

// Crear
export const addMonth = async (year: string, monthData: string) => {
  try {
    const {yearDoc, yearDocRef} = await getYear(year)
    if (!yearDoc.exists()) {
      message.error(MESSAGE_ERROR);
     console.log('No se encontro el año')
    }

    const newMonthId = uuidv4();
    const newMonth = {
      id              : newMonthId,
      month           : monthData,
      expenses        : [],
      fixed_expenses  : [],
      monetary_savings: []
    };

    await updateDoc(yearDocRef, {
      month: arrayUnion(newMonth)
    });
    message.success(MESSAGE_ADD_MONTH);

  } catch (e) {
    message.error(MESSAGE_ERROR);
    console.error(MESSAGE_ERROR, e);
  }
};

// Obtener data de meses
export const getDataMonth = async (fn: Dispatch<SetStateAction<Month[]>>, year: string) => {
  try {
    const {yearDoc} = await getYear(year)

    if ( year === undefined || !yearDoc.exists()) {
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
    const {yearDoc} = await getYear(yearId)
    
    if (yearDoc.exists()) {
      const yearData = yearDoc.data();
      const months: Month[] = yearData?.month;
      console.log(yearData)
      const monthData = months.find((month) => month.id === monthId); 
      console.log(monthData, 'aca')
      if (monthData) {
        fn(monthData);
        fnBlock();
        message.success(MESSAGE_FIND_MONTH);
      } 
    } else {
      console.log("No se encontró el documento del año");
    }
  } catch (e) {
    message.error(MESSAGE_ERROR);
    console.error(MESSAGE_ERROR, e);
  }
};

// Eliminar Mes
export const deleteMonthById = async (year: string, monthId: string, fnBlock: FnState, fnRefresh: FnState) => {
  
  try {
    const {yearDoc, yearDocRef} = await getYear(year)
    
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

    message.success(MESSAGE_DELETE_ITEM);
  } catch (e) {
    message.error(MESSAGE_ERROR);
    console.error(MESSAGE_ERROR, e);
  }
};
