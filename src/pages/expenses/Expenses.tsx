import { useContext } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';

import { Option } from 'antd/es/mentions';
import { Table, Input, Button, Form, Select, Row, Col } from 'antd';

import { SpentContext } from '../../context/SpentContextProvider';
import { PersonContext } from '../../context/PersonContextProvider';
import { ExpensesContext } from '../../context/ExpensesContextProvider';

import { InputsExpenses } from '../../interface/ExpensesInterface';

export const Expenses: React.FC = () => {
  const { control, handleSubmit, formState: { errors }, reset } = useForm<InputsExpenses>();
  
  const { spentContext } = useContext(SpentContext);
  const { personContext } = useContext(PersonContext);
  const { expensesContext, setExpensesContext } = useContext(ExpensesContext);
  
  const onSubmitExpenses: SubmitHandler<InputsExpenses> = data => {
    const dataExpense = {
      descripcion: data.descripcion,
      monto      : `${data.monto}`,
      user       : data.user,
      fecha      : data.fecha,
      spent_type : data.spent_type,
    }
    console.log(dataExpense)
    setExpensesContext( v => [...v, dataExpense])
    reset();
  };
  const columns = [
    {
      title: 'Tipo de Gasto:',
      dataIndex: 'spent_type',
      key: 'spent_type',
    },
    {
      title: 'Monto:',
      dataIndex: 'monto',
      key: 'monto',
    },
    {
      title: 'Asignado a:',
      dataIndex: 'user',
      key: 'user',
    },
    {
      title: 'Fecha:',
      dataIndex: 'fecha',
      key: 'fecha',
    },{
      title: 'Descripción:',
      dataIndex: 'descripcion',
      key: 'descripcion',
    },
  ];

  return (
    <div>
      <h2>Gastos del mes en curso</h2>
      <Form layout="vertical" onFinish={handleSubmit(onSubmitExpenses)}>
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
          <Button type="primary" htmlType="submit">
            Agregar Gasto
          </Button>
        </Form.Item>
      </Form>
      <Table columns={columns} dataSource={expensesContext} />
    </div>
  );  
};

