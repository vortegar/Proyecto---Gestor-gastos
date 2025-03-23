import { ChangeEvent, useEffect, useState } from "react";

import { Table } from "antd";
import { ColumnsType } from "antd/es/table";

import * as XLSX from 'xlsx';

import { useActualDate } from "../hooks/useActualDate";

import { FormMonetarySavings } from "./intercafeComponents";

import { updateMonetarySaving } from "../services/expensesServices";

export const FormMonetary:  React.FC = () => {

  const [data, setData] = useState<FormMonetarySavings[]>([]);

  const {anioActual, mesActual} = useActualDate()
  
  useEffect(() => {
    setData(mesActual.monetary_savings as [])
 }, [mesActual.monetary_savings])

  const handleSavingsFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const binaryStr = e.target!.result as ArrayBuffer;    
        const workbook = XLSX.read(binaryStr, { type: 'binary' });
        const worksheet = workbook.Sheets[workbook.SheetNames[3]];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as [];

        const objectTable = jsonData.slice(1, 10).map(l => {
          return {
            meta       : l[0],
            concepto   : l[1],
            porcentaje : l[2],
            ahorroMes  : l[3],
            ahorroTotal: l[4],
          };
       }) as [];      
       updateMonetarySaving(objectTable, anioActual.id!, mesActual.id!, setData);
       setData(objectTable);
      };
      reader.readAsArrayBuffer(file);
    }
  };
 
  const extraItemsColumns: ColumnsType<FormMonetarySavings> = [
    {
      title    : 'Meta',
      dataIndex: 'meta',
      key      : 'meta',
      align    : 'center',
    },
    {
      title    : 'Concepto',
      dataIndex: 'concepto',
      key      : 'concepto',
      align    : 'center',
    },
    {
      title    : 'Porcentaje',
      dataIndex: 'porcentaje',
      key      : 'porcentaje',
      align    : 'center',
    },
    {
      title    : 'Ahorro del Mes',
      dataIndex: 'ahorroMes',
      key      : 'ahorroMes',
      align    : 'center',
    },  
    {
      title    : 'Cantidad Ahorrada',
      dataIndex: 'ahorroTotal',
      key      : 'ahorroTotal',
      align    : 'center',
    },
  ];

  return (
    <>
       <input className="mb-4" type="file" accept=".xlsx" onChange={handleSavingsFile} />  
        <Table 
          columns={extraItemsColumns} 
          dataSource={data} 
          pagination={{ pageSize: 5 }} 
          title={() => (
            <h4 className="text-center font-bold text-white">
              Ahorro
            </h4>
          )}
          locale={{
            emptyText: <span>Aun no haz cargado el ahorro del mes</span> 
          }}
        />
    </>
  );
};
