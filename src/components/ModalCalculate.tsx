import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { Col, Form, Modal, Row } from 'antd';

import { ExtraImtes } from './ExtraItems';
import { DivisionRow } from './DivisionRow';

import { IFormValueCalculate, ModalCalculateDiff } from './intercafeComponents';

import { amountCalculate, calculateAmountToPay, getPersonToPay } from '../helpers/calculate';

export const ModalCalculate:React.FC<ModalCalculateDiff> = ({estado, modificador, fixedExpenses, extraItems, personResumen}) => {

  const { control, handleSubmit, reset, formState: {errors} } = useForm({ defaultValues: {
    items: [],
  }});

  const [diff, setDiff] = useState({user: '', total: 0})
   
    const handleCancel = () => {
      modificador(false);
      reset();
    };

    const onSubmitCalulate = (data:IFormValueCalculate) => {
      
      const arrayDataAgrupada = [ ...extraItems, ...personResumen];
      const totalPorPersona = arrayDataAgrupada.reduce((acc, curr) => {
      if (acc[curr.user!]) {
        acc[curr.user!] += curr.total;
      } else {
        acc[curr.user!] = curr.total;
      }
      return acc; 
    }, {} as { [key: string]: number });

    const totalDataItems = data.items.reduce((acc, curr) => {
      if (acc[curr.user]) {
        acc[curr.user] += curr.total;
      } else {
        acc[curr.user] = curr.total;
      }
      return acc; 
    }, {} as { [key: string]: number });

    const firtsPerson = amountCalculate(totalDataItems.Andreina, totalPorPersona.Andreina);
    const secondPerson = amountCalculate(totalDataItems.Victorio, totalPorPersona.Victorio);

    const total = calculateAmountToPay(firtsPerson, secondPerson);
    const user = getPersonToPay(firtsPerson, secondPerson);
console.log(total)
    setDiff(() => {
      return{user, total}
      })
    };
  return (
    <Modal
      width={800}
      open={estado}
      onCancel={handleCancel}
      onOk={handleSubmit(onSubmitCalulate)}
      okButtonProps={{ className: "bg-gray-950 hover:!bg-gray-800 text-yellow-500 hover:!text-yellow-500" }}
      cancelButtonProps={{ className: "border hover:!border-yellow-500 hover:!text-yellow-500"}}
      title={<div className="font-bold underline">Calcular Diferencia</div>}
    >
      <Row gutter={16}>
        <Col span={14}>
          <span className="font-bold mb-4 inline-block">Gastos Fijos:</span>
          <Form layout="vertical">
            {fixedExpenses?.map((f, index) => (
              <DivisionRow 
                spentType = {f.spent_type} 
                total     = {f.total} 
                control   = {control} 
                index     = {index} 
                errors    = {errors}
              />
            ))}
          </Form>
        </Col>
        <Col span={10}>
          <span className="font-bold mb-4 inline-block">Gastos Adicionales</span>
          {extraItems?.map((f) => (
            <ExtraImtes key={f.id} person={f.user} monto={f.total}/>
          ))}
        </Col>
      </Row>
      {
        diff.total > 0 &&
      <div className="flex">
        <span className="grow text-left font-bold">Transferir a {diff.user}:</span>
        <span className="font-bold">$ {diff?.total?.toLocaleString('es-ES')}</span>
      </div>      
      }
    </Modal>
  )
}
