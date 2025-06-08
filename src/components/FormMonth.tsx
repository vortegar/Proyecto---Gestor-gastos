import { useContext } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';

import { Form, Select } from 'antd';
import { Option } from 'antd/es/mentions';

import { useBtnRefresh } from '../hooks/useBtnRefresh';

import { MonthContext } from '../context/MonthContextProvider';

import { getMonthById } from '../services/monthServides';

import { Month } from '../interface/MonthInterface';
import { FormMonthProps } from './intercafeComponents';
import { useActualDate } from '../hooks/useActualDate';
import { Btns } from './Btns';

export const FormMonth: React.FC<FormMonthProps>  = ({fn}) => {
  const { control, handleSubmit, formState: { errors }, reset } = useForm<Month>();

  const { monthContext } = useContext(MonthContext);
  const { anioActual } = useActualDate();
  
  const {isBlockBtn, toggleBlockBtn} = useBtnRefresh();
  const onSearchMonth: SubmitHandler<Month> = async(data) => {
    toggleBlockBtn()
    getMonthById( anioActual.id! ,data.month!, fn, toggleBlockBtn)
    reset()
  };

  return (
    <>
      <Form className="flex gap-4" onFinish={handleSubmit(onSearchMonth)}>
        <Form.Item
          validateStatus={errors.month ? 'error' : ''}
          help={errors.month ? errors.month.message : ''}
        >
          <Controller
            name    = "month"
            control = {control}
            rules   = {{ required: "Este campo es obligatorio" }}
            render  = {({ field }) => (
              <>
                <Select {...field} placeholder= "Selecciona un mes"   className="w-60 min-w-[240px]">
                    {
                      monthContext.map( (i) => (
                        <Option key={i.id} value={i.id}> {i.month} </Option>
                      ))
                    }
                  </Select>
              </>
            )}
          />
        </Form.Item>
        <Form.Item>
          <Btns disabled={isBlockBtn} title='Buscar Mes' type='Cargando' fn={() => console.log('implementar')}/>
        </Form.Item>
      </Form>
    </>
  );  
};

