import { updateDoc } from "firebase/firestore";

import { FixedExpense } from "../interface/ComponentsInterface";
import { Expenses, InputsExpenses } from "../interface/ExpensesInterface";

import { ExtraItemsColumns, FixedExpenseInputs, FnState, FormExtraExpenesesInputs, FormMonetarySavings } from "../components/intercafeComponents";

import { message } from "antd";
import { v4 as uuidv4 } from 'uuid';

import { MESSAGE_ERROR, MESSAGE_SUCCES } from "../constants/constantesServices";

import { checkMonthExistence, findMonthById } from "../helpers/validateMonths";

// Metodos para  Actualizar Gastos
export const updateExtraExpenses = async (
  data: FormExtraExpenesesInputs[], 
  year: string, 
  monthId: string,
  setData: React.Dispatch<React.SetStateAction<FormExtraExpenesesInputs[]>>

) => {
  try {
    const {months, yearDocRef} = await findMonthById(year);
    const monthIndex = months.findIndex((month: { id: string }) => month.id === monthId);
    checkMonthExistence(monthIndex);

    const updatedMonth = {
      ...months[monthIndex],
      extra_items:  
        data.map((d) => {
          return{
          id          :  uuidv4(),
          user        :d.user,
          total       : d.total,
          descripcion : d.descripcion,
          }
        })
      };

    const updatedMonths = [
      ...months.slice(0, monthIndex),
      updatedMonth,
      ...months.slice(monthIndex + 1)
    ];

    await updateDoc(yearDocRef, {month: updatedMonths});
    message.success(MESSAGE_SUCCES);
    setData(data)
  } catch (e) {
    message.error(MESSAGE_ERROR);
    console.error(MESSAGE_ERROR, e);
  }
};

export const updateFixedExpenses = async (
  data: [], 
  year: string, 
  monthId: string, 
  setData: React.Dispatch<React.SetStateAction<FixedExpenseInputs[]>>
) => {
  try {

    const {months, yearDocRef} = await findMonthById(year);
    const monthIndex = months.findIndex((month: { id: string }) => month.id === monthId);
    checkMonthExistence(monthIndex);
    
    const updatedMonth = {
      ...months[monthIndex],
      fixed_expenses: data.map((d: FixedExpenseInputs) => ({
        id        :  uuidv4(),
        spent_type: d.spent_type,
        total     : d.total
      }))
    };

    console.log(updatedMonth)
    const updatedMonths = [
      ...months.slice(0, monthIndex),
      updatedMonth,
      ...months.slice(monthIndex + 1)
    ];

    await updateDoc(yearDocRef, {month: updatedMonths});
    message.success(MESSAGE_SUCCES);
    setData(data)
  } catch (e) {
    message.error(MESSAGE_ERROR);
    console.error(MESSAGE_ERROR, e);
  }
};

export const updateExpenses = async (
  data: InputsExpenses[],
  year: string, 
  monthId: 
  string,
  setData: React.Dispatch<React.SetStateAction<InputsExpenses[]>>
) => {
  try {
    const {months, yearDocRef} = await findMonthById(year);
    const monthIndex = months.findIndex((month: { id: string }) => month.id === monthId);
    checkMonthExistence(monthIndex);

    const updatedExpenses = {
      ...months[monthIndex],
      expenses: 
        data.map((d) => {
          return{
            id:  uuidv4(),
            spent_type  : d.spent_type,
            monto       : d.monto,
            user_1      : d.user_1,
            user_2      : d.user_2,
            fecha       : d.fecha,
            descripcion : d.descripcion,
          }
        })
    };

    const updatedMonths = [
      ...months.slice(0, monthIndex),
      updatedExpenses,
      ...months.slice(monthIndex + 1)
    ];

    await updateDoc(yearDocRef, {month: updatedMonths});
    message.success(MESSAGE_SUCCES);
    setData(data)
  } catch (e) {
    message.error(MESSAGE_ERROR);
    console.error(MESSAGE_ERROR, e);
  }
};

