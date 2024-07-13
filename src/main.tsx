import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import { App } from './App'
import { SpentContextProvider } from './context/SpentContextProvider'
import { PersonContextProvider } from './context/PersonContextProvider'
import { ExpensesContextProvider } from './context/ExpensesContextProvider'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PersonContextProvider>  
      <SpentContextProvider>
      <ExpensesContextProvider>
        <App />
      </ExpensesContextProvider>
      </SpentContextProvider> 
    </PersonContextProvider>
  </React.StrictMode>,
)
