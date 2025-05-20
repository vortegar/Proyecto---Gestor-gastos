import { ResumenI } from '../pages/home/interfaceHome';

export const InfoResumen: React.FC<ResumenI> = ({spent_type, total, numberCol}) => {
  return (
    <div className={`grid grid-cols-${numberCol} border-b py-1`}>
        <span className="grow text-left font-medium">{spent_type}:</span>
        <span className="grow text-right mr-4">$ {total?.toLocaleString('es-ES')}</span>
    </div>
    )
}
