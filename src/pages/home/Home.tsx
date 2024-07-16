import { useContext, useState } from 'react';
import { Grafico } from '../../components/Grafico';

import { Resumen } from '../../components/Resumen';
import { ExpensesContext } from '../../context/ExpensesContextProvider';
import { ExpensesResumenItem } from '../../interface/ExpensesInterface';
import { Button } from 'antd';
import { ModalCreateMes } from '../../components/ModalCreateMes';
import { MonthContext } from '../../context/MonthContextProvider';

export const Home: React.FC = () => {
  const { expensesContext } = useContext(ExpensesContext);
  const { monthContext } = useContext(MonthContext);

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

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  return (
    <>
      <h2>Resumen</h2>
      <Button type="primary" onClick={ () => showModal() }>
        Crear nuevo mes
      </Button>
      <ModalCreateMes estado={isModalVisible} modificador={setIsModalVisible} />
      {
        monthContext.length > 0
        ?
        <>
          <h3>Mes {monthContext[monthContext.length - 1].month}</h3>
          <div style={{ display: 'flex'}}>
            <div style={{ display: 'flex', flexDirection: 'column', padding: '24px' }}>
              <Resumen data={expensesResumen} title={'Total gastos del Mes'} type='gasto'/>
              <Resumen data={personResumen} title={'Monto a cuadar'} type='persona'/>
            </div>
            <Grafico resumen={expensesResumen}/>
          </div>
        </>
        : 
        <h3>No tienes ningun registro de mes</h3>
      }
    </>    
  );
};
