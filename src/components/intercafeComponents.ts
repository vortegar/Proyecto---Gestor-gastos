// MODAL CREAR MES
import { Control, FieldErrors } from "react-hook-form";
import { ResumenI } from "../pages/home/interfaceHome";

import { Month } from "../interface/MonthInterface";
export interface ModalCreateMesProps {
    estado: boolean;     
    modificador: (arg: boolean) => void;
    fn: () => void;          
  }
export interface ModalCalculateDiff {
  estado       : boolean;     
  modificador  : (arg: boolean) => void;
  extraItems   : ExtraItemsInputs[];
  fixedExpenses: FixedExpenseInputs[];
  personResumen: ResumenI[];
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
  data   : ResumenI[];
  title  : string;
  type  ?: string;
}

export interface TotalPerson {
  total: number;
}

export type FixedExpenseInputs = {
  spent_type    : string;
  total         : number;
};

export type ExtraItemsColumns = {
  person_name   : string;
  monto         : number;
  [key: string] : string | number;
};

export type FormExtraExpenesesInputs = {
  user        : string;
  total       : number;
  descripcion : string;
};

export type ExtraItemsInputs = {
  id    : number;
  user  : string;
  total : number;
};

export interface IDivisionRow {
  spentType: string;
  total    : number;        
  control  : Control<IFormValuesDivision>; 
  index    : number;        
  errors   : FieldErrors<IFormValuesDivision>;  
}

export interface IExtraItemsRow {
  monto     : number;        
  person    : string;
}

interface IFormValuesDivision {
  items: {
    user : string;
    total: number;
  }[];
}

export interface IFormValueCalculate {
  items: {
    user : string;
    total: number;
  }[];
}
export type SpentsInputs = {spent_name: string};

export type PersonInputs = {name: string};

export type FnState = () => void;

export type FixedSpentInputs = {fixed_spent_name: string};

// FormMonth
export interface FormMonthProps {
  fn: React.Dispatch<React.SetStateAction<Month>>;
}
