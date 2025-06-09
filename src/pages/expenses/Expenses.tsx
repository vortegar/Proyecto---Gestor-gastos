import { useContext, useEffect, useState } from 'react';

import { Row, Col, Divider } from 'antd';

import { MonthContext } from '../../context/MonthContextProvider';

import { FormExtraExpenses } from '../../components/FormExtraExpenses';
import { FormFixedExpenses } from '../../components/FormFixedExpenses';

import { FormExpenses } from '../../components/FormExpenses';
import { YearContext } from '../../context/YearContextProvider';

import { getDataMonth } from '../../services/monthServides';
import { HeaderInfo } from '../../components/HeaderInfo';
import { FormMonetary } from '../../components/FormMonetary';

export const ExpensesPage: React.FC = () => {
  
  const { yearContext } = useContext(YearContext);
  const { setMonthContext, monthActual } = useContext(MonthContext);  
  const [anioActual] = useState(yearContext[yearContext.length - 1]);

  useEffect(() => {
    getDataMonth(setMonthContext, anioActual.id!);
  }, [ setMonthContext, anioActual])

  return (
    <div className="opacity-0 animate-fadeIn">
      <div>
        <div className="my-1">
          <HeaderInfo year={anioActual?.year} month={monthActual?.month} />
        </div>
      </div>
      <Divider/>
      <Row gutter={16} className="flex lg:flex-row sm:flex-col lg:items-start sm:items-center">
        <Col className="lg:w-5/12 sm:w-full"> <FormFixedExpenses/> </Col>
        <Col className="lg:w-7/12 sm:w-full"> <FormExpenses/> </Col>
      </Row>
      <Row gutter={16} className="flex lg:flex-row sm:flex-col lg:items-start sm:items-center">
        <Col className="lg:w-5/12 sm:w-full"> <FormExtraExpenses/> </Col>  
        <Col className="lg:w-7/12 sm:w-full"> <FormMonetary/> </Col>  
      </Row>
    </div>
  );  
};

