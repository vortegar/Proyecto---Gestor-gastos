import * as React from 'react';
import * as ReactDOM from 'react-dom/client';

import './index.css'
import { App } from './App'
import { SpentContextProvider } from './context/SpentContextProvider'
import { PersonContextProvider } from './context/PersonContextProvider'
import { ExpensesContextProvider } from './context/ExpensesContextProvider'
import { MonthContextProvider } from './context/MonthContextProvider'
import { AuthProvider } from './context/AuthContextProvider'
import { FixedSpentContextProvider } from './context/FixedSpentContextProvider'
import { YearContextProvider } from './context/YearContextProvider';
import { DiffContextProvider } from './context/DiffPersonContextProvider';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <YearContextProvider>
        <MonthContextProvider>
          <PersonContextProvider>  
            <DiffContextProvider> 
              <FixedSpentContextProvider>
                <SpentContextProvider>
                  <ExpensesContextProvider>
                    <App />
                  </ExpensesContextProvider>
                </SpentContextProvider> 
              </FixedSpentContextProvider>
            </DiffContextProvider>
          </PersonContextProvider>
        </MonthContextProvider>
      </YearContextProvider>
    </AuthProvider>
  </React.StrictMode>,
)
