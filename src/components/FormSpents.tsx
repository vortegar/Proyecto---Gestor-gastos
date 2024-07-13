import { useContext } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';

import { Table, Input, Button, Form } from 'antd';
import { SpentContext } from '../context/SpentContextProvider';

type Inputs = {spent: string};

export const FormSpents: React.FC = () => {
  const { control, register, handleSubmit, formState: { errors }, setValue } = useForm<Inputs>();
  
  const { spentContext, setSpentContext } = useContext(SpentContext);

  const onSubmitSpent: SubmitHandler<Inputs> = data => {
    console.log(data);
    if (!data.spent) return;
    
    const indexKey = spentContext.length + 1
    const newDataSpent = { key: indexKey, spent_name: data.spent }
    setSpentContext( v => [...v, newDataSpent])
  };

  const spentsColumns = [
    {
      title: 'Gastos definidos',
      dataIndex: 'spent_name',
      key: 'spent_name',
    },
  ];

  return (
    <>
      <Form layout="vertical" onFinish={handleSubmit(onSubmitSpent)}>
        <Form.Item
          validateStatus={errors.spent ? 'error' : ''}
          help={errors.spent ? errors.spent.message : ''}
        >
          <Controller
            name="spent"
            control={control}
            rules={{ required: "Este campo es obligatorio" }}
            render={({ field }) => (
              <>
                <Input 
                  {...field} 
                  placeholder="Introduce el nombre del nuevo gasto"
                />
              </>
            )}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">Agregar Nuevo Gasto</Button>
        </Form.Item>
      </Form>
      <Table columns={spentsColumns} dataSource={spentContext} />
    </>
  );  
};

