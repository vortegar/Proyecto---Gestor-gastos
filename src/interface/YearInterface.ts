import { ReactNode } from 'react';
import { Month } from './MonthInterface';

export interface Year {
    id   ?: string;
    year  :string;
    month : Month[];
  }

  export interface MyContextYearProviderProps {
    children: ReactNode;
  }
  
  export interface MyContextYearProps {
    yearContext: Year[];
    setYearContext: React.Dispatch<React.SetStateAction<Year[]>>;
  }
  
  export const defaultYearContext: MyContextYearProps = {
    yearContext: [],
    setYearContext: () => [],
  }
