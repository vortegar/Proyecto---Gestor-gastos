import { useContext, useEffect, useState } from 'react';

import { Divider, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';

import { MonthContext } from '../../context/MonthContextProvider';

import { Resumen } from '../../components/Resumen';
import { Grafico } from '../../components/Grafico';

import { Month } from '../../interface/MonthInterface';

import { useBtnRefresh } from '../../hooks/useBtnRefresh';
import { ButtonDelete } from '../../components/ButtonDelete';
import { deleteMonthById, getDataMonth } from '../../services/monthServides';

import { formatArrayMonth } from '../../helpers/formatData';
import { YearContext } from '../../context/YearContextProvider';

export const History = () => {
  const { yearContext } = useContext(YearContext);
  const { monthContext, setMonthContext } = useContext(MonthContext);

  const {isBlockBtnDelete, toggleBlockBtnDelete, refresh, toggleRefresh} = useBtnRefresh()
  const [anioActual] = useState(yearContext[yearContext.length - 1])
  
  useEffect(() => {
    getDataMonth(setMonthContext, anioActual.id!)
  }, [refresh, setMonthContext, anioActual])

  // const expensesHistory = monthContext.map( m => {
  //   const expensesTotal = m.expenses.reduce<number>((acc, current) => {
  //       const sumaActual = parseFloat(acc) + Number(current.monto.replace(/\./g, '').replace(',', '.'));
  //       return acc + sumaActual;
  //     }, 0);
  //   return{
  //       spent_type: m.month,
  //       total: String(expensesTotal),
  //   }
  // })

  const expensesHistory = monthContext.map(m => {
    const expensesTotal = m.expenses.reduce<number>((acc, current) => {
      const monto = parseFloat(current.monto.replace(/\./g, '').replace(',', '.'));
      return acc + monto;
    }, 0);
    
    return {
      spent_type: m.month,
      total: expensesTotal.toString(),
    };
  });
  const formatExpenseHistory = formatArrayMonth(expensesHistory, 'spent_type')
  const monthColumns: ColumnsType<Month> = [
    {
      title: 'Mes',
      dataIndex: 'month',
      key: 'month',
      align: 'center',
    },
    {
      title: 'Acción',
      dataIndex: 'eliminar',
      key: 'eliminar',
      align: 'center',
      render: (_, expense) => (
        <ButtonDelete 
          disabled={isBlockBtnDelete} 
          fn={() => deleteMonthById(anioActual.id!, expense.id!, toggleBlockBtnDelete, toggleRefresh)}
        />
      )
    }
  ];

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent:'space-between', paddingLeft: '24px', paddingRight: '90px' }}>
        <h2 style={{ marginTop: '0'}}>Historial de Gastos Año - {anioActual?.year} </h2>
      </div>
      <Divider style={{marginTop: '0'}}/>
      <div style={{ display: 'flex'}}>
        <div style={{ display: 'flex', flexDirection: 'column', padding: '24px' }}>
          <Resumen data={expensesHistory} title='Totales de Gastos por Mes' type='gasto historico'/>
        </div>
          <Grafico resumen={formatExpenseHistory} title='Historico de Gastos Mensuales'/>
      </div>
      <Table 
        columns={monthColumns} 
        dataSource={monthContext} 
        title={() => (
          <h4 style={{ textAlign: 'center', fontWeight: 'bold', margin: '0' }}>
            Meses Creados
          </h4>
        )}
        locale={{
          emptyText: <span>Aun no existen gastos en el mes</span> 
        }}
            />
    </>
  )
}
