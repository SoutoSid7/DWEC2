import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ValidationContext } from './context/ValidationContext.jsx'

const validationPatterns = {
  regexIdPoliza: /^ID\d{5}$/,
  regexMatricula: /^[0-9]{4}[BCDFGHJKLMNPRSTVWXYZ]{3}$/,
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ValidationContext.Provider value={validationPatterns}>
      <App />
    </ValidationContext.Provider>
  </StrictMode>,
)
