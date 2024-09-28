import { useContext, useState } from "react";
import { Controller, useForm, SubmitHandler } from "react-hook-form";

import { Form, Input, Select } from "antd";

import { YearContext } from "../context/YearContextProvider";
import { MonthContext } from "../context/MonthContextProvider";

import { ButtonAdd } from "./ButtonAdd";

import { useBtnRefresh } from "../hooks/useBtnRefresh";

import { FixedExpenseInputs } from "./intercafeComponents";

import { updateExtraExpenses } from "../services/expensesServices";
import { PersonContext } from "../context/PersonContextProvider";
import { Option } from "antd/es/mentions";

export const FormExtraExpenses:  React.FC = () => {
  const {isBlockBtn, toggleBlockBtn, toggleRefresh} = useBtnRefresh()

  const { control, handleSubmit, formState: { errors } } = useForm();
  
  const { yearContext } = useContext(YearContext);
  const { monthContext } = useContext(MonthContext);
  const { personContext } = useContext(PersonContext);
  
  const [anioActual] = useState(yearContext[yearContext.length - 1])
  
  const mesActual = monthContext[monthContext.length - 1]?.id;

  const onSubmitExtraSpent: SubmitHandler<FixedExpenseInputs> = async(data) => {
    toggleBlockBtn();
    try {
      await updateExtraExpenses(data, anioActual.id!, mesActual!);
      toggleRefresh();
      toggleBlockBtn();

    } catch (error) {
     console.log('error', error) 
    }
  };
  return (
    <Form layout="vertical" onFinish={handleSubmit(onSubmitExtraSpent)}>
      <Form.Item
        validateStatus={errors.user ? 'error' : ''}
        help={errors.user ? errors.user.message : ''}
      >
        <Controller
          name="user"
          control={control}
          rules={{ required: "Este campo es obligatorio"}}
          render={({ field }) => (
            <Select {...field} placeholder= "Persona que realizo el pago">
              {
                personContext.map( (i) => (
                  <Option key={i.id} value={i.person_name}>{i.person_name}</Option>
                ))
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
        <ButtonAdd disabled={isBlockBtn} title='Agregar Gasto Extra'/>
      </Form.Item>
    </Form>
  );
};