// Metodos para eliminar
  export const deleteExpense = async (
    dataToDelete: Expenses,
    fnBlock: FnState,
    fnRefresh: FnState,
    year: string,
    monthId: string
  ) => {
    try {
  
      const {months, yearDocRef} = await findMonthById(year);
      const monthIndex = months.findIndex((month: { id: string }) => month.id === monthId);
      checkMonthExistence(monthIndex);
  
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
  
      await updateDoc(yearDocRef, {month: updatedMonths});
  
      fnRefresh();
  
      setTimeout(() => {
        fnBlock();
      }, 300);
  
      message.success(MESSAGE_SUCCES);
    } catch (error) {
      message.error(MESSAGE_ERROR);
      console.error(MESSAGE_ERROR, error);
    }
  };
  
  export const deleteFixedExpense = async (
    dataToDelete: FixedExpenseInputs,
    fnBlock: FnState,
    fnRefresh: FnState,
    year: string,
    monthId: string
  ) => {
    try {

      const {months, yearDocRef} = await findMonthById(year);
      const monthIndex = months.findIndex((month: { id: string }) => month.id === monthId);
      checkMonthExistence(monthIndex);
  
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
  
      await updateDoc(yearDocRef, {month: updatedMonths});
  
      fnRefresh();
  
      setTimeout(() => {
        fnBlock();
      }, 300);
  
      message.success(MESSAGE_SUCCES);
    } catch (error) {
      message.error(MESSAGE_ERROR);
      console.error(MESSAGE_ERROR, error);
    }
  };
  
  export const deleteExtraItems = async (
    dataToDelete: ExtraItemsColumns,
    fnBlock: FnState,
    fnRefresh: FnState,
    year: string,
    monthId: string
  ) => {
    try {

      const {months, yearDocRef} = await findMonthById(year);
      const monthIndex = months.findIndex((month: { id: string }) => month.id === monthId);
      checkMonthExistence(monthIndex);
  
      fnBlock();
    
      const updatedExtraItems = months[monthIndex].extra_items.filter(
        (expense: FixedExpense) => expense.id !== dataToDelete.id
      );

      const updatedMonth = {
        ...months[monthIndex],
        extra_items: updatedExtraItems,
      };
  
      const updatedMonths = [
        ...months.slice(0, monthIndex),
        updatedMonth,
        ...months.slice(monthIndex + 1)
      ];
  
      await updateDoc(yearDocRef, {month: updatedMonths});
  
      fnRefresh();
  
      setTimeout(() => {
        fnBlock();
      }, 300);
  
      message.success(MESSAGE_SUCCES);
    } catch (error) {
      message.error(MESSAGE_ERROR);
      console.error(MESSAGE_ERROR, error);
    }
  };


  // Metodos para  Actualizar Gastos
export const updateMonetarySaving = async (
  data: FormMonetarySavings[], 
  year: string, 
  monthId: string,
  setData: React.Dispatch<React.SetStateAction<FormMonetarySavings[]>>

) => {
  try {
    const {months, yearDocRef} = await findMonthById(year);
    const monthIndex = months.findIndex((month: { id: string }) => month.id === monthId);
    checkMonthExistence(monthIndex);
    const updatedMonth = {
      ...months[monthIndex],
      monetary_savings:  
        data.map((d) => {
          return{
          id         :  uuidv4(),
          meta       : d.meta,
          concepto   : d.concepto,
          porcentaje : d.porcentaje,
          ahorroMes  : d.ahorroMes,
          ahorroTotal: d.ahorroTotal,
          }
        })
      };

    const updatedMonths = [
      ...months.slice(0, monthIndex),
      updatedMonth,
      ...months.slice(monthIndex + 1)
    ];
    console.log(data)
    await updateDoc(yearDocRef, {month: updatedMonths});
    message.success(MESSAGE_SUCCES);
    setData(data)
  } catch (e) {
    message.error(MESSAGE_ERROR);
    console.error(MESSAGE_ERROR, e);
  }
};
