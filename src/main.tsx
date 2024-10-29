import * as React from 'react';
import * as ReactDOM from 'react-dom/client';

import './index.css';
import { App } from './App';

import { AuthProvider } from './context/AuthContextProvider';
import { YearContextProvider } from './context/YearContextProvider';
import { MonthContextProvider } from './context/MonthContextProvider';
import { SpentContextProvider } from './context/SpentContextProvider';
import { PersonContextProvider } from './context/PersonContextProvider';
import { ExpensesContextProvider } from './context/ExpensesContextProvider';
import { FixedSpentContextProvider } from './context/FixedSpentContextProvider';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <YearContextProvider>
        <MonthContextProvider>
          <PersonContextProvider>  
              <FixedSpentContextProvider>
                <SpentContextProvider>
                  <ExpensesContextProvider>
                    <App />
                  </ExpensesContextProvider>
                </SpentContextProvider> 
              </FixedSpentContextProvider>
          </PersonContextProvider>
        </MonthContextProvider>
      </YearContextProvider>
    </AuthProvider>
  </React.StrictMode>,
)
