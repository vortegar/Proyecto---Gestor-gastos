import { useContext, useEffect } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';

import { Table, Input, Form, message } from 'antd';

import { SpentContext } from '../context/SpentContextProvider';

import { useBtnRefresh } from '../hooks/useBtnRefresh';

import { addSpent, deleteSpent, getDataSpent } from '../services/spentsServices';

import { ButtonAdd } from './ButtonAdd';
import { ButtonDelete } from './ButtonDelete';
import { Spent } from '../interface/ComponentsInterface';
import { ColumnsType } from 'antd/es/table';

import { SpentsInputs } from './intercafeComponents';
import { MESSAGE_ADD_ITEM, MESSAGE_ERROR } from '../constants/constantesServices';

export const FormSpents: React.FC = () => {
  const { control, handleSubmit, formState: { errors }, reset } = useForm<SpentsInputs>();
  
  const { spentContext, setSpentContext } = useContext(SpentContext);
  const {isBlockBtn, toggleBlockBtn, isBlockBtnDelete, toggleBlockBtnDelete, refresh, toggleRefresh} = useBtnRefresh()

  useEffect(() => {
    getDataSpent(setSpentContext)
  }, [refresh, setSpentContext])

  const onSubmitSpent: SubmitHandler<SpentsInputs> = async(data) => {
    if (!data.spent_name) return;

    const spentName = spentContext.find( s => s.spent_name?.toLowerCase() == data.spent_name.toLowerCase())
    if( spentName != undefined) {
      message.error('Este gasto ya existe');
      return      
    }
    toggleBlockBtn();
    try {
      await addSpent(data);
      toggleRefresh();
      toggleBlockBtn();
      reset();
      message.success(MESSAGE_ADD_ITEM);
    } catch (error) {
      message.error(MESSAGE_ERROR);
     console.log('error', error); 
    }
  };

  const spentsColumns: ColumnsType<Spent> = [
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
      render: (_, name) => (
        <ButtonDelete 
          disabled={isBlockBtnDelete} 
          fn={() => deleteSpent(name.id, toggleBlockBtnDelete, toggleRefresh) } 
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
          <ButtonAdd disabled={isBlockBtn} title='Agregar Gasto'/>
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

