import { createContext, useState, FC } from 'react';
import { defaultContext, Month, MyContextProps, MyContextProviderProps } from '../interface/MonthInterface';

export const MonthContext = createContext<MyContextProps>(defaultContext);

export const MonthContextProvider: FC<MyContextProviderProps> = ({ children }) => {
 
  const [monthContext, setMonthContext] = useState<Month[]>([]);  

  return (
    <MonthContext.Provider value={{ monthContext, setMonthContext }}>
      {children}
    </MonthContext.Provider>
  );
};
