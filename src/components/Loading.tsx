import { Spin, Typography } from 'antd';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { getDataMonth } from '../services/monthServides';
import { getDataSpent } from '../services/spentsServices';
import { getDataPerson } from '../services/formPersonServices';

import { SpentContext } from '../context/SpentContextProvider';
import { MonthContext } from '../context/MonthContextProvider';
import { PersonContext } from '../context/PersonContextProvider';

import { useAuth } from '../context/AuthContextProvider';
import { getDataFixedSpent } from '../services/fixedExpensesServices';
import { FixedSpentContext } from '../context/FixedSpentContextProvider';

const { Title } = Typography;

export const LoadingScreen = () => {

    const { uploaded } = useAuth();

    const { setSpentContext } = useContext(SpentContext);
    const { setMonthContext } = useContext(MonthContext);
    const { setPersonContext } = useContext(PersonContext);
    const { setFixedSpentContext } = useContext(FixedSpentContext);
    
    const navigate = useNavigate()
    
    const loadData = async () => {
        try {
          await Promise.all([
            getDataSpent(setSpentContext),
            getDataPerson(setPersonContext),
            getDataFixedSpent(setFixedSpentContext),
            getDataMonth(setMonthContext)
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
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Spin size="large" />
        <Title level={4}>Cargando información...</Title>        
    </div>
    );
}