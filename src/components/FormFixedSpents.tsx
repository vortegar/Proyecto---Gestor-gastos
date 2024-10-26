import { useContext, useEffect } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';

import { ColumnsType } from 'antd/es/table';
import { Table, Input, Form, message } from 'antd';

import { useBtnRefresh } from '../hooks/useBtnRefresh';

import { ButtonAdd } from './ButtonAdd';
import { ButtonDelete } from './ButtonDelete';

import { FixedSpentContext } from '../context/FixedSpentContextProvider';
import { addFixedSpent, deleteFixedSpent, getDataFixedSpent } from '../services/fixedExpensesServices';

import { FixedSpentInputs } from './intercafeComponents';
import { FixedSpent } from '../interface/ComponentsInterface';
import { MESSAGE_ADD_ITEM, MESSAGE_ERROR } from '../constants/constantesServices';

export const FormFixedSpents: React.FC = () => {
  const { control, handleSubmit, formState: { errors }, reset } = useForm<FixedSpentInputs>();
  
  const { fixedSpentContext, setFixedSpentContext } = useContext(FixedSpentContext);
  const {isBlockBtn, toggleBlockBtn, isBlockBtnDelete, toggleBlockBtnDelete, refresh, toggleRefresh} = useBtnRefresh()

  useEffect(() => {
    getDataFixedSpent(setFixedSpentContext)
  }, [refresh, setFixedSpentContext])

  const onSubmitSpent: SubmitHandler<FixedSpentInputs> = async(data) => {
    if (!data.fixed_spent_name) return;
    const fixedSpentName = fixedSpentContext.find( s => s.fixed_spent_name?.toLowerCase() == data.fixed_spent_name.toLowerCase())
    if( fixedSpentName != undefined) {
      message.error('Este gasto ya existe.');
      return      
    }
    toggleBlockBtn();
    try {
      await addFixedSpent(data);
      toggleRefresh();
      toggleBlockBtn();
      reset();
      message.success(MESSAGE_ADD_ITEM);
    } catch (error) {
      message.error(MESSAGE_ERROR);
      console.log('error', error)      
    }
  };

  const fixedSpentsColumns: ColumnsType<FixedSpent> = [
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
      render: (_: string, name: FixedSpent) => (
        <ButtonDelete 
          disabled={isBlockBtnDelete} 
          fn={() => deleteFixedSpent(name?.id, toggleBlockBtnDelete, toggleRefresh) } 
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

