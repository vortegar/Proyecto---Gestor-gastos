import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';


export const ButtonAdd = ({disabled, title}) => {
  return (
    <Button disabled={disabled} type="primary" htmlType="submit">
    {
      disabled 
      ? "Cargando"
      : <>{title} <PlusOutlined /></>
    }
  </Button>
  )
}
