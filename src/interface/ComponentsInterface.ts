export interface ButtonAddProps {
    disabled: boolean;
    title: string;
  }


export interface ButtonDeleteProps {
    disabled: boolean;
    fn: () => void;
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
  spent_type: string;
  total: string;
  eliminar?: string; 
  monto ?: string
}