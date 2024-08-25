import { useContext, useState } from "react";
import { Controller, useForm, SubmitHandler } from "react-hook-form";

import { Col, Form, Input, Row } from "antd";

import { YearContext } from "../context/YearContextProvider";
import { MonthContext } from "../context/MonthContextProvider";
import { FixedSpentContext } from "../context/FixedSpentContextProvider";

import { ButtonAdd } from "./ButtonAdd";

import { useBtnRefresh } from "../hooks/useBtnRefresh";

import { FixedExpenseInputs } from "./intercafeComponents";

import { updateFixedExpenses } from "../services/expensesServices";

export const FormFixedExpenses:  React.FC = () => {
  const { control, handleSubmit } = useForm<FixedExpenseInputs>();
  const { fixedSpentContext } = useContext(FixedSpentContext);
  const {isBlockBtn, toggleBlockBtn, toggleRefresh} = useBtnRefresh()
  
  const { yearContext } = useContext(YearContext);
  const { monthContext } = useContext(MonthContext);

  const [anioActual] = useState(yearContext[yearContext.length - 1])
  
  const mesActual = monthContext[monthContext.length - 1]?.id;

    const onSubmitFixedSpent: SubmitHandler<FixedExpenseInputs> = async(data) => {
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
          <Row gutter={16}>
            {fixedSpentContext.map((f, index) => (
              <Col span={12} key={index}> 
                <Form.Item>
                  <Input disabled={true} defaultValue={f.fixed_spent_name} />
                  <Controller
                    name={f.fixed_spent_name}
                    control={control}
                    rules={{ required: "Este campo es obligatorio" }}
                    render={({ field: { onChange, onBlur, value, ref } }) => (
                      <Input
                        style = {{ marginTop: '0.2vw'}}
                        type="number"
                        placeholder={`Monto ${f.fixed_spent_name}`}
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
              </Col>
            ))}
          </Row>
          <Form.Item>
            <ButtonAdd disabled={isBlockBtn} title='Agregar Gasto Fijo' />
          </Form.Item>
        </Form>
      );
    };
