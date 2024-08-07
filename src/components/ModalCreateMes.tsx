import { useContext } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { Form, Modal, notification, Select } from 'antd';

import { MonthContext } from '../context/MonthContextProvider';

import { addMonth } from '../services/monthServides';
import { ModalCreateMesProps, OnSubmitMesParams } from './intercafeComponents';

const { Option } = Select;
export const ModalCreateMes:React.FC<ModalCreateMesProps> = ({estado, modificador, fn}) => {

  const { control, handleSubmit, reset } = useForm<OnSubmitMesParams>();
  const { monthContext } = useContext(MonthContext);
  
    const handleCancel = () => {
      modificador(false);
      reset();
    };

    const onSubmitMes = ({name}: OnSubmitMesParams) => {
      const monthName = monthContext.find( s => s.month?.toLowerCase() == name.toLowerCase())
      if( monthName != undefined) {
        notification.error({
          message: 'Error',
          description: 'Este Mes ya existe.',
        });
        return
      }
      modificador(false);
      addMonth(name);
      fn();
      reset();
    }

    const meses = [
      { id: 1, name: 'Enero' },
      { id: 2, name: 'Febrero' },
      { id: 3, name: 'Marzo' },
      { id: 4, name: 'Abril' },
      { id: 5, name: 'Mayo' },
      { id: 6, name: 'Junio' },
      { id: 7, name: 'Julio' },
      { id: 8, name: 'Agosto' },
      { id: 9, name: 'Septiembre' },
      { id: 10, name: 'Octubre' },
      { id: 11, name: 'Noviembre' },
      { id: 12, name: 'Diciembre' }
    ];
    
  return (
    <Modal
      open={estado}
      onOk={handleSubmit(onSubmitMes)}
      onCancel={handleCancel}
      okButtonProps={{ className: 'custom-button' }}

    >
    <h2>Selecciona el Mes</h2>
    <Form layout="vertical">
      <Form.Item>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <Select {...field} placeholder= "Meses">
              {
                meses.map( (i) => (
                  <Option key={i.id} value={i.name}>{i.name}</Option>
                )
                )
              }
            </Select>
          )}
        />
      </Form.Item>
    </Form>
  </Modal>
  )
}
