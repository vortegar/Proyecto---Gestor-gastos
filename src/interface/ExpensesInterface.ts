import { ReactNode } from 'react';
import { HistoryResumen } from '../pages/home/interfaceHome';

export interface Expenses {
    descripcion: string;
    fecha     ?: string,
    id        ?: number;
    monto      : string,
    spent_type : string,
    user       : string,
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
  }
  
  
  export type ExpensesResumen = ExpensesResumenItem[];
  
  export interface GraficoProps {
    resumen: ExpensesResumen | HistoryResumen[] ;
    title: string;
  }
  
// Interfaces de componentes

export type InputsExpenses = {
    descripcion: string;
    monto      : number;
    user       : string;
    fecha      : string;
    spent_type : string;
  };
