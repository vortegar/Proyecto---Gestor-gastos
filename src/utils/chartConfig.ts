import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title, ChartData, ChartOptions} from "chart.js";

ChartJS.register(
    ArcElement, 
    Tooltip, 
    Legend, 
    CategoryScale, 
    LinearScale, 
    BarElement,
    CategoryScale,
    BarElement,
    Title,
);

export type { ChartJS, ChartData, ChartOptions };