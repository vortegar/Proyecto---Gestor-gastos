import { ReactNode } from 'react';

export interface Month {
    id        ?: number;
    name       : string,
  }

  export interface MyContextProviderProps {
    children: ReactNode;
  }
  
  export interface MyContextProps {
    monthContext: Month[];
    setMontContext: React.Dispatch<React.SetStateAction<Month[]>>;
  }
  
  export const defaultContext: MyContextProps = {
    monthContext: [],
    setMontContext: () => [],
  }

export interface ExpensesResumenItem {
    id        : number;
    spent_type: string;
    total     : number;
  }
  
  export type ExpensesResumen = ExpensesResumenItem[];
  
  export interface GraficoProps {
    resumen: ExpensesResumen;
  }
  
// Interfaces de componentes

export type InputsExpenses = {
    descripcion: string;
    monto      : number;
    user       : string,
    fecha      : string,
    spent_type : string,
  };