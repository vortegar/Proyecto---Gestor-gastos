import { useContext, useEffect, useState } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';

import { Option } from 'antd/es/mentions';
import { ColumnsType } from 'antd/es/table';
import { Table, Input, Form, Select, Row, Col, Divider } from 'antd';

import { SpentContext } from '../../context/SpentContextProvider';
import { MonthContext } from '../../context/MonthContextProvider';
import { PersonContext } from '../../context/PersonContextProvider';

import { Expenses, InputsExpenses } from '../../interface/ExpensesInterface';

import { getDataMonth } from '../../services/monthServides';
import { deleteExpense, deleteFixedExpense, updateExpenses } from '../../services/expensesServices';

import { ButtonAdd } from '../../components/ButtonAdd';
import { ButtonDelete } from '../../components/ButtonDelete';
import { FormFixedExpenses } from '../../components/FormFixedExpenses';
import { FixedExpenseInputs } from '../../components/intercafeComponents';

import { useBtnRefresh } from '../../hooks/useBtnRefresh';
import { YearContext } from '../../context/YearContextProvider';

export const ExpensesPage: React.FC = () => {
  const { control, handleSubmit, formState: { errors }, reset } = useForm<InputsExpenses>();
  const {isBlockBtn, isBlockBtnDelete, toggleBlockBtnDelete, refresh, toggleRefresh} = useBtnRefresh()
  
  
  const { yearContext } = useContext(YearContext);
  const { spentContext } = useContext(SpentContext);
  const { personContext } = useContext(PersonContext);
  const { monthContext, setMonthContext } = useContext(MonthContext);
  
  const [anioActual] = useState(yearContext[yearContext.length - 1])
  const mesActual = monthContext[monthContext.length - 1];
  
  useEffect(() => {
    getDataMonth(setMonthContext, anioActual.id!)
  }, [refresh, setMonthContext, anioActual])

  const onSubmitExpenses: SubmitHandler<InputsExpenses> = data => {
    updateExpenses(data, anioActual.id!, mesActual.id!)
    toggleRefresh();
    reset();
  };

  const columns: ColumnsType<Expenses> = [
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
      render: (_, expense) => (
        <ButtonDelete 
          disabled={isBlockBtnDelete} 
          fn={() => deleteExpense(expense, toggleBlockBtnDelete, toggleRefresh, anioActual.id!, mesActual.id!) } 
        />
      )
    }
  ];
  const fixedExpenseColumns: ColumnsType<FixedExpenseInputs> = [
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
      render: (_, expense) => (
        <ButtonDelete 
          disabled={isBlockBtnDelete} 
          fn={() => deleteFixedExpense(expense, toggleBlockBtnDelete, toggleRefresh, anioActual.id!, mesActual.id!) } 
        />
      )
    }
  ];

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent:'space-between', paddingLeft: '24px', paddingRight: '90px' }}>
        <div>
          <h2 style={{ margin: '0'}}>Gastos mes actual: {mesActual?.month}</h2>
          <h2 style={{ marginTop: '0'}}>Año: {anioActual?.year} </h2>
        </div>
      </div>
      <Divider style={{marginTop: '0'}}/>
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
                        <Option key={i.id} value={i.spent_name}>{i.spent_name}</Option>
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
                  <Select {...field} placeholder= "Person que realizo el pago">
                    {
                      personContext.map( (i) => (
                        <Option key={i.id} value={i.person_name}>{i.person_name}</Option>
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
                    positiveNumber: (value: number) => {
                      return value > 0 || "El monto no puede ser negativo";
                    }
                  }
                }}
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <Input
                    type="number"
                    placeholder="Monto"
                    value={value}
                    onChange={(e: { target:{ value: string}}) => {
                      const numericValue = parseFloat(e.target.value); 
                      onChange(isNaN(numericValue) ? '' : numericValue); 
                    }}
                    onBlur={onBlur}
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

