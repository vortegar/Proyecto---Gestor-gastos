import { useContext, useEffect, useState } from 'react';

import { YearContext } from '../../context/YearContextProvider';
import { MonthContext } from '../../context/MonthContextProvider';

import { Button, Divider, Tabs } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { getDataMonth } from '../../services/monthServides';
import { ModalCreateMes } from '../../components/ModalCreateMes';

// import { ResumenI } from './interfaceHome';

import { FormYear } from '../../components/FormYear';
import { FormMonth } from '../../components/FormMonth';
import { HeaderInfo } from '../../components/HeaderInfo';
// import { ModalCalculate } from '../../components/ModalCalculate';
import { ModalCreateYear } from '../../components/ModalCreateYear';

import { getDataYear } from '../../services/yearServides';

import { useBtnRefresh } from '../../hooks/useBtnRefresh';
import { useActualDate } from '../../hooks/useActualDate';
import { isFullYear } from '../../helpers/validateYear';
import Item from 'antd/es/list/Item';
import { ResumenPage } from './ResumenPage';
import { PaymentResolver } from '../../components/PaymentResolver';

export const Home: React.FC = () => {
  const { yearContext, dispatch } = useContext(YearContext);
  
  const { monthContext, setMonthContext } = useContext(MonthContext);
  const [isYearModalVisible, setIsYearModalVisible] = useState(false);
  const [isMonthModalVisible, setIsMonthModalVisible] = useState(false);
  // const [isCalculateModalVisible, setIsCalculateModalVisible] = useState(false);
  
  const {anioActual, mesActual, setAnioActual, setMesActual} = useActualDate()
  const { refresh, toggleRefresh} = useBtnRefresh()
  useEffect(() => {
    getDataYear(dispatch)
  }, [refresh, dispatch])
  
  useEffect(() => {
    getDataMonth(setMonthContext, anioActual?.id)
  }, [refresh, setMonthContext, anioActual])
  
  useEffect(() => {
    setAnioActual(yearContext[yearContext.length - 1])
  }, [yearContext])
  
  useEffect(() => {
    setMesActual(monthContext[monthContext.length - 1])
  }, [monthContext])
  // const acumuladorPerson = mesActual?.expenses?.reduce((acc: { [key: string]: number }, item) => {
  //   const { user_1, user_2 } = item;
    
  //   if (acc['Victorio'] === undefined) acc['Victorio'] = 0;
  //   if (acc['Andreina'] === undefined) acc['Andreina'] = 0;

  //   acc['Victorio'] += +user_1;
  //   acc['Andreina'] += +user_2;

  //   return acc;
  // }, {});

  // let personResumen: ResumenI[] = []
  // if(acumuladorPerson != undefined){

  //   personResumen = Object.keys(acumuladorPerson).map((user, index) => ({
  //     id: index,
  //     user,
  //     total: acumuladorPerson[user]
  //   }));
  // }  
  // const gruopExpenses = mesActual?.expenses?.reduce((acc: { [key: string]: number }, item) => {
  //   const { spent_type, monto } = item;
  //   if (!acc[spent_type]) {
  //     acc[spent_type] = 0;
  //   }
  //   const sumaActual = acc[spent_type] +  + monto;
  //   acc[spent_type] = sumaActual; 
  //   return acc;
  // }, {});

  // let expensesResumen: ExpensesResumen = []
  // if (gruopExpenses != null) {
  //   expensesResumen = Object.keys(gruopExpenses).map((spent_type, index) => ({
  //     id: index,
  //     spent_type,
  //     total: gruopExpenses[spent_type]
  //   }));
  // }
  // Constante que agrupa los gastos 
  // const combineExpenses = expensesResumen.concat(fixedExpenses);
  const showYearhModal = () => { setIsYearModalVisible(true);};
  const showMonthModal = () => { setIsMonthModalVisible(true);};
  // const showCalculateModal = () => { setIsCalculateModalVisible(true);};

  return (
    <div className='opacity-0 animate-fadeIn'>
      <div className="flex flex-col">
        <div className="my-1">
          <HeaderInfo year={anioActual?.year} month={mesActual?.month} />
          <div className='flex gap-10'>
            <FormYear />
            <FormMonth fn={setMesActual}/>
          </div>
        </div>
      <div className="flex gap-2 mt-3 mb-3">
        {/* {
          (anioActual?.year !== undefined ) && 
            <Button onClick={() => showCalculateModal()} className="bg-blue-600 text-white">
              Calcular diferencia
              <CalculatorOutlined />
            </Button>
        } */}
        <Button onClick={() => showMonthModal()} className="bg-blue-600 text-white">
          Crear nuevo mes
          <PlusOutlined />
        </Button>
        <Button 
          onClick={() => showYearhModal()} 
          disabled={isFullYear(monthContext)}
        >
          Crear nuevo periodo anual
          <PlusOutlined />
        </Button>
      </div>
    </div>
    <Divider/>
      <ModalCreateYear estado={isYearModalVisible} modificador={setIsYearModalVisible} fn={toggleRefresh} />
      <ModalCreateMes estado={isMonthModalVisible} modificador={setIsMonthModalVisible} fn={toggleRefresh} year={anioActual}/>
      {/* <ModalCalculate 
        estado        = {isCalculateModalVisible} 
        extraItems    = {mesActual?.extra_items}
        modificador   = {setIsCalculateModalVisible} 
        fixedExpenses = {mesActual?.fixed_expenses}  
        personResumen = {personResumen}
      /> */}
      <Tabs className="">
        <Item tab="Resumen" key="1">
          <ResumenPage />
        </Item>
        <Item tab="Pago de deudas" key="2">
          <PaymentResolver/>
        </Item>
      </Tabs>
      {/* {
        monthContext.length > 0
        ?
        <>
          <div className="flex flex-col mt-20">
            <div className="flex gap-14 lg:flex-row sm:flex-col lg:items-start sm:items-center justify-center">
              <Resumen data={personResumen} title='Gastos por persona' type='persona'/>
              <Resumen data={mesActual?.fixed_expenses} title=' Gastos Fijos' type='gastos fijos'/>
              <Resumen data={expensesResumen} title='Gastos Variables' type='gastos varios'/>
            </div>
            <div className="flex items-center">
              <Grafico resumen={mesActual?.fixed_expenses} title='Gastos Fijos'/>
              <Grafico resumen={expensesResumen} title='Gastos Variables'/>
            </div>
          </div>
        </>
        : 
        <h3>No tienes ningun registro de mes</h3>
      }
    </div>     */}
    </div>
  );
};
