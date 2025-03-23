import { Pie, Bar } from "react-chartjs-2";
import '../../utils/chartConfig'
import { Flex } from "antd";

export const Objetives = () => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

    const data = {
        labels: ["Inversión", "Fondo de retiro", "Proyectos", "Estudios", "Donaciones", "Cosas personales"],
        datasets: [
          {
            data: [270000, 135000, 135000, 90000, 45000, 225000], 
            backgroundColor: ["#4CAF50", "#2196F3", "#FF9800", "#9C27B0", "#F44336", "#FFC107"],
          },
        ],
      };

      const dataBar = {
        labels: ["Fondo de retiro", "Proyectos", "Estudios", "Donaciones", "Cosas personales"],
        datasets: [
          {
            label: "Ahorro actual",
            data: [3000000, 200000, 10000, 50000, 800000], // Valores de ahorro actual
            backgroundColor: "#4CAF50",
          },
          {
            label: "Tope máximo",
            data: [5000000, 3000000, 1500000, 1000000, 1000000], // Valores de tope
            backgroundColor: "#FF9800",
          },
        ],
      };
      
      
      
  return (
  <Flex>
    <div style={{ width: "85vh", height: "85vh" }}> 
      <Bar data={dataBar} options={{ scales: { x: { stacked: true }, y: { stacked: true } } }} />;
    </div>
    <div style={{ width: "40vh", height: "40vh" }}> 
      <Pie data={data} options={options} />
    </div>
  </Flex>
  )
}



