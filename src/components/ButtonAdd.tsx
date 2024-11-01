import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { ButtonProps } from '../interface/ComponentsInterface';

export const ButtonAdd: React.FC<ButtonProps> = ({disabled, title}) => {
  return (
    <Button disabled={disabled} htmlType="submit" className="bg-gray-950 hover:!bg-gray-800 text-yellow-500 hover:!text-yellow-500">
    {
      disabled 
      ? "Cargando"
      : <>{title} <PlusOutlined /></>
    }
  </Button>
  )
}
