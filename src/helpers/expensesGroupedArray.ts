import { FixedExpenseInputs } from "../components/intercafeComponents"
import { Expenses } from "../interface/ExpensesInterface";
import { Month } from "../interface/MonthInterface";


export const expensesGroupedArray = (
  monthContext: Month[], 
  value: 'fixed_expenses' | 'expenses'
) => {
  const groupedExpenses: { [key: string]: (FixedExpenseInputs | Expenses)[] } = {}

  for (let i = 0; i < monthContext.length; i++) {
    const expenses = monthContext[i][value]
    for (const expense of expenses) {
      const type = expense.spent_type
      if (!groupedExpenses[type]) {
        groupedExpenses[type] = []
      }
      groupedExpenses[type].push(expense)
    }
  }

  return Object.values(groupedExpenses)
}
