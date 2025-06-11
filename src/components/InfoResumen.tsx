import { ResumenI } from '../pages/home/interfaceHome';

export const InfoResumen: React.FC<ResumenI> = ({spent_type, total}) => {
  return (
    <div className={`flex flex-row border-b py-1}`}>
        <span className="grow text-left font-medium">{spent_type}:</span>
        <span className="grow text-right">$ {total?.toLocaleString('es-ES')}</span>
    </div>
    )
}
