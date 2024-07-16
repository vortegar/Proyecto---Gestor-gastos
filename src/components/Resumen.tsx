import { Card, Space } from "antd"
import { useEffect, useState } from "react";

interface ResumenProps {
  data: any;
  title: string;
  type?: string,
}

export const Resumen: React.FC<ResumenProps> = ({ data, title, type }) => {
  const [person, setPerson] = useState({})

  useEffect(() => {
    if (type === 'persona' && data.length > 0) {
      const cleanNumber = (value) => Number(value.replace(/\./g, '').replace(',', '.'));
  
      const maxPerson = data.reduce((prev, curr) => (cleanNumber(prev.total) > cleanNumber(curr.total) ? prev : curr));
      const minPerson = data.reduce((prev, curr) => (cleanNumber(prev.total) < cleanNumber(curr.total) ? prev : curr));
  
      const saldo = cleanNumber(maxPerson.total) - cleanNumber(minPerson.total);
  
      const saldoFormateado = saldo.toLocaleString('es-ES');
  
      setPerson({ user: maxPerson.user, total: saldoFormateado });
    }
  }, [data, type]);
  
  return (
    <Space direction="vertical" size={16}>
      <Card
        title={title}
        // extra={<a href="#">More</a>}
        style={{ width: 300, textAlign: 'center', marginTop: '20px' }}
      >
    
        {
          data?.map( v => {
            return(
            <div id={v.id} style={{ display: 'flex', width: '100%' }}>
              {
                (type=='persona') 
                ?<span style={{ flexGrow: 1, textAlign: 'left' }}>{v.user}:</span>
                :<span style={{ flexGrow: 1, textAlign: 'left' }}>{v.spent_type}:</span>
              }
              <span style={{ textAlign: 'right' }}>$ {v.total}</span>
            </div>
            )
          })
        }
        {type === 'persona' && person.total !== undefined && (
          <div style={{ display: 'flex', width: '100%' }}>
            <span style={{ flexGrow: 1, textAlign: 'left' }}>Se debe a {person.user}:</span>
            <span style={{ textAlign: 'right' }}>$ {person.total}</span>
          </div>
        )}
      </Card>
    </Space>
  )
}
