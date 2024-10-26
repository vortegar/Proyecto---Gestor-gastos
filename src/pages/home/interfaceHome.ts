export interface ResumenI {
    id           : number;
    spent_type  ?: string,
    user        ?: string;
    total        : number;
  }
  
  export interface ExpensesResumen {
    id          : number;
    spent_type  : string;
    total       : string;
  }
  export interface HistoryResumen {
    id          ?: number;
    spent_type  : string;
    user       ?: string;
    total       : number;
  }
