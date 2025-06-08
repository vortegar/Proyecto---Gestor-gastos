import '../../utils/chartConfig'

import { HeaderInfo } from "../../components/HeaderInfo";
import { useActualDate } from '../../hooks/useActualDate';
import { Checkbox, Divider } from 'antd';
import { Table, Input, Form } from 'antd';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { Btns } from '../../components/Btns';
import { useState } from 'react';
import { Investments } from '../../interface/ExpensesInterface';
import { ColumnType } from 'antd/es/table';

export const Investig = () => {
  const { anioActual, mesActual } = useActualDate();
  const { control, handleSubmit, reset, formState: { errors } } = useForm<Investments>();

  const [investContext, setInvestContext] = useState<Investments[]>([]);

  const onSubmitInvestment: SubmitHandler<Investments> = async (data) => {
    const nCuotas = data.n_cuotas;
    const newData = Array.from({ length: nCuotas }).map((_, index) => ({
      ...data,
      cuota: index + 1,
      pagado: false,
    }));
    setInvestContext(prev => [...prev, ...newData]);
    reset(); // Limpia el formulario después de agregar
  };

  const namesColums: ColumnType<Investments>[]  = [
    {
      title: 'Inversión',
      dataIndex: 'inversion',
      key: 'inversion',
      align: 'center',
    },
    {
      title: 'Monto',
      dataIndex: 'monto',
      key: 'monto',
      align: 'center',
    },
    {
      title: 'Cuota Número',
      dataIndex: 'cuota',
      key: 'cuota',
      align: 'center',
    },
    {
      title: 'N° Cuotas',
      dataIndex: 'n_cuotas',
      key: 'n_cuotas',
      align: 'center',
    },
    {
      title: 'Pagado',
      dataIndex: 'pagado',
      key: 'pagado',
      align: 'center',
      render: (value: boolean, _recordy: Investments, index: number) => (
        <Checkbox
          checked={value}
          onChange={() => {
            const newData = [...investContext];
            newData[index] = { ...newData[index], pagado: !value };
            setInvestContext(newData);
          }}
        />
      ),
    },
  ];

  const saveInvestments = () => {
    console.log('Inversiones guardadas:', investContext);
  };

  return (
    <>
      <HeaderInfo year={anioActual.year} month={mesActual.month} />
      <Divider />
      <Form
        layout="horizontal"
        onFinish={handleSubmit(onSubmitInvestment)}
        className="flex flex-col items-center justify-center w-full h-[15rem]"
      >
        <div className="flex flex-col gap-1 justify-center">
          <Form.Item
            validateStatus={errors.inversion ? 'error' : ''}
            help={errors.inversion?.message}
          >
            <Controller
              name="inversion"
              control={control}
              rules={{ required: "Este campo es obligatorio" }}
              render={({ field }) => (
                <Input {...field} placeholder="Nombre de la inversión" />
              )}
            />
          </Form.Item>

          <Form.Item
            validateStatus={errors.monto ? 'error' : ''}
            help={errors.monto?.message}
          >
            <Controller
              name="monto"
              control={control}
              rules={{ required: "Este campo es obligatorio" }}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Monto $"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    field.onChange(parseInt(e.target.value, 10) || 0)
                  }
                />
              )}
            />
          </Form.Item>

          <Form.Item
            validateStatus={errors['n_cuotas'] ? 'error' : ''}
            help={errors['n_cuotas']?.message}
          >
            <Controller
              name="n_cuotas"
              control={control}
              rules={{
                required: "Este campo es obligatorio",
                min: { value: 1, message: "Debe ser al menos 1 cuota" },
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Número de Cuotas"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    field.onChange(parseInt(e.target.value, 10) || 0)
                  }
                />
              )}
            />
          </Form.Item>
        </div>

        <Form.Item>
          <Btns
            disabled={false}
            title="Agregar Inversión"
            type="Agregar"
            fn={handleSubmit(onSubmitInvestment)}
          />
        </Form.Item>
      </Form>

      <Table
        columns={namesColums}
        dataSource={investContext.map((item, idx) => ({ ...item, key: idx }))}
        rowKey="key"
        title={() => (
          <h4 className="!text-sm text-white !mb-0 font-bold text-center">
            Inversiones
          </h4>
        )}
        locale={{
          emptyText: <span>Sin información</span>,
        }}
      />

      <Btns disabled={false} title="Guardar" type="Guardar" fn={saveInvestments} />
    </>
  );
};
