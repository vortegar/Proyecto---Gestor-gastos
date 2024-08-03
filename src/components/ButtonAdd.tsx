import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';


export const ButtonAdd = ({disabled, title}) => {
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
