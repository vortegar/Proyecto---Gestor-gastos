import { Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { ButtonAddProps } from '../interface/ComponentsInterface';

export const ButtonFile: React.FC<ButtonAddProps> = ({disabled, title}) => {
  return (
    <Input disabled={disabled}  type='file' className="custom-button"/>
    

  )
}
