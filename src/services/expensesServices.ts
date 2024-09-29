import { updateDoc } from "firebase/firestore";

import { FixedExpense } from "../interface/ComponentsInterface";
import { Expenses, InputsExpenses } from "../interface/ExpensesInterface";
import { ExtraItemsColumns, FixedExpenseInputs, FnState, FormExtraExpenesesInputs } from "../components/intercafeComponents";

import { message } from "antd";
import { v4 as uuidv4 } from 'uuid';

import { MESSAGE_ERROR, MESSAGE_SUCCES } from "./constantesServices";
import { checkMonthExistence, findMonthById } from "../helpers/validateMonths";

// Actualizar
export const updateExtraExpenses = async (data: FormExtraExpenesesInputs, year: string, monthId: string) => {
  try {
    
    const {months, yearDocRef} = await findMonthById(year);
    const monthIndex = months.findIndex((month: { id: string }) => month.id === monthId);
    checkMonthExistence(monthIndex)

    const updatedMonth = {
      ...months[monthIndex],
      extra_items:  [
        ...months[monthIndex].extra_items,
        {
          id:  uuidv4(),
          person_name:data.user,
          total: data.monto,
        }
      ]}

    const updatedMonths = [
      ...months.slice(0, monthIndex),
      updatedMonth,
      ...months.slice(monthIndex + 1)
    ];

    await updateDoc(yearDocRef, {
      month: updatedMonths
    });
  
    message.success(MESSAGE_SUCCES);
  } catch (e) {
    console.error(MESSAGE_ERROR, e);
  }
};

export const updateFixedExpenses = async (data: FixedExpenseInputs, year: string, monthId: string) => {
  try {

    const {months, yearDocRef} = await findMonthById(year);
    const monthIndex = months.findIndex((month: { id: string }) => month.id === monthId);
    checkMonthExistence(monthIndex)

    const updatedMonth = {
      ...months[monthIndex],
      fixed_expenses: Object.entries(data).map(([key, value]) => ({
        id:  uuidv4(),
        spent_type: key,
        total: value
      }))
    };

    const updatedMonths = [
      ...months.slice(0, monthIndex),
      updatedMonth,
      ...months.slice(monthIndex + 1)
    ];

    await updateDoc(yearDocRef, {
      month: updatedMonths
    });
    message.success(MESSAGE_SUCCES);
  } catch (e) {
    console.error(MESSAGE_ERROR, e);
  }
};

export const updateExpenses = async (data: InputsExpenses,year: string, monthId: string) => {
  try {

    const {months, yearDocRef} = await findMonthById(year);
    const monthIndex = months.findIndex((month: { id: string }) => month.id === monthId);
    checkMonthExistence(monthIndex);

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
    };

    const updatedMonths = [
      ...months.slice(0, monthIndex),
      updatedExpenses,
      ...months.slice(monthIndex + 1)
    ];

    await updateDoc(yearDocRef, {
      month: updatedMonths
    });
    
    message.success(MESSAGE_SUCCES);
  } catch (e) {
    console.error(MESSAGE_ERROR, e);
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
  
      await updateDoc(yearDocRef, {
        month: updatedMonths
      });
  
      fnRefresh();
  
      setTimeout(() => {
        fnBlock();
      }, 300);
  
      console.log(MESSAGE_SUCCES);
    } catch (error) {
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
  
      await updateDoc(yearDocRef, {
        month: updatedMonths
      });
  
      fnRefresh();
  
      setTimeout(() => {
        fnBlock();
      }, 300);
  
      console.log(MESSAGE_SUCCES);
    } catch (error) {
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
  
      await updateDoc(yearDocRef, {
        month: updatedMonths
      });
  
      fnRefresh();
  
      setTimeout(() => {
        fnBlock();
      }, 300);
  
      console.log(MESSAGE_SUCCES);
    } catch (error) {
      console.error(MESSAGE_ERROR, error);
    }
  };