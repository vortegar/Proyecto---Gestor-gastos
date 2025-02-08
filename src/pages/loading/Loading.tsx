import { useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';

import { Spin, Typography } from 'antd';

import { getDataPerson } from '../../services/formPersonServices';

import { useAuth } from '../../context/AuthContextProvider';
import { PersonContext } from '../../context/PersonContextProvider';

const { Title } = Typography;

import './loading.css'
import { getDataYear } from '../../services/yearServides';
import { YearContext } from '../../context/YearContextProvider';

export const LoadingScreen: React.FC = () => {

    const { uploaded } = useAuth();

    const { yearContext, dispatch } = useContext(YearContext);
    const { personContext ,setPersonContext } = useContext(PersonContext);

    const navigate = useNavigate()
    
    const loadData = async () => {
        try {
          await Promise.all([
            getDataPerson(setPersonContext),
            getDataYear(dispatch),
          ]);
          uploaded();
          
          if ( personContext.length > 0 || yearContext.length > 0 ){
            navigate('/home')
          }

        } catch (error) {
          console.error('Ocurrió un error al cargar los datos:', error);
        }
      };

    useEffect(() => {
        loadData();
      }, [])
    
 return   (
  <div className="fixed w-screen h-screen flex justify-center items-center inset-0 bg-gray-950">
    <div className="flex flex-col justify-center items-center h-screen">
        
        <Spin size="large" />
        <Title className="!text-white mt-4" level={4}>Cargando información...</Title>        
    </div>
  </div>
    );
}

