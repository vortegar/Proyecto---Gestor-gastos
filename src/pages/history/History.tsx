import { useContext } from 'react';

import { Divider } from 'antd';

import { MonthContext } from '../../context/MonthContextProvider';

import { Resumen } from '../../components/Resumen';
import { Grafico } from '../../components/Grafico';

export const History = () => {
  const { monthContext } = useContext(MonthContext);

  const expensesHistory = monthContext.map( m => {
    const expensesTotal = m.expenses.reduce((acc, current) => {
        const sumaActual = parseFloat(acc) + Number(current.monto.replace(/\./g, '').replace(',', '.'));
        return acc + sumaActual;
      }, 0);
    return{
        spent_type: m.name,
        total: expensesTotal,
    }
  })
  
  return (
    <>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent:'space-between', paddingLeft: '24px', paddingRight: '90px' }}>
            <h2>Historial de Gastos </h2>
        </div>
        <Divider />
          <div style={{ display: 'flex'}}>
            <div style={{ display: 'flex', flexDirection: 'column', padding: '24px' }}>
                <Resumen data={expensesHistory} title='Totales de Gastos por Mes' type='gasto historico'/>
            </div>
                <Grafico resumen={expensesHistory} title='Historico de Gastos Mensuales'/>
          </div>

    </>

  )
}
