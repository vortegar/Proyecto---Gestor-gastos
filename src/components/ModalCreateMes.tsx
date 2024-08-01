import { useContext } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { Form, Modal, Select } from 'antd';
// import { firebaseConfig } from '../services/firebase';
import { getFirestore, collection, addDoc } from "firebase/firestore";

import { MonthContext } from '../context/MonthContextProvider';

import { initializeApp } from "firebase/app";
import { firebaseConfig } from '../services/firebase';

export const ModalCreateMes = ({estado, modificador}) => {
  const { control, handleSubmit, formState: { errors }, reset } = useForm();
  const { setMonthContext } = useContext(MonthContext);
  
    const handleCancel = () => {
      modificador(false);
      reset();
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);


  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);

    const addMonth = async (name) => {
      try {
        const docRef = await addDoc(collection(db, "month"), {
          // id       : Math.floor(Math.random() * 100) + 1,
          name     : name,
          expenses : [],
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    };

    const onSubmitMes = ({name}) => {
      const dataMonth = {
        id       : Math.floor(Math.random() * 100) + 1,
        name     : name,
        expenses : [],
      }
      modificador(false);
      setMonthContext( m => [...m, dataMonth])
      addMonth(name);
      reset();
    }

    const meses = [
      { id: 1, name: 'Enero' },
      { id: 2, name: 'Febrero' },
      { id: 3, name: 'Marzo' },
      { id: 4, name: 'Abril' },
      { id: 5, name: 'Mayo' },
      { id: 6, name: 'Junio' },
      { id: 7, name: 'Julio' },
      { id: 8, name: 'Agosto' },
      { id: 9, name: 'Septiembre' },
      { id: 10, name: 'Octubre' },
      { id: 11, name: 'Noviembre' },
      { id: 12, name: 'Diciembre' }
    ];
    
  return (
    <Modal
      open={estado}
      onOk={handleSubmit(onSubmitMes)}
      onCancel={handleCancel}
    >
    <h2>Selecciona el Mes</h2>
    <Form layout="vertical">
      <Form.Item>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <Select {...field} placeholder= "Meses">
              {
                meses.map( (i) => (
                  <Option key={i.id} value={i.name}>{i.name}</Option>
                )
                )
              }
            </Select>
          )}
        />
      </Form.Item>
    </Form>
  </Modal>
  )
}
