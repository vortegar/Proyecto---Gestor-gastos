import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend, ChartOptions, ChartData } from 'chart.js';
import { Chart } from 'react-chartjs-2';
import { GraficoProps } from '../interface/ExpensesInterface';

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend);

export const Grafico: React.FC<GraficoProps> = ({resumen, title}) => {
  let dataLabelName = resumen.map( v => v.spent_type)
  let dataLabeValue = resumen.map( v => v.total)

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
      <Chart type='bar' data={data} options={options} />
    </div>
  );
};
