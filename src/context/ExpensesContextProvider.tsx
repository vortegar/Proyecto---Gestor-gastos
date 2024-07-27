import { createContext, useState, FC } from 'react';
import { defaultContext, Expenses, MyContextProps, MyContextProviderProps } from '../interface/ExpensesInterface';

export const ExpensesContext = createContext<MyContextProps>(defaultContext);

export const ExpensesContextProvider: FC<MyContextProviderProps> = ({ children }) => {

  const [expensesContext, setExpensesContext] = useState<Expenses[]>([]);  

  return (
    <ExpensesContext.Provider value={{ expensesContext, setExpensesContext }}>
      {children}
    </ExpensesContext.Provider>
  );
};
