import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ApiProvider } from './context/apiContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <ApiProvider>
    <App />
  </ApiProvider>,
)
