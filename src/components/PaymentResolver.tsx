import { useForm } from "react-hook-form";
import { useContext } from "react";

import { MonthContext } from "../context/MonthContextProvider";

import { Card, Space } from "antd";
import Title from "antd/es/typography/Title";

export const PaymentResolver = () => {
  const { monthActual } = useContext(MonthContext);
  
  const fixedExpenses = monthActual.fixed_expenses;
  const extraExpenses = monthActual.extra_items;
  
  const { getValues } = useForm({
    defaultValues: {
      items: monthActual.fixed_expenses.map(v => ({
        spent_type: v.spent_type,
        total: v.total,
        total_final: (v.spent_type == 'Arriendo') ?  Number(v.total) * 0.4 : Number(v.total) / 2,
        user: (v.spent_type === 'Arriendo' || v.spent_type === 'Cuota Auto') ? 'Andreina' : 'Victorio'
      }))
    }
  });

  const totalDataItems = getValues('items').reduce((acc, curr) => {
      if (acc[curr.user]) {
        acc[curr.user] += curr.total_final;
      } else {
        acc[curr.user] = curr.total_final;
      }
      return acc; 
    }, {} as { [key: string]: number });

    const expensesAcumuladorPerson = monthActual?.expenses?.reduce((acc: { [key: string]: number }, item) => {
      const { user_1, user_2 } = item;
      if (acc['Victorio'] === undefined) acc['Victorio'] = 0;
      if (acc['Andreina'] === undefined) acc['Andreina'] = 0;
      acc['Victorio'] += +user_1;
      acc['Andreina'] += +user_2;
    return acc;
  }, {});

  // Se suman los montos que pago caga persona en los servicios
  // mas los que una peersona le pago a la otra
  const amountDiferenceUsers = {
    Victorio : totalDataItems.Victorio + expensesAcumuladorPerson.Andreina,
    Andreina : totalDataItems.Andreina + expensesAcumuladorPerson.Victorio
  }
  const resultDiference = amountDiferenceUsers.Victorio - amountDiferenceUsers.Andreina
  return (
    <div className='opacity-0 animate-fadeIn flex gap-5 justify-center mt-20'>
      <Space direction="vertical" size={"large"} className="w-280">
        <Card
          className="custom-card-head border-blue-500"
          title={
            <div >
              <Title level={4} className="!text-sm !mb-0 !text-white"> Gastos Fijos Pagados por</Title>
            </div>
          }
        >
        {fixedExpenses.length > 0 ?
          getValues('items').map((item, index) => (
            <div key={index}   className="grid grid-cols-[2fr_1fr_1fr_1fr] border-b gap-4 py-2 text-sm">
              <span className="text-left font-medium">{item.spent_type}</span>
              <span className="text-center">{item.total.toLocaleString('es-ES')}</span>
              <span className="text-left">{item.total_final.toLocaleString('es-ES')}</span> 
              <span className="text-right">{item.user}</span>
            </div>
          ))
          :
          <h2>No Hay datos</h2>
        }
        </Card>
      </Space>
      <Space direction="vertical" size={"large"} className="w-280">
        <Card
          className="custom-card-head border-blue-500"
          title={
            <div >
              <Title level={4} className="!text-sm !mb-0 !text-white"> Diferencia entre gastos</Title>
            </div>
          }
        >
        {fixedExpenses.length > 0 ?
        <>
        {
          Object.entries(amountDiferenceUsers).map(([key,value], index)=>(
          <div key={index}   className="grid grid-cols-[3fr_1fr] border-b gap-4 py-2 text-sm">
              <span className="text-left font-medium">{key}</span>
              <span className="text-right">{value.toLocaleString('es-ES')}</span>
          </div>
        ))
        } 
           <div className="grid grid-cols-[2fr_1fr] border-b gap-4 py-2 text-sm">
              <span className="text-left font-medium">Pagar a: {resultDiference > 0 ? 'Victorio' : 'Andreina'}</span>
              <span className="text-right">{resultDiference.toLocaleString('es-ES')}</span>
          </div>
        </>
          :
          <h2>No Hay datos</h2>
        }
        </Card>
      </Space>
      <Space direction="vertical" size={"large"} className="w-280">
      <Card
        className="custom-card-head border-blue-500"
        title={
          <div >
            <Title level={4} className="!text-sm !mb-0 !text-white"> Deuda por Pagar</Title>
          </div>
        }
      >
      {extraExpenses.length > 0 ?
      <>
      {
        extraExpenses.map((v, index) => (
          <div key={index} className="grid grid-cols-[2fr_1fr] border-b gap-4 py-2 text-sm">
            <span className="text-left font-medium">{v.descripcion}</span>
            <span className="text-right">{v.total.toLocaleString('es-ES')}</span>
          </div>
        ))
      }
       
      <div  className="grid grid-cols-[2fr_1fr] border-b gap-4 py-2 text-sm">
         <span className="text-left font-medium">Act Deuda Andreina</span>
          <span className="text-right">{resultDiference > 0 ? 
             (extraExpenses[0].total - resultDiference).toLocaleString('es-ES')  
            : (extraExpenses[0].total + (resultDiference * -1).toLocaleString('es-ES'))}</span>
      </div>
      </>
        :
        <h2>No Hay datos</h2>
      }
      </Card>
      </Space>
    </div>
  )
}
