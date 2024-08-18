import { useContext, useState } from "react";
import { Controller, useForm, SubmitHandler } from "react-hook-form";

import { Form, Input } from "antd";

import { MonthContext } from "../context/MonthContextProvider";
import { FixedSpentContext } from "../context/FixedSpentContextProvider";

import { ButtonAdd } from "./ButtonAdd";

import { useBtnRefresh } from "../hooks/useBtnRefresh";

import { updateFixedExpenses } from "../services/expensesServices";
import { FixedExpenseInputs } from "./intercafeComponents";
import { YearContext } from "../context/YearContextProvider";

export const FormFixedExpenses:  React.FC = () => {
  const { control, handleSubmit } = useForm<FixedExpenseInputs>();
  const { fixedSpentContext } = useContext(FixedSpentContext);
  const {isBlockBtn, toggleBlockBtn, toggleRefresh} = useBtnRefresh()
  
  const { monthContext } = useContext(MonthContext);
  const { yearContext } = useContext(YearContext);

  const [anioActual] = useState(yearContext[yearContext.length - 1])

  
  const mesActual = monthContext[monthContext.length - 1]?.id;

    const onSubmitFixedSpent: SubmitHandler<FixedExpenseInputs> = async(data) => {
        // console.log(data)
        // if (!data.spent_name) return;
    
        toggleBlockBtn();
        try {
          await updateFixedExpenses(data, anioActual.id!, mesActual!);
          toggleRefresh();
          toggleBlockBtn();
    
        } catch (error) {
         console.log('error', error) 
        }
      };
  return (
    <Form layout="vertical" onFinish={handleSubmit(onSubmitFixedSpent)}>
      {
        fixedSpentContext.map((f) => (                    
            <Form.Item
            // validateStatus={errors.spent_name ? 'error' : ''}
            // help={errors.spent_name ? errors.spent_name.message : ''}
            >
              <Input disabled={true} defaultValue={f.fixed_spent_name} />
                <Controller
                  name={f.fixed_spent_name}
                  control={control}
                  rules={{ required: "Este campo es obligatorio" }}
                  render={({ field }) => (
                    <>
                      <Input 
                        {...field} 
                        placeholder={`Introduce el Gasto de: ${f.fixed_spent_name}`}
                      />
                    </>
                  )}
                />
              </Form.Item>
           ))
          }
          <Form.Item>
            <ButtonAdd disabled={isBlockBtn} title='Agregar Gasto Fijo'/>
            </Form.Item>
          </Form>    
  )
}