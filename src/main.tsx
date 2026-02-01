import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@/app/App'
import { AppDataProvider } from '@/app/state/AppData'
import '@/styles/index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppDataProvider>
      <App />
    </AppDataProvider>
  </React.StrictMode>,
)
