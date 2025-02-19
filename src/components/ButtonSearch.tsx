import { Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import { ButtonProps } from '../interface/ComponentsInterface';

export const ButtonSearch: React.FC<ButtonProps> = ({disabled, title}) => {
  return (
    <Button disabled={disabled} htmlType="submit" className="bg-primary hover:!bg-secondary text-black hover:!text-white !border-black">
    {
      disabled 
      ? "Cargando"
      : <div className="flex gap-2">
          {title}   <SearchOutlined />
        </div>
    }
  </Button>
  )
}