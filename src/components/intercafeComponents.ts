// MODAL CREAR MES

import { ExpensesResumen } from "../interface/ExpensesInterface";
import { Month } from "../interface/MonthInterface";
import { HistoryResumen, PersonResumen } from "../pages/home/interfaceHome";

export interface ModalCreateMesProps {
    estado: boolean;     
    modificador: (arg: boolean) => void;
    fn: () => void;          
  }
  
export   interface OnSubmitMesParams {
    name: string; 
  }
export   interface OnSubmitYearParams {
    year: string; 
  }

export interface OptionItem {
    id: string | number; 
    name: string;
}
export interface ResumenProps {
  data : ExpensesResumen | FixedExpenseInputs[] | PersonResumen[] | HistoryResumen[];
  title: string;
  type?: string;
}

export interface TotalPerson {
  total: number;
}

export type FixedExpenseInputs = {
  fixed_spent_name: string;
  spent_type      : string;
  total           : number;
  [key: string]   : string | number;
};

export type SpentsInputs = {spent_name: string};

export type PersonInputs = {name: string};

export type FnState = () => void;

export type FixedSpentInputs = {fixed_spent_name: string};

// FormMonth
export interface FormMonthProps {
  fn: React.Dispatch<React.SetStateAction<Month>>;
}
