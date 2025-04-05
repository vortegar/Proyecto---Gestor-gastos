import { GraficoProps } from '../interface/ExpensesInterface';
import { Bar } from 'react-chartjs-2';
import "../utils/chartConfig";
import { ChartData, ChartOptions } from '../utils/chartConfig';

export const Grafico: React.FC<GraficoProps> = ({ resumen, title }) => {
  const dataLabelName = resumen?.map((v) => v?.spent_type);
  const dataLabeValue = resumen?.map((v) => Number(v?.total));  

  const data: ChartData<'bar'> = {
    labels: dataLabelName,
    datasets: [
      {
        type: 'bar',
        label: 'Gasto',
        data: dataLabeValue,
        backgroundColor: 'rgba(34, 197, 94, 0.6)',
        borderColor: 'rgba(34, 197, 94, 1)',
        borderWidth: 2,
      },
    ],
  };

  const options: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {font: { size: 10}, color: "black"},
      },
      title: { display: true, text: title, color: "black"},
    },
    scales: {
      x: {
        ticks: { font: { size: 8}, color: "black"},
        grid: {
          display: true, 
          color: 'rgba(0, 0, 0, 0.5)',
        },
      
      },
      y: {
        ticks: { font: { size: 8}, color: "black"},
        grid: {
          display: true, 
          color: 'rgba(0, 0, 0, 0.5)',
        },
      },
    },
    color: {
      
    }
  };
  
  return (
    <div className="w-4/5 mt-20 mx-auto">
      <Bar data={data} options={options} />
    </div>
  );
};
