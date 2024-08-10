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
                className="custom-button"
            />
        </Tooltip>  
    </span>
  )
}
