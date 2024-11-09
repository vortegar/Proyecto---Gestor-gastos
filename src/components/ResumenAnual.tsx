import { Card, Space } from "antd";
import Title from "antd/es/typography/Title";

import { HistoryResumenProps } from "./intercafeComponents";

export const ResumenAnual: React.FC<HistoryResumenProps> = ({ data, title }) => {
 
  return (
    <Space direction="vertical" size={16} className="w-80">
      <Card
      className="custom-card-head"
        title={
          <div >
            <Title level={4} className="!text-yellow-500 !text-sm !mb-0">
              {title}
            </Title>
          </div>
        }
      >
    {
      Object.entries(data).map(([key, value]) => {
        return <div key={key} className="flex justify-between">
          <span className="grow text-left"><strong>{key}:</strong></span>
          <span className="grow text-right">$ {value?.toLocaleString('es-ES')}</span>
        </div>
      })
    }
      </Card>
    </Space>
  )
}
