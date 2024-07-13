import { useContext } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';

import { PersonContext } from '../../context/PersonContextProvider';

import { Table, Input, Button, Form, Row, Col, } from 'antd';
import { FormSpents } from '../../components/FormSpents';
import { FormPersons } from '../../components/FormPersons';

type Inputs = {
  spent: string;
  name: string;
};

export const Configurate: React.FC = () => {
  const { control, register, handleSubmit, formState: { errors }, setValue } = useForm<Inputs>();
  
  const { personContext, setPersonContext } = useContext(PersonContext);

  const onSubmitPerson: SubmitHandler<Inputs> = data => {
    console.log(data.name);
    const indexKey = personContext.length + 1
    const newDataPerson = { key: indexKey, person_name: data.name }
    setPersonContext( v => [...v, newDataPerson])
  };

  const namesColums = [
    {
      title: 'Nombres',
      dataIndex: 'person_name',
      key: 'person_name',
    },
  ];

  return (
    <>
      <h2>Configuración</h2>

    <Row gutter={16}>
      <Col span={12}>
        <FormSpents/>
      </Col>
        <Col span={12}>
     <FormPersons/>     
      </Col>
    </Row>
    </>
  );  
};

