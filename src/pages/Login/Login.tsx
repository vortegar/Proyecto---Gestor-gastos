import React from 'react';
import { Form, Input, Button, Checkbox, Card, Typography } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useAuth } from '../../context/AuthContextProvider';
import { useNavigate } from 'react-router-dom';
// import 'antd/dist/antd.css';  // Importar los estilos de Ant Design

const { Title } = Typography;

export const LoginPage = () => {

  const { login } = useAuth();
  const navigate = useNavigate();

  const onFinish = (values) => {
    console.log('Received values from form: ', values);
    login();
    navigate('/home'); // Redirige al usuario a la página de inicio después de iniciar sesión
  };
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Card
        style={{ width: 300 }}
        title={
          <div style={{ textAlign: 'center' }}>
            <Title level={3}>Iniciar Sesión</Title>
          </div>
        }
      >
        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          style={{ maxWidth: '100%' }}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'El usuario es necesario!' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Usuario" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'La contraseña es necesaria!' }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Contraseña" />
          </Form.Item>

          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Recordar</Checkbox>
            </Form.Item>
            <a className="login-form-forgot" href="">Olvide mi contraseña</a>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Iniciar Sesión
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

