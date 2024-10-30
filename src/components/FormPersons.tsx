import { useContext, useEffect } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';

import { ColumnsType } from 'antd/es/table';
import { Table, Input, Form, message } from 'antd';

import { PersonContext } from '../context/PersonContextProvider';
import { addPerson, deletePerson, getDataPerson } from '../services/formPersonServices';

import { useBtnRefresh } from '../hooks/useBtnRefresh';

import { ButtonAdd } from './ButtonAdd';
import { ButtonDelete } from './ButtonDelete';

import { PersonInputs } from './intercafeComponents';
import { Person } from '../interface/ComponentsInterface';
import { MESSAGE_ADD_ITEM, MESSAGE_ERROR } from '../constants/constantesServices';

export const FormPersons: React.FC = () => {
  const { control, handleSubmit, formState: { errors }, reset } = useForm<PersonInputs>();

  const { personContext, setPersonContext } = useContext(PersonContext);
  const {isBlockBtn, toggleBlockBtn, isBlockBtnDelete, toggleBlockBtnDelete, refresh, toggleRefresh} = useBtnRefresh()

  useEffect(() => {
    getDataPerson(setPersonContext)
  }, [refresh, setPersonContext])

  const onSubmitPerson: SubmitHandler<PersonInputs> = async(data) => {
    const personName = personContext.find( s => s.person_name.toLowerCase() == data.name.toLowerCase())
    if( personName != undefined) {
      message.error('Esta persona ya existe');
      return      
    }
    toggleBlockBtn();
    try {
      await addPerson(data);
      toggleRefresh();
      toggleBlockBtn();
      reset();
      message.success(MESSAGE_ADD_ITEM);
    } catch (error) {
      message.error(MESSAGE_ERROR);
      console.log('error', error);    
    }
  };

  const namesColums: ColumnsType<Person> = [
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
      render: (_:string, name) => (
        <ButtonDelete 
          disabled={isBlockBtnDelete} 
          fn={() => deletePerson(name?.id, toggleBlockBtnDelete, toggleRefresh) } 
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
          <ButtonAdd disabled={isBlockBtn} title='Agregar Usuario'/>
        </Form.Item>
      </Form>
      <Table 
        columns={namesColums} 
        dataSource={personContext} 
        title={() => (
          <h4 style={{ textAlign: 'center', fontWeight: 'bold', margin: '0' }}>
            Usuarios
          </h4>
          )}
        locale={{
          emptyText: <span>Sin información</span> 
        }}
        />
    </>
  );  
};

