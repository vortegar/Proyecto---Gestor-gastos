import { ResumenI } from '../pages/home/interfaceHome';

export const InfoResumen: React.FC<ResumenI> = ({spent_type, total}) => {
  return (
    <div className="flex">
        <span className="grow text-left">{spent_type}:</span>
        <span className="grow text-right mr-4">$ {total?.toLocaleString('es-ES')}</span>
    </div>
    )
}
