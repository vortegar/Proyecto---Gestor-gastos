import { useEffect, useState } from "react";

import { Card, Space } from "antd";
import Title from "antd/es/typography/Title";

import { ResumenProps } from "./intercafeComponents";

export const Resumen: React.FC<ResumenProps> = ({ data, title, type }) => {

  const [expenses, setExpenses] = useState<string | undefined>(undefined);  
  const [fixedExpense, setFixedExpense] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (type=='gastos varios') {
      const totalExpenses = data?.reduce((prev, curr) => {
        return prev + curr.total;
      }, 0);
      setExpenses(totalExpenses?.toLocaleString('es-ES'));
    }
  }, [type, data])
 
  useEffect(() => {
    if (type=='gastos fijos') {
      const totalFixedExpense = data?.reduce((prev, curr) => {
        return prev + curr.total;
      }, 0);
      setFixedExpense(totalFixedExpense?.toLocaleString('es-ES'));
    }
  }, [type, data])
  
  return (
    <Space direction="vertical" size={16} className="w-80">
      <Card
      className="custom-card-head"
        title={
          <div >
            <Title level={4} className="!text-yellow-500 !text-sm !mb-0">
              {title}
            </Title>
          </div>
        }
      >
        {
          data?.length > 0 
          ?
          data?.map( v => {
            return(
            <div id={v.id?.toString()} className="flex">
              {
                (type=='persona') && 
                <>
                  <span className="grow text-left font-bold">En gastos var. {v.user} debe:</span>
                  <span className="grow text-right">$ {v.total?.toLocaleString('es-ES')}</span>
                </>
              }
              {
                (type=='gastos fijos' || type=='gasto historico') && 
                <>
                  <span className="grow text-left"><strong>{v.spent_type}:</strong></span>
                  <span className="grow text-right">$ {v.total?.toLocaleString('es-ES')}</span>
                </>
              }
              {
                (type=='gastos varios') && 
                  <>
                    <span className="grow text-left">{v.spent_type}:</span>
                    <span className="grow text-right">$ {v.total?.toLocaleString('es-ES')}</span> 
                  </>
              }
            </div>
            )
          })
          :
          <span>No hay datos</span>
        }
        {
          (type=='gastos fijos') && 
          <div className="flex">
            <span className="grow text-left"><strong>Total:</strong></span>
            <span className="grow text-right"> <strong>$ {fixedExpense}</strong></span>
          </div>
        }
        {
          (type=='gastos varios') && 
          <div className="flex">
            <span className="grow text-left"><strong>Total:</strong></span>
            <span className="grow text-right"> <strong>$ {expenses}</strong></span>
          </div>
        }
      </Card>
    </Space>
  )
}
