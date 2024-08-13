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
  const dataLabelName = resumen.map((v) => v.spent_type);
  const dataLabeValue = resumen.map((v) => Number(v.total)); // Asegúrate de que 'total' sea convertido a número

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
      },
      title: {
        display: true,
        text: title,
      },
    },
  };

  return (
    <div style={{ width: '550px', height: '500px', marginTop: '40px', marginInlineStart: '40px' }}>
      <Bar data={data} options={options} />
    </div>
  );
};
