export interface ButtonProps {
  type    : string;
  title   : string;
  disabled: boolean;
  fn      : () => void;
  }

export interface FixedSpent {
    id: string;
    fixed_spent_name: string;
}

export interface Person {
    id: string;
    person_name: string;
}

export interface Spent {
    id: string;
    spent_name: string;
} 

export interface FixedExpense {
  id        : string;
  total     : number | string;
  eliminar ?: string; 
  spent_type: string;
  monto    ?: string
}