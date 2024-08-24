import { auth, db } from "./firebase";
import { doc, updateDoc, getDoc } from "firebase/firestore";

import { validateUser } from "../helpers/validarUser";

import { FixedExpense } from "../interface/ComponentsInterface";
import { Expenses, InputsExpenses } from "../interface/ExpensesInterface";
import { FixedExpenseInputs, FnState } from "../components/intercafeComponents";

import { v4 as uuidv4 } from 'uuid';

// Actualizar
export const updateFixedExpenses = async (data: FixedExpenseInputs, year: string, monthId: string) => {
  try {
    const user = auth.currentUser!;
    validateUser(user);

    const userUid = user.uid;
    const userRef = doc(db, "users", userUid);
    const yearDocRef = doc(userRef, "year", year);

    const yearDoc = await getDoc(yearDocRef);
    const months = yearDoc.data()!.month;

    const monthIndex = months.findIndex((month: { id: string }) => month.id === monthId);
    if (monthIndex === -1) {
      console.error('No se encontró el mes con el ID proporcionado');
      return;
    }

    const updatedMonth = {
      ...months[monthIndex],
      fixed_expenses: Object.entries(data).map(([key, value]) => ({
        spent_type: key,
        total: value
      }))
    };
    console.log(updatedMonth)
    const updatedMonths = [
      ...months.slice(0, monthIndex),
      updatedMonth,
      ...months.slice(monthIndex + 1)
    ];

    await updateDoc(yearDocRef, {
      month: updatedMonths
    });

    console.log("Documento actualizado con éxito");
  } catch (e) {
    console.error("Error actualizando documento: ", e);
  }
};

export const updateExpenses = async (data: InputsExpenses,year: string, monthId: string) => {
  try {
    const user = auth.currentUser!;
    validateUser(user);

    const userUid = user.uid;
    const userRef = doc(db, "users", userUid);
    const yearDocRef = doc(userRef, "year", year);

    const yearDoc = await getDoc(yearDocRef);
    const months = yearDoc.data()!.month;

    const monthIndex = months.findIndex((month: { id: string }) => month.id === monthId);
    if (monthIndex === -1) {
      console.error('No se encontró el mes con el ID proporcionado');
      return;
    }

    console.log(typeof(data.monto))
    const updatedExpenses = {
      ...months[monthIndex],
      expenses: [
        ...months[monthIndex].expenses,
          {
            id:  uuidv4(),
            descripcion: data.descripcion,
            monto: data.monto,
            user: data.user,
            fecha: data.fecha,
            spent_type: data.spent_type,
          }    

      ]
    
    }
    const updatedMonths = [
      ...months.slice(0, monthIndex),
      updatedExpenses,
      ...months.slice(monthIndex + 1)
    ];

    await updateDoc(yearDocRef, {
      month: updatedMonths
    });
    

    console.log("Gastos actualizados con éxito");
  } catch (e) {
    console.error("Error añadiendo a: ", e);
  }
};

  export const deleteExpense = async (
    dataToDelete: Expenses,
    fnBlock: FnState,
    fnRefresh: FnState,
    year: string,
    monthId: string
  ) => {
    try {
      const user = auth.currentUser!;
      validateUser(user);
  
      const userRef = doc(db, "users", user.uid);
      const yearDocRef = doc(userRef, "year", year);
  
      const yearDoc = await getDoc(yearDocRef);

      const months = yearDoc.data()!.month;
  
      const monthIndex = months.findIndex((month: { id: string }) => month.id === monthId);
      if (monthIndex === -1) {
        console.error('No se encontró el mes con el ID proporcionado');
        return;
      }
  
      fnBlock();
    
      const updatedFixedExpenses = months[monthIndex].expenses.filter(
        (expense: Expenses) => expense.id !== dataToDelete.id
      );

  
      const updatedMonth = {
        ...months[monthIndex],
        expenses: updatedFixedExpenses,
      };
  
      const updatedMonths = [
        ...months.slice(0, monthIndex),
        updatedMonth,
        ...months.slice(monthIndex + 1)
      ];
  
      await updateDoc(yearDocRef, {
        month: updatedMonths
      });
  
      fnRefresh();
  
      setTimeout(() => {
        fnBlock();
      }, 300);
  
      console.log("Documento actualizado con éxito");
    } catch (error) {
      console.error("Error eliminando documento: ", error);
    }
  };
  export const deleteFixedExpense = async (
    dataToDelete: FixedExpense,
    fnBlock: FnState,
    fnRefresh: FnState,
    year: string,
    monthId: string
  ) => {
    try {
      const user = auth.currentUser!;
      validateUser(user);
  
      const userRef = doc(db, "users", user.uid);
      const yearDocRef = doc(userRef, "year", year);
  
      const yearDoc = await getDoc(yearDocRef);

      const months = yearDoc.data()!.month;
  
      const monthIndex = months.findIndex((month: { id: string }) => month.id === monthId);
      if (monthIndex === -1) {
        console.error('No se encontró el mes con el ID proporcionado');
        return;
      }
  
      fnBlock();
    
      const updatedFixedExpenses = months[monthIndex].fixed_expenses.filter(
        (expense: FixedExpense) => expense.spent_type !== dataToDelete.spent_type
      );

  
      const updatedMonth = {
        ...months[monthIndex],
        fixed_expenses: updatedFixedExpenses,
      };
  
      const updatedMonths = [
        ...months.slice(0, monthIndex),
        updatedMonth,
        ...months.slice(monthIndex + 1)
      ];
  
      await updateDoc(yearDocRef, {
        month: updatedMonths
      });
  
      fnRefresh();
  
      setTimeout(() => {
        fnBlock();
      }, 300);
  
      console.log("Documento actualizado con éxito");
    } catch (error) {
      console.error("Error eliminando documento: ", error);
    }
  };