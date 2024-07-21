import { Row, Col, Divider } from 'antd';
import { FormSpents } from '../../components/FormSpents';
import { FormPersons } from '../../components/FormPersons';

export const Configurate: React.FC = () => {

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent:'space-between', paddingLeft: '24px', paddingRight: '90px' }}>
        <h2>Configuración </h2>
      </div>
      <Divider/>
      <Row gutter={16} style={{marginTop: '50px'}}>
        <Col span={12}>
          <FormSpents/>
        </Col>
          <Col span={12}>
      <FormPersons/>     
        </Col>
      </Row>
    </>
  );  
};

