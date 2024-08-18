// import { useContext } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { Form, Input, Modal } from 'antd';

import { ModalCreateMesProps, OnSubmitYearParams } from './intercafeComponents';
// import { YearContext } from '../context/YearContextProvider';
import { addYear } from '../services/yearServides';

export const ModalCreateYear:React.FC<ModalCreateMesProps> = ({estado, modificador, fn}) => {

  const { control, handleSubmit, reset } = useForm<OnSubmitYearParams>();
  // const { yearContext, setYearContext } = useContext(YearContext);
  
    const handleCancel = () => {
      modificador(false);
      reset();
    };

    const onSubmitYear = ({year}: OnSubmitYearParams) => {
      // const monthName = monthContext.find( s => s.month?.toLowerCase() == name.toLowerCase())
      // if( monthName != undefined) {
      //   notification.error({
      //     message: 'Error',
      //     description: 'Este Mes ya existe.',
      //   });
      //   return
      // }
      modificador(false);
      addYear(year);
      fn();
      reset();
    }

  return (
    <Modal
      open={estado}
      onOk={handleSubmit(onSubmitYear)}
      onCancel={handleCancel}
      okButtonProps={{ className: 'custom-button' }}
    >
    <h2>Escribe el nuevo periodo Anual</h2>
    <Form layout="vertical">
      <Form.Item>
        <Controller
          name="year"
          control={control}
          render={({ field }) => (
            <>
              <Input 
                {...field} 
                placeholder='2025'
              />
            </>
          )}
        />
      </Form.Item>
    </Form>
  </Modal>
  )
}
