import { Card, Space } from "antd";
import Title from "antd/es/typography/Title";

import { HistoryResumenProps } from "./intercafeComponents";
export const ResumenAnual: React.FC<HistoryResumenProps> = ({ data, title, numberMonth }) => {

  return (
    <Space direction="vertical" size={16} className="w-120">
      <Card
      className="custom-card-head border-blue-500"
        title={
          <div >
            <Title level={4} className="!text-white !text-sm !mb-0">
              {title}
            </Title>
          </div>
        }
      >
      <div className="grid grid-cols-3 font-bold">
        <span>Concepto</span>
        <span>Total</span>
        <span>Mensual</span>
      </div>
      {Object.entries(data).map(([key, value]) => (
        <div key={key} className="grid grid-cols-3 border-b py-1">
          <span className="font-medium">{key}</span>
          <span>$ {value?.toLocaleString('es-ES')}</span>
          <span>$ {(Number(value / numberMonth))}</span>
        </div>
      ))}
      </Card>
    </Space>
  )
}
