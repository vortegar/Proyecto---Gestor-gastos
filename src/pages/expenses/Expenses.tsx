import { useContext, useEffect } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';

import { Option } from 'antd/es/mentions';
import { Table, Input, Form, Select, Row, Col, Divider } from 'antd';

import { SpentContext } from '../../context/SpentContextProvider';
import { MonthContext } from '../../context/MonthContextProvider';
import { PersonContext } from '../../context/PersonContextProvider';

import { InputsExpenses } from '../../interface/ExpensesInterface';

import { getDataMonth } from '../../services/monthServides';
import { deleteExpense, deleteFixedExpense, updateExpenses } from '../../services/expensesServices';

import { ButtonAdd } from '../../components/ButtonAdd';
import { useBtnRefresh } from '../../hooks/useBtnRefresh';
import { ButtonDelete } from '../../components/ButtonDelete';
import { FormFixedExpenses } from '../../components/FormFixedExpenses';

export const Expenses: React.FC = () => {
  const { control, handleSubmit, formState: { errors }, reset, getValues } = useForm<InputsExpenses>();
  const {isBlockBtn, toggleBlockBtn, isBlockBtnDelete, toggleBlockBtnDelete, refresh, toggleRefresh} = useBtnRefresh()
  
  const { spentContext } = useContext(SpentContext);
  const { personContext } = useContext(PersonContext);
  const { monthContext, setMonthContext } = useContext(MonthContext);

  const mesActual = monthContext[monthContext.length - 1];
  
  useEffect(() => {
    getDataMonth(setMonthContext)
  }, [refresh])

  const onSubmitExpenses: SubmitHandler<InputsExpenses> = data => {
    updateExpenses(data, mesActual.month)
    toggleRefresh();
    reset();
  };

  const columns = [
    {
      title: 'Gasto',
      dataIndex: 'spent_type',
      key: 'spent_type',
      align: 'center',
    },
    {
      title: 'Monto',
      dataIndex: 'monto',
      key: 'monto',
      align: 'center',
    },
    {
      title: 'Asignado a',
      dataIndex: 'user',
      key: 'user',
      align: 'center',
    },
    // {
    //   title: 'Fecha',
    //   dataIndex: 'fecha',
    //   key: 'fecha',
    // },
    {
      title: 'Descripción',
      dataIndex: 'descripcion',
      key: 'descripcion',
      align: 'center',
    },
    {
      title: 'Acción',
      dataIndex: 'eliminar',
      key: 'eliminar',
      align: 'center',
      render: (text, expense) => (
        <ButtonDelete 
          disabled={isBlockBtnDelete} 
          fn={() => deleteExpense(expense, toggleBlockBtnDelete, toggleRefresh, mesActual.month) } 
        />
      )
    }
  ];
  const fixedExpenseColumns = [
    {
      title: 'Gasto',
      dataIndex: 'spent_type',
      key: 'spent_type',
      align: 'center',
    },
    {
      title: 'Monto',
      dataIndex: 'total',
      key: 'total',
      align: 'center',
    },
    {
      title: 'Acción',
      dataIndex: 'eliminar',
      key: 'eliminar',
      align: 'center',
      render: (text, expense) => (
        <ButtonDelete 
          disabled={isBlockBtnDelete} 
          fn={() => deleteFixedExpense(expense, toggleBlockBtnDelete, toggleRefresh, mesActual.month) } 
        />
      )
    }
  ];

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent:'space-between', paddingLeft: '24px', paddingRight: '90px' }}>
        <h2>Gastos del mes: {mesActual?.month}</h2>
      </div>
      <Divider/>
      <Row gutter={16}>
        <Col span={10}>
          <FormFixedExpenses/>
        </Col>
        <Col span={14}>
          <Form layout="vertical" onFinish={handleSubmit(onSubmitExpenses)}>
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
        <Form.Item>
          <ButtonAdd disabled={isBlockBtn} title='Agregar Gasto'/>
        </Form.Item>
      </Form>
      </Col>

      </Row>
      <Row gutter={16}>
        <Col span={10}>
        <Table 
            columns={fixedExpenseColumns} 
            dataSource={mesActual?.fixed_expenses} 
            title={() => (
              <h4 style={{ textAlign: 'center', fontWeight: 'bold', margin: '0' }}>
                Gastos Fijos
              </h4>
            )}
            locale={{
              emptyText: <span>Aun no existen gastos en el mes</span> 
            }}
            />
            </Col>
            <Col span={14}>
          <Table 
            columns={columns} 
            dataSource={mesActual?.expenses} 
            title={() => (
              <h4 style={{ textAlign: 'center', fontWeight: 'bold', margin: '0' }}>
                Gastos Variables
              </h4>
            )}
            locale={{
              emptyText: <span>Aun no existen gastos en el mes</span> 
            }}
            />
        </Col>
      </Row>

    </div>
  );  
};

