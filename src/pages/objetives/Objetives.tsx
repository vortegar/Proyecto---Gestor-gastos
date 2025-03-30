import { useContext, useEffect, useState } from "react";

import { Row } from "antd";
import { Pie, Bar } from "react-chartjs-2";

import '../../utils/chartConfig'

import { HeaderInfo } from "../../components/HeaderInfo";
import { FormMonetarySavings } from "../../components/intercafeComponents";

import { YearContext } from "../../context/YearContextProvider";

import { useActualDate } from "../../hooks/useActualDate";

export const Objetives = () => {
  
  const { mesActual } = useActualDate()
  const [data, setData] = useState<FormMonetarySavings[]>([]);
  
  useEffect(() => {
    setData(mesActual.monetary_savings as [])
 }, [mesActual.monetary_savings])

 const { yearContext } = useContext(YearContext);
  const [anioActual] = useState(yearContext[yearContext.length - 1])
  
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'right', 
        labels: {
          color: '#ffffff',  // Color blanco para el texto de la leyenda
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
          color: '#ffffff',  // Color blanco para el texto de la leyenda
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#ffffff',  // Color blanco para el texto de las etiquetas del eje X
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.2)',  // Color blanco semitransparente para la cuadrícula del eje X
        },
        stacked: true,  // Apilar las barras en el eje X
      },
      y: {
        ticks: {
          color: '#ffffff',  // Color blanco para el texto de las etiquetas del eje Y
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.2)',  
        },
        stacked: true,  
      },
    },
  } as const;
  
    const dataPie = {
        labels: data.map(v => v.concepto),
        datasets: [
          {
            data: data.map(v => v.porcentaje),
            backgroundColor: [ "#E1BEE7", "#CE93D8", "#BA68C8", "#AB47BC", "#9C27B0", "#8E24AA",  "#7B1FA2",  "#6A1B9A", "#4A148C"]
          },
        ],
      };

      const dataBar = {
        labels: data.map(v => v.concepto),
        datasets: [
          {
            label: "Ahorro actual",
            data: data.map(v => v.ahorroTotal),
            backgroundColor: "#4CAF50",
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
    <HeaderInfo year={anioActual?.year} month={mesActual?.month} />
    <h3 className="text-white mt-5">Progreso</h3>
    <Row gutter={16} className="flex lg:flex-row sm:flex-col w-[80%] h-[45%]">
      <Bar data={dataBar} options={optionsBars} />
    </Row>
      <h3 className="text-white mt-5">Distribución de ahorros</h3>
    <Row gutter={16} className="flex lg:flex-row sm:flex-col w-[40%] h-[15%] mt-5">
      <Pie data={dataPie} options={options} />
    </Row>
  </div>
  )
}



