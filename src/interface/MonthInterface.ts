import { ReactNode } from 'react';
import { Expenses } from './ExpensesInterface';
import { ExtraItemsInputs, FixedExpenseInputs, FormMonetarySavings } from '../components/intercafeComponents';

export interface Month {
    id              ?: string;
    month            : string;
    expenses         : Expenses[];
    fixed_expenses   : FixedExpenseInputs[];
    extra_items      : ExtraItemsInputs[];
    monetary_savings : FormMonetarySavings[]
  }

  export interface MyContextProviderProps {
    children: ReactNode;
  }
  
  export interface MyContextProps {
    monthContext: Month[];
    monthActual : Month;
    setMonthActual: React.Dispatch<React.SetStateAction<Month>>;
    setMonthContext: React.Dispatch<React.SetStateAction<Month[]>>;
  }
  
  export const defaultContext: MyContextProps = {
    monthContext: [],
    monthActual : {} as Month,
    setMonthActual: () => [],
    setMonthContext: () => [],
  }
