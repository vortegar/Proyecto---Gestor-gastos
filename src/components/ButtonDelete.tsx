import { Button, Tooltip } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

import { ButtonDeleteProps } from '../interface/ComponentsInterface';

export const ButtonDelete: React.FC<ButtonDeleteProps> = ({disabled, fn}) => {
  return (
    <span>
        <Tooltip title="Eliminar">
            <Button
                disabled={disabled}
                icon={<DeleteOutlined />}
                onClick={() => fn()}
               className="bg-gray-950 hover:!bg-gray-800 text-yellow-500 hover:!text-yellow-500"
            />
        </Tooltip>  
    </span>
  )
}
