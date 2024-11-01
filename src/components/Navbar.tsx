import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../context/AuthContextProvider';

import { Layout, Menu, Typography } from 'antd';
import { HomeOutlined, FileTextOutlined, UserOutlined, SettingOutlined, ApiOutlined } from '@ant-design/icons';
import { MonthContext } from '../context/MonthContextProvider';

const { Sider } = Layout;
const { Title } = Typography;

export const Navbar: React.FC = () => {
  const useAuth = () => useContext(AuthContext);
  const { logout, username, clearUsername, cleanData } = useAuth();
  const { monthContext } = useContext(MonthContext);

  const handleLogout = () => {
    clearUsername();
    cleanData();
    logout();
  }

  return (
    <Sider className="!bg-slate-950">
      <div>
        <Title level={4} className="text-center !text-white mt-10">Bienvenido</Title>
        <Title level={4} className="text-center !text-white !mt-0">{username}</Title>
      </div>
      <Menu className="!bg-slate-950" mode="inline" defaultSelectedKeys={['1']}>
        <Menu.Item key="1" icon={<HomeOutlined className="!text-white"/>}>
            <Link className="!text-white" to="/home">Inicio</Link>
        </Menu.Item>
        {
          monthContext.length > 0 &&
          <>  
            <Menu.Item key="2" icon={<UserOutlined  className="!text-white"/>}>
                <Link className="!text-white" to="/expenses">Gastos</Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<FileTextOutlined className="!text-white"/>}>
                <Link className="!text-white "to="/history">Historico Anual</Link>
            </Menu.Item>
          </>
        }
        <Menu.Item key="4" icon={<SettingOutlined className="!text-white"/>}>
            <Link className="!text-white" to="/configurate">Configuración</Link>
        </Menu.Item>
        <Menu.Item key="5" icon={<ApiOutlined className="!text-white"/>}>
            <a onClick={handleLogout} style={{ color: 'white', textDecoration: 'none' }}>Salir</a>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};
