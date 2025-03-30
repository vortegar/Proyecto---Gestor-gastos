import { Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import { ButtonProps } from '../interface/ComponentsInterface';

export const ButtonSearch: React.FC<ButtonProps> = ({disabled, title}) => {
  return (
    <Button disabled={disabled} htmlType="submit" className="">
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