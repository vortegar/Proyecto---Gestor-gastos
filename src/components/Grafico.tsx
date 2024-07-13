import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend, ChartOptions, ChartData } from 'chart.js';
import { Chart } from 'react-chartjs-2';
import { GraficoProps } from '../interface/ExpensesInterface';

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend);

export const Grafico: React.FC<GraficoProps> = ({resumen}) => {
  let dataLabelName = resumen.map( v => v.spent_type)
  let dataLabeValue = resumen.map( v => v.total)

  // console.log(resumen)
  const data: ChartData<'bar' | 'line'> = {
    // labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    labels: dataLabelName,

    datasets: [
      {
        type: 'bar',
        label: 'Gasto',
        data: dataLabeValue,
        // backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      // {
      //   type: 'line',
      //   label: 'Promedio',
      //   data: [2, 6, 9, 14, 18, 22, 2, 6, 9, 14, 18, 22],
      //   fill: false,
      //   // backgroundColor: 'rgba(255, 99, 132, 0.6)',
      //   borderColor: 'rgba(255, 99, 132, 1)',
      //   tension: 0.1,
      // },
    ],
  };

  const options: ChartOptions<'bar' | 'line'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: 'Resumen Anual',
      },
    },
  };
  return (
    <div style={{ width: '550px', height: '500px', marginTop: '40px', marginInlineStart: '40px' }}>
      <Chart type='bar' data={data} options={options} />
    </div>
  );
};
