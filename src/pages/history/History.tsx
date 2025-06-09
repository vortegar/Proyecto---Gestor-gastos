import { Divider, Tabs } from 'antd';

import { HistoryAnualByMonth } from '../../components/HistoryAnual';
import { HistoryFixedExpenses } from '../../components/HistoryFixedExpenses';

import Item from 'antd/es/list/Item';

import { HistoryVariableExpenses } from '../../components/HistoryVariableExpenses';
import { HeaderInfo } from '../../components/HeaderInfo';
import { useActualDate } from '../../hooks/useActualDate';
import { MonthContext } from '../../context/MonthContextProvider';
import { useContext } from 'react';

export const History = () => {
  const {anioActual } = useActualDate()
  const { monthActual } = useContext(MonthContext);
    
  return (
    <div className="opacity-0 animate-fadeIn">
      <div className="my-1">
        <HeaderInfo year={anioActual?.year} month={monthActual?.month} />
      </div>
      <Divider className="mt-2"/>
      <Tabs className="">
        <Item tab="Historico Anual" key="1">
          <HistoryAnualByMonth/>
        </Item>
        <Item tab="Historico Gastos Fijos" key="2">
          <HistoryFixedExpenses/>
        </Item>
        <Item tab="Historico Gastos Variables" key="3">
          <HistoryVariableExpenses/>
        </Item>
      </Tabs>
    </div>
  )
}
