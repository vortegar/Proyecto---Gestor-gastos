import { Card, Space } from "antd";
import { useActualDate } from "../hooks/useActualDate"
import Title from "antd/es/typography/Title";
import { useForm } from "react-hook-form";

export const PaymentResolver = () => {
  const {mesActual} = useActualDate()
  
  const fixedExpenses = mesActual.fixed_expenses;
  const extraExpenses = mesActual.extra_items;
  console.log(mesActual);
  const { getValues } = useForm({
    defaultValues: {
      items: mesActual.fixed_expenses.map(v => ({
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

    const expensesAcumuladorPerson = mesActual?.expenses?.reduce((acc: { [key: string]: number }, item) => {
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
    <>
 
    <Space direction="vertical" size={"large"} className="w-280">
      <Card
        className="custom-card-head border-blue-500"
        title={
          <div >
            <Title level={4} className="!text-sm !mb-0 !text-white"> Ajuste</Title>
          </div>
        }
      >
      {fixedExpenses.length > 0 ?
        getValues('items').map((item, index) => (
          <div key={index} className="grid grid-cols-4  border-b py-1">
            <span className="grow text-left font-medium">{item.spent_type}</span>
            <span className="grow text-center">{item.total}</span>
            <span className="grow text-left">{item.total_final}</span> 
            <span className="grow text-right">{item.user}</span>
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
            <Title level={4} className="!text-sm !mb-0 !text-white"> Ajuste</Title>
          </div>
        }
      >
      {fixedExpenses.length > 0 ?
      <>
      {
        Object.entries(amountDiferenceUsers).map(([key,value], index)=>(
          <div key={index} className="grid grid-cols-3  border-b py-1">
            <span className="grow text-left font-medium">{key}</span>
            <span className="grow text-center">{value.toFixed(2)}</span>
         </div>
       ))
      } 
      <div  className="grid grid-cols-3  border-b py-1">
       <span className="grow text-right">Pagar a:{resultDiference > 0 ? 'Victorio' : 'Andreina'}</span>
       <span className="grow text-right">{resultDiference}</span>
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
            <Title level={4} className="!text-sm !mb-0 !text-white"> Ajuste</Title>
          </div>
        }
      >
      {extraExpenses.length > 0 ?
      <>
      {
        extraExpenses.map((v, index) => (
          <div key={index} className="grid grid-cols-4  border-b py-1">
            <span className="grow text-left font-medium">{v.descripcion}</span>
            <span className="grow text-center">{v.total}</span>
          </div>
        ))
      }
       
      <div  className="grid grid-cols-3  border-b py-1">
       <span className="grow text-right">Act Deuda Andreina</span>
       <span className="grow text-right">{resultDiference > 0 ? extraExpenses[0].total - resultDiference  :extraExpenses[0].total + resultDiference}</span>
      </div>
      </>
        :
        <h2>No Hay datos</h2>
      }
      </Card>
    </Space>
    </>
  )
}
