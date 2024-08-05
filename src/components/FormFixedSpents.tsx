import { useContext, useEffect } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';

import { Table, Input, Form, notification } from 'antd';

import { useBtnRefresh } from '../hooks/useBtnRefresh';

import { ButtonAdd } from './ButtonAdd';
import { ButtonDelete } from './ButtonDelete';

import { FixedSpentContext } from '../context/FixedSpentContextProvider';
import { addFixedSpent, deleteFixedSpent, getDataFixedSpent } from '../services/fixedExpensesServices';

type Inputs = {fixed_spent_name: string};

export const FormFixedSpents: React.FC = () => {
  const { control, handleSubmit, formState: { errors }, reset } = useForm<Inputs>();
  
  const { fixedSpentContext, setFixedSpentContext } = useContext(FixedSpentContext);
  const {isBlockBtn, toggleBlockBtn, isBlockBtnDelete, toggleBlockBtnDelete, refresh, toggleRefresh} = useBtnRefresh()

  useEffect(() => {
    getDataFixedSpent(setFixedSpentContext)
  }, [refresh])

  const onSubmitSpent: SubmitHandler<Inputs> = async(data) => {
    if (!data.fixed_spent_name) return;
    const fixedSpentName = fixedSpentContext.find( s => s.fixed_spent_name?.toLowerCase() == data.fixed_spent_name.toLowerCase())
    if( fixedSpentName != undefined) {
      notification.error({
        message: 'Error',
        description: 'Este gasto ya existe.',
      });
      return      
    }
    toggleBlockBtn();
    try {
      await addFixedSpent(data);
      toggleRefresh();
      toggleBlockBtn();
      reset();
    } catch (error) {
      console.log('error', error)      
    }
  };

  
  const fixedSpentsColumns = [
    {
      title: 'Gastos Fijos',
      dataIndex: 'fixed_spent_name',
      key: 'fixed_spent_name',
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
          fn={() => deleteFixedSpent(name, toggleBlockBtnDelete, toggleRefresh) } 
        />
      )
    }
  ];

  return (
    <>
      <Form layout="vertical" onFinish={handleSubmit(onSubmitSpent)}>
        <Form.Item
          validateStatus={errors.fixed_spent_name ? 'error' : ''}
          help={errors.fixed_spent_name ? errors.fixed_spent_name.message : ''}
        >
          <Controller
            name="fixed_spent_name"
            control={control}
            rules={{ required: "Este campo es obligatorio" }}
            render={({ field }) => (
              <>
                <Input 
                  {...field} 
                  placeholder="Introduce el nombre del gasto fijo"
                />
              </>
            )}
          />
        </Form.Item>
        <Form.Item>
          <ButtonAdd disabled={isBlockBtn} title='Agregar Gasto Fijo'/>
        </Form.Item>
      </Form>
      <Table 
        columns={fixedSpentsColumns} 
        dataSource={fixedSpentContext} 
        locale={{
          emptyText: <span>Sin información</span> 
        }}
        />
    </>
  );  
};

