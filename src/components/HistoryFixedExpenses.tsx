import { useContext, useEffect, useState } from 'react';

import { Resumen } from './Resumen';
import { Grafico } from './Grafico';

import { YearContext } from '../context/YearContextProvider';
import { MonthContext } from '../context/MonthContextProvider';

import { getDataMonth } from '../services/monthServides';
import { formatArrayMonth } from '../helpers/formatData';
import { ResumenAnual } from './ResumenAnual';

export const HistoryFixedExpenses = () => {
  const { yearContext } = useContext(YearContext);
  const { monthContext, setMonthContext } = useContext(MonthContext);
  console.log(monthContext.length)
  const [anioActual] = useState(yearContext[yearContext.length - 1])
  
  useEffect(() => {
    getDataMonth(setMonthContext, anioActual.id!)
  }, [setMonthContext, anioActual])

  const expensesHistory = monthContext.map(m => {
    const fixedExpensesTotal = m.fixed_expenses.reduce<number>((acc, current) => {
      return acc + current.total;
    }, 0);
    return {
      spent_type: m.month,
      total: fixedExpensesTotal,
    };
  });

  const fixedExpenses = monthContext.flatMap(m => {
        return m.fixed_expenses
  });

  const historyFixedExpenses = fixedExpenses.reduce((acc: { [key: string]: number }, item) => {
      const {spent_type, total} = item
      acc[spent_type] = (acc[spent_type] || 0) + total;
    return acc
    }, {})

  const yearTotalExpenses = expensesHistory.map( e => {
    return e.total
  })
  const sumYearTotalExpenses = yearTotalExpenses.reduce((acc, current) => {
    return acc + current
  })

  const formatExpenseHistory = formatArrayMonth(expensesHistory, 'spent_type')
  return (
    <div className="flex flex-col">
        <div className="mt-20 flex justify-around">
          <div>
            <Resumen data={expensesHistory} title='Gasto fijo por mes' type='gasto historico'/>
            <div className="text-center bg-primary text-green-500 mt-4 p-4 rounded font-bold">
                Total gasto fijo del año: $ {sumYearTotalExpenses.toLocaleString('es-ES')}
            </div>
          </div>
            <ResumenAnual data={historyFixedExpenses} title='Detalle' numberMonth={monthContext.length}/>
        </div>
          <Grafico resumen={formatExpenseHistory} title='Historico Anual Gastos Mensuales'/>
    </div>
  )
}
