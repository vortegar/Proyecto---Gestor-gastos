import { useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';

import { Spin, Typography } from 'antd';

import { getDataSpent } from '../../services/spentsServices';
import { getDataPerson } from '../../services/formPersonServices';

import { SpentContext } from '../../context/SpentContextProvider';
import { PersonContext } from '../../context/PersonContextProvider';

import { useAuth } from '../../context/AuthContextProvider';
import { getDataFixedSpent } from '../../services/fixedExpensesServices';
import { FixedSpentContext } from '../../context/FixedSpentContextProvider';

const { Title } = Typography;

import './loading.css'
import { getDataYear } from '../../services/yearServides';
import { YearContext } from '../../context/YearContextProvider';

export const LoadingScreen: React.FC = () => {

    const { uploaded } = useAuth();

    const { setSpentContext } = useContext(SpentContext);
    const { setPersonContext } = useContext(PersonContext);
    const { setFixedSpentContext } = useContext(FixedSpentContext);
    const { setYearContext } = useContext(YearContext);

    const navigate = useNavigate()
    
    const loadData = async () => {
        try {
          await Promise.all([
            getDataSpent(setSpentContext),
            getDataPerson(setPersonContext),
            getDataFixedSpent(setFixedSpentContext),
            getDataYear(setYearContext),
          ]);
          navigate('/home')
          uploaded();

        } catch (error) {
          console.error('Ocurrió un error al cargar los datos:', error);
        }
      };

    useEffect(() => {
        loadData();
      }, [])
    
 return   (
  <div className='loading-overlay'>

    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Spin size="large" />
        <Title style={{color: 'white'}} level={4}>Cargando información...</Title>        
    </div>
  </div>
    );
}
