import { Expenses } from "../interface/ExpensesInterface";
import { FixedExpenseInputs } from "../components/intercafeComponents";

const monthOrder = [
  "Enero", 
  "Febrero", 
  "Marzo", 
  "Abril", 
  "Mayo", 
  "Junio",
  "Julio", 
  "Agosto", 
  "Septiembre", 
  "Octubre", 
  "Noviembre", 
  "Diciembre"
];

export interface FormatArrayMonthItem {
  id            ?: string;
  month         ?: string;
  expenses      ?: Expenses[];
  fixed_expenses?: FixedExpenseInputs[];
  spent_type    ?: string;
  total         ?: string
}

export const formatToUpperCase = (data: string): string => {
  return data.charAt(0).toUpperCase() + data.slice(1).toLowerCase();
}

export const formatArrayMonth = <T extends FormatArrayMonthItem>(data: T[], prop: keyof T): T[] => {
  return data.sort((a, b) => monthOrder.indexOf(a[prop] as string) - monthOrder.indexOf(b[prop] as string));
}
