import { Button, Tooltip } from 'antd';
import { DeleteOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { usePDF } from '@react-pdf/renderer';

import { ButtonProps } from '../interface/ComponentsInterface';
import { PdfResumen } from './PdfResumen';
import { useContext, useEffect } from 'react';
import { MonthContext } from '../context/MonthContextProvider';
import { useExpenses } from '../hooks/useExpenses';

export const Btns: React.FC<ButtonProps> = ({type ,disabled, title, fn}) => {
    const {  monthActual } = useContext(MonthContext);
    const expenses = monthActual?.expenses?.filter((expense) => expense.spent_type !== 'sin item')
    const {extraExpenses, fixedExpenses, resultDiference, diference, amountDiferenceUsers} = useExpenses();
    console.log(diference)
    const [instance, update] = usePDF({ document: 
            <PdfResumen 
                monthActual={monthActual} 
                expenses={expenses}
                extraExpenses={extraExpenses}
                fixedExpenses={fixedExpenses}
                resultDiference={resultDiference}
                diference={diference}
                amountDiferenceUsers={amountDiferenceUsers}
            />
     });
    
    useEffect(() => {
        update(
            <PdfResumen 
                monthActual={monthActual} 
                expenses={expenses}
                extraExpenses={extraExpenses}
                fixedExpenses={fixedExpenses}
                resultDiference={resultDiference}
                diference={diference}
                amountDiferenceUsers={amountDiferenceUsers}
            />)
      }, [monthActual, expenses]);

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
    {
        (type === "Pdf" && monthActual?.id !== undefined) && (
        
        <span>
            <Tooltip title={title}>
                <Button disabled={disabled} className="bg-blue-600 text-white">
                    <a  download='test.pdf' href={instance.url || ''}>
                        Descargar PDF
                    </a>
                </Button>
            </Tooltip>  
        </span>
        )
    }
  </>  
  )
}
