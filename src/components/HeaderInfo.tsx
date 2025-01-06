import { HeaderInfoInterface } from "./intercafeComponents"

export const HeaderInfo: React.FC<HeaderInfoInterface> = ({month, year}) => {
  return (
    <>
        <h2 className="mt-0 bolld font-bold text-xl">Gastos Mes De - {month}</h2>
        <h2 className="mt-0 mb-4 font-bold text-xl">Del Año - {year} </h2>
    </>   
  )
}
