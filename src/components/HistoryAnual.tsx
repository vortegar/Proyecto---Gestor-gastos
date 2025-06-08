import { useContext, useEffect, useState } from 'react';

import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';

import { Resumen } from './Resumen';
import { Grafico } from './Grafico';

import { YearContext } from '../context/YearContextProvider';
import { MonthContext } from '../context/MonthContextProvider';

import { Month } from '../interface/MonthInterface';

import { getDataMonth } from '../services/monthServides';
import { formatArrayMonth } from '../helpers/formatData';

export const HistoryAnualByMonth = () => {
  const { yearContext } = useContext(YearContext);
  const { monthContext, setMonthContext } = useContext(MonthContext);

  const [anioActual] = useState(yearContext[yearContext.length - 1])
  
  useEffect(() => {
    getDataMonth(setMonthContext, anioActual.id!)
  }, [setMonthContext, anioActual])

  const expensesHistory = monthContext.map(m => {
    const expensesTotal = m.expenses.reduce<number>((acc, current) => {
      return acc + current.monto;
    }, 0);
    const fixedExpensesTotal = m.fixed_expenses.reduce<number>((acc, current) => {
      return acc + current.total;
    }, 0);
    const sumExpenses = expensesTotal + fixedExpensesTotal
    return {
      spent_type: m.month,
      total: sumExpenses,
    };
  });

  const yearTotalExpenses = expensesHistory.map( e => {
    return e.total
  })
  const sumYearTotalExpenses = yearTotalExpenses.reduce((acc, current) => {
    return acc + current
  })

  const formatExpenseHistory = formatArrayMonth(expensesHistory, 'spent_type')
  const monthColumns: ColumnsType<Month> = [
    {
      title: 'Mes',
      dataIndex: 'month',
      key: 'month',
      align: 'center',
    },
  ];

  return (
    <div className="flex flex-col">
      <div className="mt-20 flex justify-around">
        <div>
          <Resumen data={expensesHistory} title='Totales de Gastos por Mes' type='gasto historico'/>
          <div className="text-center bg-primary text-green-500 mt-4 p-4 rounded font-bold">
              Total Gastado en el Año: <strong>$ {sumYearTotalExpenses.toLocaleString('es-ES')}</strong>
          </div>
        </div>
          <Table 
            className="w-96"
            columns={monthColumns} 
            dataSource={monthContext} 
            title={() => (
            <h4 className="font-bold text-cente text-white">
                Meses Creados
            </h4>
            )}
            pagination={{ pageSize: 6 }} 
            locale={{emptyText: <span>Aun no existen gastos en el mes</span>}}
          />
        </div>
        <Grafico resumen={formatExpenseHistory} title='Historico de Gastos Mensuales'/>
    </div>
  )
}
