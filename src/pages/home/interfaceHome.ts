export interface PersonResumen {
    id          : number;
    user        : string;
    total       : number;
    spent_type ?: string,
  }

  export interface ExpensesResumen {
    id          : number;
    spent_type  : string;
    total       : string;
  }
  export interface HistoryResumen {
    id          ?: number;
    spent_type  : string;
    total       : number;
    user       ?: string;
  }
