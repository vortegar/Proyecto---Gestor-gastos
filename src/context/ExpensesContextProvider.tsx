import { createContext, useState, FC } from 'react';
import { defaultContext, Expenses, MyContextProps, MyContextProviderProps } from '../interface/ExpensesInterface';

export const ExpensesContext = createContext<MyContextProps>(defaultContext);

export const ExpensesContextProvider: FC<MyContextProviderProps> = ({ children }) => {

  const dataDemo:Expenses[] = [
    {
      id         : 1,
      spent_type : 'Oxxo',
      monto      : '12.500',
      user       : 'Victorio Ortega',
      fecha      : '28/05/1991',
      descripcion: 'ejemplo',
    },
  ];
  const [expensesContext, setExpensesContext] = useState<Expenses[]>(dataDemo);  

  return (
    <ExpensesContext.Provider value={{ expensesContext, setExpensesContext }}>
      {children}
    </ExpensesContext.Provider>
  );
};
