import { useContext } from 'react';
import { useForm } from 'react-hook-form';

import { Col, Form, Modal, Row } from 'antd';

import { ExtraImtes } from './ExtraItems';
import { DivisionRow } from './DivisionRow';

import { IFormValueCalculate, ModalCalculateDiff } from './intercafeComponents';
import { DiffContext } from '../context/DiffPersonContextProvider';

export const ModalCalculate:React.FC<ModalCalculateDiff> = ({estado, modificador, fixedExpenses, extraItems}) => {

  const { control, handleSubmit, reset, formState: {errors} } = useForm({ defaultValues: {
    items: [],
  }});

  const { diffContext, setDiffContext } = useContext(DiffContext);
   
    const handleCancel = () => {
      modificador(false);
      reset();
    };
    const onSubmitCalulate = (data:IFormValueCalculate) => {
      const totalPorPersona = data.items.reduce((acc, curr) => {
      if (acc[curr.person]) {
        acc[curr.person] += curr.monto;
      } else {
        acc[curr.person] = curr.monto;
      }
      return acc;
    }, {} as { [key: string]: number });
    
    const arrayTotalPorPersona = Object.keys(totalPorPersona).map(person => {
      return totalPorPersona[person];
    });
    
    const arrayTotalExtraItemsPorPersona = extraItems.map(item => {
      return item.total
    });
    const diferenciaEntrePersonas = arrayTotalPorPersona.reduce((acc, curr) => acc - curr);
    
    //TODO: Arreglar no funciona en caso de ser dos personas solo funciona con 1 persona
    const diferenciaExtraItems = arrayTotalExtraItemsPorPersona.reduce((acc, curr) => acc - curr);
    
    setDiffContext((u) => ({
      ...u, 
      total: (diferenciaEntrePersonas < 0) ? Number(u.total) + diferenciaExtraItems + diferenciaEntrePersonas : Number(u.total) + diferenciaExtraItems  - diferenciaEntrePersonas
    }));
    }

  return (
    <Modal
      width={800}
      open={estado}
      onCancel={handleCancel}
      onOk={handleSubmit(onSubmitCalulate)}
      okButtonProps={{ className: 'custom-button' }}
      title={<div style={{fontWeight: 'bold'}}>Calcular Diferencia</div>}
    >
      <Row gutter={16}>
        <Col span={14}>
          <span style={{fontWeight: 'bold', marginTop: '1vw', paddingBottom: '1vw', display: 'inline-block'}}>Gastos Fijos</span>
          <Form layout="vertical">
            {fixedExpenses?.map((f, index) => (
              <DivisionRow spentType={f.spent_type} total={f.total} control={control} index={index} errors={errors}/>
            ))}
          </Form>
        </Col>
        <Col span={10}>
          <span style={{fontWeight: 'bold', marginTop: '1vw', paddingBottom: '1vw', display: 'inline-block'}}>Gastos Adicionales</span>
          {extraItems?.map((f) => (
            <ExtraImtes key={f.id} person={f.person_name} monto={f.total}/>
          ))}
        </Col>
      </Row>
      <div style={{ display: 'flex', width: '100%' }}>
        <span style={{ flexGrow: 1, textAlign: 'left' }}><strong>Total a transferir a {diffContext.user}:</strong></span>
        <span style={{ textAlign: 'right' }}><strong>$ {diffContext?.total?.toLocaleString('es-ES')}</strong></span>
      </div>      
    </Modal>
  )
}
