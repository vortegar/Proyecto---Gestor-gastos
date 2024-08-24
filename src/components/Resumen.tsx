import { useEffect, useState } from "react";

import { Card, Space } from "antd";
import { FileOutlined } from "@ant-design/icons";

import Title from "antd/es/typography/Title";
import { ResumenProps } from "./intercafeComponents";
import { PersonState } from "../context/PersonContextProvider";

export const Resumen: React.FC<ResumenProps> = ({ data, title, type }) => {
  const [person, setPerson] = useState<PersonState>({});
  const [fixedExpense, setFixedExpense] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (type === 'persona' && data.length > 0) {
      const maxPerson = data.reduce((prev, curr) => (prev?.total > curr?.total ? prev : curr));
      const minPerson = data.reduce((prev, curr) => (prev?.total < curr?.total ? prev : curr));

      const saldo = maxPerson?.total - minPerson?.total;
  
      const saldoFormateado = saldo;
  
      setPerson({ user: maxPerson.user, total: saldoFormateado });
    }
  }, [data, type]);

  useEffect(() => {
    if (type=='gastos fijos') {

      const totalFixedExpense = data?.reduce((prev, curr) => {
        return prev + curr.total;
      }, 0);
      setFixedExpense(totalFixedExpense);
    }
  }, [type, data])
  
  return (
    <Space direction="vertical" size={16}>
      <Card
      className="custom-card-head"
        title={
          <div>
            <FileOutlined style={{ marginRight: '5px'}}/>
            <Title level={4} style={{ display: 'inline', fontSize:'16px', color: 'var(--quaternary-color)' }}>{title}</Title>
          </div>
        }
        style={{ textAlign: 'center', marginTop: '20px' }}
      >
        {
          data?.length > 0 
          ?
          data?.map( v => {
            return(
            <div id={v.id?.toString()} style={{ display: 'flex', width: '100%' }}>
              {
                (type=='persona') && 
                <>
                  <span style={{ flexGrow: 1, textAlign: 'left' }}>{v.user}:</span>
                  <span style={{ flexGrow: 1, textAlign: 'right' }}>{v.total}</span>
                </>
              }
              {
                (type=='gastos fijos' || type=='gasto historico') && 
                <>
                  <span style={{ flexGrow: 1, textAlign: 'left' }}>{v.spent_type}:</span>
                  <span style={{ flexGrow: 1, textAlign: 'right' }}>$ {v.total}</span>
                </>
              }
              {
                (type=='gastos varios') && 
                  <>
                    <span style={{ flexGrow: 1, textAlign: 'left' }}>{v.spent_type}:</span>
                    <span style={{ flexGrow: 1, textAlign: 'right' }}>$ {v.total}</span> 
                  </>
              }
            </div>
            )
          })
          :
          <span>No hay datos</span>
        }
        {type === 'persona' && person.total !== undefined && (
          <div style={{ display: 'flex', width: '100%' }}>
            <span style={{ flexGrow: 1, textAlign: 'left' }}>Se debe a {person.user}:</span>
            <span style={{ textAlign: 'right' }}>$ {person.total}</span>
          </div>
        )}
        {
          (type=='gastos fijos') && 
          <div style={{ display: 'flex', width: '100%' }}>
            <span style={{ flexGrow: 1, textAlign: 'left' }}>Total Gastos Fijos:</span>
            <span style={{ flexGrow: 1, textAlign: 'right' }}> $ {fixedExpense}</span>
          </div>
        }
      </Card>
    </Space>
  )
}
