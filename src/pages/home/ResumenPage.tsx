import { useContext, useEffect } from 'react';

import { YearContext } from '../../context/YearContextProvider';
import { MonthContext } from '../../context/MonthContextProvider';

import { Resumen } from '../../components/Resumen';
import { Grafico } from '../../components/Grafico';
import { getDataMonth } from '../../services/monthServides';

import { ResumenI } from './interfaceHome';
import { ExpensesResumen } from '../../interface/ExpensesInterface';

import { getDataYear } from '../../services/yearServides';

import { useBtnRefresh } from '../../hooks/useBtnRefresh';
import { useActualDate } from '../../hooks/useActualDate';

export const ResumenPage: React.FC = () => {
  const { yearContext, dispatch } = useContext(YearContext);
  
  const { monthContext, setMonthContext } = useContext(MonthContext);
  
  const {anioActual, mesActual, setAnioActual, setMesActual} = useActualDate()

  const { refresh } = useBtnRefresh()
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
  const acumuladorPerson = mesActual?.expenses?.reduce((acc: { [key: string]: number }, item) => {
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
  const gruopExpenses = mesActual?.expenses?.reduce((acc: { [key: string]: number }, item) => {
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

  return (
    <div className='opacity-0 animate-fadeIn'>
      {
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
    </div>    
  );
};
