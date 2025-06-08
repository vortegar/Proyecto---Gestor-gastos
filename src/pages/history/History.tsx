import { Divider, Tabs } from 'antd';

import { HistoryAnualByMonth } from '../../components/HistoryAnual';
import { HistoryFixedExpenses } from '../../components/HistoryFixedExpenses';

import Item from 'antd/es/list/Item';

import { HistoryVariableExpenses } from '../../components/HistoryVariableExpenses';
import { HeaderInfo } from '../../components/HeaderInfo';
import { useActualDate } from '../../hooks/useActualDate';

export const History = () => {
  const {anioActual, mesActual} = useActualDate()
    
  return (
    <div className="opacity-0 animate-fadeIn">
      <div className="my-1">
        <HeaderInfo year={anioActual?.year} month={mesActual?.month} />
      </div>
      <Divider className="mt-2"/>
      <Tabs
        className="">
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
