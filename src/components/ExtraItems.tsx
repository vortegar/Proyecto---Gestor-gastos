import { Col, Form, Input, Row } from 'antd';
import { IExtraItemsRow } from './intercafeComponents';

export const ExtraImtes: React.FC<IExtraItemsRow> = ({ person, monto }) => {
  return (
    <Row gutter={16} align="middle">
      <Col span={8}>
        <Form.Item >
          <Input disabled value={person} />
        </Form.Item>
      </Col>
      <Col span={8}>
        <Form.Item>
         <Input disabled value={monto} />
        </Form.Item>
      </Col>
    </Row>
  );
};
