import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Layout } from 'antd';

import ProtectedRoute from './context/ProtectedRouth';
import { useAuth } from './context/AuthContextProvider';

import { Navbar } from './components/Navbar';

import { Home } from './pages/home/Home';
import { LoginPage } from './pages/Login/Login';
import { History } from './pages/history/History';
import { ExpensesPage } from './pages/expenses/Expenses';
import { Configurate } from './pages/configurate/Configurate';

const { Content } = Layout;

import './variables.css'
import './index.css';

import { LoadingScreen } from './pages/loading/Loading';
import { Objetives } from './pages/objetives/Objetives';

export const App: React.FC = () => {
  const { isAuthenticated, uploadedData } = useAuth();
  return (
    <Router>
      <Layout 
        className={`min-w-[98.8vw] h-screen w-full ${isAuthenticated ? 'bg-white' : 'bg-gradient-to-t from-[#02207F] to-[#056DDC]'}`}
      >
        {(isAuthenticated && uploadedData) && <Navbar />}

          <Content className="mx-10 my-10">
              <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/load" element={<LoadingScreen />} />
                <Route path="/home" element={<ProtectedRoute element={Home} />} />
                <Route path="/expenses" element={<ProtectedRoute element={ExpensesPage} />} />
                <Route path="/configurate" element={<ProtectedRoute element={Configurate} />} />
                <Route path="/objetive" element={<ProtectedRoute element={Objetives} />} />

                <Route path="/history" element={<ProtectedRoute element={History} />} />
              </Routes>
          </Content>
        </Layout>
    </Router>
  );
};

