import { ReactNode } from 'react';
import { Month } from './MonthInterface';
import { Action } from '../reducers/AnioActualReducer';

export interface Year {
    id    : string;
    year  :string;
    month : Month[];
  }

  export interface MyContextYearProviderProps {
    children: ReactNode;
  }
  
  export interface MyContextYearProps {
    yearContext: Year[];
    dispatch: React.Dispatch<Action>;
  }
  
  export const defaultYearContext: MyContextYearProps = {
    yearContext: [],
    dispatch: () => [],
  }

  export interface MyContextAnioActualProviderProps {
    children: ReactNode;
  }
