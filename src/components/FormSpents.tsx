import { useContext, useEffect } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';

import { Table, Input, Form, notification } from 'antd';

import { SpentContext } from '../context/SpentContextProvider';

import { useBtnRefresh } from '../hooks/useBtnRefresh';

import { addSpent, deleteSpent, getDataSpent } from '../services/spentsServices';

import { ButtonAdd } from './ButtonAdd';
import { ButtonDelete } from './ButtonDelete';

type Inputs = {spent_name: string};

export const FormSpents: React.FC = () => {
  const { control, register, handleSubmit, formState: { errors }, setValue } = useForm<Inputs>();
  
  const { spentContext, setSpentContext } = useContext(SpentContext);
  const {isBlockBtn, toggleBlockBtn, isBlockBtnDelete, toggleBlockBtnDelete, refresh, toggleRefresh} = useBtnRefresh()

  useEffect(() => {
    getDataSpent(setSpentContext)
  }, [refresh])

  const onSubmitSpent: SubmitHandler<Inputs> = data => {
    if (!data.spent_name) return;

    const spentName = spentContext.find( s => s.spent_name?.toLowerCase() == data.spent_name.toLowerCase())
    if( spentName != undefined) {
      notification.error({
        message: 'Error',
        description: 'Este gasto ya existe.',
      });
      return      
    }
    toggleBlockBtn();
    addSpent(data);
    toggleRefresh();
    setTimeout(() => {
      toggleBlockBtn();
    }, 300);
  };

  const spentsColumns = [
    {
      title: 'Gastos definidos',
      dataIndex: 'spent_name',
      key: 'spent_name',
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
          fn={() => deleteSpent(name, toggleBlockBtnDelete, toggleRefresh) } 
        />
      )
    }
  ];

  return (
    <>
      <Form layout="vertical" onFinish={handleSubmit(onSubmitSpent)}>
        <Form.Item
          validateStatus={errors.spent_name ? 'error' : ''}
          help={errors.spent_name ? errors.spent_name.message : ''}
        >
          <Controller
            name="spent_name"
            control={control}
            rules={{ required: "Este campo es obligatorio" }}
            render={({ field }) => (
              <>
                <Input 
                  {...field} 
                  placeholder="Introduce el nombre del gasto"
                />
              </>
            )}
          />
        </Form.Item>
        <Form.Item>
          <ButtonAdd disabled={isBlockBtn} title='Nuevo Gasto'/>
        </Form.Item>
      </Form>
      <Table 
        columns={spentsColumns} 
        dataSource={spentContext} 
        locale={{
          emptyText: <span>Sin información</span> 
        }}
        />
    </>
  );  
};

