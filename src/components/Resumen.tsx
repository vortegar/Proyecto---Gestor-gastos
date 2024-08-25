import { useEffect, useState } from "react";

import { Card, Space } from "antd";
import { FileOutlined } from "@ant-design/icons";

import Title from "antd/es/typography/Title";
import { ResumenProps } from "./intercafeComponents";
import { PersonState } from "../context/PersonContextProvider";

export const Resumen: React.FC<ResumenProps> = ({ data, title, type }) => {
  const [person, setPerson] = useState<PersonState>({});
  const [expenses, setExpenses] = useState<string | undefined>(undefined);

  const [fixedExpense, setFixedExpense] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (type === 'persona' && data.length > 0) {
      const maxPerson = data.reduce((prev, curr) => (prev?.total > curr?.total ? prev : curr));
      const minPerson = data.reduce((prev, curr) => (prev?.total < curr?.total ? prev : curr));

      const saldo = (maxPerson?.total - minPerson?.total)?.toLocaleString('es-Es');
      setPerson({ user: maxPerson.user as string, total: saldo });
    }
  }, [data, type]);
 
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
    <Space direction="vertical" size={16}>
      <Card
      className="custom-card-head"
        title={
          <div>
            <FileOutlined style={{ marginRight: '2vw'}}/>
            <Title level={4} style={{ display: 'inline', fontSize:'16px', color: 'var(--quaternary-color)' }}>{title}</Title>
          </div>
        }
        style={{ textAlign: 'center', marginTop: '2vw' }}
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
                  <span style={{ flexGrow: 1, textAlign: 'right' }}>{v.total?.toLocaleString('es-ES')}</span>
                </>
              }
              {
                (type=='gastos fijos' || type=='gasto historico') && 
                <>
                  <span style={{ flexGrow: 1, textAlign: 'left' }}>{v.spent_type}:</span>
                  <span style={{ flexGrow: 1, textAlign: 'right' }}>$ {v.total?.toLocaleString('es-ES')}</span>
                </>
              }
              {
                (type=='gastos varios') && 
                  <>
                    <span style={{ flexGrow: 1, textAlign: 'left' }}>{v.spent_type}:</span>
                    <span style={{ flexGrow: 1, textAlign: 'right' }}>$ {v.total?.toLocaleString('es-ES')}</span> 
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
            <span style={{ flexGrow: 1, textAlign: 'left' }}><strong>Se debe a {person.user}:</strong></span>
            <span style={{ textAlign: 'right' }}><strong>$ {person.total?.toLocaleString('es-ES')}</strong></span>
          </div>
        )}
        {
          (type=='gastos fijos') && 
          <div style={{ display: 'flex', width: '100%' }}>
            <span style={{ flexGrow: 1, textAlign: 'left' }}><strong>Total Gastos Fijos:</strong></span>
            <span style={{ flexGrow: 1, textAlign: 'right' }}> <strong>$ {fixedExpense}</strong></span>
          </div>
        }
        {
          (type=='gastos varios') && 
          <div style={{ display: 'flex', width: '100%' }}>
            <span style={{ flexGrow: 1, textAlign: 'left' }}><strong>Total Gastos variables:</strong></span>
            <span style={{ flexGrow: 1, textAlign: 'right' }}> <strong>$ {expenses}</strong></span>
          </div>
        }
      </Card>
    </Space>
  )
}
