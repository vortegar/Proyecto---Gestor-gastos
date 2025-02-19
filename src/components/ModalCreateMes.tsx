import { useContext, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { Form, Modal, notification, Select } from 'antd';

import { MonthContext } from '../context/MonthContextProvider';

import { addMonth } from '../services/monthServides';
import { ModalCreateMesProps, OnSubmitMesParams } from './intercafeComponents';
import { YearContext } from '../context/YearContextProvider';
import { Month } from '../interface/MonthInterface';

const { Option } = Select;
export const ModalCreateMes:React.FC<ModalCreateMesProps> = ({estado, modificador, fn, year}) => {

  const { control, handleSubmit, reset } = useForm<OnSubmitMesParams>();
  
  const { yearContext } = useContext(YearContext);
  const { monthContext } = useContext(MonthContext);
  
  const [anioActual] = useState(yearContext[yearContext.length - 1])

    const handleCancel = () => {
      modificador(false);
      reset();
    };
    
    const onSubmitMes = ({name}: OnSubmitMesParams) => {
      const monthName = monthContext.find( s => s.month?.toLowerCase() == name.toLowerCase())
      if( monthName != undefined) {
        notification.error({
          message: 'Error',
          description: 'Este Mes ya existe.',
        });
        return
      }
      modificador(false);
      addMonth(anioActual.id!, name);
      fn();
      reset();
    }

    const months = [
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
      { id: 12, name: 'Diciembre' },
    ];

    const avalibleMonths = months.filter( m => {
      return !year?.month.some(( v:Month ) => {
        return m.name === v.month
      })
    })
    
  return (
    <Modal
      open={estado}
      onOk={handleSubmit(onSubmitMes)}
      onCancel={handleCancel}
      okButtonProps={{ className: "bg-gray-950 hover:!bg-gray-800 text-yellow-500 hover:!text-yellow-500" }}
      cancelButtonProps={{ className: "border hover:!border-yellow-500 hover:!text-yellow-500"}}
    >
      {
        avalibleMonths.length > 0 
        ?<>
          <h2 className="font-bold mb-5">Selecciona el mes a crear</h2>
          <Form layout="vertical">
            <Form.Item>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <Select {...field} placeholder= "Meses">                
                    {
                      avalibleMonths.map( (i) => (
                          <Option key={i.id} value={i.name}>{i.name}</Option>
                        ))
                    }
                  </Select>
                )}
              />
            </Form.Item>
          </Form>
        </>
        :<span>Haz creado todos los meses</span>
      }
    </Modal>
  )
}
