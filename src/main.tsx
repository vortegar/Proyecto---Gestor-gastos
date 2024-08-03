import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import { App } from './App'
import { SpentContextProvider } from './context/SpentContextProvider'
import { PersonContextProvider } from './context/PersonContextProvider'
import { ExpensesContextProvider } from './context/ExpensesContextProvider'
import { MonthContextProvider } from './context/MonthContextProvider'
import { AuthProvider } from './context/AuthContextProvider'
import { FixedSpentContextProvider } from './context/FixedSpentContextProvider'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
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
    </AuthProvider>
  </React.StrictMode>,
)
