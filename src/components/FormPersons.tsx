import { useContext } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';

import { Table, Input, Button, Form, notification } from 'antd';
import { PersonContext } from '../context/PersonContextProvider';
import { PlusOutlined } from '@ant-design/icons';

type Inputs = {name: string};

export const FormPersons: React.FC = () => {
  const { control, register, handleSubmit, formState: { errors }, setValue } = useForm<Inputs>();

  const { personContext, setPersonContext } = useContext(PersonContext);

  const onSubmitPerson: SubmitHandler<Inputs> = data => {
    const personName = personContext.find( s => s.person_name.toLowerCase() == data.name.toLowerCase())
    if( personName != undefined) {
      notification.error({
        message: 'Error',
        description: 'Esta persona ya existe.',
      });
      return      
    }
    const indexKey = personContext.length + 1
    const newDataPerson = { key: indexKey, person_name: data.name }
    setPersonContext( v => [...v, newDataPerson])
  };

  const namesColums = [
    {
      title: 'Usuarios',
      dataIndex: 'person_name',
      key: 'person_name',
    },
  ];

  return (
    <>
      <Form layout="vertical" onFinish={handleSubmit(onSubmitPerson)}>
        <Form.Item
          validateStatus={errors.name ? 'error' : ''}
          help={errors.name ? errors.name.message : ''}
        >
          <Controller
            name="name"
            control={control}
            rules={{ required: "Este campo es obligatorio" }}
            render={({ field }) => (
              <>
                <Input 
                  {...field} 
                  placeholder="Introduce el nombre del usuario"
                />
              </>
            )}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">Agregar Nuevo Nombre <PlusOutlined /></Button>
        </Form.Item>
      </Form>
      <Table columns={namesColums} dataSource={personContext} />
    </>
  );  
};

