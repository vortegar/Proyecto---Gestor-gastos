import { ChangeEvent, useContext, useEffect, useState } from "react";

import { Table } from "antd";
import { ColumnsType } from "antd/es/table";

import * as XLSX from 'xlsx';

import { InputsExpenses } from "../interface/ExpensesInterface";
import { updateExpenses } from "../services/expensesServices";
import { useActualDate } from "../hooks/useActualDate";
import { MonthContext } from "../context/MonthContextProvider";

export const FormExpenses:  React.FC = () => {
  const [data, setData] = useState<InputsExpenses[]>([]);
  const { monthActual } = useContext(MonthContext);
  
  const {anioActual} = useActualDate()

  useEffect(() => {
    setData(monthActual.expenses as [])
 }, [monthActual.expenses])

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const binaryStr = e.target!.result as ArrayBuffer;
        const workbook = XLSX.read(binaryStr, { type: 'binary' });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as [];

        const objectTable = jsonData.slice(1, 46).map(l => {
          return {
            spent_type  : l[0],
            monto       : l[1],
            user_1      : l[2],
            user_2      : l[3],
            fecha       : l[4],
            descripcion : l[5],
          }
       }) as [];

       updateExpenses(objectTable, anioActual.id!, monthActual.id!, setData);
      };
      reader.readAsArrayBuffer(file);
    }
  };

 const columns: ColumnsType<InputsExpenses> = [
  {
    title    : 'Gasto',
    dataIndex: 'spent_type',
    key      : 'spent_type',
    align    : 'center',
  },
  {
    title    : 'Total',
    dataIndex: 'monto',
    key      : 'monto',
    align    : 'center',
  },
  {
    title    : 'Victorio',
    dataIndex: 'user_1',
    key      : 'user_1',
    align    : 'center',
  },
  {
    title    : 'Andreina',
    dataIndex: 'user_2',
    key      : 'user_2',
    align    : 'center',
  },
  {
    title    : 'Descripción',
    dataIndex: 'descripcion',
    key      : 'descripcion',
    align    : 'center',
  },
];
  return (
    <>
      <input className="mb-4" type="file" accept=".xlsx" onChange={handleFileUpload} />
      <Table 
        columns={columns} 
        dataSource={data} 
        pagination={{ pageSize: 5 }}
        title={() => (
            <h4 className="text-center font-bold text-white"> Gastos Variables </h4>
            )}
        locale={{
          emptyText: <span>Aun no existen gastos en el mes</span> 
        }}
      />
    </>
  );
};
