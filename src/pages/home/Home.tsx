import { useContext } from 'react';
import { Grafico } from '../../components/Grafico';

import { Resumen } from '../../components/Resumen';
import { ExpensesContext } from '../../context/ExpensesContextProvider';
import { ExpensesResumenItem } from '../../interface/ExpensesInterface';

export const Home: React.FC = () => {
  const { expensesContext } = useContext(ExpensesContext);
  // console.log(expensesContext)  

  const acumuladorPerson = expensesContext.reduce((acc: { [key: string]: string }, item) => {
    const { user, monto } = item;
    if (!acc[user]) {
      acc[user] = "0";
    }
    const sumaActual = parseFloat(acc[user]) + Number(monto.replace(/\./g, '').replace(',', '.'));
    acc[user] = sumaActual.toLocaleString('es-ES'); 
    return acc;
  }, {});
  
  const personResumen: ExpensesResumenItem[] = Object.keys(acumuladorPerson).map((user, index) => ({
    id: index,
    user,
    total: acumuladorPerson[user]
  }));

  const acumuladorExpenses = expensesContext.reduce((acc: { [key: string]: string }, item) => {
    const { spent_type, monto } = item;
    if (!acc[spent_type]) {
      acc[spent_type] = "0";
    }
    const sumaActual = parseFloat(acc[spent_type]) +  + Number(monto.replace(/\./g, '').replace(',', '.'));
    acc[spent_type] = sumaActual.toLocaleString('es-ES'); 
    return acc;
  }, {});
  
  const expensesResumen: ExpensesResumenItem[] = Object.keys(acumuladorExpenses).map((spent_type, index) => ({
    id: index,
    spent_type,
    total: acumuladorExpenses[spent_type]
  }));

  return (
    <>
      <h2>Resumen del mes en curso</h2>
        <div style={{ display: 'flex'}}>
          <div style={{ display: 'flex', flexDirection: 'column', padding: '24px' }}>
            <Resumen data={expensesResumen} title={'Total gastos del Mes'} type='gasto'/>
            <Resumen data={personResumen} title={'Monto a cuadar'} type='persona'/>
          </div>
        <Grafico resumen={expensesResumen}/>
      </div>
    </>    
  );
};
