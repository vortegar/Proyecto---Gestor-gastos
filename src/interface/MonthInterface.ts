import { ReactNode } from 'react';
import { Expenses } from './ExpensesInterface';

export interface Month {
    id        ?: number;
    name       : string,
    expenses   : Expenses[],
  }

  export interface MyContextProviderProps {
    children: ReactNode;
  }
  
  export interface MyContextProps {
    monthContext: Month[];
    setMonthContext: React.Dispatch<React.SetStateAction<Month[]>>;
  }
  
  export const defaultContext: MyContextProps = {
    monthContext: [],
    setMonthContext: () => [],
  }
