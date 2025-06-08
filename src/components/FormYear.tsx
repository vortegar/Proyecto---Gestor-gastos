import { useContext } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';

import { Form, Select } from 'antd';
import { Option } from 'antd/es/mentions';

import { useBtnRefresh } from '../hooks/useBtnRefresh';
import { YearContext } from '../context/YearContextProvider';

import { Year } from '../interface/YearInterface';
import { getYearById } from '../services/yearServides';
import { Btns } from './Btns';

export const FormYear: React.FC  = () => {
  const { control, handleSubmit, formState: { errors }, reset } = useForm<Year>();
  const { yearContext, dispatch } = useContext(YearContext);

  const {isBlockBtn, toggleBlockBtn} = useBtnRefresh();
  
  const onSearchYear: SubmitHandler<Year> = async(data) => {
    toggleBlockBtn()
    getYearById( data.year!, dispatch ,toggleBlockBtn)

    reset()
  };
  return (
    <>
      <Form className="flex gap-4" onFinish={handleSubmit(onSearchYear)}>
        <Form.Item
          validateStatus={errors.year ? 'error' : ''}
          help={errors.year ? errors.year.message : ''}
        >
          <Controller
            name    = "year"
            control = {control}
            rules   = {{ required: "Este campo es obligatorio" }}
            render  = {({ field }) => (
              <>
                <Select {...field} placeholder= "Selecciona un año" className="w-60 min-w-[240px]">
                    {
                      yearContext?.map( (i) => (
                        <Option key={i.id} value={i.id}> {i.year} </Option>
                      ))
                    }
                  </Select>
              </>
            )}
          />
        </Form.Item>
        <Form.Item>
          <Btns disabled={isBlockBtn} title='Buscar Año' type='Cargando' fn={() => console.log('implementar')} />
        </Form.Item>
      </Form>
    </>
  );  
};

