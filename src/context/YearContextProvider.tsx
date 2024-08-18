import { createContext, useState, FC } from 'react';
import { defaultYearContext, MyContextYearProps, MyContextYearProviderProps, Year } from '../interface/YearInterface';

export const YearContext = createContext<MyContextYearProps>(defaultYearContext);

export const YearContextProvider: FC<MyContextYearProviderProps> = ({ children }) => {
 
  const [yearContext, setYearContext] = useState<Year[]>([]);  

  return (
    <YearContext.Provider value={{ yearContext, setYearContext }}>
      {children}
    </YearContext.Provider>
  );
};
