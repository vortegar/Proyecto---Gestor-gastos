import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Layout } from 'antd';

import ProtectedRoute from './context/ProtectedRouth';
import { useAuth } from './context/AuthContextProvider';

import { Navbar } from './components/Navbar';
import { LoadingScreen } from './components/Loading';

import { Home } from './pages/home/Home';
import { LoginPage } from './pages/Login/Login';
import { History } from './pages/history/History';
import { ExpensesPage } from './pages/expenses/Expenses';
import { Configurate } from './pages/configurate/Configurate';

const { Content } = Layout;

import './variables.css'

export const App: React.FC = () => {
  const { isAuthenticated, uploadedData } = useAuth();
  return (
    <Router>
      <Layout style={{ minWidth: '100vw'}}>
        {(isAuthenticated && uploadedData) && <Navbar />}

        <Layout className="site-layout" style={{ marginLeft: isAuthenticated ? 200 : 0, minHeight: '100vh' }}>
          <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
    
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
              <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/load" element={<LoadingScreen />} />
                <Route path="/home" element={<ProtectedRoute element={Home} />} />
                <Route path="/expenses" element={<ProtectedRoute element={ExpensesPage} />} />
                <Route path="/configurate" element={<ProtectedRoute element={Configurate} />} />
                <Route path="/history" element={<ProtectedRoute element={History} />} />
              </Routes>
            </div>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
};

