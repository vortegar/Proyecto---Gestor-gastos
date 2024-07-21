import { useContext, useState } from 'react';
import { Grafico } from '../../components/Grafico';

import { Resumen } from '../../components/Resumen';
import { ExpensesResumenItem } from '../../interface/ExpensesInterface';
import { Button, Divider } from 'antd';
import { ModalCreateMes } from '../../components/ModalCreateMes';
import { MonthContext } from '../../context/MonthContextProvider';

export const Home: React.FC = () => {
  const { monthContext } = useContext(MonthContext);
  const [isModalVisible, setIsModalVisible] = useState(false);
  
  const mesActual = monthContext[monthContext.length - 1];
  
  const acumuladorPerson = mesActual?.expenses.reduce((acc: { [key: string]: string }, item) => {
    const { user, monto } = item;
    if (!acc[user]) {
      acc[user] = "0";
    }
    const sumaActual = parseFloat(acc[user]) + Number(monto.replace(/\./g, '').replace(',', '.'));
    acc[user] = sumaActual.toLocaleString('es-ES'); 
    return acc;
  }, {});
  
  let personResumen = []
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

  let expensesResumen = []
  if (gruopExpenses != null) {
    expensesResumen = Object.keys(gruopExpenses).map((spent_type, index) => ({
      id: index,
      spent_type,
      total: gruopExpenses[spent_type]
    }));
  }

  const showModal = () => {
    setIsModalVisible(true);
  };
  return (
    <>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent:'space-between', paddingLeft: '24px', paddingRight: '90px' }}>
      <h2>Resumen de gastos del Mes: {mesActual?.name}</h2>
      <Button type="primary" onClick={() => showModal()}>
        Crear nuevo mes
      </Button>
    </div>
    <Divider />
      <ModalCreateMes estado={isModalVisible} modificador={setIsModalVisible} />
      {
        monthContext.length > 0
        ?
        <>
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
