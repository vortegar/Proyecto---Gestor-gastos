// MODAL CREAR MES
import { Control, FieldErrors, UseFormSetValue } from "react-hook-form";
import { ResumenI } from "../pages/home/interfaceHome";

import { Month } from "../interface/MonthInterface";
import { Year } from "../interface/YearInterface";
export interface ModalCreateMesProps {
    estado: boolean;     
    year ?: Year;
    fn    : () => void;          
    modificador: (arg: boolean) => void;
  } 
export interface HeaderInfoInterface {
  year: string;     
  month?: string;
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
    id  : string | number; 
    name: string;
}
export interface ResumenProps {
  data  : ResumenI[];
  title : string;
  type ?: string;
}
export interface HistoryResumenProps {
  data : {[key: string]: number;}
  title: string;
}
export interface TotalPerson {
  total: number;
}

export type FixedExpenseInputs = {
  id        ?: number;
  spent_type : string;
  total      : number;
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

export type FormMonetarySavings = {
  meta       : number,
  concepto   : string,
  porcentaje : number,
  ahorroMes  : number,
  ahorroTotal: number,
};
export type ExtraItemsInputs = {
  id    : number;
  user  : string;
  total : number;
};

export type FormValues = {
  items: { user: string; total: number }[];
};

export interface IDivisionRow {
  spentType: string;
  total    : number;        
  control  : Control<IFormValuesDivision>; 
  index    : number;        
  setValue: UseFormSetValue<FormValues>;
  errors   : FieldErrors<IFormValuesDivision>;  
}

export interface IExtraItemsRow {
  monto  : number;        
  person : string;
}

interface IFormValuesDivision {
  items : {
    user  : string;
    total : number;
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
