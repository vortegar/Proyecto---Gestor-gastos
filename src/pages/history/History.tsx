import { useContext, useState } from 'react';

import { Divider, Tabs } from 'antd';
import { YearContext } from '../../context/YearContextProvider';
import { HistoryAnualByMonth } from '../../components/HistoryAnual';
import { HistoryFixedExpenses } from '../../components/HistoryFixedExpenses';
import Item from 'antd/es/list/Item';
import { HistoryVariableExpenses } from '../../components/HistoryVariableExpenses';
import { HeaderInfo } from '../../components/HeaderInfo';

export const History = () => {
  const { yearContext } = useContext(YearContext);
  const [anioActual] = useState(yearContext[yearContext.length - 1])

  return (
    <div className="opacity-0 animate-fadeIn">
      <div className="my-1">
        <HeaderInfo year={anioActual?.year} />
      </div>
      <Divider className="mt-2"/>
      <Tabs
        className="[&_.ant-tabs-tab]:!text-white">
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
