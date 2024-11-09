import { GraficoProps } from '../interface/ExpensesInterface';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

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
        backgroundColor: 'rgba(255, 214, 10, 0.6)',
        borderColor: 'rgba(255, 214, 10, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {font: { size: 10}},
      },
      title: { display: true, text: title,},
    },
    scales: {
      x: {ticks: { font: { size: 8}}},
      y: {ticks: { font: { size: 8}}}
    },
  };
  
  return (
    <div className="w-4/6 mt-20 mx-auto">
      <Bar data={data} options={options} />
    </div>
  );
};
