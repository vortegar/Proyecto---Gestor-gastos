import { Controller } from 'react-hook-form';

import { Col, Form, Input, Row, Select } from 'antd';

import { IDivisionRow } from './intercafeComponents';
import { useContext } from 'react';
import { PersonContext } from '../context/PersonContextProvider';
import { Option } from 'antd/es/mentions';

export const DivisionRow:React.FC<IDivisionRow> = ({spentType , total, control, index, errors}) => {

  const { personContext } = useContext(PersonContext);

  return (
    <Row gutter={16} align="middle">
      <Col span={10}> 
        <Form.Item>
          <Input disabled={true} defaultValue={`${spentType}: ${total}`} />
        </Form.Item>
      </Col>
      <Col span={6}> 
        <Form.Item>
          <Controller
            name={`items.${index}.monto`}
            control={control}
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <Input
                type="number"
                placeholder="Divisor"
                value={value}
                onChange={(e: { target:{ value: string}}) => {
                  const numericValue = parseFloat(e.target.value); 
                  onChange(isNaN(numericValue) ? '' : spentType.toUpperCase() === 'ALQUILER DEPTO' 
                                                    ? (total * 0.4) : (total/ numericValue)
                  ); 
                }}
                onBlur={onBlur}
                inputRef={ref}
              />
            )}
          />
        </Form.Item>
      </Col>
      <Col span={6}> 
        <Form.Item
          validateStatus={errors?.items?.[index]?.person ? 'error' : ''}
          help={errors?.items?.[index]?.person?.message as React.ReactNode} 
        >
          <Controller
            name={`items.${index}.person`}      
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