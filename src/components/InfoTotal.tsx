import { InfoTotalI } from '../pages/home/interfaceHome';

export const InfoTotal: React.FC<InfoTotalI> = ({total}) => {
  return (
    <div className="flex mt-5">
      <span className="grow text-left text-green-500"><strong>Total:</strong></span>
      <span className="grow text-right mr-4 text-green-500"> <strong>$ {total}</strong></span>
    </div>
    )
}
