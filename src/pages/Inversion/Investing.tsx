import '../../utils/chartConfig'

import { HeaderInfo } from "../../components/HeaderInfo";
import { useActualDate } from '../../hooks/useActualDate';
import { Checkbox, Divider } from 'antd';
import { Table, Input, Form, message } from 'antd';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { Btns } from '../../components/Btns';
import { useState } from 'react';
// import { Btns } from '../../components/Btns';

export const Investig = () => {
  const {anioActual, mesActual} = useActualDate()
  const { control, handleSubmit, formState: { errors }, reset } = useForm();

  // const {isBlockBtn, toggleBlockBtn, isBlockBtnDelete, toggleBlockBtnDelete, refresh, toggleRefresh} = useBtnRefresh()
  const [investContext, setInvestContext]= useState([])

  const onSubmitInvestment = async(data) => {
    const nCuotas = data.n_cuotas
    // const miArray = Array.from({ length: cantidad });
    const newData = Array.from({ length: nCuotas }).map((_, index) => ({...data, cuota: index + 1}));
    setInvestContext(newData)
  };
  
  const namesColums = [
    {
      title: 'Inversión',
      dataIndex: 'inversion',
      key: 'inversion',
      align: 'center',
    },
    {
      title: 'Monto',
      dataIndex: 'monto',
      key: 'monto',
      align: 'center',
    },
    {
      title: 'Cuota Número',
      dataIndex: 'cuota',
      key: 'cuota',
      align: 'center',
    },
    {
      title: 'N° Cuotas',
      dataIndex: 'n_cuotas',
      key: 'n_cuotas',
      align: 'center',
    },
    {
      title: 'Pagado',
      dataIndex: 'pagado',
      key: 'pagado',
      paid: false,
      align: 'center',
      render: (value: boolean, index: number) => (
        <Checkbox
          checked={value}
          onChange={() => {
            const newData = [...investContext];
            newData[index].pagado = !value;
            setInvestContext(newData);
          }}
        />
      ),
    },
  ];

  console.log(investContext)
  const saveInvestments = () => {console.log(investContext)}
  return (
  <> 
    <HeaderInfo year={anioActual.year} month={mesActual.month}/>
    <Divider/>
        <Form
          layout="horizontal"
          onFinish={handleSubmit(onSubmitInvestment)}
          className="flex flex-col items-center justify-center w-full h-[15rem]"
        >
          <div className="flex flex-col gap-1 justify-center">
            <Form.Item
              validateStatus={errors.inversion ? 'error' : ''}
              help={errors.inveresion?.message}
            >
              <Controller
                name="inversion"
                control={control}
                rules={{ required: "Este campo es obligatorio" }}
                render={({ field }) => (
                  <Input {...field} placeholder="Nombre de la inversión" />
                )}
              />
            </Form.Item>
        <Form.Item
          validateStatus={errors.monto ? 'error' : ''}
          help={errors.monto?.message}
        >
          <Controller
            name="monto"
            control={control}
            rules={{ required: "Este campo es obligatorio" }}
            render={({ field }) => (
              <Input
                 {...field} 
                 placeholder="Monto $" 
                onChange={(e) => field.onChange(parseInt(e.target.value, 10) || 0)}   
              />
            )}
          />
        </Form.Item>
        <Form.Item
          validateStatus={errors['N° de Cuotas'] ? 'error' : ''}
          help={errors['N° de Cuotas']?.message}
        >
          <Controller
            name="n_cuotas"
            control={control}
            rules={{ required: "Este campo es obligatorio" }}
            render={({ field }) => (
              <Input  
                {...field} 
                placeholder="Número de Cuotas" 
                onChange={(e) => field.onChange(parseInt(e.target.value, 10) || 0)}
              />
            )}
          />
        </Form.Item>
      </div>
      <Form.Item>
        <Btns disabled={false} title='Agregar Inversión' type='Agregar' fn={()=> console.log('implementar')} />
      </Form.Item>
      </Form>
          <Table 
            columns={namesColums} 
            dataSource={investContext} 
            title={() => (
              <h4 className="!text-sm text-white !mb-0 font-bold text-center">
                Inversiones
              </h4>
              )}
            locale={{
              emptyText: <span>Sin información</span> 
            }}
            />
        <Btns disabled={false} title='Guardar' type='Guardar' fn={saveInvestments} />

      </>
  )
}



