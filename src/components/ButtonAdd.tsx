import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { ButtonProps } from '../interface/ComponentsInterface';

export const ButtonAdd: React.FC<ButtonProps> = ({disabled, title}) => {
  return (
    <Button disabled={disabled} htmlType="submit" className="bg-primary hover:!bg-secondary !text-black !border-black">
    {
      disabled 
      ? "Cargando"
      : <>{title} <PlusOutlined /></>
    }
  </Button>
  )
}
