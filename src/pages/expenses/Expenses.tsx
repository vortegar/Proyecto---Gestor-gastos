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
      <div style={{ display: 'flex', alignItems: 'center', justifyContent:'space-between', paddingLeft: '24px', paddingRight: '90px' }}>
        <div>
          <h2 style={{ margin: '0'}}>Gastos mes actual: {mesActual?.month}</h2>
          <h2 style={{ marginTop: '0'}}>Año: {anioActual?.year} </h2>
        </div>
      </div>
      <Divider style={{marginTop: '0'}}/>
      <Row gutter={16}>
        <Col span={10}> <FormFixedExpenses/> </Col>
        <Col span={14}> <FormExpenses/> </Col>
      </Row>
      <Row gutter={16}>
        <Col span={10}> <FormExtraExpenses/> </Col>  
      </Row>
    </div>
  );  
};

