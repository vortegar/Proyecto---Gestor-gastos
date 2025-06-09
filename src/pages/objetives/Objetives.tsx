import { useContext, useEffect, useState } from "react";

import { Row } from "antd";
import { Pie, Bar } from "react-chartjs-2";

import '../../utils/chartConfig'

import { HeaderInfo } from "../../components/HeaderInfo";
import { FormMonetarySavings } from "../../components/intercafeComponents";

import { useActualDate } from "../../hooks/useActualDate";
import { MonthContext } from "../../context/MonthContextProvider";

export const Objetives = () => {
  
  const { anioActual } = useActualDate()
  const { monthActual } = useContext(MonthContext);
  const [data, setData] = useState<FormMonetarySavings[]>([]);
  
  useEffect(() => {
    setData(monthActual.monetary_savings as [])
 }, [monthActual.monetary_savings])

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'right', 
        labels: {
          color: '#000000',  
        },
      },
    },
  } as const;

  const optionsBars = {
    responsive: true,
    maintainAspectRatio: false,
  
    plugins: {
      legend: {
        display: true,
        position: 'right',
        labels: {
          color: '#000000',  
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#000000',
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.2)',  
        },
        stacked: true, 
      },
      y: {
        ticks: {
          color: '#000000', 
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.2)',  
        },
        stacked: true,  
      },
    },
  } as const;
    
  const dataSort = data .sort((a, b) => a.porcentaje - b.porcentaje);

    const dataPie = {
        labels: dataSort.map(v => `${v.concepto} - ${v?.porcentaje}`),
        datasets: [
          {
            data: data.map(v => v.porcentaje),
            backgroundColor: ["#E1BEE7", "#CE93D8", "#BA68C8", "#AB47BC", "#9C27B0", "#8E24AA",  "#7B1FA2",  "#6A1B9A", "#4A148C"]
          },
        ],
      };
 
      const dataBar = {
        labels: dataSort.map(v => v.concepto),
        datasets: [
          {
            label: "Ahorro actual",
            data: data.map(v => v.ahorroTotal),
            backgroundColor: "#7B1FA2",
          },
          {
            label: "Tope máximo",
            data: data.map(v => v.meta),
            backgroundColor: "#95999c",
          },
        ],
      };
            
  return (
  <div className="mx-auto max-w-screen-lg"> 
    <HeaderInfo year={anioActual?.year} month={monthActual?.month} />
    <div className="mt-20">
      <h2 className="font-bold">Progreso</h2>
      <Row gutter={16} className="flex lg:flex-row sm:flex-col mt-5 !h-[200px]">
        <Bar data={dataBar} options={optionsBars} />
      </Row>
    </div>
    <div className="mt-20">
      <h2 className="font-bold">Distribución de ahorros</h2>
      <Row gutter={16} className="flex lg:flex-row sm:flex-col  mt-5">
        <Pie data={dataPie} options={options} />
      </Row>
    </div>
  </div>
  )
}



