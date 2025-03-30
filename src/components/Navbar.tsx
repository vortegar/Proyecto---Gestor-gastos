import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../context/AuthContextProvider';

import { Layout, Menu, Typography } from 'antd';
import { HomeOutlined, FileTextOutlined, UserOutlined, SettingOutlined, ApiOutlined, BankOutlined } from '@ant-design/icons';
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
    <Sider className='!bg-gradient-to-t from-[#02207F] to-[#056DDC]'>
      <div className='sticky mt-20  top-20'>
        <Title level={4} className="text-center mt-10 !mb-0 !text-white">Bienvenido</Title>
        <Title level={3} className="text-center !mt-0 !text-white">{username}</Title>
      <Menu className="!bg-[var(--purple-color)] mt-20" mode="inline" defaultSelectedKeys={['1']}>
        <Menu.Item key="1" icon={<HomeOutlined/>} className='!text-white'>
          <Link to="/home" className='!text-white'>Inicio</Link>
        </Menu.Item>
        {
          monthContext.length > 0 &&
          <>  
            <Menu.Item key="2" icon={<UserOutlined />} className='!text-white'>
                <Link to="/expenses" className='!text-white'>Datos</Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<FileTextOutlined/>} className='!text-white'>
                <Link to="/history" className='!text-white'>Historico</Link>
            </Menu.Item>
            <Menu.Item key="4" icon={<BankOutlined />} className='!text-white'>
                <Link to="/objetive" className='!text-white'>Objetivos</Link>
            </Menu.Item>/
          </>
        }
        <Menu.Item key="5" icon={<SettingOutlined />} className='!text-white'>
          <Link to="/configurate" className='!text-white'>Configuración</Link>
        </Menu.Item>
        <Menu.Item key="6" icon={<ApiOutlined/>} className='!text-white'>
            <a onClick={handleLogout}  className='!text-white' style={{ textDecoration: 'none' }}>Salir</a>
        </Menu.Item>
      </Menu>
      </div>

    </Sider>
  );
};
