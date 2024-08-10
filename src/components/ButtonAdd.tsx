import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { ButtonAddProps } from '../interface/ComponentsInterface';

export const ButtonAdd: React.FC<ButtonAddProps> = ({disabled, title}) => {
  return (
    <Button disabled={disabled} htmlType="submit" className="custom-button">
    {
      disabled 
      ? "Cargando"
      : <>{title} <PlusOutlined /></>
    }
  </Button>
  )
}
