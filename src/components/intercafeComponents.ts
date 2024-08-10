// MODAL CREAR MES

import { ExpensesResumen } from "../interface/ExpensesInterface";
import { PersonResumen } from "../pages/home/interfaceHome";

export interface ModalCreateMesProps {
    estado: boolean;     
    modificador: (arg: boolean) => void;
    fn: () => void;          
  }
  
export   interface OnSubmitMesParams {
    name: string; 
  }

export interface OptionItem {
    id: string | number; 
    name: string;
}
export interface ResumenProps {
  data: ExpensesResumen | FixedExpenseInputs[] | PersonResumen[];
  title: string;
  type?: string;
}

export interface TotalPerson {
  total: number;
}

export type FixedExpenseInputs = {
  fixed_spent_name: string;
  total: string;
  [key: string]: string
};

