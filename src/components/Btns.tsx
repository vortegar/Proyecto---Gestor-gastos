import { Button, Tooltip } from 'antd';
import { DeleteOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';

import { ButtonProps } from '../interface/ComponentsInterface';

export const Btns: React.FC<ButtonProps> = ({type ,disabled, title, fn}) => {
  return (
  <>
    {
        type === "Agregar" && (
            <Button disabled={disabled} htmlType="submit" className="bg-primary hover:!bg-secondary !text-black !border-black">
                { disabled ? "Cargando" : <>{title} <PlusOutlined /></>}
            </Button>    
        )
    }
    {
        type === "Guardar" && (
            <Button disabled={disabled} onClick={() => fn()} className="bg-primary hover:!bg-secondary !text-black !border-black">
                { disabled ? "Cargando" : <>{title} <PlusOutlined /></>}
            </Button>    
        )
    }
    {
        type === "Eliminar" && (
            <span>
                <Tooltip title={title}>
                    <Button disabled={disabled} icon={<DeleteOutlined />} onClick={() => fn()} className="bg-primary hover:!bg-secondary !text-black !border-black" />
                </Tooltip>  
            </span>
        )
    }
    {
        type === "Cargando" && (
            <Button disabled={disabled} htmlType="submit" className="bg-blue-600 text-white">
                { disabled ? "Cargando" : <div className="flex gap-2"> {title}   <SearchOutlined /> </div> } 
            </Button>
        )
    }
  </>  
  )
}
