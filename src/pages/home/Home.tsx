import { useContext, useEffect, useState } from 'react';

import { YearContext } from '../../context/YearContextProvider';
import { MonthContext } from '../../context/MonthContextProvider';

import { Button, Divider } from 'antd';
import { CalculatorOutlined, PlusOutlined } from '@ant-design/icons';

import { Resumen } from '../../components/Resumen';
import { Grafico } from '../../components/Grafico';
import { getDataMonth } from '../../services/monthServides';
import { ModalCreateMes } from '../../components/ModalCreateMes';

import { ResumenI } from './interfaceHome';
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
    const { user_1, user_2 } = item;
    
    if (acc['Victorio'] === undefined) acc['Victorio'] = 0;
    if (acc['Andreina'] === undefined) acc['Andreina'] = 0;

    acc['Victorio'] += +user_1;
    acc['Andreina'] += +user_2;

    return acc;
  }, {});

  let personResumen: ResumenI[] = []
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
    <div className="flex flex-col">
      <div className="my-1">
        <h2 className="mt-0 bolld font-bold">Gastos del mes: {mesActual?.month}</h2>
        <h2 className="mt-0 mb-4 font-bold">Año: {anioActual?.year} </h2>
        <FormMonth fn={setMesActual}/>
      </div>
      <div className="flex gap-2 mt-4">
        <Button onClick={() => showCalculateModal()} className="bg-gray-950 hover:!bg-gray-800 text-yellow-500 hover:!text-yellow-500">
          Calcular diferencia
          <CalculatorOutlined />
        </Button>
        <Button onClick={() => showMonthModal()} className="bg-gray-950 hover:!bg-gray-800 text-yellow-500 hover:!text-yellow-500">
          Crear nuevo mes
          <PlusOutlined />
        </Button>
        <Button onClick={() => showYearhModal()} className="bg-gray-950 hover:!bg-gray-800 text-yellow-500 hover:!text-yellow-500">
          Crear nuevo periodo anual
          <PlusOutlined />
        </Button>
      </div>
    </div>
    <Divider className="mt-2"/>
      <ModalCreateYear estado={isYearModalVisible} modificador={setIsYearModalVisible} fn={toggleRefresh} />
      <ModalCreateMes estado={isMonthModalVisible} modificador={setIsMonthModalVisible} fn={toggleRefresh} />
      <ModalCalculate 
        estado        = {isCalculateModalVisible} 
        extraItems    = {mesActual?.extra_items}
        modificador   = {setIsCalculateModalVisible} 
        fixedExpenses = {mesActual?.fixed_expenses}  
        personResumen = {personResumen}
      />
      {
        monthContext.length > 0
        ?
        <>
          <div className="flex flex-col">
            <div className="flex gap-5 lg:flex-row sm:flex-col lg:items-start sm:items-center">
              <Resumen data={personResumen} title='Resumen Gasto por persona' type='persona'/>
              <Resumen data={mesActual?.fixed_expenses} title='Resumen Gasto Fijo' type='gastos fijos'/>
              <Resumen data={expensesResumen} title='Resumen Gasto Variable' type='gastos varios'/>
            </div>
            <div className="flex flex-col items-center">
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
