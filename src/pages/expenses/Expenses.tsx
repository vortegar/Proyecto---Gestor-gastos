import { useContext, useEffect, useState } from 'react';

import { Row, Col, Divider } from 'antd';

import { MonthContext } from '../../context/MonthContextProvider';

import { FormExtraExpenses } from '../../components/FormExtraExpenses';
import { FormFixedExpenses } from '../../components/FormFixedExpenses';

import { FormExpenses } from '../../components/FormExpenses';
import { YearContext } from '../../context/YearContextProvider';

import { getDataMonth } from '../../services/monthServides';

export const ExpensesPage: React.FC = () => {
  
  const { yearContext } = useContext(YearContext);
  const { monthContext, setMonthContext } = useContext(MonthContext);
  
  const [anioActual] = useState(yearContext[yearContext.length - 1]);
  const mesActual = monthContext[monthContext.length - 1];
  
  useEffect(() => {
    getDataMonth(setMonthContext, anioActual.id!);
  }, [ setMonthContext, anioActual])

  return (
    <div>
      <div>
        <div className="my-1">
          <h2 className="mt-0 bolld font-bold">Gastos mes actual: {mesActual?.month}</h2>
          <h2 className="mt-0 mb-4 font-bold">Año: {anioActual?.year} </h2>
        </div>
      </div>
      <Divider className="mt-2"/>
      <Row gutter={16} className="flex lg:flex-row sm:flex-col lg:items-start sm:items-center">
        <Col className="lg:w-5/12 sm:w-full"> <FormFixedExpenses/> </Col>
        <Col className="lg:w-7/12 sm:w-full"> <FormExpenses/> </Col>
      </Row>
      <Row gutter={16}>
        <Col className="lg:w-5/12 sm:w-full"> <FormExtraExpenses/> </Col>  
      </Row>
    </div>
  );  
};

