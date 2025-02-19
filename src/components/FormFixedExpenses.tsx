import { ChangeEvent, useEffect, useState } from "react";

import { Table } from "antd";
import { ColumnsType } from "antd/es/table";

import * as XLSX from 'xlsx';

import { useActualDate } from "../hooks/useActualDate";

import { FixedExpenseInputs } from "./intercafeComponents";

import { updateFixedExpenses } from "../services/expensesServices";

export const FormFixedExpenses:  React.FC = () => {
  const [data, setData] = useState<FixedExpenseInputs[]>([]);
  const {anioActual, mesActual} = useActualDate()

  useEffect(() => {
     setData(mesActual.fixed_expenses as [])
  }, [mesActual.fixed_expenses])
 
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
        updateFixedExpenses(objectTable, anioActual.id!, mesActual.id!, setData);
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
    // {
    //   title: 'Acción',
    //   dataIndex: 'eliminar',
    //   key: 'eliminar',
    //   align: 'center',
      // render: (_, expense) => (
      //   <ButtonDelete 
      //     disabled={isBlockBtnDelete} 
      //     fn={() => deleteFixedExpense(expense, toggleBlockBtnDelete, toggleRefresh, anioActual.id!, mesActual.id!) } 
      //   />
      // )
    // }
  ];

  return (
    <>
      <input 
        type="file" 
        accept=".xlsx" 
        onChange={handleFileUploadFixedExpense} 
      
      />
      
      <Table 
        columns={fixedExpenseColumns} 
        dataSource={data} 
        pagination={{ pageSize: 5 }} 
        title={() => (
          <h4 className="text-center font-bold"> Gastos Fijos </h4>
        )}
        locale={{emptyText: <span>Aun no existen gastos fijos en el mes</span>}}
      />
    </>
  );
};
