import { useContext, useEffect, useState } from 'react';

import { YearContext } from '../../context/YearContextProvider';
import { MonthContext } from '../../context/MonthContextProvider';

import { Button, Divider } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { Resumen } from '../../components/Resumen';
import { Grafico } from '../../components/Grafico';
import { getDataMonth } from '../../services/monthServides';
import { ModalCreateMes } from '../../components/ModalCreateMes';

import { PersonResumen } from './interfaceHome';
import { ExpensesResumen } from '../../interface/ExpensesInterface';

import { FormMonth } from '../../components/FormMonth';
import { ModalCreateYear } from '../../components/ModalCreateYear';

import { getDataYear } from '../../services/yearServides';
import { useBtnRefresh } from '../../hooks/useBtnRefresh';
import { ModalCalculate } from '../../components/ModalCalculate';

export const Home: React.FC = () => {
  const { yearContext, setYearContext } = useContext(YearContext);
  const { monthContext, setMonthContext } = useContext(MonthContext);

  const [isYearModalVisible, setIsYearModalVisible] = useState(false);
  const [isMonthModalVisible, setIsMonthModalVisible] = useState(false);
  const [isCalculateModalVisible, setIsCalculateModalVisible] = useState(false);

  const [anioActual, setAnioActual] = useState(yearContext[yearContext.length - 1]);
  const [mesActual, setMesActual] = useState(monthContext[monthContext.length - 1]);

  const { refresh, toggleRefresh} = useBtnRefresh()
  useEffect(() => {
    getDataYear(setYearContext)
  }, [refresh, setYearContext])
  
  useEffect(() => {
    getDataMonth(setMonthContext, anioActual.id!)
  }, [refresh, setMonthContext, anioActual])
  
  useEffect(() => {
    setAnioActual(yearContext[yearContext.length - 1])
  }, [yearContext])
  
  useEffect(() => {
    setMesActual(monthContext[monthContext.length - 1])
  }, [monthContext])
  
  const acumuladorPerson = mesActual?.expenses.reduce((acc: { [key: string]: number }, item) => {
    const { user, monto } = item;
    if (!acc[user]) {
      acc[user] = 0;
    }
    const sumaActual = acc[user] + + monto;
    acc[user] = sumaActual
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

  const gruopExpenses = mesActual?.expenses.reduce((acc: { [key: string]: number }, item) => {
    const { spent_type, monto } = item;
    if (!acc[spent_type]) {
      acc[spent_type] = 0;
    }
    const sumaActual = acc[spent_type] +  + monto;
    acc[spent_type] = sumaActual; 
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

  // Constante que agrupa los gastos 
  // const combineExpenses = expensesResumen.concat(fixedExpenses);

  const showYearhModal = () => { setIsYearModalVisible(true);};
  const showMonthModal = () => { setIsMonthModalVisible(true);};
  const showCalculateModal = () => { setIsCalculateModalVisible(true);};

  return (
    <>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent:'space-between', paddingLeft: '3vw', paddingRight: '1vw' }}>
      <div>
        <h2 style={{ margin: '0'}}>Resumen del gastos mes actual: {mesActual?.month}</h2>
        <h2 style={{ marginTop: '0'}}>Año: {anioActual?.year} </h2>
        <FormMonth fn={setMesActual}/>
      </div>
      <Button onClick={() => showCalculateModal()} className="custom-button">
        Calcular diferencia
        <PlusOutlined />
      </Button>
      <Button onClick={() => showMonthModal()} className="custom-button">
        Crear nuevo Mes
        <PlusOutlined />
      </Button>
      <Button onClick={() => showYearhModal()} className="custom-button">
        Nuevo Periodo Anual
        <PlusOutlined />
      </Button>
    </div>
    <Divider style={{ marginTop: 0 }}/>
      <ModalCreateYear estado={isYearModalVisible} modificador={setIsYearModalVisible} fn={toggleRefresh} />
      <ModalCreateMes estado={isMonthModalVisible} modificador={setIsMonthModalVisible} fn={toggleRefresh} />
      <ModalCalculate 
        estado={isCalculateModalVisible} 
        extraItems= {mesActual?.extra_items}
        modificador={setIsCalculateModalVisible} 
        fixedExpenses = {mesActual?.fixed_expenses}  
      />
      {
        monthContext.length > 0
        ?
        <>
          <div style={{ display: 'flex'}}>
            <div style={{ display: 'flex', flexDirection: 'column', paddingLeft: '3vw', paddingRight: '3vw' }}>
              <Resumen data={mesActual?.fixed_expenses} title='Resumen Gasto Fijo' type='gastos fijos'/>
              <Resumen data={expensesResumen} title='Resumen Gasto Variable' type='gastos varios'/>
              <Resumen data={personResumen} title='Resumen Gasto por persona' type='persona'/>
            </div>
            <div style={{ display: 'flex',  flexDirection: 'column'}}>
              <Grafico resumen={mesActual?.fixed_expenses} title='Gastos fijos del mes'/>
              <Grafico resumen={expensesResumen} title='Gastos variables del mes'/>
            </div>
          </div>
        </>
        : 
        <h3>No tienes ningun registro de mes</h3>
      }
    </>    
  );
};
