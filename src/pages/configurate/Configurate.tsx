import { Row, Col, Divider, Button } from 'antd';

import { FormSpents } from '../../components/FormSpents';
import { FormPersons } from '../../components/FormPersons';
import { FormFixedSpents } from '../../components/FormFixedSpents';
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
    <>
      <div>
        <h2 style={{ margin: '0'}}>Configuración</h2>
        <h2 style={{ margin: '0'}}>Añade los gastos necesarios aqui</h2>
        <Button 
          style={{ marginTop: '1vw'}} 
          onClick={() => downloadDocument()} 
          className="custom-button"
        >
          Descargar Plantilla <CloudDownloadOutlined />
        </Button>

      </div>
      <Divider style={{ marginTop: '0'}}/>
      <Row gutter={16} style={{marginTop: '50px'}}>
        <Col span={8}>
         <FormPersons/>     
        </Col>
        <Col span={8}>
         <FormSpents/>
        </Col>
        <Col span={8}>
          <FormFixedSpents/>     
        </Col>
      </Row>
    </>
  );  
};

