import { ReactNode } from 'react';
import { HistoryResumen } from '../pages/home/interfaceHome';
import { FixedExpenseInputs } from '../components/intercafeComponents';

export interface Expenses {
    id        ?: string,
    descripcion: string;
    fecha     ?: string,
    monto      : number,
    spent_type : string,
    user_1     : string,
    user_2     : string,
    total     ?: number
  }
  
  export interface MyContextProviderProps {
    children: ReactNode;
  }
  
  export interface MyContextProps {
    expensesContext: Expenses[];
    setExpensesContext: React.Dispatch<React.SetStateAction<Expenses[]>>;
  }
  
  export const defaultContext: MyContextProps = {
    expensesContext: [],
    setExpensesContext: () => [],
  }

export interface ExpensesResumenItem {
    id        : number;
    spent_type: string;
    total     : number;
    user     ?: string;
    monto    ?: number;
  }
  
  
  export type ExpensesResumen = ExpensesResumenItem[];
  
  export interface GraficoProps {
    resumen: ExpensesResumen | HistoryResumen[] | (Expenses | FixedExpenseInputs)[] ;
    title: string;
  }
  
// Interfaces de componentes

export type InputsExpenses = {
    descripcion: string;
    monto      : number;
    user       : string;
    fecha      : string;
    spent_type : string;
    user_1     : string;
    user_2     : string;
  };

export type Investments = {
      inversion:string,
      monto:number,
      n_cuotas:number,
      cuota:number,
      pagado:boolean
}