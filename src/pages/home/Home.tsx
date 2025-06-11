import { useContext, useEffect, useState } from 'react';

import { YearContext } from '../../context/YearContextProvider';
import { MonthContext } from '../../context/MonthContextProvider';

import Item from 'antd/es/list/Item';
import { Button, Divider, Tabs } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { getDataYear } from '../../services/yearServides';
import { getDataMonth } from '../../services/monthServides';

import { ResumenPage } from './ResumenPage';

import { FormYear } from '../../components/FormYear';
import { FormMonth } from '../../components/FormMonth';
import { HeaderInfo } from '../../components/HeaderInfo';
import { ModalCreateMes } from '../../components/ModalCreateMes';
import { ModalCreateYear } from '../../components/ModalCreateYear';
import { PaymentResolver } from '../../components/PaymentResolver';

import { useBtnRefresh } from '../../hooks/useBtnRefresh';
import { useActualDate } from '../../hooks/useActualDate';

import { isFullYear } from '../../helpers/validateYear';
import { Btns } from '../../components/Btns';

export const Home: React.FC = () => {
  const { yearContext, dispatch } = useContext(YearContext);
  
  const { monthContext, monthActual , setMonthContext, setMonthActual } = useContext(MonthContext);
  const [isYearModalVisible, setIsYearModalVisible] = useState(false);
  const [isMonthModalVisible, setIsMonthModalVisible] = useState(false);
  
  const {anioActual, setAnioActual, setMesActual} = useActualDate()
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

  // Constante que agrupa los gastos 
  // const combineExpenses = expensesResumen.concat(fixedExpenses);
  const showYearhModal = () => { setIsYearModalVisible(true);};
  const showMonthModal = () => { setIsMonthModalVisible(true);};
  // const showCalculateModal = () => { setIsCalculateModalVisible(true);};

  return (
    <div className='opacity-0 animate-fadeIn'>
      <div className="flex flex-col">
        <div className="my-1">
          <HeaderInfo year={anioActual?.year} month={monthActual?.month} />
          <div className='flex gap-10'>
            <FormYear />
            <FormMonth fn={setMonthActual}/>
          </div>
        </div>
      <div className="flex gap-2 mt-3 mb-3">

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
        <Btns type="Pdf" disabled={false} title='Descargar PDF' fn={() => console.log('pdf')}/>
      </div>
    </div>
    <Divider/>
      <ModalCreateYear estado={isYearModalVisible} modificador={setIsYearModalVisible} fn={toggleRefresh} />
      <ModalCreateMes estado={isMonthModalVisible} modificador={setIsMonthModalVisible} fn={toggleRefresh} year={anioActual}/>
      <Tabs className="">
        <Item tab="Resumen" key="1">
          <ResumenPage />
        </Item>
        <Item tab="Pago de deudas" key="2">
          <PaymentResolver/>
        </Item>
      </Tabs>
    </div>
  );
};
