import { useContext, useEffect, useState } from 'react';

import { Divider, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';

import { MonthContext } from '../../context/MonthContextProvider';

import { Resumen } from '../../components/Resumen';
import { Grafico } from '../../components/Grafico';

import { Month } from '../../interface/MonthInterface';

// import { useBtnRefresh } from '../../hooks/useBtnRefresh';
import { getDataMonth } from '../../services/monthServides';

import { formatArrayMonth } from '../../helpers/formatData';
import { YearContext } from '../../context/YearContextProvider';

export const History = () => {
  const { yearContext } = useContext(YearContext);
  const { monthContext, setMonthContext } = useContext(MonthContext);

  // const {isBlockBtnDelete, toggleBlockBtnDelete, refresh, toggleRefresh} = useBtnRefresh()
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
    // {
    //   title: 'Acción',
    //   dataIndex: 'eliminar',
    //   key: 'eliminar',
    //   align: 'center',
    //   render: (_, expense) => (
    //     <ButtonDelete 
    //       disabled={isBlockBtnDelete} 
    //       fn={() => deleteMonthById(anioActual.id!, expense.id!, toggleBlockBtnDelete, toggleRefresh)}
    //     />
    //   )
    // }
  ];

  return (
    <>
      <div className="my-1">
        <h2 className="mt-0 bolld font-bold">Historial de Gastos Año - {anioActual?.year} </h2>
      </div>
      <Divider className="mt-2"/>
      <div className="flex justify-between">
        <div className="mt-20">
          <Resumen data={expensesHistory} title='Totales de Gastos por Mes' type='gasto historico'/>
          <div className="text-center text-yellow-500 bg-gray-950 mt-4 p-4 rounded font-bold">
            Total Gastado en el Año: <strong>$ {sumYearTotalExpenses.toLocaleString('es-ES')}</strong>
          </div>
          <Table 
            columns={monthColumns} 
            dataSource={monthContext} 
            title={() => (
            <h4 className="font-bold text-center text-yellow-500">
              Meses Creados
            </h4>
            )}
            locale={{emptyText: <span>Aun no existen gastos en el mes</span>}}
          />
        </div>
        <Grafico resumen={formatExpenseHistory} title='Historico de Gastos Mensuales'/>
      </div>
    </>
  )
}
