import { ReactNode } from 'react';
import { Expenses } from './ExpensesInterface';
import { ExtraItemsInputs, FixedExpenseInputs } from '../components/intercafeComponents';

export interface Month {
    id           ?: string;
    month         : string;
    expenses      : Expenses[];
    fixed_expenses: FixedExpenseInputs[];
    extra_items   : ExtraItemsInputs[];
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
