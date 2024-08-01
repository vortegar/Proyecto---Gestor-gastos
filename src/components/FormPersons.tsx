import { useContext, useEffect } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';

import { Table, Input, Form, notification } from 'antd';

import { PersonContext } from '../context/PersonContextProvider';
import { addPerson, deletePerson, getDataPerson } from '../services/formPersonServices';

import { useBtnRefresh } from '../hooks/useBtnRefresh';

import { ButtonAdd } from './ButtonAdd';
import { ButtonDelete } from './ButtonDelete';

type Inputs = {name: string};

export const FormPersons: React.FC = () => {
  const { control, register, handleSubmit, formState: { errors }, setValue } = useForm<Inputs>();

  const { personContext, setPersonContext } = useContext(PersonContext);
  const {isBlockBtn, toggleBlockBtn, isBlockBtnDelete, toggleBlockBtnDelete, refresh, toggleRefresh} = useBtnRefresh()

  useEffect(() => {
    getDataPerson(setPersonContext)
  }, [refresh])

  const onSubmitPerson: SubmitHandler<Inputs> = data => {
    const personName = personContext.find( s => s.person_name.toLowerCase() == data.name.toLowerCase())
    if( personName != undefined) {
      notification.error({
        message: 'Error',
        description: 'Esta persona ya existe.',
      });
      return      
    }
    toggleBlockBtn();
    addPerson(data);
    toggleRefresh();
    setTimeout(() => {
      toggleBlockBtn();
    }, 300);
  };

  const namesColums = [
    {
      title: 'Usuarios',
      dataIndex: 'person_name',
      key: 'person_name',
      align: 'center',
    },
    {
      title: 'Acción',
      dataIndex: 'eliminar',
      key: 'eliminar',
      width: 50,
      align: 'center',
      render: (text, name) => (
        <ButtonDelete 
          disabled={isBlockBtnDelete} 
          fn={() => deletePerson(name, toggleBlockBtnDelete, toggleRefresh) } 
        />
      )
    }
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
          <ButtonAdd disabled={isBlockBtn} title='Nuevo Nombre'/>
        </Form.Item>
      </Form>
      <Table 
        columns={namesColums} 
        dataSource={personContext} 
        locale={{
          emptyText: <span>Sin información</span> 
        }}
        />
    </>
  );  
};

