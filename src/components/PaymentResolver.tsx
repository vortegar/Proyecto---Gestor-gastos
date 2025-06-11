import { Card, Space } from "antd";
import Title from "antd/es/typography/Title";

import { useExpenses } from "../hooks/useExpenses";

export const PaymentResolver = () => {

  const {extraExpenses, fixedExpenses, resultDiference, getValues, amountDiferenceUsers} = useExpenses();
  
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
