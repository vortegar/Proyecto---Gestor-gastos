import { Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import { ButtonProps } from '../interface/ComponentsInterface';

export const ButtonSearch: React.FC<ButtonProps> = ({disabled, title}) => {
  return (
    <Button disabled={disabled} htmlType="submit" className="custom-button">
    {
      disabled 
      ? "Cargando"
      : <div style={{ display: "flex", gap: "0.8vw" }}>
          {title}   <SearchOutlined />
        </div>
    }
  </Button>
  )
}