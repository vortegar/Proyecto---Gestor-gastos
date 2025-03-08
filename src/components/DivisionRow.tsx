import { useContext, useEffect } from 'react';
import { Controller } from 'react-hook-form';

import { Option } from 'antd/es/mentions';
import { Col, Form, Input, Row, Select } from 'antd';

import { IDivisionRow } from './intercafeComponents';

import { PersonContext } from '../context/PersonContextProvider';

export const DivisionRow:React.FC<IDivisionRow> = ({spentType , total, control, index, setValue, errors}) => {
  const { personContext } = useContext(PersonContext);

  useEffect(() => {
    const calculatedValue = spentType.toUpperCase() === "ARRIENDO" ? total * 0.4 : total / 2;
    setValue(`items.${index}.total`, calculatedValue);
  }, [total, spentType, setValue, index]);
  
  return (
    <Row gutter={16} align="middle">
      <Col span={10}> 
        <Form.Item>
          <Input disabled={true} defaultValue={`${spentType}: ${total}`} className="custom-disabled-input"/>
        </Form.Item>
      </Col>
      <Col span={6}> 
        <Form.Item>
          <Controller
            name={`items.${index}.total`}
            control={control}
            render={({ field: { onChange, value, onBlur, ref } }) => (
              <Input
                type="number"
                placeholder="Divisor"
                value={value}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {onChange(e.target.value)}}
                onBlur={onBlur}
                inputRef={ref}
              />
            )}
          />
        </Form.Item>
      </Col>
      <Col span={6}> 
        <Form.Item
          validateStatus={errors?.items?.[index]?.user ? 'error' : ''}
          help={errors?.items?.[index]?.user?.message as React.ReactNode} 
        >
          <Controller
            name={`items.${index}.user`}      
            control={control}
            rules={{ required: "Este campo es obligatorio" }}
            render={({ field }) => (
              <Select {...field} placeholder= "Person que realizo el pago">
                {
                  personContext.map( (i) => (
                    <Option key={i.id} value={i.person_name}>{i.person_name}</Option>
                  ))
                }
              </Select>
            )}
          />
        </Form.Item>
      </Col>            
    </Row>
  )
}
