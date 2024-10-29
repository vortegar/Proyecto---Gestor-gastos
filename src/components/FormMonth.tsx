import { useContext, useState } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';

import { Form, Select } from 'antd';
import { Option } from 'antd/es/mentions';

import { useBtnRefresh } from '../hooks/useBtnRefresh';

import { ButtonSearch } from './ButtonSearch';

import { YearContext } from '../context/YearContextProvider';
import { MonthContext } from '../context/MonthContextProvider';

import { getMonthById } from '../services/monthServides';

import { Month } from '../interface/MonthInterface';
import { FormMonthProps } from './intercafeComponents';

export const FormMonth: React.FC<FormMonthProps>  = ({fn}) => {
  const { control, handleSubmit, formState: { errors }, reset } = useForm<Month>();

  const { yearContext } = useContext(YearContext);
  const { monthContext } = useContext(MonthContext);
  
  const [anioActual] = useState(yearContext[yearContext.length - 1]);

  const {isBlockBtn, toggleBlockBtn} = useBtnRefresh();

  const onSearchMonth: SubmitHandler<Month> = async(data) => {
    toggleBlockBtn()
    getMonthById( anioActual.id! ,data.month!, fn, toggleBlockBtn)
    reset()
  };

  return (
    <>
      <Form style={{display: 'flex', gap: "0.8vw"}} onFinish={handleSubmit(onSearchMonth)}>
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
                <Select {...field} placeholder= "Selecciona un mes" style={{width: '20vw'}}>
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
          <ButtonSearch disabled={isBlockBtn} title='Buscar mes'/>
        </Form.Item>
      </Form>
    </>
  );  
};

