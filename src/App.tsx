import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Layout } from 'antd';
import { Navbar } from './components/Navbar';
import { Home } from './pages/home/Home';
import { Expenses } from './pages/expenses/Expenses';
import { Configurate } from './pages/configurate/Configurate';

const { Content } = Layout;

export const App: React.FC = () => {
  return (
    <Router>
      <Layout style={{ minWidth: '100vw'}}>
        <Navbar />
        <Layout className="site-layout" style={{ marginLeft: 200, minHeight: '100vh' }}>
          <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
    
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/expenses" element={<Expenses />} />
                <Route path="/configurate" element={<Configurate />} />

              </Routes>
            </div>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
};

