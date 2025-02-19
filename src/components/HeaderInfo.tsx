import { HeaderInfoInterface } from "./intercafeComponents"

export const HeaderInfo: React.FC<HeaderInfoInterface> = ({month, year}) => {
  return (
    <div className="flex gap-3 mb-3">
      {
         (year !== undefined) 
         ? (
          <>
            <h2 className="mt-0 text-xl text-primary">Gastos mes de <span className="font-bold">{month}</span></h2>
            <h2 className="mt-0 mb-4 text-xl text-primary"> año <span className="font-bold">{year}</span></h2>
          </>
        )
        : <h2 className="mt-0 mb-4 text-xl text-primary">Debes crear un año</h2>
      }
    </div>   
  )
}
