import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext, useAuth } from '../context/AuthContextProvider';

import { Layout, Menu, Typography } from 'antd';
import { HomeOutlined, FileTextOutlined, UserOutlined, SettingOutlined, ApiOutlined } from '@ant-design/icons';

const { Title } = Typography;
const { Sider } = Layout;

export const Navbar: React.FC = () => {
  const useAuth = () => useContext(AuthContext);
  const { logout, username, clearUsername, isAuthenticated } = useAuth();
  const handleLogout = () => {
    clearUsername()
    logout()
  }
  return (
    <Sider  width={200}  style={{ height: '100vh', position: 'fixed' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
        <Title level={4} style={{ color: 'white' }}>Bienvenido</Title>
        <Title level={4} style={{ color: 'white', margin: '0px' }}>{username}</Title>
      </div>
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
        <Menu.Item key="1" icon={<HomeOutlined />}>
            <Link to="/home">Inicio</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<UserOutlined />}>
            <Link to="/expenses">Gastos</Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<FileTextOutlined/>}>
            <Link to="/history">Historial</Link>
        </Menu.Item>
        <Menu.Item key="4" icon={<SettingOutlined />}>
            <Link to="/configurate">Configuración</Link>
        </Menu.Item>
        <Menu.Item key="5" icon={<ApiOutlined />}>
            <Link onClick={ handleLogout }>Salir</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};
