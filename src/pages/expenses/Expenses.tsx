import { useContext, useEffect } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';

import { Option } from 'antd/es/mentions';
import { Table, Input, Form, Select, Row, Col, Divider } from 'antd';

import { SpentContext } from '../../context/SpentContextProvider';
import { MonthContext } from '../../context/MonthContextProvider';
import { PersonContext } from '../../context/PersonContextProvider';

import { InputsExpenses } from '../../interface/ExpensesInterface';

import { getDataMonth } from '../../services/monthServides';
import { deleteExpense, updateExpenses } from '../../services/expensesServices';

import { ButtonAdd } from '../../components/ButtonAdd';
import { useBtnRefresh } from '../../hooks/useBtnRefresh';
import { ButtonDelete } from '../../components/ButtonDelete';

export const Expenses: React.FC = () => {
  const { control, handleSubmit, formState: { errors }, reset, getValues } = useForm<InputsExpenses>();
  const {isBlockBtn, toggleBlockBtn, isBlockBtnDelete, toggleBlockBtnDelete, refresh, toggleRefresh} = useBtnRefresh()
  
  const { spentContext } = useContext(SpentContext);
  const { personContext } = useContext(PersonContext);
  const { monthContext, setMonthContext } = useContext(MonthContext);

  const mesActual = monthContext[monthContext.length - 1].name;
  
  useEffect(() => {
    getDataMonth(setMonthContext)
  }, [refresh])

  const onSubmitExpenses: SubmitHandler<InputsExpenses> = data => {
    updateExpenses(data, mesActual)
    toggleRefresh();
    reset();
  };

  const columns = [
    {
      title: 'Tipo de Gasto',
      dataIndex: 'spent_type',
      key: 'spent_type',
    },
    {
      title: 'Monto',
      dataIndex: 'monto',
      key: 'monto',
    },
    {
      title: 'Asignado a',
      dataIndex: 'user',
      key: 'user',
    },
    {
      title: 'Fecha',
      dataIndex: 'fecha',
      key: 'fecha',
    },
    {
      title: 'Descripción',
      dataIndex: 'descripcion',
      key: 'descripcion',
    },
    {
      title: 'Acción',
      dataIndex: 'eliminar',
      key: 'eliminar',
      render: (text, expense) => (
        <ButtonDelete 
          disabled={isBlockBtnDelete} 
          fn={() => deleteExpense(expense, toggleBlockBtnDelete, toggleRefresh, mesActual) } 
        />
      )
    }
  ];

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent:'space-between', paddingLeft: '24px', paddingRight: '90px' }}>
        <h2>Gastos del mes {monthContext[mesActual]?.name}</h2>
      </div>
      <Divider/>
      <Form layout="vertical" style={{marginTop: '50px'}} onFinish={handleSubmit(onSubmitExpenses)}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item>
              <Controller
                name="spent_type"
                control={control}
                render={({ field }) => (
                  <Select {...field} placeholder= "Tipo de gasto">
                    {
                      spentContext.map( (i) => (
                        <Option key={i.key} value={i.spent_name}>{i.spent_name}</Option>
                      )
                      )
                    }
                  </Select>
                )}
              />
            </Form.Item>
            <Form.Item
              validateStatus={errors.user ? 'error' : ''}
              help={errors.user ? errors.user.message : ''}
            >
              <Controller
                name="user"
                control={control}
                rules={{ 
                  required: "Este campo es obligatorio",
                }}
                render={({ field }) => (
                  <Select {...field} placeholder= "A quien se le asignara">
                    {
                      personContext.map( (i) => (
                        <Option key={i.key} value={i.person_name}>{i.person_name}</Option>
                      )
                      )
                    }
                  </Select>
                )}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item 
              validateStatus={errors.monto ? 'error' : ''}
              help={errors.monto ? errors.monto.message : ''}
            >
              <Controller
                name="monto"
                control={control}
                rules={{ 
                  required: "Este campo es obligatorio",
                  validate: {
                    positiveNumber: value => {
                      const numericValue = Number(value.replace(/\./g, '').replace(',', '.')); 
                      return !isNaN(numericValue) && numericValue >= 0 || "El monto no puede ser negativo";
                    }
                  }
                }}
                render={({ field: { onChange, onBlur, value, ref } }) => (
                <Input
                  type="text"
                  placeholder="Monto"
                  value={value}
                  onChange={onChange}
                  onBlur={() => {
                    onBlur();
                    const formatValue = Number(value).toLocaleString('es-ES');
                    onChange(formatValue);
                  }}
                  inputRef={ref}
                />
              )}
              />
            </Form.Item>
            <Form.Item>
              <Controller
                name="fecha"
                control={control}
                render={({ field }) => (
                  <Input {...field} placeholder= "Fecha"/>
                )}
              />
            </Form.Item>
            <Form.Item>
              <Controller
                name="descripcion"
                control={control}
                render={({ field }) => (
                  <Input {...field} placeholder= "Descripcion (opcional)"/>
                )}
              />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <ButtonAdd disabled={isBlockBtn} title='Agregar Gasto'/>
        </Form.Item>
      </Form>
      <Table 
        columns={columns} 
        dataSource={monthContext[0]?.expenses} 
        locale={{
          emptyText: <span>Aun no existen gastos en el mes</span> 
        }}
        />
    </div>
  );  
};

