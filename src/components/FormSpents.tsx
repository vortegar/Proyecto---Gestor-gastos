import { useContext } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';

import { Table, Input, Button, Form, notification } from 'antd';
import { SpentContext } from '../context/SpentContextProvider';
import { PlusOutlined } from '@ant-design/icons';

type Inputs = {spent: string};

export const FormSpents: React.FC = () => {
  const { control, register, handleSubmit, formState: { errors }, setValue } = useForm<Inputs>();
  
  const { spentContext, setSpentContext } = useContext(SpentContext);

  const onSubmitSpent: SubmitHandler<Inputs> = data => {
    if (!data.spent) return;

    const spentName = spentContext.find( s => s.spent_name.toLowerCase() == data.spent.toLowerCase())
    if( spentName != undefined) {
      notification.error({
        message: 'Error',
        description: 'Este gasto ya existe.',
      });
      return      
    }

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
          <Button type="primary" htmlType="submit">Agregar Nuevo Gasto <PlusOutlined /></Button>
        </Form.Item>
      </Form>
      <Table columns={spentsColumns} dataSource={spentContext} />
    </>
  );  
};

