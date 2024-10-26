import { useContext } from "react"
import { YearContext } from "../context/YearContextProvider";
import { MonthContext } from "../context/MonthContextProvider";

export const useActualDate = () => {
  const {yearContext} = useContext(YearContext);
  const {monthContext} = useContext(MonthContext);

  const anioActual = yearContext[yearContext.length - 1];
  const mesActual = monthContext[monthContext.length - 1];

  return {
    // Estados
    anioActual,
    mesActual
  }
}
