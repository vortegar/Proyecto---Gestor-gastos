import { Layout, Menu } from 'antd';
import { HomeOutlined, FileTextOutlined, UserOutlined, SettingOutlined, ApiOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContextProvider';

const { Sider } = Layout;

export const Navbar: React.FC = () => {
  const { logout } = useAuth();

  return (
    <Sider  width={200}  style={{ height: '100vh', position: 'fixed', left: 0 }}>
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
            <Link onClick={ logout }>Salir</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};
