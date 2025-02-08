import { createContext, FC, useReducer } from 'react';
import { defaultYearContext, MyContextYearProps, MyContextYearProviderProps } from '../interface/YearInterface';
import { anioReducer, initialState } from '../reducers/AnioActualReducer';

export const YearContext = createContext<MyContextYearProps>(defaultYearContext);

export const YearContextProvider: FC<MyContextYearProviderProps> = ({ children }) => {
  const [yearContext, dispatch] = useReducer(anioReducer, initialState);

  return (
    <YearContext.Provider value={{ yearContext, dispatch }}>
      {children}
    </YearContext.Provider>
  );
};
