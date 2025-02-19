import { Row, Col, Divider, Button } from 'antd';

import { FormPersons } from '../../components/FormPersons';
import { CloudDownloadOutlined } from '@ant-design/icons';

export const Configurate: React.FC = () => {
const downloadDocument = () => {
  const link = document.createElement('a');
  link.href = "/download/Plantilla.xlsx";
  link.download = "plantilla.xlsx";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
  return (
    <div className="opacity-0 animate-fadeIn">
      <div className="my-1">
        <Button 
          style={{ marginTop: '1vw'}} 
          onClick={() => downloadDocument()} 
          className="mt-4 bg-primary hover:!bg-secondary !text-black !border-black"
        >
          Descargar Plantilla <CloudDownloadOutlined />
        </Button>

      </div>
      <Divider className="mt-2"/>
      <Row gutter={16} className="flex lg:flex-row sm:flex-col items-center">
        <Col className="lg:w-1/3 sm:w-full"> <FormPersons/> </Col>
      </Row>
    </div>
  );  
};

