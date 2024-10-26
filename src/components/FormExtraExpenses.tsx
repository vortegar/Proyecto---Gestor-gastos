import { ChangeEvent, useEffect, useState } from "react";

import { Table } from "antd";
import { ColumnsType } from "antd/es/table";

import * as XLSX from 'xlsx';

import { useActualDate } from "../hooks/useActualDate";

import { ExtraItemsColumns } from "./intercafeComponents";

import { updateExtraExpenses } from "../services/expensesServices";

export const FormExtraExpenses:  React.FC = () => {

  const [data, setData] = useState([]);
  const {anioActual, mesActual} = useActualDate()
  
  useEffect(() => {
    setData(mesActual.extra_items as [])
 }, [mesActual.extra_items])

  const handleFileUploadFixedExpense = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const binaryStr = e.target!.result as ArrayBuffer;    
        const workbook = XLSX.read(binaryStr, { type: 'binary' });
        const worksheet = workbook.Sheets[workbook.SheetNames[2]];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as [];

        const objectTable = jsonData.slice(1, 50).map(l => {
          return {
            person_name : l[0],
            monto       : l[1],
          }
       }) as [];      
        setData(objectTable);
        updateExtraExpenses(objectTable, anioActual.id!, mesActual.id!)
      };
      reader.readAsArrayBuffer(file);
    }
  };
 
  const extraItemsColumns: ColumnsType<ExtraItemsColumns> = [
    {
      title: 'Persona',
      dataIndex: 'person_name',
      key: 'person_name',
      align: 'center',
    },
    {
      title: 'Monto',
      dataIndex: 'monto',
      key: 'monto',
      align: 'center',
    },
    // {
    //   title: 'Acción',
    //   dataIndex: 'eliminar',
    //   key: 'eliminar',
    //   align: 'center',
    //   render: (_, expense) => (
    //     <ButtonDelete 
    //       disabled={isBlockBtnDelete} 
    //       fn={() => deleteExtraItems(expense, toggleBlockBtnDelete, toggleRefresh, anioActual.id!, mesActual.id!) } 
    //     />
    //   )
    // }
  ];

  return (
    <>
       <input type="file" accept=".xlsx" onChange={handleFileUploadFixedExpense} />  
        <Table 
          columns={extraItemsColumns} 
          dataSource={data} 
          title={() => (
            <h4 style={{ textAlign: 'center', fontWeight: 'bold', margin: '0' }}>
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
