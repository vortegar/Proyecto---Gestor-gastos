import { ChangeEvent, useContext, useEffect, useState } from "react";

import { Table } from "antd";
import { ColumnsType } from "antd/es/table";

import * as XLSX from 'xlsx';

import { useActualDate } from "../hooks/useActualDate";

import { FixedExpenseInputs } from "./intercafeComponents";

import { updateFixedExpenses } from "../services/expensesServices";
import { MonthContext } from "../context/MonthContextProvider";

export const FormFixedExpenses:  React.FC = () => {
  const [data, setData] = useState<FixedExpenseInputs[]>([]);
  const {anioActual } = useActualDate()
  const { monthActual } = useContext(MonthContext);

  useEffect(() => {
     setData(monthActual.fixed_expenses as [])
  }, [monthActual.fixed_expenses])
 
  const handleFileUploadFixedExpense = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const arrayBuffer = e.target!.result as ArrayBuffer;
        const data = new Uint8Array(arrayBuffer); 
        const workbook = XLSX.read(data, { type: 'array' }); 
        
        const worksheet = workbook.Sheets[workbook.SheetNames[1]];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as [];
        const objectTable = jsonData.map(l => {
          return {
            spent_type  : l[0],
            total       : l[1],
          }
        }) as [];
        updateFixedExpenses(objectTable, anioActual.id!, monthActual.id!, setData);
      };
      reader.readAsArrayBuffer(file);
    }
  };
  
    const fixedExpenseColumns: ColumnsType<FixedExpenseInputs> = [
    {
      title: 'Gasto',
      dataIndex: 'spent_type',
      key: 'spent_type',
      align: 'center',
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
      align: 'center',
    },
  ];

  return (
    <>
      <input type="file" accept=".xlsx" onChange={handleFileUploadFixedExpense} className="mb-4 input"/>
      
      <Table 
        columns={fixedExpenseColumns} 
        dataSource={data} 
        pagination={{ pageSize: 5 }} 
        title={() => (
          <h4 className="custom-card-head text-center font-bold text-white"> Gastos Fijos </h4>
        )}
        locale={{emptyText: <span>Aun no existen gastos fijos en el mes</span>}}
      />
    </>
  );
};
