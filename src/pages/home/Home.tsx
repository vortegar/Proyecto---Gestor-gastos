import { useContext, useEffect, useState } from 'react';

import { MonthContext } from '../../context/MonthContextProvider';

import { Button, Divider } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { Resumen } from '../../components/Resumen';
import { Grafico } from '../../components/Grafico';
import { getDataMonth } from '../../services/monthServides';
import { ModalCreateMes } from '../../components/ModalCreateMes';

import { useBtnRefresh } from '../../hooks/useBtnRefresh';
import { PersonResumen } from './interfaceHome';
import { ExpensesResumen } from '../../interface/ExpensesInterface';

export const Home: React.FC = () => {
  const { monthContext, setMonthContext } = useContext(MonthContext);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [mesActual, setMesActual] = useState(monthContext[monthContext.length - 1])

  const { refresh, toggleRefresh} = useBtnRefresh()
  useEffect(() => {
    getDataMonth(setMonthContext)
  }, [refresh, setMonthContext])
  
  useEffect(() => {
    setMesActual(monthContext[monthContext.length - 1])
  }, [monthContext])
  
  const acumuladorPerson = mesActual?.expenses.reduce((acc: { [key: string]: string }, item) => {
    const { user, monto } = item;
    if (!acc[user]) {
      acc[user] = "0";
    }
    const sumaActual = parseFloat(acc[user]) + Number(monto.replace(/\./g, '').replace(',', '.'));
    acc[user] = sumaActual.toLocaleString('es-ES'); 
    return acc;
  }, {});
  
  let personResumen: PersonResumen[] = []
  if(acumuladorPerson != undefined){
    personResumen = Object.keys(acumuladorPerson).map((user, index) => ({
      id: index,
      user,
      total: acumuladorPerson[user]
    }));
  }
  
  const gruopExpenses = mesActual?.expenses.reduce((acc: { [key: string]: string }, item) => {
    const { spent_type, monto } = item;
    if (!acc[spent_type]) {
      acc[spent_type] = "0";
    }
    const sumaActual = parseFloat(acc[spent_type]) +  + Number(monto.replace(/\./g, '').replace(',', '.'));
    acc[spent_type] = sumaActual.toLocaleString('es-ES'); 
    return acc;
  }, {});

  let expensesResumen: ExpensesResumen = []
  if (gruopExpenses != null) {
    expensesResumen = Object.keys(gruopExpenses).map((spent_type, index) => ({
      id: index,
      spent_type,
      total: gruopExpenses[spent_type]
    }));
  }

//  const fixedExpenses = mesActual?.fixed_expenses.map( (f, i) => {
//   return{
//     id: ( i + expensesResumen.length),
//     ...f
//   }
//  })

//  const combineExpenses = expensesResumen.concat(fixedExpenses);

 const showModal = () => {
    setIsModalVisible(true);
  };

  return (
    <>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent:'space-between', paddingLeft: '24px', paddingRight: '90px' }}>
      <h2>Resumen del gastos mes actual: {mesActual?.month}</h2>
      <Button onClick={() => showModal()} className="custom-button">
        Crear nuevo Mes
        <PlusOutlined />
      </Button>
    </div>
    <Divider />
      <ModalCreateMes estado={isModalVisible} modificador={setIsModalVisible} fn={toggleRefresh} />
      {
        monthContext.length > 0
        ?
        <>
          <div style={{ display: 'flex'}}>
            <div style={{ display: 'flex', flexDirection: 'column', padding: '24px' }}>
              <Resumen data={mesActual?.fixed_expenses} title='Total Gasto Fijo' type='gastos fijos'/>
              <Resumen data={expensesResumen} title='Total Gasto Variable' type='gastos varios'/>
              <Resumen data={personResumen} title='Monto a cuadar' type='persona'/>
            </div>
            <Grafico resumen={expensesResumen} title='Gasto Mensual'/>
          </div>
        </>
        : 
        <h3>No tienes ningun registro de mes</h3>
      }
    </>    
  );
};
