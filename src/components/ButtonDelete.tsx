import { DeleteOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';


export const ButtonDelete = ({disabled, fn}) => {
  return (
    <span>
        <Tooltip title="Eliminar">
            <Button
                disabled={disabled}
                icon={<DeleteOutlined />}
                onClick={() => fn()}
            />
        </Tooltip>  
    </span>
  )
}
