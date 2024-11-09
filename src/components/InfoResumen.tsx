import { ResumenI } from '../pages/home/interfaceHome';

export const InfoResumen: React.FC<ResumenI> = ({spent_type, total}) => {
  return (
    <div className="flex">
        <span className="grow text-left"><strong>{spent_type}:</strong></span>
        <span className="grow text-right mr-4">$ {total?.toLocaleString('es-ES')}</span>
    </div>
    )
}
