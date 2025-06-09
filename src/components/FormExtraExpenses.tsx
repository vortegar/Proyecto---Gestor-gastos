import { ChangeEvent, useContext, useEffect, useState } from "react";

import { Table } from "antd";
import { ColumnsType } from "antd/es/table";

import * as XLSX from 'xlsx';

import { useActualDate } from "../hooks/useActualDate";

import { FormExtraExpenesesInputs } from "./intercafeComponents";

import { updateExtraExpenses } from "../services/expensesServices";
import { MonthContext } from "../context/MonthContextProvider";

export const FormExtraExpenses:  React.FC = () => {

  const [data, setData] = useState<FormExtraExpenesesInputs[]>([]);

  const {anioActual} = useActualDate()
  const { monthActual } = useContext(MonthContext);
  
  useEffect(() => {
    setData(monthActual.extra_items as [])
 }, [monthActual.extra_items])

  const handleFileUploadFixedExpense = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const binaryStr = e.target!.result as ArrayBuffer;    
        const workbook = XLSX.read(binaryStr, { type: 'binary' });
        const worksheet = workbook.Sheets[workbook.SheetNames[2]];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as [];
        const filtredData = jsonData.map((v: [string, string, string]) => {
           if (v.length > 0) return v
        }).filter( u => u != undefined)

        const objectTable = filtredData.slice(1,3).map(l => {
          return {
            user        : l[0],
            total       : l[1],
            descripcion : l[2],
          };
       }) as [];      
       updateExtraExpenses(objectTable, anioActual.id!, monthActual.id!, setData);
      //  setData(objectTable);
      };
      reader.readAsArrayBuffer(file);
    }
  };
 
  const extraItemsColumns: ColumnsType<FormExtraExpenesesInputs> = [
    {
      title: 'Persona',
      dataIndex: 'user',
      key: 'user',
      align: 'center',
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
      align: 'center',
    },
    {
      title: 'Descripcion',
      dataIndex: 'descripcion',
      key: 'descripcion',
      align: 'center',
    },
  ];

  return (
    <>
       <input className="mb-4" type="file" accept=".xlsx" onChange={handleFileUploadFixedExpense} />  
        <Table 
          columns={extraItemsColumns} 
          dataSource={data} 
          pagination={{ pageSize: 5 }} 
          title={() => (
            <h4 className="text-center font-bold text-white">
              Gastos Extra
            </h4>
          )}
          locale={{
            emptyText: <span>Aun no existen gastos extra en el mes</span> 
          }}
        />
    </>
  );
};
